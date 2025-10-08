<script setup lang="ts">
import { ref } from 'vue';
import { DismissableLayer } from '..';
import DummyDialog from './_DummyDialog.vue';
import DummyPopover from './_DummyPopover.vue';

function handleAlert() {
  // eslint-disable-next-line no-alert
  alert('Alert');
}

const open = ref(false);
</script>

<template>
  <Story
    group="utilities"
    title="DismissableLayer/Dialog"
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
          <DummyDialog
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
          <DummyPopover
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
          class="py-2 rounded bg-gray-500 focus:outline-blue-500 focus:outline"
          type="button"
          @click="open = !open"
        >
          Open layer
        </button>

        <template v-if="open">
          <Teleport to="body">
            <div
              class="pointer-event-none bg-black/30 flex items-center bottom-0 left-0 right-0 top-0 justify-center fixed overflow-y-auto"
            >
              <DismissableLayer @dismiss="open = false">
                <div class="text-white p-16 bg-gray-700 flex h-[200vh] items-center justify-center">
                  Long content. Clicking on scrollbar shouldn't dismiss the layer
                </div>
              </DismissableLayer>
            </div>
          </Teleport>
        </template>
      </div>
    </Variant>
  </Story>
</template>
