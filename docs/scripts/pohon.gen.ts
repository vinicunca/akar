import type { ComponentMeta } from 'vue-component-meta';
import { mkdirSync } from 'node:fs';
import { join, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import { getComponentMeta } from 'nuxt-component-meta/parser';
import { writeToJson } from './utils.gen';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

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

    const meta = getComponentMeta(componentPath);

    const payloadJson = {
      props: parseMetaProps(meta.props),
      events: meta.events,
      slots: meta.slots,
      exposed: meta.exposed,
    };

    writeToJson({
      filePath: metaJsonFilePath,
      data: payloadJson,
    });
  });
}

function parseMetaProps(metaProps: ComponentMeta['props']) {
  return metaProps
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
}
