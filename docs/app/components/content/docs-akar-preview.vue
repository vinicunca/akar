<script lang="ts" setup>
import { CoreComponentPreview, MDCRenderer } from '#components';
import { parseMarkdown, useAsyncData } from '#imports';
import { hash } from 'ohash';
import { defineAsyncComponent } from 'vue';

const props = defineProps<{
  name: string;
}>();

async function renderAkarRaw() {
  const rawData = await import(`~~/app/components/demos/${props.name}.vue?raw`);

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
  {
    watch: [() => props.name],
  },
);

const component = defineAsyncComponent(() => {
  return import(`~~/app/components/demos/${props.name}.vue`);
});
</script>

<template>
  <CoreComponentPreview>
    <template #default="{ isCodeView }">
      <div
        v-if="!isCodeView"
        class="not-prose p-4 border border-border-muted rounded-xl bg-slate-900 flex min-h-[400px] w-full items-center justify-center relative"
      >
        <div
          v-if="component"
          class="justify-center relative z-[1]"
        >
          <component
            :is="component"
          />
        </div>
      </div>

      <div
        v-else
        class="rounded-xl max-h-[50vh] overflow-auto"
      >
        <MDCRenderer
          v-if="rawCode"
          :body="rawCode.body"
          :data="rawCode.data"
          class="[&_div.my-5]:!mt-0 [&_pre]:!rounded-t-none"
        />
      </div>
    </template>
  </CoreComponentPreview>
</template>
