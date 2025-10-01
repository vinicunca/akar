import type { ComponentMeta, PropertyMeta, PropertyMetaSchema } from 'vue-component-meta';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();
md.use(transformJSDocLinks);

// Define a custom plugin to transform JSDoc @link tags
function transformJSDocLinks(md: MarkdownIt) {
  md.core.ruler.push('transform-jsdoc-links', (state) => {
    state.tokens.forEach((token) => {
      if (token.type === 'inline' && token.children?.length) {
        for (let i = 0; i < token.children.length; i++) {
          const child = token.children[i];
          if (child.type === 'text' && child.content.startsWith('{@link')) {
            // eslint-disable-next-line regexp/no-super-linear-backtracking
            const matches = child.content.match(/\{@link\s+(.*?)\}/);
            if (matches) {
              const linkText = matches[1];
              const linkNode = new state.Token('link_open', 'a', 1);
              linkNode.attrSet('href', linkText);
              linkNode.attrSet('target', '_blank');
              const textNode = new state.Token('text', '', 0);
              textNode.content = 'reference';
              token.children.splice(i, 1, linkNode, textNode, new state.Token('link_close', 'a', -1));
              // eslint-disable-next-line sonar/updated-loop-counter
              i += 2; // Skip the added link and text tokens
            }
          }
        }
      }
    });
  });
}

export function stringifyJson(obj: any) {
  return JSON
    .stringify(obj, null, 2)
    // Nuxt content's MDC is picky with quotes so we need the triple slashes
    .replace(/\\"/g, '\\\'')
    // This one also the line breaks seems not being rendered so we need to double escape them
    .replace(/\\n/g, '\\\\n');
}

export function parseTypeFromSchema(schema: PropertyMetaSchema): string {
  if (typeof schema === 'object' && (schema.kind === 'enum' || schema.kind === 'array')) {
    const isFlatEnum = schema.schema?.every((val) => typeof val === 'string');
    const enumValue = schema?.schema?.filter((i) => i !== 'undefined') ?? [];

    if (isFlatEnum && /^[A-Z]/.test(schema.type)) {
      return enumValue.join(' | ');
    } else if (typeof schema.schema?.[0] === 'object' && schema.schema?.[0].kind === 'enum') {
      return schema.schema.map((s: PropertyMetaSchema) => parseTypeFromSchema(s)).join(' | ');
    } else {
      return schema.type;
    }
  } else if (typeof schema === 'object' && (schema.kind === 'object' || schema.kind === 'event')) {
    return schema.type;
  } else if (typeof schema === 'string') {
    return schema;
  } else {
    return '';
  }
}

export function parseMetaProps(metaProps: ComponentMeta['props']) {
  return metaProps
  // Exclude global props
    .filter((prop) => !prop.global)
    .map((prop) => {
      let defaultValue = prop.default;
      let type = prop.type;
      const { name, description, required } = prop;

      if (name === 'as') {
        defaultValue = defaultValue ?? '"div"';
      }

      if (defaultValue === 'undefined') {
        defaultValue = undefined;
      }

      if (!type.includes('AcceptableValue')) {
        type = parseTypeFromSchema(prop.schema) || type;
      }

      return ({
        name,
        description,
        type: type.replace(/\s*\|\s*undefined/g, ''),
        required,
        default: defaultValue ?? undefined,
      });
    })
    .sort((a, b) => {
      if (a.name === 'as') {
        return -1;
      }

      if (b.name === 'as') {
        return 1;
      }

      if (a.name === 'pohon') {
        return 1;
      }

      if (b.name === 'pohon') {
        return -1;
      }

      return a.name.localeCompare(b.name);
    });
};

export function parseMetaSlots(metaSlots: ComponentMeta['slots']) {
  const defaultSlot = metaSlots?.[0];
  const slots: Array<{ name: string; description: string; type: string }> = [];

  if (defaultSlot && defaultSlot.type !== '{}') {
    const schema = defaultSlot.schema;
    if (typeof schema === 'object' && schema.schema) {
      Object.values(schema.schema).forEach((childMeta: PropertyMeta) => {
        slots.push({
          name: childMeta.name,
          description: childMeta.description ?? '',
          type: parseTypeFromSchema(childMeta.schema),
        });
      });
    }
  }

  return slots;
}

export function parseMetaEvents(
  metaEvents: ComponentMeta['events'],
  eventDescriptionMap: Map<string, string> = new Map(),
) {
  return metaEvents
    .map(({ name, type }) => {
      return ({
        name,
        description: eventDescriptionMap.get(name) ?? '',
        type: type.replace(/\s*\|\s*undefined/g, ''),
      });
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function parseMetaExposed(metaExposed: ComponentMeta['exposed']) {
  return metaExposed
    .filter((expose) => typeof expose.schema === 'object' && expose.schema.kind === 'event')
    .map((expose) => ({
      name: expose.name,
      description: expose.description,
      type: expose.type,
    }));
}
