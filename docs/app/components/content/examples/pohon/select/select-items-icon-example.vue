<script setup lang="ts">
import type { PSelectItem } from 'pohon-ui';
import { computed, ref } from 'vue';

const items = ref([
  {
    label: 'Backlog',
    value: 'backlog',
    icon: 'i-lucide-circle-help',
  },
  {
    label: 'Todo',
    value: 'todo',
    icon: 'i-lucide-circle-plus',
  },
  {
    label: 'In Progress',
    value: 'in_progress',
    icon: 'i-lucide-circle-arrow-up',
  },
  {
    label: 'Done',
    value: 'done',
    icon: 'i-lucide-circle-check',
  },
] satisfies Array<PSelectItem>);

const value = ref(items.value[0]?.value);

const icon = computed(() => items.value.find((item) => item.value === value.value)?.icon);
</script>

<template>
  <PSelect
    v-model="value"
    :items="items"
    value-key="value"
    :icon="icon"
    class="w-48"
  />
</template>
