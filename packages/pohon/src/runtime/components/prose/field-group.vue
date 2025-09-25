<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/field-group';

type ProseFieldGroup = ComponentConfig<typeof theme, AppConfig, 'fieldGroup', 'pohon.prose'>;

export interface ProseFieldGroupProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
}

export interface ProseFieldGroupSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseFieldGroupProps>();
defineSlots<ProseFieldGroupSlots>();

const appConfig = useAppConfig() as ProseFieldGroup['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.fieldGroup || {}) }));
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon({ class: props.class })"
  >
    <slot />
  </APrimitive>
</template>
