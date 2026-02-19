<script setup lang="ts">
import type { PButtonProps } from '../types';
import { useAppConfig } from '#imports';

const props = withDefaults(
  defineProps<{
    color?: PButtonProps['color'];
    variant?: PButtonProps['variant'];
  }>(),
  {
    color: 'neutral',
    variant: 'outline',
  },
);

const appConfig = useAppConfig();

const expandChildrenOnHover = defineModel<boolean>('expandChildrenOnHover');
</script>

<template>
  <PButton
    :color="props.color"
    :variant="props.variant"
    :icon="expandChildrenOnHover ? appConfig.pohon.icons.pin : appConfig.pohon.icons.pinOff"
    @click="expandChildrenOnHover = !expandChildrenOnHover"
  />
</template>
