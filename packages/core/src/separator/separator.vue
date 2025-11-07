<script lang="ts">
import type { BaseSeparatorProps } from '../shared/component/base-separator.vue';

export interface ASeparatorProps extends BaseSeparatorProps {}
</script>

<script setup lang="ts">
import BaseSeparator from '../shared/component/base-separator.vue';

const props = withDefaults(defineProps<ASeparatorProps>(), {
  orientation: 'horizontal',
});
</script>

<template>
  <BaseSeparator v-bind="props">
    <slot />
  </BaseSeparator>
</template>
