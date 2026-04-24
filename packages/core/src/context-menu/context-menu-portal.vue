<script setup lang="ts">
import type { AMenuPortalProps } from '../menu';
import {
  AMenuPortal,
} from '../menu';

export interface AContextMenuPortalProps extends AMenuPortalProps {}

defineOptions({ name: 'AContextMenuPortal' });

const props = defineProps<AContextMenuPortalProps>();
</script>

<template>
  <AMenuPortal v-bind="props">
    <slot />
  </AMenuPortal>
</template>
