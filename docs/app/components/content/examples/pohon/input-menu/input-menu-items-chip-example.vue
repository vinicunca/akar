<script setup lang="ts">
import type { PChipProps, PInputMenuItem } from 'pohon-ui';
import { ref } from 'vue';

const items = ref([
  {
    label: 'bug',
    value: 'bug',
    chip: {
      color: 'error',
    },
  },
  {
    label: 'feature',
    value: 'feature',
    chip: {
      color: 'success',
    },
  },
  {
    label: 'enhancement',
    value: 'enhancement',
    chip: {
      color: 'info',
    },
  },
] satisfies Array<PInputMenuItem>);

const value = ref(items.value[0]);
</script>

<template>
  <PInputMenu
    v-model="value"
    :items="items"
  >
    <template #leading="{ modelValue, pohon }">
      <PChip
        v-if="modelValue"
        v-bind="modelValue.chip"
        inset
        standalone
        :size="(pohon.itemLeadingChipSize() as PChipProps['size'])"
        :class="pohon.itemLeadingChip()"
      />
    </template>
  </PInputMenu>
</template>
