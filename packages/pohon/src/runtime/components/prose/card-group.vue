<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/card-group';

type ProseCardGroup = ComponentConfig<typeof theme, AppConfig, 'cardGroup', 'pohon.prose'>;

export interface ProseCardGroupProps {
  class?: any;
  pohon?: { base?: any };
}

export interface ProseCardGroupSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseCardGroupProps>();
defineSlots<ProseCardGroupSlots>();

const appConfig = useAppConfig() as ProseCardGroup['AppConfig'];
const pohonProp = useComponentPohon('prose.card-group', props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.prose?.cardGroup || {}),
  }),
);
</script>

<template>
  <div :class="pohon({ class: [pohonProp?.base, props.class] })">
    <slot />
  </div>
</template>
