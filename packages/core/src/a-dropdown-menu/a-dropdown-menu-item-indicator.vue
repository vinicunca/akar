<script lang="ts">
import type { AMenuItemIndicatorProps } from '~~/a-menu';

import { useForwardExpose } from '~~/shared';

export interface ADropdownMenuItemIndicatorProps extends AMenuItemIndicatorProps {}
</script>

<script setup lang="ts">
import { AMenuItemIndicator } from '~~/a-menu';

const props = defineProps<ADropdownMenuItemIndicatorProps>();

useForwardExpose();
</script>

<template>
  <AMenuItemIndicator v-bind="props">
    <slot />
  </AMenuItemIndicator>
</template>
