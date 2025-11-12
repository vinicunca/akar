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
  <div class="flex flex-col gap-2">
    <ALabel
      class="text-sm"
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
        class="group text-sm color-text-highlighted px-2.5 py-1.5 rounded-md bg-background inline-flex gap-0.5 select-none ring ring-ring-accented ring-inset transition-colors items-center relative focus-visible:(ring-2 ring-primary ring-inset)"
      >
        <template
          v-for="item in segments.start"
          :key="item.part"
        >
          <ADateRangePickerInput
            class="text-center outline-hidden rounded transition-colors-280 data-[placeholder]:color-text-dimmed data-[segment=literal]:color-text-muted focus:bg-background-elevated"
            :class="{
              'w-11': item.part === 'year',
              'w-7': item.part === 'month' || item.part === 'day',
            }"
            :part="item.part"
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
            class="text-center outline-hidden rounded transition-colors-280 data-[placeholder]:color-text-dimmed data-[segment=literal]:color-text-muted focus:bg-background-elevated"
            :class="{
              'w-11': item.part === 'year',
              'w-7': item.part === 'month' || item.part === 'day',
            }"
            :part="item.part"
            type="end"
          >
            {{ item.value }}
          </ADateRangePickerInput>
        </template>

        <ADateRangePickerTrigger class="p-1 rounded focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
          <i
            class="i-lucide:calendar size-4"
          />
        </ADateRangePickerTrigger>
      </ADateRangePickerField>

      <ADateRangePickerContent
        :side-offset="4"
        class="will-change-[transform,opacity] border border-border rounded-xl bg-background shadow-sm"
      >
        <ADateRangePickerArrow class="fill-white stroke-gray-300" />
        <ADateRangePickerCalendar
          v-slot="{ weekDays, grid }"
          class="p-4"
        >
          <ADateRangePickerHeader class="flex items-center justify-between">
            <ADateRangePickerPrev
              class="text-sm color-text font-medium p-1.5 rounded-md inline-flex gap-1.5 items-center focus-visible:bg-background-elevated hover:bg-background-elevated"
            >
              <i
                class="i-lucide:chevron-left size-4"
              />
            </ADateRangePickerPrev>

            <ADateRangePickerHeading class="text-sm text-black font-medium" />
            <ADateRangePickerNext
              class="text-sm color-text font-medium p-1.5 rounded-md inline-flex gap-1.5 items-center focus-visible:bg-background-elevated hover:bg-background-elevated"
            >
              <i
                class="i-lucide:chevron-right size-4"
              />
            </ADateRangePickerNext>
          </ADateRangePickerHeader>
          <div
            class="pt-4 flex flex-col space-y-4 sm:(flex-row space-x-4 space-y-0)"
          >
            <ADateRangePickerGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full select-none border-collapse space-y-1 focus:outline-none"
            >
              <ADateRangePickerGridHead>
                <ADateRangePickerGridRow class="mb-1 grid grid-cols-7 w-full">
                  <ADateRangePickerHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="text-xs color-primary rounded-md"
                  >
                    {{ day }}
                  </ADateRangePickerHeadCell>
                </ADateRangePickerGridRow>
              </ADateRangePickerGridHead>
              <ADateRangePickerGridBody class="grid">
                <ADateRangePickerGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="grid grid-cols-7 place-items-center"
                >
                  <ADateRangePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <ADateRangePickerCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="m-0.5 rounded-full flex size-8 whitespace-nowrap transition-colors-280 items-center justify-center relative data-[disabled]:(color-text-dimmed cursor-not-allowed) data-[outside-view]:color-text-muted data-[unavailable]:(color-text-muted line-through pointer-events-none) data-[today]:font-semibold focus:outline-none data-[highlighted]:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary data-[today]:not-[[data-selected]]:color-primary hover:not-[[data-selected]]:bg-primary/20 akar:data-[selected]:color-text-inverted akar:data-[selected]:bg-primary"
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
</template>
