<script setup lang="ts">
import { ref } from 'vue';
import { ASwitchRoot, ASwitchThumb } from '.';

const switchState = ref(true);
const customStringState = ref<'on' | 'off'>('off');
const customNumberState = ref<1 | 0>(0);
</script>

<template>
  <Story
    title="Switch/Demo"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <div class="flex gap-2 items-center">
        <label
          class="text-[15px] text-white leading-none pr-[15px]"
          for="airplane-mode"
        >
          Airplane mode
        </label>
        <ASwitchRoot
          id="airplane-mode"
          v-model="switchState"
          class="rounded-full bg-black/50 flex h-[25px] w-[42px] cursor-default shadow-sm relative focus-within:outline-black focus-within:outline data-[state=checked]:bg-black"
        >
          <ASwitchThumb
            class="my-auto will-change-transform rounded-full bg-white h-[21px] w-[21px] block shadow-sm translate-x-0.5 transition-transform duration-100 data-[state=checked]:translate-x-[19px]"
          />
        </ASwitchRoot>
      </div>
    </Variant>

    <Variant title="Custom string values">
      <div class="flex flex-col gap-4">
        <div class="flex gap-2 items-center">
          <label
            class="text-[15px] text-white leading-none pr-[15px]"
            for="custom-string"
          >
            Status
          </label>
          <ASwitchRoot
            id="custom-string"
            v-model="customStringState"
            true-value="on"
            false-value="off"
            class="rounded-full bg-black/50 flex h-[25px] w-[42px] cursor-default shadow-sm relative focus-within:outline-black focus-within:outline data-[state=checked]:bg-black"
          >
            <ASwitchThumb
              class="my-auto will-change-transform rounded-full bg-white h-[21px] w-[21px] block shadow-sm translate-x-0.5 transition-transform duration-100 data-[state=checked]:translate-x-[19px]"
            />
          </ASwitchRoot>
        </div>
        <span class="text-sm text-white">v-model value: "{{ customStringState }}"</span>
      </div>
    </Variant>

    <Variant title="Custom number values">
      <div class="flex flex-col gap-4">
        <div class="flex gap-2 items-center">
          <label
            class="text-[15px] text-white leading-none pr-[15px]"
            for="custom-number"
          >
            Permission
          </label>
          <ASwitchRoot
            id="custom-number"
            v-model="customNumberState"
            :true-value="1"
            :false-value="0"
            class="rounded-full bg-black/50 flex h-[25px] w-[42px] cursor-default shadow-sm relative focus-within:outline-black focus-within:outline data-[state=checked]:bg-black"
          >
            <ASwitchThumb
              class="my-auto will-change-transform rounded-full bg-white h-[21px] w-[21px] block shadow-sm translate-x-0.5 transition-transform duration-100 data-[state=checked]:translate-x-[19px]"
            />
          </ASwitchRoot>
        </div>
        <span class="text-sm text-white">v-model value: {{ customNumberState }}</span>
      </div>
    </Variant>
  </Story>
</template>
