<script setup lang="ts">
import type { ATreeRootEmits, ATreeRootProps } from '..';
import { Icon } from '@iconify/vue';
import { useForwardPropsEmits } from '~~/shared';
import { ATreeItem, ATreeRoot } from '..';

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
            title: 'Tree.vue',
            icon: 'vue',
          },
          {
            title: 'TreeView.vue',
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
    class="text-blackA11 w-64 select-none list-none rounded-md bg-white p-2 text-sm font-medium"
    :items="items"
    :get-key="(item) => item.title"
  >
    <ATreeItem
      v-for="item in flattenItems"
      :key="item._id"
      class="focus:ring-grass9 data-[selected]:bg-grass4 my-0.5 w-max flex items-center rounded px-2 py-1 outline-none focus:ring-2"
      :style="{ 'margin-left': `${item.level}rem` }"
      v-bind="item.bind"
    >
      <Icon
        v-if="item.hasChildren"
        icon="radix-icons:chevron-down"
        class="h-4 w-4"
      />
      <div class="pl-2">
        {{ item.value.title }}
      </div>
    </ATreeItem>
  </ATreeRoot>
</template>
