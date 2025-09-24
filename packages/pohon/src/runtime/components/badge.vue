<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { APrimitiveProps } from 'akar';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { AvatarProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/badge';

type Badge = ComponentConfig<typeof theme, AppConfig, 'badge'>;

export interface BadgeProps extends Omit<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: APrimitiveProps['as'];
  label?: string | number;
  /**
   * @defaultValue 'primary'
   */
  color?: Badge['variants']['color'];
  /**
   * @defaultValue 'solid'
   */
  variant?: Badge['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Badge['variants']['size'];
  /** Render the badge with equal padding on all sides. */
  square?: boolean;
  class?: any;
  pohon?: Badge['slots'];
}

export interface BadgeSlots {
  leading: (props?: object) => any;
  default: (props?: object) => any;
  trailing: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { isNonNullish } from '@vinicunca/perkakas';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useFieldGroup } from '../composables/use-field-group';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';

const props = withDefaults(
  defineProps<BadgeProps>(),
  {
    as: 'span',
  },
);
const slots = defineSlots<BadgeSlots>();

const appConfig = useAppConfig() as Badge['AppConfig'];
const { orientation, size: fieldGroupSize } = useFieldGroup<BadgeProps>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.badge || {}),
  })({
    color: props.color,
    variant: props.variant,
    size: fieldGroupSize.value || props.size,
    square: props.square || (!slots.default && !props.label),
    fieldGroup: orientation.value,
  }),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.base({ class: [props.pohon?.base, props.class] })"
  >
    <slot name="leading">
      <PIcon
        v-if="isLeading && leadingIconName"
        :name="leadingIconName"
        :class="pohon.leadingIcon({ class: props.pohon?.leadingIcon })"
      />
      <PAvatar
        v-else-if="!!avatar"
        :size="((props.pohon?.leadingAvatarSize || pohon.leadingAvatarSize()) as AvatarProps['size'])"
        v-bind="avatar"
        :class="pohon.leadingAvatar({ class: props.pohon?.leadingAvatar })"
      />
    </slot>

    <slot>
      <span
        v-if="isNonNullish(label)"
        :class="pohon.label({ class: props.pohon?.label })"
      >
        {{ label }}
      </span>
    </slot>

    <slot name="trailing">
      <PIcon
        v-if="isTrailing && trailingIconName"
        :name="trailingIconName"
        :class="pohon.trailingIcon({ class: props.pohon?.trailingIcon })"
      />
    </slot>
  </APrimitive>
</template>
