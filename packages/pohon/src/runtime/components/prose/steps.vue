<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/steps';

type ProseSteps = ComponentConfig<typeof theme, AppConfig, 'steps', 'pohon.prose'>;

export interface ProseStepsProps {
  /**
   * The heading level to apply to the steps.
   * @defaultValue '3'
   */
  level?: ProseSteps['variants']['level'];
  class?: any;
  pohon?: { base?: any };
}

export interface ProseStepsSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseStepsProps>();
defineSlots<ProseStepsSlots>();

const appConfig = useAppConfig() as ProseSteps['AppConfig'];
const pohonProp = useComponentPohon('prose.steps', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.steps || {}) }));
</script>

<template>
  <div :class="pohon({ class: [pohonProp?.base, props.class], level: props.level })">
    <slot />
  </div>
</template>
