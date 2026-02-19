<script lang="ts" setup>
import type { PButtonProps, PTooltipProps } from 'pohon-ui';
import { isBoolean } from '@vinicunca/perkakas';
import { defu } from 'defu';

const props = withDefaults(
  defineProps<{
    icon: PButtonProps['icon'];
    color?: PButtonProps['color'];
    variant?: PButtonProps['variant'];
    disabled?: PButtonProps['disabled'];
    tooltip?: PTooltipProps;
  }>(),
  {
    color: 'neutral',
    variant: 'ghost',
    disabled: false,
  },
);

const tooltipProps = toRef(
  () => defu(
    isBoolean(props.tooltip)
      ? {}
      : props.tooltip,
    {
      delayDuration: 0,
      content: { side: 'bottom' },
      disabled: props.disabled,
    },
  ) as PTooltipProps,
);
</script>

<template>
  <PButton
    v-if="!props.tooltip"
    :icon="props.icon"
    :color="props.color"
    :variant="props.variant"
    :disabled="props.disabled"
  />

  <PTooltip
    v-else
    v-bind="tooltipProps"
  >
    <PButton
      :icon="props.icon"
      :color="props.color"
      :variant="props.variant"
      :disabled="props.disabled"
    />
  </PTooltip>
</template>
