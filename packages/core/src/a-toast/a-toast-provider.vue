<script lang="ts">
import type { Ref } from 'vue';

import { isString } from '@vinicunca/perkakas';

import { createContext } from '~~/shared';

import type { SwipeDirection } from './utils';

type AToastProviderContext = {
  duration: Ref<number>;
  isClosePausedRef: Ref<boolean>;
  isFocusedAToastEscapeKeyDownRef: Ref<boolean>;
  label: Ref<string>;
  onAToastAdd: () => void;
  onAToastRemove: () => void;
  onViewportChange: (viewport: HTMLElement) => void;
  swipeDirection: Ref< SwipeDirection>;
  swipeThreshold: Ref<number>;
  toastCount: Ref<number>;
  viewport: Ref<HTMLElement | undefined>;
};

export interface AToastProviderProps {
  /**
   * Time in milliseconds that each toast should remain visible for.
   * @defaultValue 5000
   */
  duration?: number;
  /**
   * An author-localized label for each toast. Used to help screen reader users
   * associate the interruption with a toast.
   * @defaultValue 'Notification'
   */
  label?: string;
  /**
   * Direction of pointer swipe that should close the toast.
   * @defaultValue 'right'
   */
  swipeDirection?: SwipeDirection;
  /**
   * Distance in pixels that the swipe must pass before a close is triggered.
   * @defaultValue 50
   */
  swipeThreshold?: number;
}

export const [
  injectAToastProviderContext,
  provideAToastProviderContext,
] = createContext<AToastProviderContext>('AToastProvider');
</script>

<script setup lang="ts">
import { ref, toRefs } from 'vue';

import { useCollection } from '~~/collection';

const props = withDefaults(
  defineProps<AToastProviderProps>(),
  {
    label: 'Notification',
    duration: 5000,
    swipeDirection: 'right',
    swipeThreshold: 50,
  },
);

const { label, duration, swipeDirection, swipeThreshold } = toRefs(props);

useCollection({ isProvider: true });

const viewport = ref<HTMLElement>();
const toastCount = ref(0);
const isFocusedAToastEscapeKeyDownRef = ref(false);
const isClosePausedRef = ref(false);

if (props.label && isString(props.label) && !props.label.trim()) {
  const error = 'Invalid prop `label` supplied to `AToastProvider`. Expected non-empty `string`.';
  throw new Error(error);
}

provideAToastProviderContext({
  label,
  duration,
  swipeDirection,
  swipeThreshold,
  toastCount,
  viewport,
  onViewportChange(el) {
    viewport.value = el;
  },
  onAToastAdd() {
    toastCount.value++;
  },
  onAToastRemove() {
    toastCount.value--;
  },
  isFocusedAToastEscapeKeyDownRef,
  isClosePausedRef,

});
</script>

<template>
  <slot />
</template>
