<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/accordion-item';

type ProseAccordionItem = ComponentConfig<typeof theme, AppConfig, 'accordionItem', 'pohon.prose'>;

export interface ProseAccordionItemProps {
  label: string;
  description?: string;
  class?: any;
  pohon?: { base?: any };
}

export interface ProseAccordionItemSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseAccordionItemProps>();
defineSlots<ProseAccordionItemSlots>();

const appConfig = useAppConfig() as ProseAccordionItem['AppConfig'];
const pohonProp = useComponentPohon('prose.accordion-item', props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.prose?.accordionItem || {}),
  }),
);
</script>

<template>
  <div :class="pohon({ class: [pohonProp?.base, props.class] })">
    <slot>
      {{ description }}
    </slot>
  </div>
</template>
