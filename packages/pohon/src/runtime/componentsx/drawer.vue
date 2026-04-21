<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { DialogContentEmits, DialogContentProps } from 'akar';
import type { DrawerRootEmits, DrawerRootProps } from 'vaul-vue';
import type { VNode } from 'vue';
import type { EmitsToProps } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/drawer';

type Drawer = ComponentConfig<typeof theme, AppConfig, 'drawer'>;

export interface DrawerProps extends Pick<DrawerRootProps, 'activeSnapPoint' | 'closeThreshold' | 'shouldScaleBackground' | 'setBackgroundColorOnScale' | 'scrollLockTimeout' | 'fixed' | 'dismissible' | 'modal' | 'open' | 'defaultOpen' | 'nested' | 'direction' | 'noBodyStyles' | 'handleOnly' | 'preventScrollRestoration' | 'snapPoints'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  title?: string;
  description?: string;
  /**
   * Whether to inset the drawer from the edges.
   * @defaultValue false
   */
  inset?: boolean;
  /** The content of the drawer. */
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>;
  /**
   * Render an overlay behind the drawer.
   * @defaultValue true
   */
  overlay?: boolean;
  /**
   * Render a handle on the drawer.
   * @defaultValue true
   */
  handle?: boolean;
  /**
   * Render the drawer in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
  /**
   * Whether the drawer is nested in another drawer.
   * @defaultValue false
   */
  nested?: boolean;
  class?: any;
  pohon?: Drawer['slots'];
}

export interface DrawerEmits extends DrawerRootEmits {
  (e: 'close:prevent'): void;
}

export interface DrawerSlots {
  default?: (props?: {}) => Array<VNode>;
  content?: (props?: {}) => Array<VNode>;
  header?: (props?: {}) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  body?: (props?: {}) => Array<VNode>;
  footer?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { useForwardPropsEmits, VisuallyHidden } from 'akar';
import { DrawerContent, DrawerDescription, DrawerHandle, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerRootNested, DrawerTitle, DrawerTrigger } from 'vaul-vue';
import { computed, toRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { FieldGroupReset } from '../composables/useFieldGroup';
import { usePortal } from '../composables/usePortal';
import { pointerDownOutside } from '../utils/overlay';
import { uv } from '../utils/uv';

const props = withDefaults(defineProps<DrawerProps>(), {
  direction: 'bottom',
  portal: true,
  overlay: true,
  handle: true,
  modal: true,
  dismissible: true,
});
const emits = defineEmits<DrawerEmits>();
const slots = defineSlots<DrawerSlots>();

const appConfig = useAppConfig() as Drawer['AppConfig'];
const pohonProp = useComponentPohon('drawer', props);

const rootProps = useForwardPropsEmits(reactivePick(props, 'activeSnapPoint', 'closeThreshold', 'shouldScaleBackground', 'setBackgroundColorOnScale', 'scrollLockTimeout', 'fixed', 'dismissible', 'modal', 'open', 'defaultOpen', 'nested', 'direction', 'noBodyStyles', 'handleOnly', 'preventScrollRestoration', 'snapPoints'), emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => props.content);
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ['interactOutside', 'escapeKeyDown'];

    return events.reduce((acc, curr) => {
      acc[curr] = (e: Event) => {
        e.preventDefault();
        emits('close:prevent');
      };
      return acc;
    }, {} as Record<typeof events[number], (e: Event) => void>);
  }

  return {
    pointerDownOutside,
  };
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.drawer || {}) })({
  direction: props.direction,
  inset: props.inset,
  snapPoints: props.snapPoints && props.snapPoints.length > 0,
}));
</script>

<template>
  <component
    :is="nested ? DrawerRootNested : DrawerRoot"
    v-bind="rootProps"
  >
    <DrawerTrigger
      v-if="!!slots.default"
      as-child
      :class="props.class"
    >
      <slot />
    </DrawerTrigger>

    <DrawerPortal v-bind="portalProps">
      <FieldGroupReset>
        <DrawerOverlay
          v-if="overlay"
          data-slot="overlay"
          :class="pohon.overlay({ class: pohonProp?.overlay })"
        />

        <DrawerContent
          data-slot="content"
          :class="pohon.content({ class: [!slots.default && props.class, pohonProp?.content] })"
          v-bind="contentProps"
          v-on="contentEvents"
        >
          <DrawerHandle
            v-if="handle"
            data-slot="handle"
            :class="pohon.handle({ class: pohonProp?.handle })"
          />

          <VisuallyHidden v-if="(!title && !slots.title) || (!description && !slots.description) || !!slots.content">
            <DrawerTitle v-if="!title && !slots.title" />
            <DrawerTitle v-else-if="!!slots.content">
              <slot name="title">
                {{ title }}
              </slot>
            </DrawerTitle>

            <DrawerDescription v-if="!description && !slots.description" />
            <DrawerDescription v-else-if="!!slots.content">
              <slot name="description">
                {{ description }}
              </slot>
            </DrawerDescription>
          </VisuallyHidden>

          <slot name="content">
            <div
              data-slot="container"
              :class="pohon.container({ class: pohonProp?.container })"
            >
              <div
                v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description)"
                data-slot="header"
                :class="pohon.header({ class: pohonProp?.header })"
              >
                <slot name="header">
                  <DrawerTitle
                    v-if="title || !!slots.title"
                    data-slot="title"
                    :class="pohon.title({ class: pohonProp?.title })"
                  >
                    <slot name="title">
                      {{ title }}
                    </slot>
                  </DrawerTitle>

                  <DrawerDescription
                    v-if="description || !!slots.description"
                    data-slot="description"
                    :class="pohon.description({ class: pohonProp?.description })"
                  >
                    <slot name="description">
                      {{ description }}
                    </slot>
                  </DrawerDescription>
                </slot>
              </div>

              <div
                v-if="!!slots.body"
                data-slot="body"
                :class="pohon.body({ class: pohonProp?.body })"
              >
                <slot name="body" />
              </div>

              <div
                v-if="!!slots.footer"
                data-slot="footer"
                :class="pohon.footer({ class: pohonProp?.footer })"
              >
                <slot name="footer" />
              </div>
            </div>
          </slot>
        </DrawerContent>
      </FieldGroupReset>
    </DrawerPortal>
  </component>
</template>
