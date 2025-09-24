<script lang="ts">
import type { AvatarProps } from 'pohon';

export interface ColorModeAvatarProps extends /** @vue-ignore */ Omit<AvatarProps, 'src'> {
  light: string;
  dark: string;
}
</script>

<script setup lang="ts">
import PAvatar from '../avatar.vue';

defineOptions({ inheritAttrs: false });

defineProps<ColorModeAvatarProps>();
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
