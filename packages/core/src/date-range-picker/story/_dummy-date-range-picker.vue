<script setup lang="ts">
import type { ADateRangePickerRootEmits, ADateRangePickerRootProps } from '..';
import { Icon } from '@iconify/vue';
import { useForwardPropsEmits } from '~~/shared';
import {
  ADateRangePickerArrow,
  ADateRangePickerCalendar,
  ADateRangePickerCell,
  ADateRangePickerCellTrigger,
  ADateRangePickerContent,
  ADateRangePickerField,
  ADateRangePickerGrid,
  ADateRangePickerGridBody,
  ADateRangePickerGridHead,
  ADateRangePickerGridRow,
  ADateRangePickerHeadCell,
  ADateRangePickerHeader,
  ADateRangePickerHeading,
  ADateRangePickerInput,
  ADateRangePickerNext,
  ADateRangePickerPrev,
  ADateRangePickerRoot,

  ADateRangePickerTrigger,
} from '..';

const props = defineProps<ADateRangePickerRootProps>();
const emits = defineEmits<ADateRangePickerRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ADateRangePickerRoot v-bind="forwarded">
    <ADateRangePickerField
      v-slot="{ segments }"
      class="border-gray9 color-green10 placeholder:text-mauve5 p-1 text-center border rounded-lg bg-white flex select-none items-center data-[invalid]:border-red-500"
    >
      <template
        v-for="item in segments.start"
        :key="item.part"
      >
        <ADateRangePickerInput
          v-if="item.part === 'literal'"
          :part="item.part"
          type="start"
        >
          {{ item.value }}
        </ADateRangePickerInput>
        <ADateRangePickerInput
          v-else
          type="start"
          :part="item.part"
          class="hover:bg-grass4 data-[placeholder]:color-green9 p-1 rounded-md focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        >
          {{ item.value }}
        </ADateRangePickerInput>
      </template>
      -

      <template
        v-for="item in segments.end"
        :key="item.part"
      >
        <ADateRangePickerInput
          v-if="item.part === 'literal'"
          :part="item.part"
          type="end"
        >
          {{ item.value }}
        </ADateRangePickerInput>
        <ADateRangePickerInput
          v-else
          type="end"
          :part="item.part"
          class="hover:bg-grass4 data-[placeholder]:color-green9 p-1 rounded-md focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        >
          {{ item.value }}
        </ADateRangePickerInput>
      </template>
      <ADateRangePickerTrigger class="ml-4 focus:shadow-[0_0_0_2px] focus:shadow-black">
        <Icon
          icon="radix-icons:calendar"
          class="h-6 w-6"
        />
      </ADateRangePickerTrigger>
    </ADateRangePickerField>

    <ADateRangePickerContent
      :side-offset="10"
      class="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade will-change-[transform,opacity] rounded-lg bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
    >
      <ADateRangePickerArrow class="fill-white" />
      <ADateRangePickerCalendar
        v-slot="{ weekDays, grid }"
        class="p-4"
      >
        <ADateRangePickerHeader class="flex items-center justify-between">
          <ADateRangePickerPrev
            class="hover:bg-green10 text-black rounded-md bg-transparent inline-flex h-8 w-8 cursor-pointer items-center justify-center hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-left"
              class="h-5 w-5"
            />
          </ADateRangePickerPrev>

          <ADateRangePickerHeading class="text-[15px] text-black font-medium" />
          <ADateRangePickerNext
            class="hover:bg-green10 text-black rounded-md bg-transparent inline-flex h-8 w-8 cursor-pointer items-center justify-center hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-right"
              class="h-5 w-5"
            />
          </ADateRangePickerNext>
        </ADateRangePickerHeader>
        <div
          class="pt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <ADateRangePickerGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full select-none border-collapse space-y-1"
          >
            <ADateRangePickerGridHead>
              <ADateRangePickerGridRow class="mb-1 flex w-full justify-between">
                <ADateRangePickerHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="text-xs text-black font-normal rounded-md h-8 w-8"
                >
                  {{ day }}
                </ADateRangePickerHeadCell>
              </ADateRangePickerGridRow>
            </ADateRangePickerGridHead>
            <ADateRangePickerGridBody>
              <ADateRangePickerGridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="flex w-full"
              >
                <ADateRangePickerCell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                  class="text-sm p-0 text-center relative"
                >
                  <ADateRangePickerCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="data-[highlighted]:bg-grass9/30 data-[selected]:bg-green10 data-[selection-end]:bg-green10 data-[selection-start]:bg-green10 data-[today]:before:bg-grass9 text-sm text-black font-normal outline-offset-0 outline-none bg-transparent flex h-8 w-8 whitespace-nowrap items-center justify-center relative data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium focus:outline-black hover:outline-black data-[selection-end]:rounded-r-lg data-[selection-start]:rounded-l-lg before:bg-white data-[unavailable]:line-through before:h-1 before:w-1 before:hidden before:top-[5px] before:absolute data-[selected]:before:bg-white data-[today]:before:block"
                  />
                </ADateRangePickerCell>
              </ADateRangePickerGridRow>
            </ADateRangePickerGridBody>
          </ADateRangePickerGrid>
        </div>
      </ADateRangePickerCalendar>
    </ADateRangePickerContent>
  </ADateRangePickerRoot>
</template>
