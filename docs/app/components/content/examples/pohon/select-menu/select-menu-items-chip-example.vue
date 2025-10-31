<script setup lang="ts">
import type { PChipProps, PSelectMenuItem } from 'pohon-ui';
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
] satisfies Array<PSelectMenuItem>);

const value = ref(items.value[0]);
</script>

<template>
  <PSelectMenu
    v-model="value"
    :items="items"
    class="w-48"
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
  </PSelectMenu>
</template>
