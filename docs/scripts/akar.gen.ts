import type { DeepPartial } from '@vinicunca/perkakas';
import type { ComponentMeta, MetaCheckerOptions, PropertyMeta, PropertyMetaSchema } from 'vue-component-meta';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { join, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import _traverse from '@babel/traverse';
import { capitalize, toCamelCase } from '@vinicunca/perkakas';
import { components } from 'akar/constant';
import fg from 'fast-glob';
import { createChecker } from 'vue-component-meta';
import { babelParse, parse as sfcParse } from 'vue/compiler-sfc';
import { writeToJson } from './utils.gen';

// @ts-expect-error ignore
const traverse = _traverse.default as typeof _traverse;
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  printer: { newLine: 1 },
};

const tsconfigChecker = createChecker(
  resolve(__dirname, '../../packages/core/tsconfig.app.json'),
  checkerOptions,
);

const eventDescriptionMap = new Map<string, string>();
const depTree = new Map<string, Array<string>>();
let prevDeps: Array<string> = [];

const allComponents = fg.sync([
  'src/**/*.vue',
  '!src/**/story/*.vue',
  '!src/**/stories/*.vue',
  '!src/**/*.story.vue',
], {
  cwd: resolve(__dirname, '../..'),
  absolute: true,
});

const listOfComponents = Object.values(components).flatMap((i) => i);

const primitiveComponents = allComponents.filter((i) => {
  const fileName = capitalize(toCamelCase(`a-${parse(i).name}`));
  // @ts-expect-error: complains because name is a string; completely fine and *actually* intended.
  return listOfComponents.includes(fileName);
});

const metaDirPath = resolve(__dirname, '../content/metadata');
// if meta dir doesn't exist create
mkdirSync(metaDirPath, { recursive: true });

export function generateMetaAkar() {
  // 1. Generate all the dependencies for each components
  allComponents.forEach(generateDependencies);

  // 2. Generate component meta
  primitiveComponents.forEach((componentPath) => {
    const dir = parse(componentPath).dir.split('/').at(-1) ?? '';
    const flattenDeps = [dir, ...getDependencies(dir)];
    if (!arraysAreEqual(prevDeps, flattenDeps)) {
      flattenDeps.forEach((dep) => {
        getEventFromComponentPath(dep);
      });
      prevDeps = flattenDeps;
    }

    const componentName = parse(componentPath).name;

    const meta = tsconfigChecker.getComponentMeta(componentPath);

    const metaJsonFilePath = join(metaDirPath, `a-${componentName}.json`);

    const payloadJson: DeepPartial<ComponentMeta> = {};

    const metaProps = parseMetaProps(meta.props);
    if (metaProps.length) {
      payloadJson.props = metaProps;
    }

    const metaEvents = parseMetaEvents(meta.events, eventDescriptionMap);
    if (metaEvents.length) {
      payloadJson.events = metaEvents;
    }

    const metaSlots = parseMetaSlots(meta.slots);
    if (metaSlots.length) {
      payloadJson.slots = metaSlots;
    }

    const metaExposed = parseMetaExposed(meta.exposed);
    if (metaExposed.length) {
      payloadJson.exposed = metaExposed;
    }

    writeToJson({
      filePath: metaJsonFilePath,
      data: payloadJson,
    });
  });
}

// Utilities
function getEventFromComponentPath(dir: string) {
  const files = readdirSync(
    resolve(__dirname, '../../src', dir),
    { withFileTypes: true },
  ).filter((file) => file.name.includes('.vue'));

  files.forEach((file) => {
    const { name, parentPath } = file;
    const source = readFileSync(join(parentPath, name), { encoding: 'utf8' });
    const { descriptor } = sfcParse(source, {
      filename: name,
    });

    const code = descriptor.script?.content;
    if (code) {
      const result = babelParse(code, {
        sourceType: 'module',
        plugins: ['typescript'],
      });

      for (const node of result.program.body) {
        if (node.type === 'ExportNamedDeclaration' && node.loc) {
          if (node.declaration?.type === 'TSTypeAliasDeclaration') {
            if (node.declaration.typeAnnotation.type === 'TSTypeLiteral') {
              node.declaration.typeAnnotation.members.forEach((member) => {
                if (member.type === 'TSPropertySignature' && member.key.type === 'StringLiteral' && member.leadingComments?.[0].loc) {
                  const key = member.key.value;
                  const description = member.leadingComments?.[0].value.replaceAll('*', '').trim();
                  eventDescriptionMap.set(key, description);
                } else if (member.type === 'TSPropertySignature' && member.key.type === 'Identifier' && member.leadingComments?.[0].loc) {
                  const key = member.key.name;
                  const description = member.leadingComments?.[0].value.replaceAll('*', '').trim();
                  eventDescriptionMap.set(key, description);
                }
              });
            } else if (node.declaration.typeAnnotation.type === 'TSIntersectionType') {
              const literalType = node.declaration.typeAnnotation.types.find((t) => t.type === 'TSTypeLiteral');
              if (literalType?.type === 'TSTypeLiteral') {
                literalType.members.forEach((member) => {
                  if (member.type === 'TSPropertySignature' && member.key.type === 'StringLiteral' && member.leadingComments?.[0].loc) {
                    const key = member.key.value;
                    const description = member.leadingComments?.[0].value.replaceAll('*', '').trim();
                    eventDescriptionMap.set(key, description);
                  } else if (member.type === 'TSPropertySignature' && member.key.type === 'Identifier' && member.leadingComments?.[0].loc) {
                    const key = member.key.name;
                    const description = member.leadingComments?.[0].value.replaceAll('*', '').trim();
                    eventDescriptionMap.set(key, description);
                  }
                });
              }
            }
          }
        }
      }
    }
  });
}

function generateDependencies(componentPath: string) {
  const { name: componentName, dir: componentDir } = parse(componentPath);
  const dir = componentDir.split('/').at(-1) ?? '';

  const source = readFileSync(componentPath, { encoding: 'utf8' });
  const { descriptor } = sfcParse(source, {
    filename: componentName,
  });

  const code = descriptor.script?.content;
  if (code) {
    const result = babelParse(code, {
      sourceType: 'module',
      plugins: ['typescript'],
    });

    traverse(result, {
      ImportDeclaration: (path) => {
        const value = path.node.source.value.split('/').at(-1);
        if (value && value.match(/^[A-Z]/) && !value.includes('vue')) {
          const prev = depTree.get(dir) ?? [];
          depTree.set(dir, [...new Set([...prev, value])]);
        }
      },
    });
  }
}

function getDependencies(dir: string, list = new Set<string>()) {
  const deps = depTree.get(dir);

  deps?.forEach((dep) => {
    list.add(dep);
    getDependencies(dep, list);
  });
  return Array.from(list);
}

function arraysAreEqual<T>(arr1: Array<T>, arr2: Array<T>): boolean {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

function parseTypeFromSchema(schema: PropertyMetaSchema): string {
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

function parseMetaProps(metaProps: ComponentMeta['props']) {
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

      return {
        name,
        description,
        type: type.replace(/\s*\|\s*undefined/g, ''),
        required,
        default: defaultValue ?? undefined,
      };
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

function parseMetaSlots(metaSlots: ComponentMeta['slots']) {
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

function parseMetaEvents(
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

function parseMetaExposed(metaExposed: ComponentMeta['exposed']) {
  return metaExposed
    .filter((expose) => typeof expose.schema === 'object' && expose.schema.kind === 'event')
    .map((expose) => ({
      name: expose.name,
      description: expose.description,
      type: expose.type,
    }));
}
