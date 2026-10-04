import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChecker } from 'vue-component-meta';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = join(root, 'packages/core/src');
const output = resolve(root, process.argv[2] ?? 'docs/component-meta.json');
const checker = createChecker(join(root, 'packages/core/tsconfig.app.json'));
const packageVersion = JSON.parse(readFileSync(join(root, 'packages/core/package.json'), 'utf8')).version;
const entry = readFileSync(join(sourceRoot, 'index.ts'), 'utf8');
const directories = [...entry.matchAll(/export \* from '\.\/([^']+)'/g)]
  .map((match) => match[1]);
const components = {};

for (const directory of directories) {
  const indexPath = join(sourceRoot, directory, 'index.ts');
  let code;
  try {
    code = readFileSync(indexPath, 'utf8');
  } catch {
    continue;
  }

  for (const match of code.matchAll(/export\s*\{([^}]+)\}\s*from\s*'([^']+\.vue)'/g)) {
    const names = [...match[1].matchAll(/default\s+as\s+(\w+)/g)].map(item => item[1]);
    for (const name of names) {
      const file = join(sourceRoot, directory, match[2]);
      const meta = checker.getComponentMeta(file);
      components[name] = {
        source: `packages/core/src/${directory}/${match[2].replace(/^\.\//, '')}`,
        description: meta.description ?? '',
        props: meta.props.filter(item => !item.global).map(item => ({
          name: item.name,
          type: item.type,
          description: item.description,
          required: item.required,
          default: item.default,
        })),
        slots: meta.slots.map(item => ({
          name: item.name,
          type: item.type,
          description: item.description,
        })),
        events: meta.events.map(item => ({
          name: item.name,
          type: item.type,
          description: item.description,
        })),
      };
    }
  }
}

if (Object.keys(components).length < 100) {
  throw new Error(`Expected public Akar components, found ${Object.keys(components).length}`);
}

const sorted = Object.fromEntries(Object.entries(components).sort(([a], [b]) => a.localeCompare(b)));
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify({ schemaVersion: 1, package: 'akar', version: packageVersion, components: sorted }, null, 2)}\n`);
console.log(`Generated ${Object.keys(sorted).length} Akar component metadata entries in ${output}`);
