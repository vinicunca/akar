<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  ADialogContentEmits,
  ADialogContentProps,
  ADrawerRootEmits,
  ADrawerRootProps,
} from 'akar';
import type { EmitsToProps } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/drawer';

type Drawer = ComponentConfig<typeof theme, AppConfig, 'drawer'>;

export interface PDrawerProps extends Pick<ADrawerRootProps, 'activeSnapPoint' | 'closeThreshold' | 'shouldScaleBackground' | 'setBackgroundColorOnScale' | 'scrollLockTimeout' | 'fixed' | 'dismissible' | 'modal' | 'open' | 'defaultOpen' | 'nested' | 'direction' | 'noBodyStyles' | 'handleOnly' | 'preventScrollRestoration' | 'snapPoints'> {
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
  content?: Omit<ADialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ADialogContentEmits>>;
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

export interface PDrawerEmits extends ADrawerRootEmits {
  (event: 'close:prevent'): void;
}

export interface PDrawerSlots {
  default: (props?: object) => any;
  content: (props?: object) => any;
  header: (props?: object) => any;
  title: (props?: object) => any;
  description: (props?: object) => any;
  body: (props?: object) => any;
  footer: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import {
  ADrawerContent,
  ADrawerDescription,
  ADrawerHandle,
  ADrawerOverlay,
  ADrawerPortal,
  ADrawerRoot,
  ADrawerRootNested,
  ADrawerTitle,
  ADrawerTrigger,
  AVisuallyHidden,
  useForwardPropsEmits,
} from 'akar';
import { computed, toRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { usePortal } from '../composables/use-portal';
import { pointerDownOutside } from '../utils/overlay';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PDrawerProps>(),
  {
    direction: 'bottom',
    portal: true,
    overlay: true,
    handle: true,
    modal: true,
    dismissible: true,
  },
);
const emits = defineEmits<PDrawerEmits>();
const slots = defineSlots<PDrawerSlots>();

const appConfig = useAppConfig() as Drawer['AppConfig'];
const pohonProp = useComponentPohon('drawer', props);

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'activeSnapPoint',
    'closeThreshold',
    'shouldScaleBackground',
    'setBackgroundColorOnScale',
    'scrollLockTimeout',
    'fixed',
    'dismissible',
    'modal',
    'open',
    'defaultOpen',
    'nested',
    'direction',
    'noBodyStyles',
    'handleOnly',
    'preventScrollRestoration',
    'snapPoints',
  ),
  emits,
);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => props.content);
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ['pointerDownOutside', 'interactOutside', 'escapeKeyDown'];

    return events.reduce(
      (acc, curr) => {
        acc[curr] = (event: Event) => {
          event.preventDefault();
          emits('close:prevent');
        };

        return acc;
      },
      {} as Record<typeof events[number], (event: Event) => void>,
    );
  }

  return {
    pointerDownOutside,
  };
});

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.drawer || {}),
  })({
    direction: props.direction,
    inset: props.inset,
    snapPoints: props.snapPoints && props.snapPoints.length > 0,
  }),
);
</script>

<template>
  <component
    :is="nested ? ADrawerRootNested : ADrawerRoot"
    v-bind="rootProps"
  >
    <ADrawerTrigger
      v-if="!!slots.default"
      as-child
      :class="props.class"
    >
      <slot />
    </ADrawerTrigger>

    <ADrawerPortal v-bind="portalProps">
      <ADrawerOverlay
        v-if="overlay"
        :class="pohon.overlay({ class: pohonProp?.overlay })"
        data-pohon="drawer-overlay"
      />

      <ADrawerContent
        :class="pohon.content({ class: [!slots.default && props.class, pohonProp?.content] })"
        v-bind="contentProps"
        data-pohon="drawer-content"
        v-on="contentEvents"
      >
        <ADrawerHandle
          v-if="handle"
          :class="pohon.handle({ class: pohonProp?.handle })"
          data-pohon="drawer-handle"
        />

        <AVisuallyHidden v-if="!!slots.content && ((title || !!slots.title) || (description || !!slots.description))">
          <ADrawerTitle v-if="title || !!slots.title">
            <slot name="title">
              {{ title }}
            </slot>
          </ADrawerTitle>

          <ADrawerDescription v-if="description || !!slots.description">
            <slot name="description">
              {{ description }}
            </slot>
          </ADrawerDescription>
        </AVisuallyHidden>

        <slot name="content">
          <div
            :class="pohon.container({ class: pohonProp?.container })"
            data-pohon="drawer-container"
          >
            <div
              v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description)"
              :class="pohon.header({ class: pohonProp?.header })"
              data-pohon="drawer-header"
            >
              <slot name="header">
                <ADrawerTitle
                  v-if="title || !!slots.title"
                  :class="pohon.title({ class: pohonProp?.title })"
                  data-pohon="drawer-title"
                >
                  <slot name="title">
                    {{ title }}
                  </slot>
                </ADrawerTitle>

                <ADrawerDescription
                  v-if="description || !!slots.description"
                  :class="pohon.description({ class: pohonProp?.description })"
                  data-pohon="drawer-description"
                >
                  <slot name="description">
                    {{ description }}
                  </slot>
                </ADrawerDescription>
              </slot>
            </div>

            <div
              v-if="!!slots.body"
              :class="pohon.body({ class: pohonProp?.body })"
              data-pohon="drawer-body"
            >
              <slot name="body" />
            </div>

            <div
              v-if="!!slots.footer"
              :class="pohon.footer({ class: pohonProp?.footer })"
              data-pohon="drawer-footer"
            >
              <slot name="footer" />
            </div>
          </div>
        </slot>
      </ADrawerContent>
    </ADrawerPortal>
  </component>
</template>
