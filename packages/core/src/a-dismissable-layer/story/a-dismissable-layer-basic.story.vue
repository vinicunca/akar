<script setup lang="ts">
import { reactive, ref } from 'vue';

import { AFocusScope } from '~~/a-focus-scope';

import { ADismissableLayer } from '..';
import ADismissableBox from './_a-dismissable-box.vue';

const open = ref(false);

function handleClick() {
  // eslint-disable-next-line no-console
  console.log('click');
}

const state = reactive({
  isEscapeKeyDownPrevented: false,
  isPointerDownOutsidePrevented: false,
  isFocusOutsidePrevented: false,
});

const openWithAFocusScope = ref(false);
const openButtonRef = ref<HTMLElement>();
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
          title="Dismiss on escape?"
        />
        <HstCheckbox
          v-model="state.isPointerDownOutsidePrevented"
          title="Dismiss on pointer down outside?"
        />
        <HstCheckbox
          v-model="state.isFocusOutsidePrevented"
          title="Dismiss on focus outside?"
        />
      </template>

      <div class="flex flex-col">
        <button @click="open = !open">
          open
        </button>

        <ADismissableLayer
          v-if="open"
          :style="{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            verticalAlign: 'middle',
            width: 400,
            height: 300,
            backgroundColor: 'black',
            borderRadius: 10,
            marginBottom: 20,
          }"
          @dismiss="open = false"
          @escape-key-down="
            (ev) => {
              if (state.isEscapeKeyDownPrevented) ev.preventDefault();
            }
          "
          @pointer-down-outside="
            (ev) => {
              if (state.isPointerDownOutsidePrevented) ev.preventDefault();
            }
          "
          @focus-outside="
            (ev) => {
              if (state.isFocusOutsidePrevented) ev.preventDefault();
            }
          "
        >
          <div class="bg-gray-400 p-4">
            <input type="text">
          </div>
        </ADismissableLayer>

        <button @click="handleClick">
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
          @click="openWithAFocusScope = !openWithAFocusScope"
        >
          open
        </button>

        <ADismissableLayer
          v-if="openWithAFocusScope"
          as-child
          disable-outside-pointer-events
          @dismiss="openWithAFocusScope = false"
          @pointer-down-outside="
            (ev) => {
              if (ev.target === openButtonRef) ev.preventDefault();
            }
          "
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
