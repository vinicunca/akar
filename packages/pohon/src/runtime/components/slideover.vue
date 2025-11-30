<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  ADialogContentEmits,
  ADialogContentProps,
  ADialogRootEmits,
  ADialogRootProps,
} from 'akar';
import type { PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { EmitsToProps } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/slideover';

type Slideover = ComponentConfig<typeof theme, AppConfig, 'slideover'>;

export interface PSlideoverProps extends ADialogRootProps {
  title?: string;
  description?: string;
  /** The content of the slideover. */
  content?: Omit<ADialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ADialogContentEmits>>;
  /**
   * Render an overlay behind the slideover.
   * @defaultValue true
   */
  overlay?: boolean;
  /**
   * Animate the slideover when opening or closing.
   * @defaultValue true
   */
  transition?: boolean;
  /**
   * The side of the slideover.
   * @defaultValue 'right'
   */
  side?: Slideover['variants']['side'];
  /**
   * Render the slideover in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
  /**
   * Display a close button to dismiss the slideover.
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
   * When `false`, the slideover will not close when clicking outside or pressing escape.
   * @defaultValue true
   */
  dismissible?: boolean;
  class?: any;
  pohon?: Slideover['slots'];
}

export interface PSlideoverEmits extends ADialogRootEmits {
  'after:leave': [];
  'after:enter': [];
  'close:prevent': [];
}

export interface PSlideoverSlots {
  default: (props: { open: boolean }) => any;
  content: (props: { close: () => void }) => any;
  header: (props: { close: () => void }) => any;
  title: (props?: object) => any;
  description: (props?: object) => any;
  actions: (props?: object) => any;
  close: (props: { pohon: Slideover['pohon'] }) => any;
  body: (props: { close: () => void }) => any;
  footer: (props: { close: () => void }) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
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
import { useLocale } from '../composables/use-locale';
import { usePortal } from '../composables/use-portal';
import { uv } from '../utils/uv';
import PButton from './button.vue';

const props = withDefaults(
  defineProps<PSlideoverProps>(),
  {
    close: true,
    portal: true,
    overlay: true,
    transition: true,
    modal: true,
    dismissible: true,
    side: 'right',
  },
);
const emits = defineEmits<PSlideoverEmits>();
const slots = defineSlots<PSlideoverSlots>();

const { t } = useLocale();
const appConfig = useAppConfig() as Slideover['AppConfig'];

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'open', 'defaultOpen', 'modal'),
  emits,
);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => props.content);
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ['pointerDownOutside', 'interactOutside', 'escapeKeyDown'];

    return events.reduce((acc, curr) => {
      acc[curr] = (event: Event) => {
        event.preventDefault();
        emits('close:prevent');
      };
      return acc;
    }, {} as Record<typeof events[number], (event: Event) => void>);
  }

  return {};
});

const pohon = computed(() =>
  uv({ extend: uv(theme), ...(appConfig.pohon?.slideover || {}) })({
    transition: props.transition,
    side: props.side,
  }),
);
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <ADialogRoot
    v-slot="{ open, close }"
    v-bind="rootProps"
  >
    <ADialogTrigger
      v-if="!!slots.default"
      as-child
      :class="props.class"
    >
      <slot :open="open" />
    </ADialogTrigger>

    <ADialogPortal v-bind="portalProps">
      <ADialogOverlay
        v-if="overlay"
        :class="pohon.overlay({ class: props.pohon?.overlay })"
        data-pohon="slideover-overlay"
      />

      <ADialogContent
        :data-side="side"
        :class="pohon.content({ class: [!slots.default && props.class, props.pohon?.content] })"
        v-bind="contentProps"
        data-pohon="slideover-content"
        @after-enter="emits('after:enter')"
        @after-leave="emits('after:leave')"
        v-on="contentEvents"
      >
        <AVisuallyHidden v-if="!!slots.content && ((title || !!slots.title) || (description || !!slots.description))">
          <ADialogTitle v-if="title || !!slots.title">
            <slot name="title">
              {{ title }}
            </slot>
          </ADialogTitle>

          <ADialogDescription v-if="description || !!slots.description">
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
            :class="pohon.header({ class: props.pohon?.header })"
            data-pohon="slideover-header"
          >
            <slot
              name="header"
              :close="close"
            >
              <div :class="pohon.wrapper({ class: props.pohon?.wrapper })">
                <ADialogTitle
                  v-if="title || !!slots.title"
                  :class="pohon.title({ class: props.pohon?.title })"
                  data-pohon="slideover-title"
                >
                  <slot name="title">
                    {{ title }}
                  </slot>
                </ADialogTitle>

                <ADialogDescription
                  v-if="description || !!slots.description"
                  :class="pohon.description({ class: props.pohon?.description })"
                  data-pohon="slideover-description"
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
                    :aria-label="t('slideover.close')"
                    v-bind="(typeof props.close === 'object' ? props.close : {})"
                    :class="pohon.close({ class: props.pohon?.close })"
                    data-pohon="slideover-close"
                  />
                </slot>
              </ADialogClose>
            </slot>
          </div>

          <div
            :class="pohon.body({ class: props.pohon?.body })"
            data-pohon="slideover-body"
          >
            <slot
              name="body"
              :close="close"
            />
          </div>

          <div
            v-if="!!slots.footer"
            :class="pohon.footer({ class: props.pohon?.footer })"
            data-pohon="slideover-footer"
          >
            <slot
              name="footer"
              :close="close"
            />
          </div>
        </slot>
      </ADialogContent>
    </ADialogPortal>
  </ADialogRoot>
</template>
