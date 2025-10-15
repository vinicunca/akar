<script lang="ts">
export interface PIconProps {
  name: string | object;
  mode?: 'svg' | 'css';
  size?: string | number;
  customize?: (
    content: string,
    name?: string,
    prefix?: string,
    provider?: string
  ) => string;
}
</script>

<script setup lang="ts">
import { Icon } from '#components';
import { isString } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import { useForwardProps } from 'akar';

const props = defineProps<PIconProps>();

const iconProps = useForwardProps(
  reactivePick(props, 'name', 'mode', 'size', 'customize'),
);
</script>

<template>
  <Icon
    v-if="isString(iconProps.name)"
    :name="iconProps.name"
    :mode="iconProps.mode"
    :size="iconProps.size"
    :customize="iconProps.customize"
  />
  <component
    :is="name"
    v-else
  />
</template>
