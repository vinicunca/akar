<script setup lang="ts">
import type { ATreeItemToggleEvent } from '..';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { ATreeItem, ATreeRoot } from '..';

interface TreeNode {
  id: string;
  name: string;
  children?: Array<TreeNode>;
}

const initialData = [
  { id: '1', name: 'Node 1', children: [] },
  {
    id: '2',
    name: 'Node 2',
    children: [
      { id: '5', name: 'Child Node 5' },
    ],
  },
  { id: '3', name: 'Node 3', children: [] },
  { id: '4', name: 'Plain Node' },
];

const treeData = ref(initialData);
const loadingIds = ref<Set<string>>(new Set());

function addChildrenToNode(tree: Array<TreeNode>, targetId: string, newChildren: Array<TreeNode>): boolean {
  for (const node of tree) {
    if (node.id === targetId) {
      node.children = node.children ? [...node.children, ...newChildren] : newChildren;
      return true;
    }
    if (node.children && node.children.length > 0) {
      const found = addChildrenToNode(node.children, targetId, newChildren);
      if (found) {
        return true;
      }
    }
  }
  return false;
}

function fetchData(value: TreeNode) {
  return new Promise<void>((resolve) => {
    if ((value.children?.length ?? 0) > 0) {
      return resolve();
    }

    setTimeout(() => {
      addChildrenToNode(treeData.value, value.id, [
        { id: `${value.id}-0`, name: `Child Node ${`${value.id}-0`}`, children: [] },
        { id: `${value.id}-1`, name: 'Plain Node' },
      ]);
      return resolve();
    }, 1000);
  });
}

async function fetchChildren(ev: ATreeItemToggleEvent<TreeNode>) {
  const value = ev.detail.value;
  if (!value?.children) {
    return;
  }

  loadingIds.value.add(value.id);
  await fetchData(value);
  loadingIds.value.delete(value.id);
}
</script>

<template>
  <Story
    title="Tree/Async"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ATreeRoot
        v-slot="{ flattenItems }"
        class="text-blackA11 w-64 select-none list-none rounded-lg bg-white p-2 text-sm font-medium"
        :items="treeData"
        :get-key="(item) => `${item.id}`"
      >
        <ATreeItem
          v-for="item in flattenItems"
          :key="item._id"
          v-slot="{ isExpanded }"
          :style="{ 'margin-left': `${item.level - 1}rem` }"
          class="focus:ring-grass9 data-[selected]:bg-grass4 my-0.5 w-max flex rotate-0 items-center rounded px-2 py-1 outline-none transition focus:ring-2"
          v-bind="item.bind"
          @toggle="fetchChildren"
        >
          <Icon
            v-if="loadingIds.has(item.value.id)"
            icon="radix-icons:reload"
            class="mr-2 h-4 w-4 animate-spin"
          />
          <Icon
            v-else-if="item.hasChildren"
            icon="radix-icons:chevron-down"
            class="mr-2 h-4 w-4"
            :class="{ '-rotate-90': isExpanded }"
          />
          <div> {{ item.value.name }} </div>
        </ATreeItem>
      </ATreeRoot>
    </Variant>
  </Story>
</template>
