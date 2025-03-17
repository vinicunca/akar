<script setup lang="ts">
import {
  ADrawerClose,
  ADrawerContent,
  ADrawerOverlay,
  ADrawerPortal,
  ADrawerRoot,
  ADrawerRootNested,
  ADrawerTitle,
  ADrawerTrigger,
} from '@vinicunca/akar';
</script>

<template>
  <div
    class="h-screen w-screen flex items-center justify-center bg-white p-8"
    data-akar-drawer-wrapper=""
  >
    <ADrawerRoot should-scale-background>
      <ADrawerTrigger as-child>
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
          class="fixed bottom-0 left-0 right-0 mt-24 h-[96%] flex flex-col rounded-t-[10px] bg-zinc-100"
        >
          <div class="flex-1 rounded-t-[10px] bg-white p-4">
            <div class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
            <div class="mx-auto max-w-md">
              <ADrawerTitle class="mb-4 font-medium">
                Unstyled drawer for Vue.
              </ADrawerTitle>
              <p class="mb-2 text-zinc-600">
                This component can be used as a replacement for a Dialog on mobile and tablet
                devices.
              </p>
              <ADrawerRootNested>
                <ADrawerTrigger as-child>
                  <button
                    data-testid="nested-trigger"
                    class="text-2xl"
                  >
                    Open Second Drawer
                  </button>
                </ADrawerTrigger>
                <ADrawerPortal>
                  <ADrawerOverlay
                    data-testid="nested-overlay"
                    class="fixed inset-0 bg-black/40"
                  />
                  <ADrawerContent
                    data-testid="nested-content"
                    class="fixed bottom-0 left-0 right-0 mt-24 h-[96%] flex flex-col rounded-t-[10px] bg-zinc-100"
                  >
                    <div class="flex-1 rounded-t-[10px] bg-white p-4">
                      <div class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
                      <div class="mx-auto max-w-md">
                        <ADrawerTitle class="mb-4 font-medium">
                          Unstyled drawer for Vue.
                        </ADrawerTitle>
                        <p class="mb-2 text-zinc-600">
                          This component can be used as a replacement for a Dialog on mobile
                          and tablet devices.
                        </p>
                        <p class="mb-2 text-gray-600">
                          Place a <span
                            class="text-[15px] font-semibold font-mono"
                          >`Drawer.NestedRoot`</span> inside another drawer
                          and it will be nested automatically for you.
                        </p>
                        <ADrawerClose data-testid="nested-close">
                          Close
                        </ADrawerClose>
                      </div>
                    </div>
                  </ADrawerContent>
                </ADrawerPortal>
              </ADrawerRootNested>
            </div>
          </div>
        </ADrawerContent>
      </ADrawerPortal>
    </ADrawerRoot>
  </div>
</template>

<style scoped></style>
