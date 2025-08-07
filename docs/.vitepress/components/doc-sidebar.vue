<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme';
import { ACollapsibleContent, ACollapsibleRoot, ACollapsibleTrigger } from 'akar';
import DocSidebarItem from './doc-sidebar-item.vue';

defineProps<{
  items: Array<DefaultTheme.SidebarItem>;
}>();
</script>

<template>
  <div
    v-for="item in items"
    :key="item.text"
  >
    <ACollapsibleRoot
      v-if="item.items?.length"
      v-slot="{ open }"
      class="mb-6"
      :default-open="true"
    >
      <ACollapsibleTrigger class="group text-sm font-bold pb-2 pl-4 pr-4 inline-flex w-full items-center justify-between">
        <span>{{ item.text }}</span>
        <i
          class="i-lucide:chevron-down text-lg text-muted-foreground transition group-hover:text-foreground"
          :class="{ '-rotate-90': !open }"
        />
      </ACollapsibleTrigger>
      <ACollapsibleContent class="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
        <DocSidebarItem
          v-for="subitem in item.items"
          :key="subitem.text"
          :item="subitem"
        />
      </ACollapsibleContent>
    </ACollapsibleRoot>

    <DocSidebarItem
      v-else
      :item="item"
    />
  </div>
</template>
