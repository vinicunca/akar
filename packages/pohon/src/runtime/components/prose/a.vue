<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/a';

type ProseA = ComponentConfig<typeof theme, AppConfig, 'a', 'pohon.prose'>;

export interface ProseAProps {
  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined;
  class?: any;
}

export interface ProseASlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';
import PLink from '../link.vue';

const props = defineProps<ProseAProps>();

defineSlots<ProseASlots>();

const appConfig = useAppConfig() as ProseA['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.a || {}) }));
</script>

<template>
  <PLink
    :href="href"
    :target="target"
    :class="pohon({ class: props.class })"
    raw
  >
    <slot />
  </PLink>
</template>
