<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { APrimitiveProps } from 'akar';
import type { KbdKey } from '../composables/use-kbd';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/kbd';

type Kbd = ComponentConfig<typeof theme, AppConfig, 'kbd'>;

export interface PKbdProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'kbd'
   */
  as?: APrimitiveProps['as'];
  value?: KbdKey | string;
  /**
   * @defaultValue 'neutral'
   */
  color?: Kbd['variants']['color'];
  /**
   * @defaultValue 'outline'
   */
  variant?: Kbd['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Kbd['variants']['size'];
  class?: any;
}

export interface PKbdSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useKbd } from '../composables/use-kbd';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PKbdProps>(),
  {
    as: 'kbd',
  },
);
defineSlots<PKbdSlots>();

const { getKbdKey } = useKbd();
const appConfig = useAppConfig() as Kbd['AppConfig'];

const pohon = computed(() =>
  uv({ extend: uv(theme), ...(appConfig.pohon?.kbd || {}) }),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon({
      class: props.class,
      color: props.color,
      variant: props.variant,
      size: props.size,
    })"
  >
    <slot>
      {{ getKbdKey(value) }}
    </slot>
  </APrimitive>
</template>
