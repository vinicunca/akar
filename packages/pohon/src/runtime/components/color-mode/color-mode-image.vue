<script lang="ts">
import type { ImgHTMLAttributes } from '../../types/html';

export interface PColorModeImageProps extends /** @vue-ignore */ Omit<ImgHTMLAttributes, 'src'> {
  dark: string;
  light: string;
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });

defineProps<PColorModeImageProps>();
</script>

<template>
  <img
    :src="light"
    class="dark:hidden"
    v-bind="$attrs"
  >
  <img
    :src="dark"
    class="hidden dark:block"
    v-bind="$attrs"
  >
</template>
