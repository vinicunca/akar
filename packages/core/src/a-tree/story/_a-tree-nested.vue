<script setup lang="ts">
import { ATreeItem } from '..';

// eslint-disable-next-line import/no-self-import
import AATree from './_a-tree-nested.vue';

interface ATreeNode {
  children?: Array<ATreeNode>;
  icon: string;
  title: string;
}

withDefaults(defineProps<{
  level?: number;
  treeItems: Array<ATreeNode>;
}>(), {
  level: 0,
});
</script>

<template>
  <li
    v-for=" tree in treeItems"
    :key="tree.title"
  >
    <ATreeItem
      v-slot="{ isExpanded }"
      as-child
      :level="level"
      :value="tree"
      :style="{ 'margin-left': `${level}rem` }"
    >
      <button class="my-0.5 w-max flex items-center rounded px-2 py-1 outline-none data-[selected]:bg-grass4 focus:ring-2 focus:ring-grass9">
        <i
          v-if="tree.children"
          icon="i-radix-icons:chevron-down"
          class="mr-2 h-4 w-4"
        />
        <span>
          {{ tree.title }}
        </span>
      </button>

      <ul v-if="isExpanded">
        <template v-if="tree.children">
          <AATree
            :tree-items="tree.children"
            :level="level + 1"
          />
        </template>
      </ul>
    </ATreeItem>
  </li>
</template>
