/* eslint-disable sonar/no-nested-conditional, no-nested-ternary */
import type { H3Event } from 'h3';
// @ts-expect-error - no types available
import components from '#component-example/nitro';
import { useAppConfig } from '#imports';
import meta from '#nuxt-component-meta';
import { visit } from '@nuxt/content/runtime';
import { queryCollection } from '@nuxt/content/server';
import { toCamelCase, toKebabCase } from '@vinicunca/perkakas';
import json5 from 'json5';

interface ComponentAttributes {
  ':prose'?: string;
  ':props'?: string;
  ':external'?: string;
  ':externalTypes'?: string;
  ':ignore'?: string;
  ':hide'?: string;
  ':slots'?: string;
}

interface ThemeConfig {
  prose: boolean;
  componentName: string;
}

interface CodeConfig {
  props: Record<string, unknown>;
  external: Array<string>;
  externalTypes: Array<string>;
  ignore: Array<string>;
  hide: Array<string>;
  componentName: string;
  slots?: Record<string, string>;
}

interface RawDocument {
  title: string;
  body: any;
  parent: 'akar' | 'pohon';
}

export async function transformMdc(event: H3Event, doc: RawDocument): Promise<RawDocument> {
  const componentName = toCamelCase(doc.title);

  visitAndReplace({
    doc,
    type: 'docs-pohon-theme',
    handler: (node) => {
      const attributes = node[1] as Record<string, string>;
      const mdcSpecificName = attributes?.slug;

      const finalComponentName = mdcSpecificName ? toCamelCase(mdcSpecificName) : componentName;

      const prose = parseBoolean(attributes[':prose']);
      const appConfig = generateThemeConfig({ prose, componentName: finalComponentName });

      replaceNodeWithPre({
        node,
        language: 'ts',
        code: `export default defineAppConfig(${json5.stringify(appConfig, null, 2)?.replace(/,([ |\t\n]+[}|\])])/g, '$1')})`,
        filename: 'app.config.ts',
      });
    },
  });

  visitAndReplace({
    doc,
    type: 'docs-pohon-preview',
    handler: (node) => {
      const attributes = node[1] as ComponentAttributes;
      const props = attributes[':props'] ? json5.parse(attributes[':props']) : {};
      const external = attributes[':external'] ? json5.parse(attributes[':external']) : [];
      const externalTypes = attributes[':externalTypes'] ? json5.parse(attributes[':externalTypes']) : [];
      const ignore = attributes[':ignore'] ? json5.parse(attributes[':ignore']) : [];
      const hide = attributes[':hide'] ? json5.parse(attributes[':hide']) : [];
      const slots = attributes[':slots'] ? json5.parse(attributes[':slots']) : {};

      const code = generateComponentCode({
        props,
        external,
        externalTypes,
        ignore,
        hide,
        componentName,
        slots,
      });

      replaceNodeWithPre({ node, language: 'vue', code });
    },
  });

  visitAndReplace({
    doc,
    type: 'docs-pohon-props',
    handler: (node) => {
      const attributes = node[1] as Record<string, string>;
      const mdcSpecificName = attributes?.name;
      const isProse = parseBoolean(attributes[':prose']);

      const finalComponentName = mdcSpecificName ? toCamelCase(mdcSpecificName) : componentName;

      const { pascalCaseName, componentMeta } = getComponentMeta(finalComponentName);

      if (!componentMeta?.props) {
        return;
      }

      const interfaceName = isProse ? `Prose${pascalCaseName}Props` : `${pascalCaseName}Props`;

      const interfaceCode = generateTSInterface(
        { name: interfaceName, items: Object.values(componentMeta.props), itemHandler: propItemHandler, description: `Props for the ${isProse ? 'Prose' : ''}${pascalCaseName} component` },
      );
      replaceNodeWithPre({ node, language: 'ts', code: interfaceCode });
    },
  });

  visitAndReplace({
    doc,
    type: 'docs-pohon-slots',
    handler: (node) => {
      const { pascalCaseName, componentMeta } = getComponentMeta(componentName);
      if (!componentMeta?.slots) {
        return;
      }

      const interfaceCode = generateTSInterface(
        { name: `${pascalCaseName}Slots`, items: Object.values(componentMeta.slots), itemHandler: slotItemHandler, description: `Slots for the ${pascalCaseName} component` },
      );
      replaceNodeWithPre({ node, language: 'ts', code: interfaceCode });
    },
  });

  visitAndReplace({
    doc,
    type: 'docs-pohon-emits',
    handler: (node) => {
      const { pascalCaseName, componentMeta } = getComponentMeta(componentName);
      const hasEvents = componentMeta?.events && Object.keys(componentMeta.events).length > 0;

      if (hasEvents) {
        const interfaceCode = generateTSInterface(
          { name: `${pascalCaseName}Emits`, items: Object.values(componentMeta.events), itemHandler: emitItemHandler, description: `Emitted events for the ${pascalCaseName} component` },
        );
        replaceNodeWithPre({ node, language: 'ts', code: interfaceCode });
      } else {
        node[0] = 'p';
        node[1] = {};
        node[2] = 'No events available for this component.';
      }
    },
  });

  visitAndReplace({
    doc,
    type: 'docs-component-example',
    handler: (node) => {
      const camelName = toCamelCase(node[1].name);
      const name = camelName.charAt(0).toUpperCase() + camelName.slice(1);
      const code = components[name].code;
      replaceNodeWithPre({ node, language: 'vue', code, filename: `${name}.vue` });
    },
  });

  const componentsListNodes: Array<any> = [];
  visit(
    doc.body,
    (node) => {
      if (Array.isArray(node) && node[0] === 'components-list') {
        componentsListNodes.push(node);
      }
      return true;
    },
    (node) => node,
  );

  for (const node of componentsListNodes) {
    const category = node[1]?.category;
    if (!category) {
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    const components = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '/docs/pohon/components/%')
      .where('extension', '=', 'md')
      .where('category', '=', category)
      .select('path', 'title')
      .all();

    const links = components.map((c: any) => `- [${c.title}](https://akar.vinicunca.dev/raw${c.path}.md)`).join('\n');

    node[0] = 'p';
    node[1] = {};
    node[2] = links;
  }

  return doc;
}

function parseBoolean(value?: string): boolean {
  return value === 'true';
}

function getComponentMeta(componentName: string) {
  const pascalCaseName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  const strategies = [
    `P${pascalCaseName}`,
    `Prose${pascalCaseName}`,
    pascalCaseName,
  ];

  let componentMeta: any;
  let finalMetaComponentName: string = pascalCaseName;

  for (const nameToTry of strategies) {
    finalMetaComponentName = nameToTry;
    const metaAttempt = (meta as Record<string, any>)[nameToTry]?.meta;
    if (metaAttempt) {
      componentMeta = metaAttempt;
      break;
    }
  }

  if (!componentMeta) {
    console.warn(`[getComponentMeta] Metadata not found for ${pascalCaseName} using strategies: P, Prose, or no prefix. Last tried: ${finalMetaComponentName}`);
  }

  return {
    pascalCaseName,
    metaComponentName: finalMetaComponentName,
    componentMeta,
  };
}

function replaceNodeWithPre({ node, language, code, filename }: { node: Array<any>; language: string; code: string; filename?: string }) {
  node[0] = 'pre';
  node[1] = { language, code };
  if (filename) {
    node[1].filename = filename;
  }
}

function visitAndReplace(
  { doc, type, handler }:
  { doc: RawDocument; type: string; handler: (node: Array<any>) => void },
) {
  visit(
    doc.body,
    (node) => {
      if (Array.isArray(node) && node[0] === type) {
        handler(node);
      }
      return true;
    },
    (node) => node,
  );
}

function generateTSInterface(
  { name, items, itemHandler, description }:
  { name: string; items: Array<any>; itemHandler: (item: any) => string; description: string },
) {
  let code = `/**\n * ${description}\n */\ninterface ${name} {\n`;
  for (const item of items) {
    code += itemHandler(item);
  }
  code += '}';
  return code;
}

function propItemHandler(propValue: any): string {
  if (!propValue?.name) {
    return '';
  }
  const propName = propValue.name;
  const propType = propValue.type
    ? Array.isArray(propValue.type)
      ? propValue.type.map((t: any) => t.name || t).join(' | ')
      : propValue.type.name || propValue.type
    : 'any';
  const isRequired = propValue.required || false;
  const hasDescription = propValue.description && propValue.description.trim().length > 0;
  const hasDefault = propValue.default !== undefined;
  let result = '';
  if (hasDescription || hasDefault) {
    result += '  /**\n';
    if (hasDescription) {
      const descLines = propValue.description.split(/\r?\n/);
      descLines.forEach((line: string) => {
        result += `   * ${line}\n`;
      });
    }
    if (hasDefault) {
      let defaultValue = propValue.default;
      if (typeof defaultValue === 'string') {
        defaultValue = `"${defaultValue.replace(/"/g, '\\"')}"`;
      } else {
        defaultValue = JSON.stringify(defaultValue);
      }
      result += `   * @default ${defaultValue}\n`;
    }
    result += '   */\n';
  }
  result += `  ${propName}${isRequired ? '' : '?'}: ${propType};\n`;
  return result;
}

function slotItemHandler(slotValue: any): string {
  if (!slotValue?.name) {
    return '';
  }
  const slotName = slotValue.name;
  const hasDescription = slotValue.description && slotValue.description.trim().length > 0;
  let result = '';
  if (hasDescription) {
    result += '  /**\n';
    const descLines = slotValue.description.split(/\r?\n/);
    descLines.forEach((line: string) => {
      result += `   * ${line}\n`;
    });
    result += '   */\n';
  }
  if (slotValue.bindings && Object.keys(slotValue.bindings).length > 0) {
    let bindingsType = '{\n';
    Object.entries(slotValue.bindings).forEach(([bindingName, bindingValue]: [string, any]) => {
      const bindingType = bindingValue.type || 'any';
      bindingsType += `    ${bindingName}: ${bindingType};\n`;
    });
    bindingsType += '  }';
    result += `  ${slotName}(bindings: ${bindingsType}): any;\n`;
  } else {
    result += `  ${slotName}(): any;\n`;
  }
  return result;
}

function emitItemHandler(event: any): string {
  if (!event?.name) {
    return '';
  }
  let payloadType = 'void';
  if (event.type) {
    payloadType = Array.isArray(event.type)
      ? event.type.map((t: any) => t.name || t).join(' | ')
      : event.type.name || event.type;
  }
  let result = '';
  if (event.description && event.description.trim().length > 0) {
    result += '  /**\n';
    event.description.split(/\r?\n/).forEach((line: string) => {
      result += `   * ${line}\n`;
    });
    result += '   */\n';
  }
  result += `  ${event.name}: (payload: ${payloadType}) => void;\n`;
  return result;
}

function generateThemeConfig({ prose, componentName }: ThemeConfig) {
  const appConfig = useAppConfig();

  const computedTheme = prose ? appConfig.pohon.prose : appConfig.pohon;
  const componentTheme = computedTheme[componentName];

  return {
    pohon: prose
      ? { prose: { [componentName]: componentTheme } }
      : { [componentName]: componentTheme },
  };
}

function generateComponentCode(
  {
    props,
    external,
    externalTypes,
    hide,
    componentName,
    slots,
  }: CodeConfig,
) {
  const filteredProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !hide.includes(key)),
  );

  const imports = external
    .filter((_, index) => externalTypes[index] && externalTypes[index] !== 'undefined')
    .map((ext, index) => {
      const type = externalTypes[index]?.replace(/[[\]]/g, '');
      return `import type { ${type} } from 'pohon-ui'`;
    })
    .join('\n');

  let itemsCode = '';
  if (props.items) {
    itemsCode = `const items = ref<${externalTypes[0]}>(${json5.stringify(props.items, null, 2)})`;
    delete filteredProps.items;
  }

  let calendarValueCode = '';
  if (componentName === 'calendar' && props.modelValue && Array.isArray(props.modelValue)) {
    calendarValueCode = `const value = ref(new CalendarDate(${props.modelValue.join(', ')}))`;
  }

  const propsString = Object.entries(filteredProps)
    .map(([key, value]) => {
      const formattedKey = toKebabCase(key);
      if (typeof value === 'string') {
        return `${formattedKey}="${value}"`;
      } else if (typeof value === 'number') {
        return `:${formattedKey}="${value}"`;
      } else if (typeof value === 'boolean') {
        return value ? formattedKey : `:${formattedKey}="false"`;
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');

  const itemsProp = props.items ? ':items="items"' : '';
  const vModelProp = componentName === 'calendar' && props.modelValue ? 'v-model="value"' : '';
  const allProps = [propsString, itemsProp, vModelProp].filter(Boolean).join(' ');
  const formattedProps = allProps ? ` ${allProps}` : '';

  let scriptSetup = '';
  if (imports || itemsCode || calendarValueCode) {
    scriptSetup = '<script setup lang="ts">';
    if (imports) {
      scriptSetup += `\n${imports}`;
    }
    if (imports && (itemsCode || calendarValueCode)) {
      scriptSetup += '\n';
    }
    if (calendarValueCode) {
      scriptSetup += `\n${calendarValueCode}`;
    }
    if (itemsCode) {
      scriptSetup += `\n${itemsCode}`;
    }
    scriptSetup += '\n</script>\n\n';
  }

  let componentContent = '';
  let slotContent = '';

  if (slots && Object.keys(slots).length > 0) {
    const defaultSlot = slots.default?.trim();
    if (defaultSlot) {
      const indentedContent = defaultSlot
        .split('\n')
        .map((line) => line.trim() ? `    ${line}` : line)
        .join('\n');
      componentContent = `\n${indentedContent}\n  `;
    }

    Object.entries(slots).forEach(([slotName, content]) => {
      if (slotName !== 'default' && content?.trim()) {
        const indentedSlotContent = content.trim()
          .split('\n')
          .map((line) => line.trim() ? `      ${line}` : line)
          .join('\n');
        slotContent += `\n    <template #${slotName}>\n${indentedSlotContent}\n    </template>`;
      }
    });
  }

  const pascalCaseName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  let componentTemplate = '';
  if (componentContent || slotContent) {
    componentTemplate = `<P${pascalCaseName}${formattedProps}>${componentContent}${slotContent}</P${pascalCaseName}>`; // Removed space before closing tag
  } else {
    componentTemplate = `<P${pascalCaseName}${formattedProps} />`;
  }

  return `${scriptSetup}<template>
  ${componentTemplate}
</template>`;
}
