<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/field-group';

type FieldGroup = ComponentConfig<typeof theme, AppConfig, 'fieldGroup'>;

export interface PFieldGroupProps {
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

export interface PFieldGroupSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed, provide } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { fieldGroupInjectionKey } from '../composables/use-field-group';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PFieldGroupProps>(),
  {
    orientation: 'horizontal',
  },
);
defineSlots<PFieldGroupSlots>();

const appConfig = useAppConfig() as FieldGroup['AppConfig'];
const pohonProp = useComponentPohon('fieldGroup', props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.fieldGroup || {}),
  }),
);

provide(fieldGroupInjectionKey, computed(() => ({
  orientation: props.orientation,
  size: props.size,
})));
</script>

<template>
  <APrimitive
    :as="as"
    :data-orientation="orientation"
    :class="pohon({ orientation, class: [pohonProp.base, props.class] })"
  >
    <slot />
  </APrimitive>
</template>
