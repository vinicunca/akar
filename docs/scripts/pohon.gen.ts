import type { ComponentMeta, MetaCheckerOptions } from 'vue-component-meta';
import { mkdirSync } from 'node:fs';
import { join, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { toCamelCase } from '@vinicunca/perkakas';
import fg from 'fast-glob';
import { createChecker } from 'vue-component-meta';
import { writeToJson } from './utils.gen';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  printer: { newLine: 1 },
};

const tsconfigChecker = createChecker(
  resolve(__dirname, '../../packages/pohon/tsconfig.json'),
  checkerOptions,
);

const allComponents = fg.sync([
  'components/**/*.vue',
  '!components/**/callout/*.vue',
], {
  cwd: resolve(__dirname, '../../packages/pohon/src/runtime'),
  absolute: true,
});

const metaDirPath = resolve(__dirname, '../content/metadata');
// if meta dir doesn't exist create
mkdirSync(metaDirPath, { recursive: true });

export function generateMetaPohon() {
  allComponents.forEach((componentPath) => {
    const parsedPath = parse(componentPath);
    const componentName = parsedPath.name;
    const parentFolder = parsedPath.dir.split('/').pop() || '';

    // Create filename with parent folder: p-prose-a.json
    const fileName = parentFolder && parentFolder !== 'components'
      ? `p-${parentFolder}-${componentName}.json`
      : `p-${componentName}.json`;

    const metaJsonFilePath = join(metaDirPath, fileName);

    const meta = tsconfigChecker.getComponentMeta(componentPath);

    const payloadJson = refineMeta(meta);

    writeToJson({
      filePath: metaJsonFilePath,
      data: payloadJson,
    });
  });
}

function refineMeta(meta: ComponentMeta) {
  const eventProps = new Set<string>(meta.events.map((event) => toCamelCase(`on_${event.name}`)));
  const props = meta.props
    .filter((prop) => !prop.global && !eventProps.has(prop.name))
    .map((prop) => {
      if (prop.type.includes('APrimitiveAsTag')) {
        const description = `${prop.description}\n\nRead our [primitive tag](https://akar.vinicunca.dev/core/guides/primitive-tag) guide for more details.`;

        return {
          ...prop,
          schema: 'any',
          description,
        };
      }

      return prop;
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

  const refinedMeta = {
    props: props.map((sch) => stripeTypeScriptInternalTypesSchema(sch)),
    slots: meta.slots.map((sch) => stripeTypeScriptInternalTypesSchema(sch)),
    events: meta.events.map((sch) => stripeTypeScriptInternalTypesSchema(sch)),
    exposed: meta.exposed.map((sch) => stripeTypeScriptInternalTypesSchema(sch)),
  };

  return refinedMeta;
}

function stripeTypeScriptInternalTypesSchema(type: any, topLevel: boolean = true): any {
  if (!type) {
    return type;
  }

  if (!topLevel && type.declarations && type.declarations.find((d: any) => d.file.includes('node_modules/typescript') || d.file.includes('@vue/runtime-core'))) {
    return false;
  }

  if (Array.isArray(type)) {
    return type.map((sch: any) => stripeTypeScriptInternalTypesSchema(sch, false)).filter((r) => r !== false);
  }

  if (Array.isArray(type.schema)) {
    return {
      ...type,
      declarations: undefined,
      schema: type.schema.map((sch: any) => stripeTypeScriptInternalTypesSchema(sch, false)).filter((r: any) => r !== false),
    };
  }

  if (!type.schema || typeof type.schema !== 'object') {
    return typeof type === 'object' ? { ...type, declarations: undefined } : type;
  }

  const schema: any = {};
  Object.keys(type.schema).forEach((sch) => {
    if (sch === 'schema' && type.schema[sch]) {
      schema[sch] = schema[sch] || {};
      Object.keys(type.schema[sch]).forEach((sch2) => {
        const res = stripeTypeScriptInternalTypesSchema(type.schema[sch][sch2], false);
        if (res !== false) {
          schema[sch][sch2] = res;
        }
      });
      return;
    }
    const res = stripeTypeScriptInternalTypesSchema(type.schema[sch], false);

    if (res !== false) {
      schema[sch] = res;
    }
  });

  return {
    ...type,
    declarations: undefined,
    schema,
  };
}
