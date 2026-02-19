<script lang="ts">
import type { ImgHTMLAttributes } from '../../types/html';

export interface PColorModeImageProps extends /** @vue-ignore */ Omit<ImgHTMLAttributes, 'src'> {
  dark: string;
  light: string;
}
</script>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports';
import { computed } from 'vue';
import { resolveBaseURL } from '../../utils';

defineOptions({ inheritAttrs: false });

const props = defineProps<PColorModeImageProps>();

const refinedLight = computed(() => resolveBaseURL(props.light, useRuntimeConfig().app.baseURL));
const refinedDark = computed(() => resolveBaseURL(props.dark, useRuntimeConfig().app.baseURL));
</script>

<template>
  <img
    :src="refinedLight"
    class="dark:hidden"
    v-bind="$attrs"
  >
  <img
    :src="refinedDark"
    class="hidden dark:block"
    v-bind="$attrs"
  >
</template>
