<script setup lang="ts">
import { reactive, ref } from 'vue';

import { AFocusScope } from '~~/a-focus-scope';

import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../utils';

import { ADismissableLayer } from '../';
import ADismissableBox from './_a-dismissable-box.vue'; // Assuming this is the correct path

const open = ref(false);
const openWithFocusScope = ref(false);
const openButtonRef = ref<HTMLElement>();

const state = reactive({
  isEscapeKeyDownPrevented: false,
  isFocusOutsidePrevented: false,
  isPointerDownOutsidePrevented: false,
});

function handleClick() {
  // eslint-disable-next-line no-console
  console.log('click');
}

function handleEscapeKeyDown(ev: KeyboardEvent) {
  if (state.isEscapeKeyDownPrevented) {
    ev.preventDefault();
  }
}

function handlePointerDownOutside(ev: PointerDownOutsideEvent) {
  if (state.isPointerDownOutsidePrevented) {
    ev.preventDefault();
  }
}

function handleFocusOutside(ev: FocusOutsideEvent) {
  if (state.isFocusOutsidePrevented) {
    ev.preventDefault();
  }
}

function handlePointerDownOutsideWithFocusScope(ev: PointerDownOutsideEvent) {
  if (ev.target === openButtonRef.value) {
    ev.preventDefault();
  }
}
</script>

<template>
  <Story
    group="utilities"
    title="ADismissableLayer/Basic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="default">
      <template #controls>
        <HstCheckbox
          v-model="state.isEscapeKeyDownPrevented"
          title="Disable dismiss on escape?"
        />
        <HstCheckbox
          v-model="state.isPointerDownOutsidePrevented"
          title="Disable dismiss on pointer down outside?"
        />
        <HstCheckbox
          v-model="state.isFocusOutsidePrevented"
          title="Disable dismiss on focus outside?"
        />
      </template>

      <div class="flex flex-col">
        <button
          class="bg-transparent"
          @click="open = !open"
        >
          open
        </button>

        <ADismissableLayer
          v-if="open"
          class="mt-[20px] min-h-[300px] inline-flex items-center justify-center rounded-xl bg-black align-middle"
          @dismiss="open = false"
          @escape-key-down="handleEscapeKeyDown"
          @pointer-down-outside="handlePointerDownOutside"
          @focus-outside="handleFocusOutside"
        >
          <div class="bg-gray-400 p-4">
            <input type="text">
          </div>
        </ADismissableLayer>

        <button
          class="bg-transparent"
          @click="handleClick"
        >
          Hey heeey!
        </button>
      </div>
    </Variant>

    <Variant title="Nested">
      <ADismissableBox />
    </Variant>

    <Variant title="Focus trap">
      <div class="flex flex-col justify-center">
        <button
          ref="openButtonRef"
          class="bg-transparent"
          @click="openWithFocusScope = !openWithFocusScope"
        >
          open
        </button>

        <ADismissableLayer
          v-if="openWithFocusScope"
          as-child
          disable-outside-pointer-events
          @dismiss="openWithFocusScope = false"
          @pointer-down-outside="handlePointerDownOutsideWithFocusScope"
        >
          <AFocusScope
            trapped
            loop
            class="h-[300px] w-[400px] flex flex-col items-center justify-center rounded bg-black"
          >
            <input type="text">
            <input type="text">
            <input type="text">
          </AFocusScope>
        </ADismissableLayer>
      </div>
    </Variant>
  </Story>
</template>
