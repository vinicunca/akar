<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import { CalendarDate } from '@internationalized/date';
import { ref } from 'vue';
import { ADateFieldInput, ADateFieldRoot } from '..';

const modelValue = ref<DateValue>();
const defaultValue = new CalendarDate(2024, 2, 28);
const minValue = new CalendarDate(2024, 2, 24);
const maxValue = new CalendarDate(2024, 2, 29);
</script>

<template>
  <Story
    title="Date Field/Chromatic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Empty default">
      <ADateFieldRoot
        v-slot="{ segments }"
        class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ADateFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ADateFieldInput>
          <ADateFieldInput
            v-else
            :part="item.part"
            class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>

    <Variant title="With default">
      <ADateFieldRoot
        v-slot="{ segments }"
        :default-value="defaultValue"
        class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ADateFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ADateFieldInput>
          <ADateFieldInput
            v-else
            :part="item.part"
            class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>

    <Variant title="Uncontrolled">
      <ADateFieldRoot
        v-slot="{ segments }"
        class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ADateFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ADateFieldInput>
          <ADateFieldInput
            v-else
            :part="item.part"
            class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>

    <Variant title="Controlled">
      <ADateFieldRoot
        v-slot="{ segments }"
        v-model="modelValue"
        class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ADateFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ADateFieldInput>
          <ADateFieldInput
            v-else
            :part="item.part"
            class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>

    <Variant title="Min date">
      <ADateFieldRoot
        v-slot="{ segments }"
        :default-value="defaultValue"
        :min-value="minValue"
        class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ADateFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ADateFieldInput>
          <ADateFieldInput
            v-else
            :part="item.part"
            class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>

    <Variant title="Max date">
      <ADateFieldRoot
        v-slot="{ segments }"
        :default-value="defaultValue"
        :max-value="maxValue"
        class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ADateFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ADateFieldInput>
          <ADateFieldInput
            v-else
            :part="item.part"
            class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>

    <Variant title="Disabled">
      <ADateFieldRoot
        v-slot="{ segments }"
        :default-value="defaultValue"
        :disabled="true"
        class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ADateFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ADateFieldInput>
          <ADateFieldInput
            v-else
            :part="item.part"
            class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>

    <Variant title="Locale awareness">
      <ADateFieldRoot
        v-slot="{ segments }"
        locale="de"
        class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
      >
        <template
          v-for="item in segments"
          :key="item.part"
        >
          <ADateFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
          >
            {{ item.value }}
          </ADateFieldInput>
          <ADateFieldInput
            v-else
            :part="item.part"
            class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>
  </Story>
</template>
