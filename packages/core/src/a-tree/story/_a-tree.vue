<script setup lang="ts">
import { useForwardPropsEmits } from '~~/shared';

import { ATreeItem, ATreeRoot, type ATreeRootEmits, type ATreeRootProps } from '..';

const props = defineProps<Omit<ATreeRootProps, 'getKey' | 'items'>>();
const emits = defineEmits<ATreeRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const items = [
  { title: 'index.vue', icon: 'vue' },
  {
    title: 'lib',
    icon: 'folder',
    children: [
      {
        title: 'tree',
        icon: 'folder',
        children: [
          {
            title: 'AATree.vue',
            icon: 'vue',
          },
          {
            title: 'ATreeView.vue',
            icon: 'vue',
          },
        ],
      },
      {
        title: 'icons',
        icon: 'folder',
        children: [
          { title: 'JS.vue', icon: 'vue' },
          { title: 'vue.vue', icon: 'vue' },
        ],
      },
      {
        title: 'index.js',
        icon: 'js',
      },
    ],
  },
  {
    title: 'routes',
    icon: 'folder',
    children: [
      {
        title: 'contents',
        icon: 'folder',
        children: [
          {
            title: '+layout.vue',
            icon: 'vue',
          },
          {
            title: '+page.vue',
            icon: 'vue',
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <ATreeRoot
    v-slot="{ flattenItems }"
    v-bind="forwarded"
    class="w-64 select-none list-none rounded-md bg-white p-2 text-sm text-blackA11 font-medium"
    :items="items"
    :get-key="(item) => item.title"
  >
    <ATreeItem
      v-for="item in flattenItems"
      :key="item._id"
      class="my-0.5 w-max flex items-center rounded px-2 py-1 outline-none data-[selected]:bg-grass4 focus:ring-2 focus:ring-grass9"
      :style="{ 'margin-left': `${item.level}rem` }"
      v-bind="item.bind"
    >
      <i
        v-if="item.hasChildren"
        class="i-radix-icons:chevron-down h-4 w-4"
      />
      <div class="pl-2">
        {{ item.value.title }}
      </div>
    </ATreeItem>
  </ATreeRoot>
</template>
