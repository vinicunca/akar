<script setup lang="ts">
import { ALabel } from '~~/a-label';

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
</script>

<template>
  <Story title="ADateRangePicker/Default">
    <Variant title="default">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-sm text-gray9"
          for="date-field"
        >
          Hotel Booking Dates
        </ALabel>
        <ADateRangePickerRoot
          id="date-field"
          :is-date-unavailable="date => date.day === 19"
        >
          <ADateRangePickerField
            v-slot="{ segments }"
            class="flex select-none items-center border border-gray9 rounded p-2 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
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
                class="]:text-grass6 rounded-5px px-1 py-1 hover:bg-grass4 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
                class="]:text-grass6 rounded-5px px-1 py-1 hover:bg-grass4 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
              >
                {{ item.value }}
              </ADateRangePickerInput>
            </template>
            <ADateRangePickerTrigger class="focus:shadow-[0_0_0_2px] focus:shadow-black">
              <i
                class="i-radix-icons:calendar h-6 w-6"
              />
            </ADateRangePickerTrigger>
          </ADateRangePickerField>

          <ADateRangePickerContent
            align="end"
            :side-offset="16"
            class="will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade rounded-lg bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green7)]"
          >
            <ADateRangePickerArrow class="fill-white" />
            <ADateRangePickerCalendar
              v-slot="{ weekDays, grid }"
              class="p-[22px]"
            >
              <ADateRangePickerHeader class="flex items-center justify-between">
                <ADateRangePickerPrev
                  class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
                >
                  <i
                    class="i-radix-icons:chevron-left h-6 w-6"
                  />
                </ADateRangePickerPrev>

                <ADateRangePickerHeading class="text-[15px] text-black font-medium" />
                <ADateRangePickerNext
                  class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
                >
                  <i
                    class="i-radix-icons:chevron-right h-6 w-6"
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
                        class="w-10 rounded-md text-xs text-black !font-normal"
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
                        class="relative h-10 w-10 text-center text-sm !p-0"
                      >
                        <ADateRangePickerCellTrigger
                          :day="weekDate"
                          :month="month.value"
                          class="relative flex items-center justify-center whitespace-nowrap border border-transparent rounded-[9px] bg-transparent p-2 text-sm text-black font-normal outline-none before:absolute before:top-[5px] before:hidden before:h-1 before:w-1 hover:border-black before:rounded-full data-[highlighted]:rounded-none data-[selection-end]:rounded-none data-[selection-start]:rounded-none data-[selection-end]:rounded-r-[9px] data-[selection-start]:rounded-l-[9px] before:bg-white data-[highlighted]:bg-grass9/30 data-[selected]:bg-black data-[selection-end]:bg-black data-[selection-start]:bg-black data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium data-[unavailable]:line-through focus:shadow-[0_0_0_2px] focus:shadow-black data-[today]:before:block data-[selected]:before:bg-white data-[today]:before:bg-grass9 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:rounded-none"
                        />
                      </ADateRangePickerCell>
                    </ADateRangePickerGridRow>
                  </ADateRangePickerGridBody>
                </ADateRangePickerGrid>
              </div>
            </ADateRangePickerCalendar>
          </ADateRangePickerContent>
        </ADateRangePickerRoot>
      </div>
    </Variant>
  </Story>
</template>
