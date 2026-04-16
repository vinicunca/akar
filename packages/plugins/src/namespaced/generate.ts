// import { writeFileSync } from 'node:fs';
// import { components } from 'akar/constant';

// const excludedComponent = ['configProvider', 'primitive', 'visuallyHidden'];
// const filteredComponent = Object.keys(components).filter(
//   (i) => !excludedComponent.includes(i),
// );

// const flattenComponents = [];

// filteredComponent.forEach((curr) => {
//   const values = components[curr];

//   values.forEach((val) => {
//     flattenComponents.push(val);
//   });
// });

// const namespaced = filteredComponent.map((curr) => {
//   const key = `A${curr.charAt(0).toUpperCase()}${curr.slice(1)}`;
//   const tmp: Record<string, string> = {};

//   const values = components[curr];

//   values.forEach((val) => {
//     const truncated = val.replace(key, '');
//     if (truncated) {
//       tmp[truncated] = val;
//     }
//   });

//   if (Object.keys(tmp).length === 0) {
//     return `export { ${key} };`;
//   } else {
//     return `export const ${key} = {\n${
//       Object.keys(tmp).map((k) => {
//         return `  ${k}: ${tmp[k]},\n`;
//       }).join('')
//     }} as {\n${Object.keys(tmp).map((k) => {
//       return `  ${k}: typeof ${tmp[k]};\n`;
//     }).join('')}};`;
//   }
// });

// const template = `import { ${flattenComponents.join(', ')} } from 'akar';

// ${namespaced.map((component) => component).join('\n\n')}
// `;

// writeFileSync('src/namespaced/index.ts', template, 'utf-8');

import { writeFileSync } from 'node:fs';
import { components } from 'akar/constant';

const excludedComponents = ['configProvider', 'primitive', 'visuallyHidden'];
const filteredComponents = (Object.keys(components) as Array<keyof typeof components>).filter((component) => !excludedComponents.includes(component));

const flattenedComponents = filteredComponents.flatMap((component) => components[component]);
const namespacedComponents = filteredComponents.map((component) => {
  const key = component.charAt(0).toUpperCase() + component.slice(1);
  const entries = components[component]
    .map((value) => [value.replace(key, ''), value] as const)
    .filter(([name]) => Boolean(name));

  if (entries.length === 0) {
    return `export { ${key} }`;
  }

  return `export const ${key} = {\n${
    entries.map(([name, value]) => `  ${name}: ${value},\n`).join('')
  }} as {\n${
    entries.map(([name, value]) => `  ${name}: typeof ${value}\n`).join('')
  }}`;
});

const template = `import { ${flattenedComponents.join(', ')} } from 'akar'\n\n${namespacedComponents.join('\n\n')}\n`;

writeFileSync('src/namespaced/index.ts', template, 'utf-8');
