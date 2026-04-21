<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { UseComponentIconsProps } from '../composables/useComponentIcons';
import type { AvatarProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/badge';

type Badge = ComponentConfig<typeof theme, AppConfig, 'badge'>;

export interface BadgeProps extends Omit<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: any;
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
  leading?: (props: { pohon: Badge['pohon'] }) => Array<VNode>;
  default?: (props: { pohon: Badge['pohon'] }) => Array<VNode>;
  trailing?: (props: { pohon: Badge['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useComponentIcons } from '../composables/useComponentIcons';
import { useFieldGroup } from '../composables/useFieldGroup';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'span',
});
const slots = defineSlots<BadgeSlots>();

const appConfig = useAppConfig() as Badge['AppConfig'];
const pohonProp = useComponentPohon('badge', props);
const { orientation, size: fieldGroupSize } = useFieldGroup<BadgeProps>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.badge || {}) })({
  color: props.color,
  variant: props.variant,
  size: fieldGroupSize.value || props.size,
  square: props.square || (!slots.default && !props.label),
  fieldGroup: orientation.value,
}));
</script>

<template>
  <Primitive
    :as="as"
    data-slot="base"
    :class="pohon.base({ class: [pohonProp?.base, props.class] })"
  >
    <slot
      name="leading"
      :pohon="pohon"
    >
      <PIcon
        v-if="isLeading && leadingIconName"
        :name="leadingIconName"
        data-slot="leadingIcon"
        :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon })"
      />
      <PAvatar
        v-else-if="!!avatar"
        :size="((pohonProp?.leadingAvatarSize || pohon.leadingAvatarSize()) as AvatarProps['size'])"
        v-bind="avatar"
        data-slot="leadingAvatar"
        :class="pohon.leadingAvatar({ class: pohonProp?.leadingAvatar })"
      />
    </slot>

    <slot :pohon="pohon">
      <span
        v-if="label !== undefined && label !== null"
        data-slot="label"
        :class="pohon.label({ class: pohonProp?.label })"
      >
        {{ label }}
      </span>
    </slot>

    <slot
      name="trailing"
      :pohon="pohon"
    >
      <PIcon
        v-if="isTrailing && trailingIconName"
        :name="trailingIconName"
        data-slot="trailingIcon"
        :class="pohon.trailingIcon({ class: pohonProp?.trailingIcon })"
      />
    </slot>
  </Primitive>
</template>
