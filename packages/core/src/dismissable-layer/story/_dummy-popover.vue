<script setup lang="ts">
import { ref } from 'vue';
import { AFocusScope } from '~~/focus-scope';
import { APopperAnchor, APopperArrow, APopperContent, APopperRoot } from '~~/popper';
import { DismissableLayer } from '..';

withDefaults(
  defineProps<{
    openLabel?: string;
    closeLabel?: string;
    trapped?: boolean;
    disableOutsidePointerEvents?: boolean;
    color?: string;
  }>(),
  {
    openLabel: 'Open',
    closeLabel: 'Close',
    trapped: false,
    disableOutsidePointerEvents: false,
    color: 'white',
  },
);

const open = ref(false);
const openButtonRef = ref();
</script>

<template>
  <APopperRoot>
    <APopperAnchor as-child>
      <button
        ref="openButtonRef"
        type="button"
        class="rounded bg-gray-500 py-2 focus:outline-blue-500 focus:outline"
        @click="open = !open"
      >
        {{ openLabel }}
      </button>
    </APopperAnchor>

    <Teleport
      v-if="open"
      to="body"
    >
      <DismissableLayer
        as-child
        :disable-outside-pointer-events="disableOutsidePointerEvents"
        @dismiss="open = false"
      >
        <AFocusScope
          as-child
          :trapped="trapped"
        >
          <APopperContent
            class="min-h-[150px] min-w-[200px] flex items-start gap-4 rounded-md bg-white p-6"
            :style="{
              backgroundColor: color,
            }"
            side="bottom"
            :side-offset="10"
            align="start"
          >
            <slot />

            <button @click="open = false">
              {{ closeLabel }}
            </button>
            <input
              type="text"
              value="hello world"
            >
            <APopperArrow
              :width="10"
              :height="4"
              :style="{
                fill: color,
              }"
            />
          </APopperContent>
        </AFocusScope>
      </DismissableLayer>
    </Teleport>
  </APopperRoot>
</template>
