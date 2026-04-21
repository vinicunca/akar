<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/field-group';

type FieldGroup = ComponentConfig<typeof theme, AppConfig, 'fieldGroup'>;

export interface FieldGroupProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * @defaultValue 'md'
   */
  size?: FieldGroup['variants']['size'];
  /**
   * The orientation the buttons are laid out.
   * @defaultValue 'horizontal'
   */
  orientation?: FieldGroup['variants']['orientation'];
  class?: any;
  pohon?: { base?: any };
}

export interface FieldGroupSlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed, provide } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { fieldGroupInjectionKey } from '../composables/useFieldGroup';
import { uv } from '../utils/uv';

const props = withDefaults(defineProps<FieldGroupProps>(), {
  orientation: 'horizontal',
});
defineSlots<FieldGroupSlots>();

const appConfig = useAppConfig() as FieldGroup['AppConfig'];
const pohonProp = useComponentPohon('fieldGroup', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.fieldGroup || {}) }));

provide(fieldGroupInjectionKey, computed(() => ({
  orientation: props.orientation,
  size: props.size,
})));
</script>

<template>
  <Primitive
    :as="as"
    :data-orientation="orientation"
    :class="pohon({ orientation, class: [pohonProp?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
