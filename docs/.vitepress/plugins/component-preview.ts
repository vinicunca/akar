import type { MarkdownEnv, MarkdownRenderer } from 'vitepress';
import { readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { isString, toKebabCase } from '@vinicunca/perkakas';

// eslint-disable-next-line sonar/regex-complexity, regexp/no-super-linear-backtracking
export const rawPathRegexp = /^(.+?(?:\.([a-z0-9]+))?)(#[\w-]+)?(?: ?\{(\d+(?:[,-]\d+)*)? ?(\S+)?\})? ?(?:\[(.+)\])?$/;

function rawPathToToken(rawPath: string) {
  const [
    filepath = '',
    extension = '',
    region = '',
    lines = '',
    lang = '',
    rawTitle = '',
  ] = (rawPathRegexp.exec(rawPath) || []).slice(1);

  const title = rawTitle || filepath.split('/').pop() || '';

  return { filepath, extension, region, lines, lang, title };
}

export default function (md: MarkdownRenderer) {
  md.core.ruler.after('inline', 'component-preview', (state) => {
    function insertComponentImport(importString: string) {
      const index = state.tokens.findIndex((i) => i.type === 'html_block' && i.content.match(/<script setup>/g));
      if (index === -1) {
        const importComponent = new state.Token('html_block', '', 0);

        importComponent.content = `<script setup>\n${importString}\n</script>\n`;
        state.tokens.splice(0, 0, importComponent);
      } else {
        const content = state.tokens[index].content;
        state.tokens[index].content = content.replace('</script>', `${importString}\n</script>`);
      }
    }

    // Define the regular expression to match the desired pattern
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    const regex = /<ComponentPreview\s+([^>]+)\/>/g;

    // Iterate through the Markdown content and replace the pattern
    state.src = state.src.replace(regex, (_, bindingValue) => {
      // Define a regex pattern to match props and their values
      const propPattern = /(\w+)="([^"]*)"/g;

      // Create an object to store the props and their values
      const props: { [key: string]: string } = {};

      // Use matchAll to find all matches in the input string
      const matches = bindingValue.matchAll(propPattern);

      // Iterate through the matches and populate the props object
      for (const match of matches) {
        const [, propName, propValue] = match;
        props[propName] = propValue;
      }

      const fileName = toKebabCase(props.name);

      const pathName = props.type === 'example'
        ? `../../components/examples/${props.dir}/${fileName}`
        : `../../../components/demo/${props.dir}/${fileName}`;

      insertComponentImport(
        `import ${props.name} from '${pathName}/index.vue'`,
      );

      const index = state.tokens.findIndex((i) => i.content.match(regex));

      const { realPath, path: _path } = state.env as MarkdownEnv;

      const childFiles = readdirSync(
        resolve(dirname(realPath ?? _path), pathName),
        { withFileTypes: false, recursive: true },
      ).map((file) => isString(file) ? file.split(/[/\\]/).join('/') : file);

      const groupedFiles = props.type === 'example'
        ? { uno: childFiles }
        : childFiles.reduce((prev, curr) => {
            if (typeof curr !== 'string') {
              return prev;
            }
            if (!curr.includes('/')) {
              prev[curr] = [];
            } else {
              const folder = curr.split('/')[0];
              prev[folder].push(curr);
            }
            return prev;
          }, {} as { [key: string]: Array<string> });

      state.tokens[index].content = `<ComponentPreview name="${props.name}" type="${props.type || 'demo'}" dir="${props.dir}" files="${encodeURIComponent(JSON.stringify(groupedFiles))}" ><${props.name} />`;
      const _dummyToken = new state.Token('', '', 0);
      const tokenArray: Array<typeof _dummyToken> = [];

      Object.entries(groupedFiles).forEach(([key, value]) => {
        const templateStart = new state.Token('html_inline', '', 0);
        templateStart.content = `<template #${key}>`;
        tokenArray.push(templateStart);

        // eslint-disable-next-line sonar/no-nested-functions
        value.forEach((file) => {
          const { filepath, extension, lines, lang, title } = rawPathToToken(`${pathName}/${file}`);
          const resolvedPath = resolve(dirname(realPath ?? _path), filepath);

          // Add code tokens for each line
          const token = new state.Token('fence', 'code', 0);
          // eslint-disable-next-line sonar/no-nested-template-literals
          token.info = `${lang || extension}${lines ? `{${lines}}` : ''}${
            title ? `[${title}]` : ''
          }`;

          token.content = `<<< ${filepath}`;
          // @ts-expect-error token.src is for snippets plugin to handle importing snippet
          token.src = [resolvedPath];
          tokenArray.push(token);
        });

        const templateEnd = new state.Token('html_inline', '', 0);
        templateEnd.content = '</template>';
        tokenArray.push(templateEnd);
      });

      const endTag = new state.Token('html_inline', '', 0);
      endTag.content = '</ComponentPreview>';
      tokenArray.push(endTag);

      state.tokens.splice(index + 1, 0, ...tokenArray);

      // Return an empty string to replace the original pattern
      return '';
    });
  });
}
