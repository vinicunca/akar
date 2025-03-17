<script setup lang="ts">
import {
  ADrawerContent,
  ADrawerOverlay,
  ADrawerPortal,
  ADrawerRoot,
  ADrawerTrigger,
} from '@vinicunca/akar';
</script>

<template>
  <div
    class="h-screen w-screen flex items-center justify-center bg-white p-8"
    data-akar-drawer-wrapper=""
  >
    <ADrawerRoot should-scale-background>
      <ADrawerTrigger
        class="rounded-full bg-white px-4 py-2.5 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        <button
          data-testid="trigger"
          class="text-2xl"
        >
          Open Drawer
        </button>
      </ADrawerTrigger>
      <ADrawerPortal>
        <ADrawerOverlay
          data-testid="overlay"
          class="fixed inset-0 bg-black/40"
        />
        <ADrawerContent
          data-testid="content"
          class="fixed bottom-0 left-0 right-0 mt-24 h-full max-h-[96%] flex flex-col rounded-t-[10px] bg-gray-100"
        >
          <div class="flex-1 rounded-t-[10px] bg-white p-4">
            <div
              data-testid="handler"
              class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300"
            />
            <div
              class="mx-auto max-w-md"
              data-akar-no-drag
            >
              <h2
                id="radix-:R3emdaH1:"
                class="mb-4 font-medium"
              >
                The whole content is not draggable
              </h2>
              <p class="mb-2 text-gray-600">
                This component can be used as a Dialog replacement on mobile and tablet devices.
              </p>
              <p class="mb-2 text-gray-600">
                It comes unstyled, has gesture-driven animations, and is made by
                <a
                  href="https://emilkowal.ski/"
                  class="underline"
                  target="_blank"
                >Emil Kowalski</a>.
              </p>
              <p class="mb-8 text-gray-600">
                It uses
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/dialog"
                  class="underline"
                  target="_blank"
                >Radix's Dialog primitive</a>
                under the hood and is inspired by
                <a
                  href="https://twitter.com/devongovett/status/1674470185783402496"
                  class="underline"
                  target="_blank"
                >this tweet.</a>
              </p>
            </div>
          </div>
        </ADrawerContent>
      </ADrawerPortal>
    </ADrawerRoot>
  </div>
</template>
