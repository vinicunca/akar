<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/h-4';

type ProseH4 = ComponentConfig<typeof theme, AppConfig, 'h4', 'pohon.prose'>;

export interface ProseH4Props {
  id?: string;
  class?: any;
  pohon?: ProseH4['slots'];
}

export interface ProseH4Slots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig, useRuntimeConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseH4Props>();
defineSlots<ProseH4Slots>();

const appConfig = useAppConfig() as ProseH4['AppConfig'];
const pohonProp = useComponentPohon('prose.h4', props);

const { headings } = useRuntimeConfig().public?.mdc || {};

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.h4 || {}) })());

const generate = computed(() => props.id && typeof headings?.anchorLinks === 'object' && headings.anchorLinks.h4);
</script>

<template>
  <h4
    :id="id"
    :class="pohon.base({ class: props.class })"
  >
    <a
      v-if="id && generate"
      :href="`#${id}`"
      :class="pohon.link({ class: pohonProp?.link })"
    >
      <slot />
    </a>
    <slot v-else />
  </h4>
</template>
