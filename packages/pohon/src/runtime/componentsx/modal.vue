<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { DialogContentEmits, DialogContentProps, DialogRootEmits, DialogRootProps, PointerDownOutsideEvent } from 'akar';
import type { VNode } from 'vue';
import type { PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { EmitsToProps } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/modal';

type Modal = ComponentConfig<typeof theme, AppConfig, 'modal'>;

export interface ModalProps extends DialogRootProps {
  title?: string;
  description?: string;
  /** The content of the modal. */
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>;
  /**
   * Render an overlay behind the modal.
   * @defaultValue true
   */
  overlay?: boolean;
  /**
   * When `true`, enables scrollable overlay mode where content scrolls within the overlay.
   * @defaultValue false
   */
  scrollable?: boolean;
  /**
   * Animate the modal when opening or closing.
   * @defaultValue true
   */
  transition?: boolean;
  /**
   * When `true`, the modal will take up the full screen.
   * @defaultValue false
   */
  fullscreen?: boolean;
  /**
   * Render the modal in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
  /**
   * Display a close button to dismiss the modal.
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
   * When `false`, the modal will not close when clicking outside or pressing escape.
   * @defaultValue true
   */
  dismissible?: boolean;
  class?: any;
  pohon?: Modal['slots'];
}

export interface ModalEmits extends DialogRootEmits {
  'after:leave': [];
  'after:enter': [];
  'close:prevent': [];
}

export interface ModalSlots {
  default?: (props: { open: boolean }) => Array<VNode>;
  content?: (props: { close: () => void }) => Array<VNode>;
  header?: (props: { close: () => void }) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  actions?: (props?: {}) => Array<VNode>;
  close?: (props: { pohon: Modal['pohon'] }) => Array<VNode>;
  body?: (props: { close: () => void }) => Array<VNode>;
  footer?: (props: { close: () => void }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, useForwardPropsEmits, VisuallyHidden } from 'akar';
import { computed, toRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { FieldGroupReset } from '../composables/useFieldGroup';
import { usePortal } from '../composables/usePortal';
import { pointerDownOutside } from '../utils/overlay';
import { uv } from '../utils/uv';
import PButton from './button.vue';

const props = withDefaults(defineProps<ModalProps>(), {
  close: true,
  portal: true,
  overlay: true,
  transition: true,
  modal: true,
  dismissible: true,
});
const emits = defineEmits<ModalEmits>();
const slots = defineSlots<ModalSlots>();

const { t } = useLocale();
const appConfig = useAppConfig() as Modal['AppConfig'];
const pohonProp = useComponentPohon('modal', props);

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'modal'), emits);
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
    pointerDownOutside: (e: PointerDownOutsideEvent) => pointerDownOutside(e, { scrollable: props.scrollable }),
  };
});

const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.modal || {}) })({
  transition: props.transition,
  fullscreen: props.fullscreen,
  overlay: props.overlay,
  scrollable: props.scrollable,
} as any));
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DialogRoot
    v-slot="{ open, close }"
    v-bind="rootProps"
  >
    <DefineContentTemplate>
      <DialogContent
        data-slot="content"
        :class="pohon.content({ class: [!slots.default && props.class, pohonProp?.content] })"
        v-bind="contentProps"
        @after-enter="emits('after:enter')"
        @after-leave="emits('after:leave')"
        v-on="contentEvents"
      >
        <VisuallyHidden v-if="(!title && !slots.title) || (!description && !slots.description) || !!slots.content">
          <DialogTitle v-if="!title && !slots.title" />
          <DialogTitle v-else-if="!!slots.content">
            <slot name="title">
              {{ title }}
            </slot>
          </DialogTitle>

          <DialogDescription v-if="!description && !slots.description" />
          <DialogDescription v-else-if="!!slots.content">
            <slot name="description">
              {{ description }}
            </slot>
          </DialogDescription>
        </VisuallyHidden>

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
                <DialogTitle
                  v-if="title || !!slots.title"
                  data-slot="title"
                  :class="pohon.title({ class: pohonProp?.title })"
                >
                  <slot name="title">
                    {{ title }}
                  </slot>
                </DialogTitle>

                <DialogDescription
                  v-if="description || !!slots.description"
                  data-slot="description"
                  :class="pohon.description({ class: pohonProp?.description })"
                >
                  <slot name="description">
                    {{ description }}
                  </slot>
                </DialogDescription>
              </div>

              <slot name="actions" />

              <DialogClose
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
              </DialogClose>
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
      </DialogContent>
    </DefineContentTemplate>

    <DialogTrigger
      v-if="!!slots.default"
      as-child
      :class="props.class"
    >
      <slot :open="open" />
    </DialogTrigger>

    <DialogPortal v-bind="portalProps">
      <FieldGroupReset>
        <template v-if="scrollable">
          <DialogOverlay
            data-slot="overlay"
            :class="pohon.overlay({ class: pohonProp?.overlay })"
          >
            <ReuseContentTemplate />
          </DialogOverlay>
        </template>

        <template v-else>
          <DialogOverlay
            v-if="overlay"
            data-slot="overlay"
            :class="pohon.overlay({ class: pohonProp?.overlay })"
          />

          <ReuseContentTemplate />
        </template>
      </FieldGroupReset>
    </DialogPortal>
  </DialogRoot>
</template>
