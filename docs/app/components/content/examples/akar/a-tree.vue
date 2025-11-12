<script setup lang="ts">
import { ATreeItem, ATreeRoot } from 'akar';

const items = [
  {
    title: 'composables',
    icon: 'lucide:folder',
    children: [
      { title: 'useAuth.ts', icon: 'i-vscode-icons:file-type-typescript' },
      { title: 'useUser.ts', icon: 'i-vscode-icons:file-type-typescript' },
    ],
  },
  {
    title: 'components',
    icon: 'lucide:folder',
    children: [
      {
        title: 'Home',
        icon: 'lucide:folder',
        children: [
          { title: 'Card.vue', icon: 'i-vscode-icons:file-type-vue' },
          { title: 'Button.vue', icon: 'i-vscode-icons:file-type-vue' },
        ],
      },
    ],
  },
  { title: 'app.vue', icon: 'i-vscode-icons:file-type-vue' },
  { title: 'nuxt.config.ts', icon: 'i-vscode-icons:file-type-nuxt' },
];
</script>

<template>
  <ATreeRoot
    v-slot="{ flattenItems }"
    class="text-sm color-text-muted font-medium p-2 list-none border rounded-lg bg-background w-56 select-none shadow-sm"
    :items="items"
    :get-key="(item) => item.title"
    :default-expanded="['components']"
  >
    <h2 class="text-sm font-semibold px-2 pb-3 pt-1">
      Directory Structure
    </h2>
    <ATreeItem
      v-for="item in flattenItems"
      v-slot="{ isExpanded }"
      :key="item._id"
      :style="{ 'padding-left': `${item.level - 0.5}rem` }"
      v-bind="item.bind"
      class="data-[selected]:accented my-0.5 px-2 py-1 outline-none rounded flex items-center data-[selected]:(color-primary bg-background-accented) focus:ring-2 focus:ring-primary"
    >
      <template v-if="item.hasChildren">
        <i
          v-if="!isExpanded"
          class="i-lucide:folder size-4"
        />
        <i
          v-else
          class="i-lucide:folder-open size-4"
        />
      </template>
      <i
        v-else
        class="size-4"
        :class="item.value.icon || 'i-lucide:file'"
      />
      <div class="pl-2">
        {{ item.value.title }}
      </div>
    </ATreeItem>
  </ATreeRoot>
</template>
