<script lang="ts">
import type { Ref } from 'vue';

import { createContext } from '~~/shared';

interface ATooltipProviderContext {
  delayDuration: Ref<number>;
  disableClosingTrigger: Ref<boolean>;
  disabled: Ref<boolean>;
  disableHoverableContent: Ref<boolean>;
  ignoreNonKeyboardFocus: Ref<boolean>;
  isOpenDelayed: Ref<boolean>;
  isPointerInTransitRef: Ref<boolean>;
  onClose: () => void;
  onOpen: () => void;
}

export const [
  injectATooltipProviderContext,
  provideATooltipProviderContext,
] = createContext<ATooltipProviderContext>('ATooltipProvider');

export interface ATooltipProviderProps {
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   * @defaultValue 700
   */
  delayDuration?: number;
  /**
   * When `true`, clicking on trigger will not close the content.
   * @defaultValue false
   */
  disableClosingTrigger?: boolean;
  /**
   * When `true`, disable tooltip
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean;
  /**
   * Prevent the tooltip from opening if the focus did not come from
   * the keyboard by matching against the `:focus-visible` selector.
   * This is useful if you want to avoid opening it when switching
   * browser tabs or closing a dialog.
   * @defaultValue false
   */
  ignoreNonKeyboardFocus?: boolean;
  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   * @defaultValue 300
   */
  skipDelayDuration?: number;
}
</script>

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/shared';
import { ref, toRefs } from 'vue';

import { useForwardExpose } from '~~/shared';

const props = withDefaults(defineProps<ATooltipProviderProps>(), {
  delayDuration: 700,
  skipDelayDuration: 300,
  disableHoverableContent: false,
  ignoreNonKeyboardFocus: false,
});

const {
  delayDuration,
  skipDelayDuration,
  disableHoverableContent,
  disableClosingTrigger,
  ignoreNonKeyboardFocus,
  disabled,
} = toRefs(props);

useForwardExpose();

const isOpenDelayed = ref(true);
// Reset the inTransit state if idle/scrolled.
const isPointerInTransitRef = ref(false);

const { start: startTimer, stop: clearTimer } = useTimeoutFn(
  () => {
    isOpenDelayed.value = true;
  },
  skipDelayDuration,
  { immediate: false },
);

provideATooltipProviderContext({
  isOpenDelayed,
  delayDuration,
  onOpen() {
    clearTimer();
    isOpenDelayed.value = false;
  },
  onClose() {
    startTimer();
  },
  isPointerInTransitRef,
  disableHoverableContent,
  disableClosingTrigger,
  disabled,
  ignoreNonKeyboardFocus,
});
</script>

<template>
  <slot />
</template>
