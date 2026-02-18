<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { AToastProviderProps } from 'akar';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/toaster';

type Toaster = ComponentConfig<typeof theme, AppConfig, 'toaster'>;

export interface PToasterProps extends Omit<AToastProviderProps, 'swipeDirection'> {
  /**
   * The position on the screen to display the toasts.
   * @defaultValue 'bottom-right'
   */
  position?: Toaster['variants']['position'];
  /**
   * Expand the toasts to show multiple toasts at once.
   * @defaultValue true
   */
  expand?: boolean;
  /**
   * Whether to show the progress bar on all toasts.
   * @defaultValue true
   */
  progress?: boolean;
  /**
   * Render the toaster in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
  /**
   * Maximum number of toasts to display at once.
   * @defaultValue 5
   */
  max?: number;
  class?: any;
  pohon?: Toaster['slots'];
}

export interface PToasterSlots {
  default: (props?: object) => any;
}

export default {
  name: 'PToaster',
};
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { omit } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import {
  AToastPortal,
  AToastProvider,
  AToastViewport,
  useForwardProps,
} from 'akar';
import { computed, provide, ref, toRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { usePortal } from '../composables/use-portal';
import { toastMaxInjectionKey, useToast } from '../composables/use-toast';
import { uv } from '../utils/uv';
import PToast from './toast.vue';

const props = withDefaults(
  defineProps<PToasterProps>(),
  {
    expand: true,
    portal: true,
    duration: 5000,
    progress: true,
    max: 5,
  },
);

defineSlots<PToasterSlots>();

const { toasts, remove } = useToast();
const appConfig = useAppConfig() as Toaster['AppConfig'];
const pohonProp = useComponentPohon('toaster', props);

provide(toastMaxInjectionKey, toRef(() => props.max));

const providerProps = useForwardProps(
  reactivePick(props, 'duration', 'label', 'swipeThreshold', 'disableSwipe'),
);
const portalProps = usePortal(toRef(() => props.portal));

const swipeDirection = computed(() => {
  switch (props.position) {
    case 'top-center':
      return 'up';
    case 'top-right':
    case 'bottom-right':
      return 'right';
    case 'bottom-center':
      return 'down';
    case 'top-left':
    case 'bottom-left':
      return 'left';
  }
  return 'right';
});

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.toaster || {}),
  })({
    position: props.position,
    swipeDirection: swipeDirection.value,
  }),
);

function onUpdateOpen(value: boolean, id: string | number) {
  if (value) {
    return;
  }

  remove(id);
}

const hovered = ref(false);
const expanded = computed(() => props.expand || hovered.value);

const refs = ref<Array<{ height: number }>>([]);

const height = computed(() => refs.value.reduce((acc, { height }) => acc + height + 16, 0));
const frontHeight = computed(() => refs.value[refs.value.length - 1]?.height || 0);

function getOffset(index: number) {
  return refs.value.slice(index + 1).reduce((acc, { height }) => acc + height + 16, 0);
}
</script>

<template>
  <AToastProvider
    :swipe-direction="swipeDirection"
    v-bind="providerProps"
  >
    <slot />

    <PToast
      v-for="(toast, index) of toasts"
      :key="toast.id"
      ref="refs"
      :progress="progress"
      v-bind="omit(toast, ['id', 'close'])"
      :close="(toast.close as boolean)"
      :data-expanded="expanded"
      :data-front="!expanded && index === toasts.length - 1"
      :style="{
        '--index': (index - toasts.length) + toasts.length,
        '--before': toasts.length - 1 - index,
        '--offset': getOffset(index),
        '--scale': expanded ? '1' : 'calc(1 - var(--before) * var(--scale-factor))',
        '--translate': expanded ? 'calc(var(--offset) * var(--translate-factor))' : 'calc(var(--before) * var(--gap))',
        '--transform': 'translateY(var(--translate)) scale(var(--scale))',
      }"
      :class="pohon.base({ class: [pohonProp?.base, toast.onClick ? 'cursor-pointer' : undefined] })"
      data-pohon="toaster-base"
      @update:open="onUpdateOpen($event, toast.id)"
      @click="toast.onClick && toast.onClick(toast)"
    />

    <AToastPortal v-bind="portalProps">
      <AToastViewport
        :data-expanded="expanded"
        :class="pohon.viewport({ class: [pohonProp?.viewport, props.class] })"
        data-pohon="toaster-viewport"
        :style="{
          '--scale-factor': '0.05',
          '--translate-factor': position?.startsWith('top') ? '1px' : '-1px',
          '--gap': position?.startsWith('top') ? '16px' : '-16px',
          '--front-height': `${frontHeight}px`,
          '--height': `${height}px`,
        }"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      />
    </AToastPortal>
  </AToastProvider>
</template>
40
