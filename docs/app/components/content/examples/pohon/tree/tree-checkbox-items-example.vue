<script setup lang="ts">
import type { ATreeItemSelectEvent } from 'akar';
import type { PTreeItem } from 'pohon-ui';
import { ref } from 'vue';

const items: Array<PTreeItem> = [
  {
    label: 'app/',
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        children: [
          { label: 'useAuth.ts' },
          { label: 'useUser.ts' },
        ],
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          { label: 'Card.vue' },
          { label: 'Button.vue' },
        ],
      },
    ],
  },
  { label: 'app.vue' },
  { label: 'nuxt.config.ts' },
];

const value = ref<(typeof items)>([]);

function onSelect(e: ATreeItemSelectEvent<PTreeItem>) {
  if (e.detail.originalEvent.type === 'click') {
    e.preventDefault();
  }
}
</script>

<template>
  <PTree
    v-model="value"
    :as="{ link: 'div' }"
    :items="items"
    multiple
    propagate-select
    bubble-select
    @select="onSelect"
  >
    <template #item-leading="{ selected, indeterminate, handleSelect }">
      <PCheckbox
        :model-value="indeterminate ? 'indeterminate' : selected"
        tabindex="-1"
        @change="handleSelect"
        @click.stop
      />
    </template>
  </PTree>
</template>
