<script setup lang="ts">
import { ADateFieldInput, ADateFieldRoot } from '..';
</script>

<template>
  <Story
    title="Date Field/Locales"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Gregorian">
      <ADateFieldRoot
        v-slot="{ segments }"
        granularity="second"
        class="border-gray9 text-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
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
            class="data-[placeholderdata-[placeholder]:text-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>

    <Variant title="Japanese">
      <ADateFieldRoot
        v-slot="{ segments }"
        granularity="second"
        locale="ja"
        class="border-gray9 text-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
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
            class="data-[placeholder]:text-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>

    <Variant title="Persian">
      <ADateFieldRoot
        v-slot="{ segments }"
        granularity="second"
        locale="fa-IR"
        class="border-gray9 text-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
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
            class="data-[placeholder]:text-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>

    <Variant title="Taiwan">
      <ADateFieldRoot
        v-slot="{ segments }"
        granularity="second"
        locale="zh-TW"
        class="border-gray9 text-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
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
            class="data-[placeholder]:text-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>

    <Variant title="Hebrew">
      <ADateFieldRoot
        v-slot="{ segments }"
        granularity="second"
        locale="he"
        class="border-gray9 text-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
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
            class="data-[placeholder]:text-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>

    <Variant title="Buddhist">
      <ADateFieldRoot
        v-slot="{ segments }"
        granularity="second"
        locale="th"
        class="border-gray9 text-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
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
            class="data-[placeholder]:text-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>
  </Story>
</template>
