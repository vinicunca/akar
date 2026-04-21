<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
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
  pohon?: { base?: any };
}

export interface ProseFieldGroupSlots {
  default: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseFieldGroupProps>();
defineSlots<ProseFieldGroupSlots>();

const appConfig = useAppConfig() as ProseFieldGroup['AppConfig'];
const pohonProp = useComponentPohon('prose.fieldGroup', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.fieldGroup || {}) }));
</script>

<template>
  <Primitive
    :as="as"
    :class="pohon({ class: [pohonProp?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
