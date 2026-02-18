<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/ul';

type ProseUl = ComponentConfig<typeof theme, AppConfig, 'ul', 'pohon.prose'>;

export interface ProseUlProps {
  class?: any;
  pohon?: { base?: any };
}

export interface ProseUlSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseUlProps>();
defineSlots<ProseUlSlots>();

const appConfig = useAppConfig() as ProseUl['AppConfig'];
const pohonProp = useComponentPohon('prose.ul', props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.prose?.ul || {}),
  }),
);
</script>

<template>
  <ul :class="pohon({ class: [pohonProp?.base, props.class] })">
    <slot />
  </ul>
</template>
