<script lang="ts">
import type { AMenuSeparatorProps } from '~~/a-menu';

import { useForwardExpose } from '~~/shared';

export interface ADropdownMenuSeparatorProps extends AMenuSeparatorProps {}
</script>

<script setup lang="ts">
import { AMenuSeparator } from '~~/a-menu';

const props = defineProps<ADropdownMenuSeparatorProps>();

useForwardExpose();
</script>

<template>
  <AMenuSeparator v-bind="props">
    <slot />
  </AMenuSeparator>
</template>
