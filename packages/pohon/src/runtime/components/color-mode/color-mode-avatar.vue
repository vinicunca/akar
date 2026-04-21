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
  reactiveOmit(props, 'light', 'dark'),
);
</script>

<template>
  <PAvatar
    v-bind="{ ...avatarProps, ...$attrs }"
    :src="light"
    class="dark:hidden"
  />
  <PAvatar
    v-bind="{ ...avatarProps, ...$attrs }"
    :src="dark"
    class="hidden dark:block"
  />
</template>
