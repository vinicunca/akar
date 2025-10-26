<script lang="ts" setup>
import { CoreComponentPreview, MDCRenderer } from '#components';
import { parseMarkdown, useAsyncData, useRoute } from '#imports';
import { hash } from 'ohash';
import { defineAsyncComponent } from 'vue';

const props = defineProps<{
  name: string;
}>();

const route = useRoute();

const dir = route.params.slug?.at(-1);

async function renderPohonRaw() {
  const rawData = await import(`~~/app/components/examples/pohon/${dir}/${props.name}.vue?raw`);

  const code = `
\`\`\`vue
${rawData.default}
\`\`\`
`;

  return parseMarkdown(code);
}

const { data: rawCode } = await useAsyncData(
  `component-code-${hash(props.name)}`,
  async () => {
    return renderPohonRaw();
  },
);

const component = defineAsyncComponent(() => {
  return import(`~~/app/components/examples/pohon/${dir}/${props.name}.vue`);
});
</script>

<template>
  <CoreComponentPreview
    preview-classes="rounded-md w-full"
  >
    <template #preview>
      <component
        :is="component"
        v-if="component"
      />
    </template>

    <template #code>
      <MDCRenderer
        v-if="rawCode"
        :body="rawCode.body"
        :data="rawCode.data"
        class="[&_div.my-5]:!mt-0"
      />
    </template>
  </CoreComponentPreview>
</template>
