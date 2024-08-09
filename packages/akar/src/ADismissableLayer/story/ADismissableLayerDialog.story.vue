<script setup lang="ts">
import { ref } from 'vue';

import { ADismissableLayer } from '../';
import ADummyDialog from './_DummyADialog.vue';
import ADummyPopover from './_DummyAPopover.vue';

function handleAlert() {
  // eslint-disable-next-line no-alert
  alert('Alert');
}

const open = ref(false);
</script>

<template>
  <Story
    group="utilities"
    title="ADismissableLayer/Dialog"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Dialog (fully modal example)">
      <div class="h-[300vh]">
        <ul class="ml-4 list-disc">
          <li>✅ focus should move inside `Dialog` when mounted</li>
          <li>✅ focus should be trapped inside `Dialog`</li>
          <li>✅ scrolling outside `Dialog` should be disabled</li>
          <li>✅ should be able to dismiss `Dialog` on pressing escape</li>
          <li class="ml-6">
            ✅ focus should return to the open button
          </li>
          <li>
            ✅ interacting outside `Dialog` should be disabled (clicking the
            "alert me" button shouldn't do anything)
          </li>
          <li>➕</li>
          <li>
            ✅ should be able to dismiss `Dialog` when interacting outside
          </li>
          <li class="ml-6">
            ✅ focus should return to the open button
          </li>
        </ul>

        <div class="mt-12 flex flex-col gap-4">
          <ADummyDialog
            open-label="Open Dialog"
            close-label="Close dialog"
          />

          <input
            type="text"
            value="some input"
          >
          <button @click="handleAlert">
            Alert me
          </button>
        </div>
      </div>
    </Variant>

    <Variant title="Popover (fully modal example)">
      <div class="h-[300vh]">
        <ul class="ml-4 list-disc">
          <li>✅ focus should move inside `Popover` when mounted</li>
          <li>✅ focus should be trapped inside `Popover`</li>
          <li>✅ scrolling outside `Popover` should be disabled</li>
          <li>✅ should be able to dismiss `Popover` on pressing escape</li>
          <li class="ml-6">
            ✅ focus should return to the open button
          </li>
          <li>
            ✅ interacting outside `Popover` should be disabled (clicking the
            "alert me" button shouldn't do anything)
          </li>
          <li>➕</li>
          <li>
            ✅ should be able to dismiss `Popover` when interacting outside
          </li>
          <li class="ml-6">
            ✅ focus should return to the open button
          </li>
        </ul>

        <div class="mt-12 flex flex-col gap-4">
          <ADummyPopover
            open-label="Open Popover"
            close-label="Close Popover"
            disable-outside-pointer-events
          />

          <input
            type="text"
            value="some input"
          >
          <button @click="handleAlert">
            Alert me
          </button>
        </div>
      </div>
    </Variant>
    <Variant title="Dialog (with scrollbar)">
      <div class="flex flex-col gap-4">
        <button
          class="rounded bg-gray-500 py-2 focus:outline-blue-500 focus:outline"
          type="button"
          @click="open = !open"
        >
          Open layer
        </button>

        <template v-if="open">
          <Teleport to="body">
            <div
              class="pointer-event-none fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center overflow-y-auto bg-black/30"
            >
              <ADismissableLayer @dismiss="open = false">
                <div class="h-[200vh] flex items-center justify-center bg-gray-700 p-16 text-white">
                  Long content. Clicking on scrollbar shouldn't dismiss the layer
                </div>
              </ADismissableLayer>
            </div>
          </Teleport>
        </template>
      </div>
    </Variant>
  </Story>
</template>
..
