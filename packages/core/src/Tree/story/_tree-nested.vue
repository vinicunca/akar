<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ATreeItem } from '..';

import Tree from './_tree-nested.vue';

interface TreeNode {
  title: string;
  icon: string;
  children?: Array<TreeNode>;
}

withDefaults(defineProps<{
  treeItems: Array<TreeNode>;
  level?: number;
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
      <button class="focus:ring-grass9 data-[selected]:bg-grass4 my-0.5 w-max flex items-center rounded px-2 py-1 outline-none focus:ring-2">
        <Icon
          v-if="tree.children"
          icon="radix-icons:chevron-down"
          class="mr-2 h-4 w-4"
        />
        <span>
          {{ tree.title }}
        </span>
      </button>

      <ul v-if="isExpanded">
        <template v-if="tree.children">
          <Tree
            :tree-items="tree.children"
            :level="level + 1"
          />
        </template>
      </ul>
    </ATreeItem>
  </li>
</template>
