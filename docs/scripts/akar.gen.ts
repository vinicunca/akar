import type { MetaCheckerOptions } from 'vue-component-meta';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import _traverse from '@babel/traverse';
import { toPascalCase } from '@vinicunca/perkakas';
import { components } from 'akar/constant';
import fg from 'fast-glob';
import { createChecker } from 'vue-component-meta';
import { babelParse, parse as sfcParse } from 'vue/compiler-sfc';
import { parseMetaEvents, parseMetaExposed, parseMetaProps, parseMetaSlots, stringifyJson } from './utils.gen';

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
  cwd: resolve(__dirname, '../../packages/core'),
  absolute: true,
});

const listOfComponents = Object.values(components).flatMap((i) => i);

const primitiveComponents = allComponents.filter((i) => {
  const fileName = toPascalCase(`a-${parse(i).name}`);
  // @ts-expect-error: complains because name is a string; completely fine and *actually* intended.
  return listOfComponents.includes(fileName);
});

const metaDirPath = resolve(__dirname, '../content/docs/_meta');
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

    const metaMdFilePath = join(metaDirPath, `a-${componentName}.md`);

    let parsedString = '<!-- This file was automatic generated. Do not edit it manually -->\n\n';

    const metaProps = parseMetaProps(meta.props);
    if (metaProps.length) {
      parsedString += '#### Props\n';
      parsedString += `:docs-props-table{name='props-${componentName}' :data='${stringifyJson(metaProps)}'} \n`;
    }

    const metaEvents = parseMetaEvents(meta.events, eventDescriptionMap);
    if (metaEvents.length) {
      parsedString += '\n#### Events\n';
      parsedString += `\n:docs-emits-table{name='events-${componentName}' :data='${stringifyJson(metaEvents)}'} \n`;
    }

    const metaSlots = parseMetaSlots(meta.slots);
    if (metaSlots.length) {
      parsedString += '\n#### Slots\n';
      parsedString += `\n:docs-slots-table{name='slots-${componentName}' :data='${stringifyJson(metaSlots)}'} \n`;
    }

    const metaExposed = parseMetaExposed(meta.exposed);
    if (metaExposed.length) {
      parsedString += '\n#### Exposed\n';
      parsedString += `\n:docs-exposed-table{name='exposed-${componentName}' :data='${stringifyJson(metaExposed)}'} \n`;
    }

    writeFileSync(metaMdFilePath, parsedString);
  });
}

// Utilities
function getEventFromComponentPath(dir: string) {
  const files = readdirSync(
    resolve(__dirname, '../../packages/core/src', dir),
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
