<script setup lang="ts">
import {
  AMenuPortal,
  type AMenuPortalProps,
} from '~~/menu';

export interface AContextMenuPortalProps extends AMenuPortalProps {}
const props = defineProps<AContextMenuPortalProps>();
</script>

<template>
  <AMenuPortal v-bind="props">
    <slot />
  </AMenuPortal>
</template>
