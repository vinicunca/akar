<script lang="ts">
import type { SeparatorProps as _SeparatorProps } from 'akar'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/separator'
import type { AvatarProps, IconProps } from '../types'
import type { ComponentConfig } from '../types/uv'

type Separator = ComponentConfig<typeof theme, AppConfig, 'separator'>

export interface SeparatorProps extends Pick<_SeparatorProps, 'decorative'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /** Display a label in the middle. */
  label?: string
  /**
   * Display an icon in the middle.
   * @IconifyIcon
   */
  icon?: IconProps['name']
  /** Display an avatar in the middle. */
  avatar?: AvatarProps
  /**
   * @defaultValue 'neutral'
   */
  color?: Separator['variants']['color']
  /**
   * @defaultValue 'xs'
   */
  size?: Separator['variants']['size']
  /**
   * @defaultValue 'solid'
   */
  type?: Separator['variants']['type']
  /**
   * The orientation of the separator.
   * @defaultValue 'horizontal'
   */
  orientation?: _SeparatorProps['orientation']
  class?: any
  pohon?: Separator['slots']
}

export interface SeparatorSlots {
  default(props?: object): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Separator, useForwardProps } from 'akar'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { uv } from '../utils/uv'
import PIcon from './icon.vue'
import PAvatar from './avatar.vue'

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal'
})
const slots = defineSlots<SeparatorSlots>()

const appConfig = useAppConfig() as Separator['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'as', 'decorative', 'orientation'))

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.separator || {}) })({
  color: props.color,
  orientation: props.orientation,
  size: props.size,
  type: props.type
}))
</script>

<template>
  <Separator v-bind="rootProps" :class="pohon.root({ class: [props.pohon?.root, props.class] })">
    <div :class="pohon.border({ class: props.pohon?.border })" />

    <template v-if="label || icon || avatar || !!slots.default">
      <div :class="pohon.container({ class: props.pohon?.container })">
        <slot>
          <span v-if="label" :class="pohon.label({ class: props.pohon?.label })">{{ label }}</span>
          <PIcon v-else-if="icon" :name="icon" :class="pohon.icon({ class: props.pohon?.icon })" />
          <PAvatar v-else-if="avatar" :size="((props.pohon?.avatarSize || pohon.avatarSize()) as AvatarProps['size'])" v-bind="avatar" :class="pohon.avatar({ class: props.pohon?.avatar })" />
        </slot>
      </div>

      <div :class="pohon.border({ class: props.pohon?.border })" />
    </template>
  </Separator>
</template>
