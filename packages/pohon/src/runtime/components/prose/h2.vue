<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/h2';

type ProseH2 = ComponentConfig<typeof theme, AppConfig, 'h2', 'pohon.prose'>;

export interface ProseH2Props {
  id?: string;
  class?: any;
  pohon?: ProseH2['slots'];
}

export interface ProseH2Slots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig, useRuntimeConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';
import PIcon from '../icon.vue';

const props = defineProps<ProseH2Props>();
defineSlots<ProseH2Slots>();

const appConfig = useAppConfig() as ProseH2['AppConfig'];
const { headings } = useRuntimeConfig().public?.mdc || {};

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.h2 || {}) })());

const generate = computed(() => props.id && typeof headings?.anchorLinks === 'object' && headings.anchorLinks.h2);
</script>

<template>
  <h2
    :id="id"
    :class="pohon.base({ class: props.class })"
  >
    <a
      v-if="id && generate"
      :href="`#${id}`"
      :class="pohon.link({ class: props.pohon?.link })"
    >
      <span :class="pohon.leading({ class: props.pohon?.leading })">
        <PIcon
          :name="appConfig.pohon.icons.hash"
          :class="pohon.leadingIcon({ class: props.pohon?.leadingIcon })"
        />
      </span>

      <slot />
    </a>
    <slot v-else />
  </h2>
</template>
