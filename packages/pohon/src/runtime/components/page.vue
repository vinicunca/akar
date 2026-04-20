<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/page'
import type { ComponentConfig } from '../types/tv'

type Page = ComponentConfig<typeof theme, AppConfig, 'page'>

export interface PageProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  pohon?: Page['slots']
}

export interface PageSlots {
  left?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
  right?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed, onBeforeUpdate, shallowRef } from 'vue'
import { Primitive, Slot } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { tv } from '../utils/tv'

const props = defineProps<PageProps>()
const slots = defineSlots<PageSlots>()

const appConfig = useAppConfig() as Page['AppConfig']
const pohonProp = useComponentPohon('page', props)

const hasLeft = shallowRef(!!slots.left)
const hasRight = shallowRef(!!slots.right)

onBeforeUpdate(() => {
  hasLeft.value = !!slots.left
  hasRight.value = !!slots.right
})

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.page || {}) })({
  left: hasLeft.value,
  right: hasRight.value
}))
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="ui.root({ class: [pohonProp?.root, props.class] })">
    <Slot v-if="!!slots.left" data-slot="left" :class="ui.left({ class: pohonProp?.left })">
      <slot name="left" />
    </Slot>

    <div data-slot="center" :class="ui.center({ class: pohonProp?.center })">
      <slot />
    </div>

    <Slot v-if="!!slots.right" data-slot="right" :class="ui.right({ class: pohonProp?.right })">
      <slot name="right" />
    </Slot>
  </Primitive>
</template>
