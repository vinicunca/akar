<script setup lang="ts">
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
  ALabel,
} from 'akar';
</script>

<template>
  <div class="flex flex-col w-full items-center">
    <div class="pb-40 pt-40 gap-4 grid grid-cols-3 max-w-6xl w-full">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-sm text-stone-700 dark:text-white"
          for="booking"
        >
          Booking
        </ALabel>
        <ADateRangePickerRoot
          id="booking"
          :is-date-unavailable="date => date.day === 19"
        >
          <ADateRangePickerField
            v-slot="{ segments }"
            class="text-green10 p-1 text-center border rounded-lg bg-white flex select-none shadow-sm items-center data-[invalid]:border-red-500"
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
                :part="item.part"
                class="data-[placeholder]:text-green9 p-0.5 rounded-md focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                type="start"
              >
                {{ item.value }}
              </ADateRangePickerInput>
            </template>
            <span class="mx-2">

              -
            </span>
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
                :part="item.part"
                class="data-[placeholder]:text-green9 p-0.5 rounded-md focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                type="end"
              >
                {{ item.value }}
              </ADateRangePickerInput>
            </template>

            <ADateRangePickerTrigger class="ml-4 p-1 rounded focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
              <Icon
                icon="radix-icons:calendar"
                class="h-4 w-4"
              />
            </ADateRangePickerTrigger>
          </ADateRangePickerField>

          <ADateRangePickerContent
            :side-offset="4"
            class="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade will-change-[transform,opacity] border rounded-xl bg-white shadow-sm"
          >
            <ADateRangePickerArrow class="fill-white stroke-gray-300" />
            <ADateRangePickerCalendar
              v-slot="{ weekDays, grid }"
              class="p-4"
            >
              <ADateRangePickerHeader class="flex items-center justify-between">
                <ADateRangePickerPrev
                  class="text-black rounded-md bg-transparent inline-flex h-7 w-7 cursor-pointer items-center justify-center hover:bg-stone-100 focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
                >
                  <!-- <Icon
                icon="radix-icons:chevron-left"
                class="h-4 w-4"
              /> -->
                  qwe
                </ADateRangePickerPrev>

                <ADateRangePickerHeading class="text-sm text-black font-medium" />
                <ADateRangePickerNext
                  class="text-black rounded-md bg-transparent inline-flex h-7 w-7 cursor-pointer items-center justify-center hover:bg-stone-100 focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
                >
                  <!-- <Icon
                icon="radix-icons:chevron-right"
                class="h-4 w-4"
              /> -->
                  asd
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
                        class="text-xs text-black rounded-md w-8 !font-normal"
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
                      >
                        <ADateRangePickerCellTrigger
                          :day="weekDate"
                          :month="month.value"
                          class="data-[selected]:!bg-green10 hover:bg-green5 data-[highlighted]:bg-green5 data-[today]:before:bg-green9 text-sm text-black font-normal outline-none rounded-full flex h-8 w-8 whitespace-nowrap items-center justify-center relative data-[outside-view]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 before:rounded-full before:bg-white data-[unavailable]:line-through before:h-1 before:w-1 before:hidden data-[unavailable]:pointer-events-none focus:shadow-[0_0_0_2px] focus:shadow-black before:top-[5px] before:absolute data-[today]:before:block"
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
    </div>
  </div>
</template>

<style>
</style>
