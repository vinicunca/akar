<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/h-3';

type ProseH3 = ComponentConfig<typeof theme, AppConfig, 'h3', 'pohon.prose'>;

export interface ProseH3Props {
  id?: string;
  class?: any;
  pohon?: ProseH3['slots'];
}

export interface ProseH3Slots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig, useRuntimeConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';
import PIcon from '../icon.vue';

const props = defineProps<ProseH3Props>();
defineSlots<ProseH3Slots>();

const appConfig = useAppConfig() as ProseH3['AppConfig'];
const pohonProp = useComponentPohon('prose.h3', props);

const { headings } = useRuntimeConfig().public?.mdc || {};

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.h3 || {}) })());

const generate = computed(() => props.id && typeof headings?.anchorLinks === 'object' && headings.anchorLinks.h3);
</script>

<template>
  <h3
    :id="id"
    :class="pohon.base({ class: props.class })"
  >
    <a
      v-if="id && generate"
      :href="`#${id}`"
      :class="pohon.link({ class: pohonProp?.link })"
    >
      <span :class="pohon.leading({ class: pohonProp?.leading })">
        <PIcon
          :name="appConfig.pohon.icons.hash"
          :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon })"
        />
      </span>

      <slot />
    </a>
    <slot v-else />
  </h3>
</template>
