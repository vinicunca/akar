<script setup lang="ts">
import { ATimeFieldInput, ATimeFieldRoot } from '..'
</script>

<template>
  <Story
    title="Time Field/Locales"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Gregorian">
      <ATimeFieldRoot
        v-slot="{ segments }"
        granularity="second"
        class="flex select-none bg-white items-center rounded text-center text-green10 placeholder:text-mauve5 border border-gray9 p-2 data-[invalid]:border-red-500"
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
            class="rounded-5px px-1 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholderdata-[placeholder]:text-green9"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>

    <Variant title="Japanese">
      <ATimeFieldRoot
        v-slot="{ segments }"
        granularity="second"
        locale="ja"
        class="flex select-none bg-white items-center rounded text-center text-green10 placeholder:text-mauve5 border border-gray9 p-2 data-[invalid]:border-red-500"
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
            class="rounded-5px px-1 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>

    <Variant title="Persian">
      <ATimeFieldRoot
        v-slot="{ segments }"
        granularity="second"
        locale="fa-IR"
        class="flex select-none bg-white items-center rounded text-center text-green10 placeholder:text-mauve5 border border-gray9 p-2 data-[invalid]:border-red-500"
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
            class="rounded-5px px-1 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>

    <Variant title="Taiwan">
      <ATimeFieldRoot
        v-slot="{ segments }"
        granularity="second"
        locale="zh-TW"
        class="flex select-none bg-white items-center rounded text-center text-green10 placeholder:text-mauve5 border border-gray9 p-2 data-[invalid]:border-red-500"
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
            class="rounded-5px px-1 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>

    <Variant title="Hebrew">
      <ATimeFieldRoot
        v-slot="{ segments }"
        granularity="second"
        locale="he"
        class="flex select-none bg-white items-center rounded text-center text-green10 placeholder:text-mauve5 border border-gray9 p-2 data-[invalid]:border-red-500"
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
            class="rounded-5px px-1 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>

    <Variant title="Buddhist">
      <ATimeFieldRoot
        v-slot="{ segments }"
        granularity="second"
        locale="th"
        class="flex select-none bg-white items-center rounded text-center text-green10 placeholder:text-mauve5 border border-gray9 p-2 data-[invalid]:border-red-500"
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
            class="rounded-5px px-1 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9"
          >
            {{ item.value }}
          </ATimeFieldInput>
        </template>
      </ATimeFieldRoot>
    </Variant>
  </Story>
</template>
