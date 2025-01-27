<script setup lang="ts">
import { ref } from 'vue';
import { AProgressIndicator, AProgressRoot } from '..';

const interactive = ref(0);
setInterval(() => {
  // For some reason, this interval triggers twice in the same tick
  interactive.value = (interactive.value + Math.random() * 15) % 100;
}, 2000);

const errorCaseValue = ref(1);
const errorCaseMax = ref(100);
</script>

<template>
  <Story
    title="Progress/Demo"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="Loop">
      <AProgressRoot
        v-model="interactive"
        class="bg-blackA9 full relative h-8 w-full flex items-center justify-center overflow-hidden rounded-full"
      >
        <AProgressIndicator
          class="h-full w-full bg-white transition-transform duration-1000"
          :style="`transform: translateX(-${100 - interactive}%)`"
        />
        <div
          class="pointer-events-none absolute text-center text-xs text-green-400 font-bold tracking-widest font-mono uppercase mix-blend-normal"
        >
          {{ interactive.toFixed(2) }}%
        </div>
      </AProgressRoot>
    </Variant>
    <Variant title="Indeterminate">
      <AProgressRoot
        class="bg-blackA9 full relative h-8 w-full flex items-center justify-center overflow-hidden rounded-full"
      >
        <AProgressIndicator class="h-full w-full bg-white/20" />
        <div
          class="pointer-events-none absolute text-center text-xs text-green-400 font-bold tracking-widest font-mono uppercase mix-blend-normal"
        >
          Progress value is null
        </div>
      </AProgressRoot>

      <p
        class="mt-10 rounded-md bg-slate-500/80 px-3 py-4 text-sm text-slate-100"
      >
        When there is no value provided, the progress indicator will be
        <code class="text-green-400">indeterminate</code>.
      </p>
    </Variant>
    <Variant title="Errors">
      <template #controls>
        <div class="flex flex-col">
          Value:
          <input
            v-model="errorCaseValue"
            class="bg-slate-300 text-slate-800"
            type="number"
          >
          Max:
          <input
            v-model="errorCaseMax"
            class="bg-slate-300 text-slate-800"
            type="number"
          >
        </div>
      </template>

      <div class="rounded-sm bg-slate-600 px-2 py-3 text-slate-200">
        <p class="mb-4 rounded-md text-sm text-amber-300">
          Change the values in the "Controls" tab to test.
          <br>
          Then, check the console for errors.
        </p>

        <AProgressRoot
          v-model="errorCaseValue"
          class="relative h-8 w-full flex items-center justify-center overflow-hidden rounded-full bg-red-50"
          :max="errorCaseMax"
        >
          <AProgressIndicator
            class="h-full w-full bg-white"
            :style="`transform: translateX(${100 - errorCaseValue}%)`"
          />
          <div
            class="pointer-events-none absolute text-center text-xs text-red-500 font-bold font-mono"
          >
            <span class="opacity-60">Value:</span>
            <span class="tracking-widest">{{
              errorCaseValue || "undefined"
            }}</span>
            <br>
            <span class="opacity-60">Max:</span>
            <span class="tracking-widest">{{ errorCaseMax }}</span>
          </div>
        </AProgressRoot>

        <div class="mt-10 flex justify-between">
          <h5 class="text-sm">
            Quick actions
          </h5>
          <button
            class="ml-2 text-sm underline"
            @click="
              errorCaseValue = 1;
              errorCaseMax = 100;
            "
          >
            Reset values
          </button>
        </div>
        <div class="mt-3 flex flex-wrap gap-2 text-sm">
          <button
            class="h-max rounded-md bg-slate-200 px-2 py-1 text-slate-800 hover:bg-slate-300"
            @click="errorCaseValue = 1000"
          >
            Set <code class="text-green-600">value</code> to 1000
          </button>
          <button
            class="h-max rounded-md bg-slate-200 px-2 py-1 text-slate-800 hover:bg-slate-300"
            @click="errorCaseValue = -1"
          >
            Set <code class="text-green-600">value</code> to -1
          </button>
          <button
            class="h-max rounded-md bg-slate-200 px-2 py-1 text-slate-800 hover:bg-slate-300"
            @click="errorCaseMax = -1"
          >
            Set <code class="text-green-600">max</code> to -1
          </button>
        </div>
      </div>
    </Variant>
  </Story>
</template>
