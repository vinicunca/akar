<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/chip';

type Chip = ComponentConfig<typeof theme, AppConfig, 'chip'>;

export interface PChipProps {
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

export interface PChipEmits {
  'update:show': [value: boolean];
}

export interface PChipSlots {
  default: (props?: object) => any;
  content: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive, APrimitiveSlot } from 'akar';
import { computed } from 'vue';
import { useAvatarGroup } from '../composables/use-avatar-group';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PChipProps>(),
  {
    inset: false,
    standalone: false,
  },
);

defineSlots<PChipSlots>();

const show = defineModel<boolean>('show', { default: true });

const { size } = useAvatarGroup(props);
const appConfig = useAppConfig() as Chip['AppConfig'];
const pohonProp = useComponentPohon('chip', props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.chip || {}),
  })({
    color: props.color,
    size: size.value,
    position: props.position,
    inset: props.inset,
    standalone: props.standalone,
  }),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="chip-root"
  >
    <APrimitiveSlot v-bind="$attrs">
      <slot />
    </APrimitiveSlot>

    <span
      v-if="show"
      :class="pohon.base({ class: pohonProp?.base })"
      data-pohon="chip-base"
    >
      <slot name="content">
        {{ text }}
      </slot>
    </span>
  </APrimitive>
</template>
