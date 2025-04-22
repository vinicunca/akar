<script setup lang="ts">
import { Time } from '@internationalized/date';
import { ref } from 'vue';
import { ATimeFieldInput, ATimeFieldRoot } from '..';

const modelValue = ref<Time>();
const defaultValue = new Time(10, 0, 0);
const minValue = new Time(9);
const maxValue = new Time(18);
</script>

<template>
  <Story
    title="Time Field/Chromatic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Empty default">
      <ATimeFieldRoot
        v-slot="{ segments }"
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ATimeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ATimeFieldInput>
          <ATimeFieldInput
            v-else
            :part="item.part"
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>

    <Variant title="With default">
      <ATimeFieldRoot
        v-slot="{ segments }"
        :default-value="defaultValue"
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ATimeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ATimeFieldInput>
          <ATimeFieldInput
            v-else
            :part="item.part"
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>

    <Variant title="Uncontrolled">
      <ATimeFieldRoot
        v-slot="{ segments }"
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ATimeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ATimeFieldInput>
          <ATimeFieldInput
            v-else
            :part="item.part"
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>

    <Variant title="Controlled">
      <ATimeFieldRoot
        v-slot="{ segments }"
        v-model="modelValue"
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ATimeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ATimeFieldInput>
          <ATimeFieldInput
            v-else
            :part="item.part"
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>

    <Variant title="Min value">
      <ATimeFieldRoot
        v-slot="{ segments }"
        :min-value="minValue"
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ATimeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ATimeFieldInput>
          <ATimeFieldInput
            v-else
            :part="item.part"
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>

    <Variant title="Max value">
      <ATimeFieldRoot
        v-slot="{ segments }"
        :max-value="maxValue"
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ATimeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ATimeFieldInput>
          <ATimeFieldInput
            v-else
            :part="item.part"
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>

    <Variant title="Disabled">
      <ATimeFieldRoot
        v-slot="{ segments }"
        :disabled="true"
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ATimeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ATimeFieldInput>
          <ATimeFieldInput
            v-else
            :part="item.part"
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>

    <Variant title="Locale awareness">
      <ATimeFieldRoot
        v-slot="{ segments }"
        locale="de"
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ATimeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ATimeFieldInput>
          <ATimeFieldInput
            v-else
            :part="item.part"
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>
  </Story>
</template>
