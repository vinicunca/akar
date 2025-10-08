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
        class="full bg-blackA9 rounded-full flex h-8 w-full items-center justify-center relative overflow-hidden"
      >
        <AProgressIndicator
          class="bg-white h-full w-full transition-transform duration-1000"
          :style="`transform: translateX(-${100 - interactive}%)`"
        />
        <div
          class="text-xs color-green-400 tracking-widest font-bold font-mono text-center pointer-events-none uppercase absolute mix-blend-normal"
        >
          {{ interactive.toFixed(2) }}%
        </div>
      </AProgressRoot>
    </Variant>
    <Variant title="Indeterminate">
      <AProgressRoot
        class="full bg-blackA9 rounded-full flex h-8 w-full items-center justify-center relative overflow-hidden"
      >
        <AProgressIndicator class="bg-white/20 h-full w-full" />
        <div
          class="text-xs color-green-400 tracking-widest font-bold font-mono text-center pointer-events-none uppercase absolute mix-blend-normal"
        >
          Progress value is null
        </div>
      </AProgressRoot>

      <p
        class="text-sm text-slate-100 mt-10 px-3 py-4 rounded-md bg-slate-500/80"
      >
        When there is no value provided, the progress indicator will be
        <code class="color-green-400">indeterminate</code>.
      </p>
    </Variant>
    <Variant title="Errors">
      <template #controls>
        <div class="flex flex-col">
          Value:
          <input
            v-model="errorCaseValue"
            class="text-slate-800 bg-slate-300"
            type="number"
          >
          Max:
          <input
            v-model="errorCaseMax"
            class="text-slate-800 bg-slate-300"
            type="number"
          >
        </div>
      </template>

      <div class="text-slate-200 px-2 py-3 rounded-sm bg-slate-600">
        <p class="text-sm text-amber-300 mb-4 rounded-md">
          Change the values in the "Controls" tab to test.
          <br>
          Then, check the console for errors.
        </p>

        <AProgressRoot
          v-model="errorCaseValue"
          class="rounded-full bg-red-50 flex h-8 w-full items-center justify-center relative overflow-hidden"
          :max="errorCaseMax"
        >
          <AProgressIndicator
            class="bg-white h-full w-full"
            :style="`transform: translateX(${100 - errorCaseValue}%)`"
          />
          <div
            class="text-xs text-red-500 font-bold font-mono text-center pointer-events-none absolute"
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
            class="text-sm ml-2 underline"
            @click="
              errorCaseValue = 1;
              errorCaseMax = 100;
            "
          >
            Reset values
          </button>
        </div>
        <div class="text-sm mt-3 flex flex-wrap gap-2">
          <button
            class="text-slate-800 px-2 py-1 rounded-md bg-slate-200 h-max hover:bg-slate-300"
            @click="errorCaseValue = 1000"
          >
            Set <code class="color-green-600">value</code> to 1000
          </button>
          <button
            class="text-slate-800 px-2 py-1 rounded-md bg-slate-200 h-max hover:bg-slate-300"
            @click="errorCaseValue = -1"
          >
            Set <code class="color-green-600">value</code> to -1
          </button>
          <button
            class="text-slate-800 px-2 py-1 rounded-md bg-slate-200 h-max hover:bg-slate-300"
            @click="errorCaseMax = -1"
          >
            Set <code class="color-green-600">max</code> to -1
          </button>
        </div>
      </div>
    </Variant>
  </Story>
</template>
