<script lang="ts">
import type { AMenuPortalProps } from '../menu';

export interface ADropdownMenuPortalProps extends AMenuPortalProps {}
</script>

<script setup lang="ts">
import { AMenuPortal } from '../menu';

const props = defineProps<ADropdownMenuPortalProps>();
</script>

<template>
  <AMenuPortal v-bind="props">
    <slot />
  </AMenuPortal>
</template>
