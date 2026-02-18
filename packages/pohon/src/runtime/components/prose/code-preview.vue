<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/code-preview';

type ProseCodePreview = ComponentConfig<typeof theme, AppConfig, 'codePreview', 'pohon.prose'>;

export interface ProseCodePreviewProps {
  class?: any;
  pohon?: ProseCodePreview['slots'];
}

export interface ProseCodePreviewSlots {
  default: (props?: object) => any;
  code: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseCodePreviewProps>();
const slots = defineSlots<ProseCodePreviewSlots>();

const appConfig = useAppConfig() as ProseCodePreview['AppConfig'];
const pohonProp = useComponentPohon('prose.code-preview', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.codePreview || {}) })({ code: !!slots.code }));
</script>

<template>
  <div :class="pohon.root({ class: [pohonProp?.root, props.class] })">
    <div :class="pohon.preview({ class: [pohonProp?.preview] })">
      <slot />
    </div>

    <div
      v-if="!!slots.code"
      :class="pohon.code({ class: [pohonProp?.code] })"
    >
      <slot name="code" />
    </div>
  </div>
</template>
