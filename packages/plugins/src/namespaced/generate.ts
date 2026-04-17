import { writeFileSync } from 'node:fs';
import { keys } from '@vinicunca/perkakas';
import { components } from 'akar/constant';

const excludedComponents = ['configProvider', 'primitive', 'visuallyHidden'];
const filteredComponents = keys(components).filter(
  (i) => !excludedComponents.includes(i),
);

const flattenedComponents = filteredComponents.flatMap((component) => components[component]);

const namespacedComponents = filteredComponents.map((component) => {
  const key = `A${component.charAt(0).toUpperCase()}${component.slice(1)}`;

  const entries = components[component]
    .map((value) => [value.replace(key, ''), value] as const)
    .filter(([name]) => Boolean(name));

  if (entries.length === 0) {
    return `export { ${key} };`;
  }

  return `export const ${key} = {\n${
    entries.map(([name, value]) => `  ${name}: ${value},\n`).join('')
  }} as {\n${
    entries.map(([name, value]) => `  ${name}: typeof ${value};\n`).join('')
  }};`;
});

const template = `import { ${flattenedComponents.join(', ')} } from 'akar';\n\n${namespacedComponents.join('\n\n')}\n`;

writeFileSync('src/namespaced/index.ts', template, 'utf-8');
