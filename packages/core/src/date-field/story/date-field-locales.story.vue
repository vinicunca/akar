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
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
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
            class="data-[placeholderdata-[placeholder]:text-green9 rounded-5px px-1 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
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
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
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
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
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
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
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
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
        class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
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
            class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          >
            {{ item.value }}
          </ADateFieldInput>
        </template>
      </ADateFieldRoot>
    </Variant>
  </Story>
</template>
