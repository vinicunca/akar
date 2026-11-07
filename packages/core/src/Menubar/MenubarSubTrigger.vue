<script lang="ts">
import type { MenuSubTriggerProps } from '@/Menu';
import { useForwardElement } from '@/shared';

export interface MenubarSubTriggerProps extends MenuSubTriggerProps {}
</script>

<script setup lang="ts">
import { MenuSubTrigger } from '@/Menu';

const props = defineProps<MenubarSubTriggerProps>();
const { forwardRef, expose } = useForwardElement();
defineExpose(expose);
</script>

<template>
  <MenuSubTrigger
    :ref="forwardRef"
    v-bind="props"
    data-akar-menubar-subtrigger=""
  >
    <slot />
  </MenuSubTrigger>
</template>
