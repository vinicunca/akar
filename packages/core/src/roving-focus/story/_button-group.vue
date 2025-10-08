<script setup lang="ts">
import type { ARovingFocusGroupProps } from '..';
import { provide, ref } from 'vue';
import { ARovingFocusGroup } from '..';

interface Props extends ARovingFocusGroupProps {
  defaultValue?: string;
}
const props = defineProps<Props>();

const value = ref(props.defaultValue ?? '');

provide('rovingFocusDemo', {
  value,
});
</script>

<template>
  <ARovingFocusGroup
    v-bind="props"
    class="p-2 inline-flex gap-4"
    :class="orientation === 'vertical' ? 'flex-col' : 'flex-row'"
  >
    <slot />
  </ARovingFocusGroup>
</template>
