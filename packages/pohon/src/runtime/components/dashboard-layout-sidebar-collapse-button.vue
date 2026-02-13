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
const collapsed = defineModel<boolean>('collapsed');
</script>

<template>
  <PButton
    :color="props.color"
    :variant="props.variant"
    :icon="
      collapsed
        ? appConfig.pohon.icons.chevronDoubleRight
        : appConfig.pohon.icons.chevronDoubleLeft
    "
    @click.stop="collapsed = !collapsed"
  />
</template>
