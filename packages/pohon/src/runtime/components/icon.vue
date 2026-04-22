<script lang="ts">
import type { RuntimeOptions } from '@nuxt/icon';

export interface PIconProps {
  name: string | any;
  mode?: 'svg' | 'css';
  size?: string | number;
  customize?: RuntimeOptions['customize'] | boolean | null;
}
</script>

<script setup lang="ts">
import { isString } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import { useForwardProps } from 'akar';

const props = defineProps<PIconProps>();

const iconProps = useForwardProps(
  reactivePick(props, 'mode', 'size', 'customize'),
);
</script>

<template>
  <Icon
    v-if="isString(name)"
    :name="name"
    v-bind="iconProps"
  />
  <component
    :is="name"
    v-else
  />
</template>
