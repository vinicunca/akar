<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { AToggle } from '.';

const toggleState = ref<boolean>(false);
const toggleStateOn = ref<boolean>(true);
const toggleStateDefaultOn = ref<boolean>();
const toggleStateDefaultOff = ref<boolean>();

function onChange() {
  // eslint-disable-next-line no-alert
  alert('On Change Event');
}
</script>

<template>
  <Story
    title="AToggle/Demo"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="chromatic">
      <div class="items-left flex flex-col dark:text-white">
        <h1 class="text-xl font-bold dark:text-white">
          Uncontrolled
        </h1>
        <span class="">default off</span>
        <AToggle
          v-model="toggleState"
          aria-label="AToggle bold"
          class="color-mauve11 data-[state=on]:text-violet12 shadow-blackA7 h-[35px] w-[35px] flex items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] data-[state=on]:bg-violet6 hover:bg-violet3 focus-within:shadow-[0_0_0_2px] focus-within:shadow-black"
        >
          <Icon
            icon="radix-icons:font-bold"
            class="text-black"
          />
        </AToggle>
        <span class="">default on</span>
        <AToggle
          v-model="toggleStateOn"
          :default-value="true"
          aria-label="AToggle bold"
          class="color-mauve11 data-[state=on]:text-violet12 shadow-blackA7 h-[35px] w-[35px] flex items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] data-[state=on]:bg-violet6 hover:bg-violet3 focus-within:shadow-[0_0_0_2px] focus-within:shadow-black"
        >
          <Icon
            icon="radix-icons:font-bold"
            class="text-black"
          />
        </AToggle>

        <h1 class="text-xl font-bold dark:text-white">
          Controlled
        </h1>
        <span class="">default off</span>
        <AToggle
          v-model="toggleStateDefaultOff"
          aria-label="AToggle bold"
          :default-value="false"
          class="color-mauve11 data-[state=on]:text-violet12 shadow-blackA7 h-[35px] w-[35px] flex items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] data-[state=on]:bg-violet6 hover:bg-violet3 focus-within:shadow-[0_0_0_2px] focus-within:shadow-black"
        >
          <Icon
            icon="radix-icons:font-bold"
            class="text-black"
          />
        </AToggle>

        <span class="">default on</span>
        <AToggle
          v-model="toggleStateDefaultOn"
          aria-label="AToggle bold"
          :default-value="true"
          class="color-mauve11 data-[state=on]:text-violet12 shadow-blackA7 h-[35px] w-[35px] flex items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] data-[state=on]:bg-violet6 hover:bg-violet3 focus-within:shadow-[0_0_0_2px] focus-within:shadow-black"
        >
          <Icon
            icon="radix-icons:font-bold"
            class="text-black"
          />
        </AToggle>

        <h1 class="text-xl font-bold dark:text-white">
          Events
        </h1>
        <span class="">@update:modelValue</span>
        <AToggle
          v-model="toggleState"
          aria-label="AToggle bold"
          class="color-mauve11 data-[state=on]:text-violet12 shadow-blackA7 h-[35px] w-[35px] flex items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] data-[state=on]:bg-violet6 hover:bg-violet3 focus-within:shadow-[0_0_0_2px] focus-within:shadow-black"
          @update:model-value="onChange"
        >
          <Icon
            icon="radix-icons:font-bold"
            class="text-black"
          />
        </AToggle>
      </div>
    </Variant>
    <Variant title="default">
      <AToggle
        v-model="toggleState"
        aria-label="AToggle bold"
        class="color-mauve11 data-[state=on]:text-violet12 shadow-blackA7 h-[35px] w-[35px] flex items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] data-[state=on]:bg-violet6 hover:bg-violet3 focus-within:shadow-[0_0_0_2px] focus-within:shadow-black"
      >
        <Icon
          icon="radix-icons:font-bold"
          class="text-black"
        />
      </AToggle>
    </Variant>
    <Variant title="toggled by default">
      <AToggle
        v-model="toggleStateDefaultOn"
        aria-label="AToggle bold"
        :default-value="true"
        class="color-mauve11 data-[state=on]:text-violet12 shadow-blackA7 h-[35px] w-[35px] flex items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] data-[state=on]:bg-violet6 hover:bg-violet3 focus-within:shadow-[0_0_0_2px] focus-within:shadow-black"
      >
        <Icon
          icon="radix-icons:font-bold"
          class="text-black"
        />
      </AToggle>
    </Variant>
    <Variant title="onPressedChange Event">
      <AToggle
        v-model="toggleState"
        aria-label="AToggle bold"
        class="color-mauve11 data-[state=on]:text-violet12 shadow-blackA7 h-[35px] w-[35px] flex items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] data-[state=on]:bg-violet6 hover:bg-violet3 focus-within:shadow-[0_0_0_2px] focus-within:shadow-black"
        @update:model-value="onChange"
      >
        <Icon
          icon="radix-icons:font-bold"
          class="text-black"
        />
      </AToggle>
    </Variant>
  </Story>
</template>
