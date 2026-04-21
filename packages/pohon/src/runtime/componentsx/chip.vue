<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/chip';

type Chip = ComponentConfig<typeof theme, AppConfig, 'chip'>;

export interface ChipProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /** Display some text inside the chip. */
  text?: string | number;
  /**
   * @defaultValue 'primary'
   */
  color?: Chip['variants']['color'];
  /**
   * @defaultValue 'md'
   */
  size?: Chip['variants']['size'];
  /**
   * The position of the chip.
   * @defaultValue 'top-right'
   */
  position?: Chip['variants']['position'];
  /** When `true`, keep the chip inside the component for rounded elements. */
  inset?: boolean;
  /** When `true`, render the chip relatively to the parent. */
  standalone?: boolean;
  class?: any;
  pohon?: Chip['slots'];
}

export interface ChipEmits {
  'update:show': [value: boolean];
}

export interface ChipSlots {
  default?: (props?: {}) => Array<VNode>;
  content?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive, Slot } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useAvatarGroup } from '../composables/useAvatarGroup';
import { uv } from '../utils/uv';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ChipProps>(), {
  inset: false,
  standalone: false,
});
defineSlots<ChipSlots>();

const show = defineModel<boolean>('show', { default: true });

const { size } = useAvatarGroup(props);
const appConfig = useAppConfig() as Chip['AppConfig'];
const pohonProp = useComponentPohon('chip', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.chip || {}) })({
  color: props.color,
  size: size.value,
  position: props.position,
  inset: props.inset,
  standalone: props.standalone,
}));
</script>

<template>
  <Primitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <Slot v-bind="$attrs">
      <slot />
    </Slot>

    <span
      v-if="show"
      data-slot="base"
      :class="pohon.base({ class: pohonProp?.base })"
    >
      <slot name="content">
        {{ text }}
      </slot>
    </span>
  </Primitive>
</template>
