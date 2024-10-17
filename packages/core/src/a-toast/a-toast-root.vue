<script lang="ts">
import type { Ref } from 'vue';

import { useForwardExpose } from '~~/shared';

import type { AToastRootImplEmits, AToastRootImplProps } from './a-toast-root-impl.vue';
import type { SwipeEvent } from './utils';

export type AToastRootEmits = {
  /** Event handler called when the open state changes */
  'update:open': [value: boolean];
} & Omit<AToastRootImplEmits, 'close'>;

export interface AToastRootProps extends AToastRootImplProps {
  /** The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

import { APresence } from '~~/a-presence';

import AToastRootImpl from './a-toast-root-impl.vue';

const props = withDefaults(
  defineProps<AToastRootProps>(),
  {
    type: 'foreground',
    open: undefined,
    defaultOpen: true,
    as: 'li',
  },
);

const emits = defineEmits<AToastRootEmits>();

defineSlots<{
  default: (props: {
    /** Total time the toast will remain visible for (in ms) */
    duration: number;
    /** Current open state */
    open: typeof open.value;
    /** Remaining time (in ms) */
    remaining: number;
  }) => any;
}>();

const { forwardRef } = useForwardExpose();

const open = useVModel(
  props,
  'open',
  emits,
  {
    defaultValue: props.defaultOpen,
    passive: (props.open === undefined) as false,
  },
) as Ref<boolean>;

const STR_DATA_SWIPE = 'data-swipe';
const STR_SWIPE_MOVE_X = '--akar-toast-swipe-move-x';
const STR_SWIPE_MOVE_Y = '--akar-toast-swipe-move-y';

function handleSwipeStart(event: SwipeEvent) {
  emits('swipeStart', event);
  (event.currentTarget as HTMLElement).setAttribute(STR_DATA_SWIPE, 'start');
}

function handleSwipeMove(event: SwipeEvent) {
  const { x, y } = event.detail.delta;
  const target = event.currentTarget as HTMLElement;
  target.setAttribute(STR_DATA_SWIPE, 'move');
  target.style.setProperty(STR_SWIPE_MOVE_X, `${x}px`);
  target.style.setProperty(STR_SWIPE_MOVE_Y, `${y}px`);
}

function handleSwipeCancel(event: SwipeEvent) {
  const target = event.currentTarget as HTMLElement;
  target.setAttribute(STR_DATA_SWIPE, 'cancel');
  target.style.removeProperty(STR_SWIPE_MOVE_X);
  target.style.removeProperty(STR_SWIPE_MOVE_Y);
  target.style.removeProperty('--akar-toast-swipe-end-x');
  target.style.removeProperty('--akar-toast-swipe-end-y');
}

function handleSwipeEnd(event: SwipeEvent) {
  const { x, y } = event.detail.delta;
  const target = event.currentTarget as HTMLElement;
  target.setAttribute(STR_DATA_SWIPE, 'end');
  target.style.removeProperty(STR_SWIPE_MOVE_X);
  target.style.removeProperty(STR_SWIPE_MOVE_Y);
  target.style.setProperty('--akar-toast-swipe-end-x', `${x}px`);
  target.style.setProperty('--akar-toast-swipe-end-y', `${y}px`);
  open.value = false;
}
</script>

<template>
  <APresence :present="forceMount || open">
    <AToastRootImpl
      :ref="forwardRef"
      v-slot="{ remaining, duration: _duration }"
      :open="open"
      :type="type"
      :as="as"
      :as-child="asChild"
      :duration="duration"
      v-bind="$attrs"
      @close="open = false"
      @pause="emits('pause')"
      @resume="emits('resume')"
      @escape-key-down="emits('escapeKeyDown', $event)"
      @swipe-start="handleSwipeStart"
      @swipe-move="handleSwipeMove"
      @swipe-cancel="handleSwipeCancel"
      @swipe-end="handleSwipeEnd"
    >
      <slot
        :remaining="remaining"
        :duration="_duration"
        :open="open"
      />
    </AToastRootImpl>
  </APresence>
</template>
