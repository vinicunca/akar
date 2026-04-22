<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  ADialogContentEmits,
  ADialogContentProps,
  ADialogRootEmits,
  ADialogRootProps,
  PointerDownOutsideEvent,
} from 'akar';
import type { VNode } from 'vue';
import type { PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { EmitsToProps } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dialog';

type Dialog = ComponentConfig<typeof theme, AppConfig, 'dialog'>;

export interface PDialogProps extends ADialogRootProps {
  title?: string;
  description?: string;
  /** The content of the dialog. */
  content?: Omit<ADialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ADialogContentEmits>>;
  /**
   * Render an overlay behind the dialog.
   * @defaultValue true
   */
  overlay?: boolean;
  /**
   * When `true`, enables scrollable overlay mode where content scrolls within the overlay.
   * @defaultValue false
   */
  scrollable?: boolean;
  /**
   * Animate the dialog when opening or closing.
   * @defaultValue true
   */
  transition?: boolean;
  /**
   * When `true`, the dialog will take up the full screen.
   * @defaultValue false
   */
  fullscreen?: boolean;
  /**
   * Render the dialog in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
  /**
   * Display a close button to dismiss the dialog.
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @defaultValue true
   */
  close?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  closeIcon?: PIconProps['name'];
  /**
   * When `false`, the dialog will not close when clicking outside or pressing escape.
   * @defaultValue true
   */
  dismissible?: boolean;
  class?: any;
  pohon?: Dialog['slots'];
}

export interface PDialogEmits extends ADialogRootEmits {
  'after:leave': [];
  'after:enter': [];
  'close:prevent': [];
}

export interface PDialogSlots {
  default?: (props: { open: boolean }) => Array<VNode>;
  content?: (props: { close: () => void }) => Array<VNode>;
  header?: (props: { close: () => void }) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  actions?: (props?: {}) => Array<VNode>;
  close?: (props: { pohon: Dialog['pohon'] }) => Array<VNode>;
  body?: (props: { close: () => void }) => Array<VNode>;
  footer?: (props: { close: () => void }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import {
  ADialogClose,
  ADialogContent,
  ADialogDescription,
  ADialogOverlay,
  ADialogPortal,
  ADialogRoot,
  ADialogTitle,
  ADialogTrigger,
  AVisuallyHidden,
  useForwardPropsEmits,
} from 'akar';
import { computed, toRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { FieldGroupReset } from '../composables/use-field-group';
import { useLocale } from '../composables/use-locale';
import { usePortal } from '../composables/use-portal';
import { pointerDownOutside } from '../utils/overlay';
import { uv } from '../utils/uv';
import PButton from './button.vue';

const props = withDefaults(
  defineProps<PDialogProps>(),
  {
    close: true,
    portal: true,
    overlay: true,
    transition: true,
    modal: true,
    dismissible: true,
  },
);
const emits = defineEmits<PDialogEmits>();
const slots = defineSlots<PDialogSlots>();

const { t } = useLocale();
const appConfig = useAppConfig() as Dialog['AppConfig'];
const pohonProp = useComponentPohon('dialog', props);

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'open', 'defaultOpen', 'modal'),
  emits,
);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => props.content);
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ['interactOutside', 'escapeKeyDown'];

    return events.reduce((acc, curr) => {
      acc[curr] = (event: Event) => {
        event.preventDefault();
        emits('close:prevent');
      };
      return acc;
    }, {} as Record<typeof events[number], (event: Event) => void>);
  }

  return {
    pointerDownOutside: (event: PointerDownOutsideEvent) => pointerDownOutside(event, { scrollable: props.scrollable }),
  };
});

const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.dialog || {}) })({
  transition: props.transition,
  fullscreen: props.fullscreen,
  overlay: props.overlay,
  scrollable: props.scrollable,
} as any));
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <ADialogRoot
    v-slot="{ open, close }"
    v-bind="rootProps"
  >
    <DefineContentTemplate>
      <ADialogContent
        data-slot="content"
        :class="pohon.content({ class: [!slots.default && props.class, pohonProp?.content] })"
        v-bind="contentProps"
        @after-enter="emits('after:enter')"
        @after-leave="emits('after:leave')"
        v-on="contentEvents"
      >
        <AVisuallyHidden v-if="(!title && !slots.title) || (!description && !slots.description) || !!slots.content">
          <ADialogTitle v-if="!title && !slots.title" />
          <ADialogTitle v-else-if="!!slots.content">
            <slot name="title">
              {{ title }}
            </slot>
          </ADialogTitle>

          <ADialogDescription v-if="!description && !slots.description" />
          <ADialogDescription v-else-if="!!slots.content">
            <slot name="description">
              {{ description }}
            </slot>
          </ADialogDescription>
        </AVisuallyHidden>

        <slot
          name="content"
          :close="close"
        >
          <div
            v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description) || (props.close || !!slots.close)"
            data-slot="header"
            :class="pohon.header({ class: pohonProp?.header })"
          >
            <slot
              name="header"
              :close="close"
            >
              <div
                data-slot="wrapper"
                :class="pohon.wrapper({ class: pohonProp?.wrapper })"
              >
                <ADialogTitle
                  v-if="title || !!slots.title"
                  data-slot="title"
                  :class="pohon.title({ class: pohonProp?.title })"
                >
                  <slot name="title">
                    {{ title }}
                  </slot>
                </ADialogTitle>

                <ADialogDescription
                  v-if="description || !!slots.description"
                  data-slot="description"
                  :class="pohon.description({ class: pohonProp?.description })"
                >
                  <slot name="description">
                    {{ description }}
                  </slot>
                </ADialogDescription>
              </div>

              <slot name="actions" />

              <ADialogClose
                v-if="props.close || !!slots.close"
                as-child
              >
                <slot
                  name="close"
                  :pohon="pohon"
                >
                  <PButton
                    v-if="props.close"
                    :icon="closeIcon || appConfig.pohon.icons.close"
                    color="neutral"
                    variant="ghost"
                    :aria-label="t('modal.close')"
                    v-bind="(typeof props.close === 'object' ? props.close : {})"
                    data-slot="close"
                    :class="pohon.close({ class: pohonProp?.close })"
                  />
                </slot>
              </ADialogClose>
            </slot>
          </div>

          <div
            v-if="!!slots.body"
            data-slot="body"
            :class="pohon.body({ class: pohonProp?.body })"
          >
            <slot
              name="body"
              :close="close"
            />
          </div>

          <div
            v-if="!!slots.footer"
            data-slot="footer"
            :class="pohon.footer({ class: pohonProp?.footer })"
          >
            <slot
              name="footer"
              :close="close"
            />
          </div>
        </slot>
      </ADialogContent>
    </DefineContentTemplate>

    <ADialogTrigger
      v-if="!!slots.default"
      as-child
      :class="props.class"
    >
      <slot :open="open" />
    </ADialogTrigger>

    <ADialogPortal v-bind="portalProps">
      <FieldGroupReset>
        <template v-if="scrollable">
          <ADialogOverlay
            data-slot="overlay"
            :class="pohon.overlay({ class: pohonProp?.overlay })"
          >
            <ReuseContentTemplate />
          </ADialogOverlay>
        </template>

        <template v-else>
          <ADialogOverlay
            v-if="overlay"
            data-slot="overlay"
            :class="pohon.overlay({ class: pohonProp?.overlay })"
          />

          <ReuseContentTemplate />
        </template>
      </FieldGroupReset>
    </ADialogPortal>
  </ADialogRoot>
</template>
