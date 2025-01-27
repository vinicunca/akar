<script setup lang="ts">
import type { ADateRangeFieldRootEmits, ADateRangeFieldRootProps } from '..';
import { useForwardPropsEmits } from '~~/shared';
import { ADateRangeFieldInput, ADateRangeFieldRoot } from '..';

const props = defineProps<ADateRangeFieldRootProps>();
const emits = defineEmits<ADateRangeFieldRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ADateRangeFieldRoot
    v-slot="{ segments }"
    v-bind="forwarded"
    class="text-green10 placeholder:text-mauve5 flex select-none items-center border border-gray9 rounded-lg bg-white p-1 text-center data-[invalid]:border-red-500"
  >
    <template
      v-for="item in segments.start"
      :key="item.part"
    >
      <ADateRangeFieldInput
        v-if="item.part === 'literal'"
        :part="item.part"
        type="start"
      >
        {{ item.value }}
      </ADateRangeFieldInput>
      <ADateRangeFieldInput
        v-else
        :part="item.part"
        class="hover:bg-grass4 rounded-5px p-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
        type="start"
      >
        {{ item.value }}
      </ADateRangeFieldInput>
    </template>
    -
    <template
      v-for="item in segments.end"
      :key="item.part"
    >
      <ADateRangeFieldInput
        v-if="item.part === 'literal'"
        :part="item.part"
        type="end"
      >
        {{ item.value }}
      </ADateRangeFieldInput>
      <ADateRangeFieldInput
        v-else
        :part="item.part"
        class="hover:bg-grass4 rounded-5px p-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
        type="end"
      >
        {{ item.value }}
      </ADateRangeFieldInput>
    </template>
  </ADateRangeFieldRoot>
</template>
