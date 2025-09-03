<script setup lang="ts">
import { onContentUpdated, useData } from 'vitepress';
import { ref } from 'vue';
import { getHeaders, useActiveAnchor } from '../composables/use-outline';
import DocOutlineItem from './doc-outline-item.vue';

defineProps<{
  collapsible?: boolean;
}>();

const { page, frontmatter, theme } = useData();

onContentUpdated(() => {
  getHeaders(frontmatter.value.outline ?? theme.value.outline);
});

const container = ref();
const marker = ref();

useActiveAnchor(container, marker);
</script>

<template>
  <nav
    ref="container"
    class="not-prose block relative"
  >
    <div
      ref="marker"
      class="rounded-full bg-docs-primary h-[18px] w-[2px] transition-[top,opacity] duration-300 ease-in-out left-0 absolute -translate-y-1"
    />

    <div
      v-if="!collapsible"
      id="doc-outline-aria-label"
      aria-level="2"
      class="text-sm font-bold mb-2"
      role="heading"
    >
      On this page
    </div>

    <div class="border-l border-muted">
      <DocOutlineItem
        :headers="page.headers"
        :root="true"
      />
    </div>
  </nav>
</template>
