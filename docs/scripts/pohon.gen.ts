import type { MetaCheckerOptions } from 'vue-component-meta';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import { createChecker } from 'vue-component-meta';
import { parseMetaEvents, parseMetaExposed, parseMetaProps, parseMetaSlots, stringifyJson } from './utils.gen';

const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  printer: { newLine: 1 },
};

const __dirname = fileURLToPath(new URL('.', import.meta.url));

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

const metaDirPath = resolve(__dirname, '../content/docs/_meta');
// if meta dir doesn't exist create
mkdirSync(metaDirPath, { recursive: true });

export function generateMetaPohon() {
  allComponents.forEach((componentPath) => {
    const componentName = parse(componentPath).name;

    const metaMdFilePath = join(metaDirPath, `p-${componentName}.md`);

    const meta = tsconfigChecker.getComponentMeta(componentPath);

    let parsedString = '<!-- This file was automatic generated. Do not edit it manually -->\n\n';

    const metaProps = parseMetaProps(meta.props);
    if (metaProps.length) {
      parsedString += `<DocsPropsTable :data="${stringifyJson(metaProps)}" />\n`;
    }

    const metaEvents = parseMetaEvents(meta.events);
    if (metaEvents.length) {
      parsedString += `\n<DocsEmitsTable :data="${stringifyJson(metaEvents)}" />\n`;
    }

    const metaSlots = parseMetaSlots(meta.slots);
    if (metaSlots.length) {
      parsedString += `\n<DocsSlotsTable :data="${stringifyJson(metaSlots)}" />\n`;
    }

    const metaExposed = parseMetaExposed(meta.exposed);
    if (metaExposed.length) {
      parsedString += `\n<DocsExposedTable :data="${stringifyJson(metaExposed)}" />\n`;
    }

    writeFileSync(metaMdFilePath, parsedString);
  });
}
