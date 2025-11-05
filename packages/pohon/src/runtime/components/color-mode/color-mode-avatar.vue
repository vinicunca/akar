<script lang="ts">
import type { PAvatarProps } from '../../types';

export interface PColorModeAvatarProps extends Omit<PAvatarProps, 'src'> {
  light: string;
  dark: string;
}
</script>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'akar';
import PAvatar from '../avatar.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<PColorModeAvatarProps>();

const avatarProps = useForwardProps(
  reactiveOmit(props, ['light', 'dark']),
);
</script>

<template>
  <PAvatar
    :src="light"
    class="dark:hidden"
    v-bind="{ ...avatarProps, ...$attrs }"
  />
  <PAvatar
    :src="dark"
    class="hidden dark:block"
    v-bind="{ ...avatarProps, ...$attrs }"
  />
</template>
