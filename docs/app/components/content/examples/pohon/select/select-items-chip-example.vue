<script setup lang="ts">
import type { PChipProps, PSelectItem } from 'pohon-ui';
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
] satisfies Array<PSelectItem>);

const value = ref(items.value[0]?.value);

function getChip(value: string) {
  return items.value.find((item) => item.value === value)?.chip;
}
</script>

<template>
  <PSelect
    v-model="value"
    :items="items"
    value-key="value"
    class="w-48"
  >
    <template #leading="{ modelValue, pohon }">
      <PChip
        v-if="modelValue"
        v-bind="getChip(modelValue)"
        inset
        standalone
        :size="(pohon.itemLeadingChipSize() as PChipProps['size'])"
        :class="pohon.itemLeadingChip()"
      />
    </template>
  </PSelect>
</template>
