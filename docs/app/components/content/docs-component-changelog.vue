<script setup lang="ts">
import { useLazyFetch } from '#app';
import { useComponentName } from '#imports';

const props = defineProps<{
  prefix?: string;
}>();

const { slug } = useComponentName(props);

const { data: commits } = await useLazyFetch('/api/github/commits', {
  key: `component-changelog-${slug}`,
  query: {
    // eslint-disable-next-line sonar/no-nested-template-literals
    path: `packages/pohon/src/runtime/components/${props.prefix ? `${props.prefix}/` : ''}${slug}.vue`,
  },
});

function normalizeCommitMessage(commit: { sha: string; message: string }) {
  const prefix = `[\`${commit.sha.slice(0, 5)}\`](https://github.com/vinicunca/akar/commit/${commit.sha})`;
  const content = commit.message.replace(/\(.*?\)/, '')
    .replace(/#(\d+)/g, '<a href=\'https://github.com/vinicunca/akar/issues/$1\'>#$1</a>')
    .replace(/`(.*?)`/g, '<code class="text-xs">$1</code>');

  return `${prefix} — ${content}`;
}
</script>

<template>
  <div v-if="!commits?.length">
    No recent changes
  </div>

  <div class="flex flex-col gap-1.5 relative">
    <div class="bg-background-accented h-full w-px left-[11px] absolute z-[-1]" />

    <template
      v-for="commit of commits"
      :key="commit.sha"
    >
      <div class="flex gap-1.5 items-center">
        <div class="mx-[8.5px] rounded-full bg-background-accented size-1.5 ring-2 ring-ring-bg" />
        <MDC
          :value="normalizeCommitMessage(commit)"
          class="text-sm [&_code]:text-xs akar:[&>*]:my-0 akar:[&>*]:py-0"
          tag="div"
        />
      </div>
    </template>
  </div>
</template>
