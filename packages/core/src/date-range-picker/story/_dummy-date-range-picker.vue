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
      class="text-green10 placeholder:text-mauve5 flex select-none items-center border border-gray9 rounded-lg bg-white p-1 text-center data-[invalid]:border-red-500"
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
          class="hover:bg-grass4 rounded-md p-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
          class="hover:bg-grass4 rounded-md p-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
      class="will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade rounded-lg bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
    >
      <ADateRangePickerArrow class="fill-white" />
      <ADateRangePickerCalendar
        v-slot="{ weekDays, grid }"
        class="p-4"
      >
        <ADateRangePickerHeader class="flex items-center justify-between">
          <ADateRangePickerPrev
            class="hover:bg-green10 h-8 w-8 inline-flex cursor-pointer items-center justify-center rounded-md bg-transparent text-black active:scale-98 hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-left"
              class="h-5 w-5"
            />
          </ADateRangePickerPrev>

          <ADateRangePickerHeading class="text-[15px] text-black font-medium" />
          <ADateRangePickerNext
            class="hover:bg-green10 h-8 w-8 inline-flex cursor-pointer items-center justify-center rounded-md bg-transparent text-black active:scale-98 hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-right"
              class="h-5 w-5"
            />
          </ADateRangePickerNext>
        </ADateRangePickerHeader>
        <div
          class="flex flex-col pt-4 sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0"
        >
          <ADateRangePickerGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full border-collapse select-none space-y-1"
          >
            <ADateRangePickerGridHead>
              <ADateRangePickerGridRow class="mb-1 w-full flex justify-between">
                <ADateRangePickerHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="h-8 w-8 rounded-md text-xs text-black font-normal"
                >
                  {{ day }}
                </ADateRangePickerHeadCell>
              </ADateRangePickerGridRow>
            </ADateRangePickerGridHead>
            <ADateRangePickerGridBody>
              <ADateRangePickerGridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="w-full flex"
              >
                <ADateRangePickerCell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                  class="relative p-0 text-center text-sm"
                >
                  <ADateRangePickerCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="data-[today]:before:bg-grass9 data-[highlighted]:bg-grass9/30 data-[selected]:bg-green10 data-[selection-start]:bg-green10 data-[selection-end]:bg-green10 relative h-8 w-8 flex items-center justify-center whitespace-nowrap bg-transparent text-sm text-black font-normal outline-offset-0 outline-none before:absolute before:top-[5px] before:hidden before:h-1 before:w-1 data-[selection-end]:rounded-r-lg data-[selection-start]:rounded-l-lg before:bg-white data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium data-[unavailable]:line-through focus:outline-black hover:outline-black data-[today]:before:block data-[selected]:before:bg-white"
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
