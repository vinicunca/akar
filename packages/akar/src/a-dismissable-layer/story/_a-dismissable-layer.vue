<script setup lang="ts">
import { ref } from 'vue';

import { useEmitAsProps } from '~~/shared';

import type { ADismissableLayerEmits, FocusOutsideEvent, PointerDownOutsideEvent } from '../';

import { ADismissableLayer } from '../';

const props = defineProps<{
  closeLabel?: string;
  openLabel?: string;
  outsideLabel?: string;

  preventEscapeKeyDownEvent?: boolean;
  preventFocusOutsideEvent?: boolean;
  preventPointerDownOutsideEvent?: boolean;
}>();

const emits = defineEmits<ADismissableLayerEmits>();

const open = ref(false);

function handleDismiss() {
  open.value = false;
}

function handleEscapeKeyDown(ev: KeyboardEvent) {
  if (props.preventEscapeKeyDownEvent) {
    ev.preventDefault();
  }
}

function handlePointerDownOutside(ev: PointerDownOutsideEvent) {
  if (props.preventPointerDownOutsideEvent) {
    ev.preventDefault();
  }
}

function handleFocusOutside(ev: FocusOutsideEvent) {
  if (props.preventFocusOutsideEvent) {
    ev.preventDefault();
  }
}
</script>

<template>
  <div class="flex flex-col">
    <button @click="open = !open">
      {{ openLabel }}
    </button>

    <ADismissableLayer
      v-if="open"
      id="layer"
      v-bind="useEmitAsProps(emits)"
      @dismiss="handleDismiss"
      @escape-key-down="handleEscapeKeyDown"
      @pointer-down-outside="handlePointerDownOutside"
      @focus-outside="handleFocusOutside"
    >
      <div>Content</div>
      <button
        type="button"
        @click="open = false"
      >
        {{ closeLabel }}
      </button>
    </ADismissableLayer>

    <button id="outside">
      {{ outsideLabel }}
    </button>
  </div>
</template>
