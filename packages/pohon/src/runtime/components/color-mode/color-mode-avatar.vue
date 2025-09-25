<script lang="ts">
import type { PAvatarProps } from 'pohon';

export interface PColorModeAvatarProps extends /** @vue-ignore */ Omit<PAvatarProps, 'src'> {
  light: string;
  dark: string;
}
</script>

<script setup lang="ts">
import PAvatar from '../avatar.vue';

defineOptions({ inheritAttrs: false });

defineProps<PColorModeAvatarProps>();
</script>

<template>
  <PAvatar
    :src="light"
    class="dark:hidden"
    v-bind="$attrs"
  />
  <PAvatar
    :src="dark"
    class="hidden dark:block"
    v-bind="$attrs"
  />
</template>
