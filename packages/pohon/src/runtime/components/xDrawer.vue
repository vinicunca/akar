<script lang="ts">
import type { DrawerRootProps, DrawerRootEmits } from 'vaul-vue'
import type { DialogContentProps, DialogContentEmits } from 'akar'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/drawer'
import type { EmitsToProps } from '../types/utils'
import type { ComponentConfig } from '../types/uv'

type Drawer = ComponentConfig<typeof theme, AppConfig, 'drawer'>

export interface DrawerProps extends Pick<DrawerRootProps, 'activeSnapPoint' | 'closeThreshold' | 'shouldScaleBackground' | 'setBackgroundColorOnScale' | 'scrollLockTimeout' | 'fixed' | 'dismissible' | 'modal' | 'open' | 'defaultOpen' | 'nested' | 'direction' | 'noBodyStyles' | 'handleOnly' | 'preventScrollRestoration' | 'snapPoints'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  title?: string
  description?: string
  /**
   * Whether to inset the drawer from the edges.
   * @defaultValue false
   */
  inset?: boolean
  /** The content of the drawer. */
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>
  /**
   * Render an overlay behind the drawer.
   * @defaultValue true
   */
  overlay?: boolean
  /**
   * Render a handle on the drawer.
   * @defaultValue true
   */
  handle?: boolean
  /**
   * Render the drawer in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement
  /**
   * Whether the drawer is nested in another drawer.
   * @defaultValue false
   */
  nested?: boolean
  class?: any
  pohon?: Drawer['slots']
}

export interface DrawerEmits extends DrawerRootEmits {}

export interface DrawerSlots {
  default(props?: object): any
  content(props?: object): any
  header(props?: object): any
  title(props?: object): any
  description(props?: object): any
  body(props?: object): any
  footer(props?: object): any
}
</script>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { VisuallyHidden, useForwardPropsEmits } from 'akar'
import { DrawerRoot, DrawerRootNested, DrawerTrigger, DrawerPortal, DrawerOverlay, DrawerContent, DrawerTitle, DrawerDescription, DrawerHandle } from 'vaul-vue'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { usePortal } from '../composables/usePortal'
import { uv } from '../utils/uv'

const props = withDefaults(defineProps<DrawerProps>(), {
  direction: 'bottom',
  portal: true,
  overlay: true,
  handle: true,
  modal: true,
  dismissible: true
})
const emits = defineEmits<DrawerEmits>()
const slots = defineSlots<DrawerSlots>()

const appConfig = useAppConfig() as Drawer['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'activeSnapPoint', 'closeThreshold', 'shouldScaleBackground', 'setBackgroundColorOnScale', 'scrollLockTimeout', 'fixed', 'dismissible', 'modal', 'open', 'defaultOpen', 'nested', 'direction', 'noBodyStyles', 'handleOnly', 'preventScrollRestoration', 'snapPoints'), emits)
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = toRef(() => props.content)
const contentEvents = {
  closeAutoFocus: (e: Event) => e.preventDefault()
}

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.drawer || {}) })({
  direction: props.direction,
  inset: props.inset
}))
</script>

<template>
  <component :is="nested ? DrawerRootNested : DrawerRoot" v-bind="rootProps">
    <DrawerTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot />
    </DrawerTrigger>

    <DrawerPortal v-bind="portalProps">
      <DrawerOverlay v-if="overlay" :class="pohon.overlay({ class: props.pohon?.overlay })" />

      <DrawerContent :class="pohon.content({ class: [!slots.default && props.class, props.pohon?.content] })" v-bind="contentProps" v-on="contentEvents">
        <DrawerHandle v-if="handle" :class="pohon.handle({ class: props.pohon?.handle })" />

        <VisuallyHidden v-if="!!slots.content && ((title || !!slots.title) || (description || !!slots.description))">
          <DrawerTitle v-if="title || !!slots.title">
            <slot name="title">
              {{ title }}
            </slot>
          </DrawerTitle>

          <DrawerDescription v-if="description || !!slots.description">
            <slot name="description">
              {{ description }}
            </slot>
          </DrawerDescription>
        </VisuallyHidden>

        <slot name="content">
          <div :class="pohon.container({ class: props.pohon?.container })">
            <div v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description)" :class="pohon.header({ class: props.pohon?.header })">
              <slot name="header">
                <DrawerTitle v-if="title || !!slots.title" :class="pohon.title({ class: props.pohon?.title })">
                  <slot name="title">
                    {{ title }}
                  </slot>
                </DrawerTitle>

                <DrawerDescription v-if="description || !!slots.description" :class="pohon.description({ class: props.pohon?.description })">
                  <slot name="description">
                    {{ description }}
                  </slot>
                </DrawerDescription>
              </slot>
            </div>

            <div v-if="!!slots.body" :class="pohon.body({ class: props.pohon?.body })">
              <slot name="body" />
            </div>

            <div v-if="!!slots.footer" :class="pohon.footer({ class: props.pohon?.footer })">
              <slot name="footer" />
            </div>
          </div>
        </slot>
      </DrawerContent>
    </DrawerPortal>
  </component>
</template>
