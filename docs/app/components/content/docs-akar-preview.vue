<script lang="ts" setup>
import { CoreComponentPreview, MDCRenderer } from '#components';
import { parseMarkdown, useAsyncData } from '#imports';
import { hash } from 'ohash';
import { defineAsyncComponent } from 'vue';

const props = defineProps<{
  name: string;
}>();

async function renderAkarRaw() {
  const rawData = await import(`~~/app/components/examples/akar/${props.name}.vue?raw`);

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
    return renderAkarRaw();
  },
);

const component = defineAsyncComponent(() => {
  return import(`~~/app/components/examples/akar/${props.name}.vue`);
});
</script>

<template>
  <CoreComponentPreview
    preview-classes="rounded-md min-h-[400px] w-full"
  >
    <template #preview>
      <div
        v-if="component"
        class="justify-center relative z-1"
      >
        <component
          :is="component"
        />
      </div>
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
