<script setup lang="ts">
import {
  ADrawerContent,
  ADrawerOverlay,
  ADrawerPortal,
  ADrawerRoot,
  ADrawerTrigger,
} from '@vinicunca/akar';
import { computed, ref } from 'vue';

const snapPoints = [0, '148px', '355px', 1];

const snap = ref<number | string | null>(snapPoints[1]);

const activeSnapPointIndex = computed(() => snapPoints.indexOf(snap.value as string));

const open = ref<boolean>(true);
</script>

<template>
  <div
    class="h-screen w-screen flex items-center justify-center bg-white p-8"
    data-akar-drawer-wrapper=""
  >
    <div data-testid="active-snap-index">
      {{ activeSnapPointIndex }}
    </div>
    <ADrawerRoot
      v-model:open="open"
      v-model:active-snap-point="snap"
      :snap-points="snapPoints"
    >
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
          class="fixed bottom-0 left-0 right-0 mx-[-1px] h-full max-h-[97%] flex flex-col border border-gray-200 rounded-t-[10px] border-b-none bg-white"
        >
          <div
            class="mx-auto max-w-md w-full flex flex-col p-4 pt-5"
            :class="snap === 1 ? 'overflow-y-auto' : 'overflow-hidden'"
          >
            <div class="flex items-center">
              <svg
                class="h-5 w-5 flex-shrink-0 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                class="h-5 w-5 flex-shrink-0 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                class="h-5 w-5 flex-shrink-0 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                class="h-5 w-5 flex-shrink-0 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                class="h-5 w-5 flex-shrink-0 text-gray-300"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h1 class="mt-2 text-2xl font-medium">
              The Hidden Details
            </h1>
            <p class="mb-6 mt-1 text-sm text-gray-600">
              2 modules, 27 hours of video
            </p>
            <p class="text-gray-600">
              The world of user interface design is an intricate landscape filled with hidden
              details and nuance. In this course, you will learn something cool. To the untrained eye, a beautifully
              designed UI.
            </p>
            <button class="mt-8 h-[48px] flex-shrink-0 rounded-md bg-black text-gray-50 font-medium">
              Buy for $199
            </button>
            <div class="mt-12">
              <h2 class="text-xl font-medium">
                Module 01. The Details
              </h2>
              <div class="mt-4 space-y-4">
                <div>
                  <span class="block">Layers of UI</span>
                  <span class="text-gray-600">A basic introduction to Layers of Design.</span>
                </div>
                <div>
                  <span class="block">Typography</span>
                  <span class="text-gray-600">The fundamentals of type.</span>
                </div>
                <div>
                  <span class="block">UI Animations</span>
                  <span class="text-gray-600">Going through the right easings and durations.</span>
                </div>
              </div>
            </div>
            <div class="mt-12">
              <figure>
                <blockquote class="font-serif">
                  “I especially loved the hidden details video. That was so useful, learned
                  a lot by just reading it. Can&rsquo;t wait for more course content!”
                </blockquote>
                <figcaption>
                  <span class="mt-2 block text-sm text-gray-600">Yvonne Ray, Frontend Developer</span>
                </figcaption>
              </figure>
            </div>
            <div class="mt-12">
              <h2 class="text-xl font-medium">
                Module 02. The Process
              </h2>
              <div class="mt-4 space-y-4">
                <div>
                  <span class="block">Build</span>
                  <span class="text-gray-600">Create cool components to practice.</span>
                </div>
                <div>
                  <span class="block">User Insight</span>
                  <span class="text-gray-600">Find out what users think and fine-tune.</span>
                </div>
                <div>
                  <span class="block">Putting it all together</span>
                  <span class="text-gray-600">Let&apos;s build an app together and apply everything.</span>
                </div>
              </div>
            </div>
          </div>
        </ADrawerContent>
      </ADrawerPortal>
    </ADrawerRoot>
  </div>
</template>

<style scoped></style>
