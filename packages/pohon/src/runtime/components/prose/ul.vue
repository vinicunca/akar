<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/ul';

type ProseUl = ComponentConfig<typeof theme, AppConfig, 'ul', 'pohon.prose'>;

export interface ProseUlProps {
  class?: any;
}

export interface ProseUlSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseUlProps>();
defineSlots<ProseUlSlots>();

const appConfig = useAppConfig() as ProseUl['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.prose?.ul || {}),
  }),
);
</script>

<template>
  <ul :class="pohon({ class: props.class })">
    <slot />
  </ul>
</template>
