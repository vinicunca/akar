<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ASeparatorProps } from 'akar';
import type { VNode } from 'vue';
import type { PAvatarProps, PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/separator';

type Separator = ComponentConfig<typeof theme, AppConfig, 'separator'>;

export interface PSeparatorProps extends Pick<ASeparatorProps, 'decorative'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /** Display a label in the middle. */
  label?: string;
  /**
   * Display an icon in the middle.
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /** Display an avatar in the middle. */
  avatar?: PAvatarProps;
  /**
   * @defaultValue 'neutral'
   */
  color?: Separator['variants']['color'];
  /**
   * @defaultValue 'xs'
   */
  size?: Separator['variants']['size'];
  /**
   * @defaultValue 'solid'
   */
  type?: Separator['variants']['type'];
  /**
   * The orientation of the separator.
   * @defaultValue 'horizontal'
   */
  orientation?: Separator['variants']['orientation'];
  class?: any;
  pohon?: Separator['slots'];
}

export interface PSeparatorSlots {
  default?: (props: { pohon: Separator['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { ASeparator, useForwardProps } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';

const props = withDefaults(
  defineProps<PSeparatorProps>(),
  {
    orientation: 'horizontal',
  },
);
const slots = defineSlots<PSeparatorSlots>();

const appConfig = useAppConfig() as Separator['AppConfig'];
const pohonProp = useComponentPohon('separator', props);

const rootProps = useForwardProps(reactivePick(props, 'as', 'decorative', 'orientation'));

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.separator || {}) })({
  color: props.color,
  orientation: props.orientation,
  size: props.size,
  type: props.type,
}));
</script>

<template>
  <ASeparator
    v-bind="rootProps"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      data-slot="border"
      :class="pohon.border({ class: pohonProp?.border })"
    />

    <template v-if="label || icon || avatar || !!slots.default">
      <div
        data-slot="container"
        :class="pohon.container({ class: pohonProp?.container })"
      >
        <slot :pohon="pohon">
          <span
            v-if="label"
            data-slot="label"
            :class="pohon.label({ class: pohonProp?.label })"
          >{{ label }}</span>
          <PIcon
            v-else-if="icon"
            :name="icon"
            data-slot="icon"
            :class="pohon.icon({ class: pohonProp?.icon })"
          />
          <PAvatar
            v-else-if="avatar"
            :size="((pohonProp?.avatarSize || pohon.avatarSize()) as PAvatarProps['size'])"
            v-bind="avatar"
            data-slot="avatar"
            :class="pohon.avatar({ class: pohonProp?.avatar })"
          />
        </slot>
      </div>

      <div
        data-slot="border"
        :class="pohon.border({ class: pohonProp?.border })"
      />
    </template>
  </ASeparator>
</template>
