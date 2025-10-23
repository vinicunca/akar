<script lang="ts" setup>
import * as theme from '#build/pohon';
import { MDCRenderer } from '#components';
import { computed, parseMarkdown, useAsyncData, useComponentName, useFrameworks } from '#imports';
import { toCamelCase } from '@vinicunca/perkakas';
import json5 from 'json5';
import { hash } from 'ohash';

const props = defineProps<{
  prose?: boolean;
}>();

const { framework } = useFrameworks();
const { componentName, slug } = useComponentName(props);

const camelName = toCamelCase(slug);

const computedTheme = computed(() => props.prose ? theme.prose : theme);

const strippedTheme = computed(() => {
  const strippedTheme_ = {
    ...(computedTheme.value as any)[camelName],
  };

  return strippedTheme_;
});

const component = computed(() => {
  const content = props.prose
    ? { prose: { [camelName]: strippedTheme.value } }
    : { [camelName]: strippedTheme.value };

  return {
    pohon: content,
  };
});

const { data: ast } = await useAsyncData(
  `component-theme-${toCamelCase(componentName)}-${hash({ props })}`,
  async () => {
    const md = `
::note
We use unocss-variants to customize the theme. Read more about it in the [theming guide](/docs/pohon/getting-started/theme/components).
::

Below is the theme configuration skeleton for the \`${componentName}\`. Since the component is provided unstyled by default, you will need to fill in these values to apply your own custom look and feel. If you prefer to use our pre-built, opinionated styling, you can instead use our [UnoCSS preset](https://vinicunca.dev/unocss-preset/pohon-ui), this docs is using it as well.

::code-collapse{class="nuxt-only"}

\`\`\`ts [app.config.ts]
export default defineAppConfig(${json5.stringify(component.value, null, 2).replace(/,([ |\t\n]+[}|\])])/g, '$1')};
\`\`\`\

::

::code-collapse{class="vue-only"}

\`\`\`ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pohon from 'pohon-ui/vite'

export default defineAppConfig(${json5.stringify(component.value, null, 2).replace(/,([ |\t\n]+[}|\])])/g, '$1')};
\`\`\`\

::
    `;

    return parseMarkdown(md);
  },
  { watch: [framework] },
);
</script>

<template>
  <MDCRenderer
    v-if="ast"
    :body="ast.body"
    :data="ast.data"
  />
</template>
