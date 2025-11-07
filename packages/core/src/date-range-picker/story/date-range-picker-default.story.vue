<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ALabel } from '../label';
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
  <Story title="Date Range Picker/Default">
    <Variant title="default">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-gray9 text-sm"
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
            class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded flex select-none items-center data-[invalid]:border-red-500"
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
                class="]:text-grass6 hover:bg-grass4 px-1 py-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
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
                class="]:text-grass6 hover:bg-grass4 px-1 py-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
              >
                {{ item.value }}
              </ADateRangePickerInput>
            </template>
            <ADateRangePickerTrigger class="focus:shadow-[0_0_0_2px] focus:shadow-black">
              <Icon
                icon="radix-icons:calendar"
                class="h-6 w-6"
              />
            </ADateRangePickerTrigger>
          </ADateRangePickerField>

          <ADateRangePickerContent
            align="end"
            :side-offset="16"
            class="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade will-change-[transform,opacity] rounded-lg bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
          >
            <ADateRangePickerArrow class="fill-white" />
            <ADateRangePickerCalendar
              v-slot="{ weekDays, grid }"
              class="p-[22px]"
            >
              <ADateRangePickerHeader class="flex items-center justify-between">
                <ADateRangePickerPrev
                  class="text-black rounded-[9px] bg-transparent inline-flex h-10 w-10 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
                >
                  <Icon
                    icon="radix-icons:chevron-left"
                    class="h-6 w-6"
                  />
                </ADateRangePickerPrev>

                <ADateRangePickerHeading class="text-[15px] text-black font-medium" />
                <ADateRangePickerNext
                  class="text-black rounded-[9px] bg-transparent inline-flex h-10 w-10 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
                >
                  <Icon
                    icon="radix-icons:chevron-right"
                    class="h-6 w-6"
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
                        class="text-xs text-black rounded-md w-10 !font-normal"
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
                        class="text-sm text-center h-10 w-10 relative !p-0"
                      >
                        <ADateRangePickerCellTrigger
                          :day="weekDate"
                          :month="month.value"
                          class="data-[highlighted]:bg-grass9/30 data-[today]:before:bg-grass9 text-sm text-black font-normal p-2 outline-none border border-transparent rounded-[9px] bg-transparent flex whitespace-nowrap items-center justify-center relative data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium hover:border-black before:rounded-full data-[highlighted]:rounded-none data-[selection-end]:rounded-none data-[selection-start]:rounded-none data-[selection-end]:rounded-r-[9px] data-[selection-start]:rounded-l-[9px] before:bg-white data-[selected]:bg-black data-[selection-end]:bg-black data-[selection-start]:bg-black data-[unavailable]:line-through before:h-1 before:w-1 before:hidden focus:shadow-[0_0_0_2px] focus:shadow-black before:top-[5px] before:absolute data-[selected]:before:bg-white data-[today]:before:block data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:rounded-none"
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
