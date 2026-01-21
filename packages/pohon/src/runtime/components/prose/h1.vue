<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/h-1';

type ProseH1 = ComponentConfig<typeof theme, AppConfig, 'h1', 'pohon.prose'>;

export interface ProseH1Props {
  id?: string;
  class?: any;
  pohon?: ProseH1['slots'];
}

export interface ProseH1Slots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig, useRuntimeConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseH1Props>();
defineSlots<ProseH1Slots>();

const appConfig = useAppConfig() as ProseH1['AppConfig'];
const { headings } = useRuntimeConfig().public?.mdc || {};

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.h1 || {}) })());

const generate = computed(() => props.id && typeof headings?.anchorLinks === 'object' && headings.anchorLinks.h1);
</script>

<template>
  <h1
    :id="id"
    :class="pohon.base({ class: props.class })"
  >
    <a
      v-if="id && generate"
      :href="`#${id}`"
      :class="pohon.link({ class: props.pohon?.link })"
    >
      <slot />
    </a>
    <slot v-else />
  </h1>
</template>
