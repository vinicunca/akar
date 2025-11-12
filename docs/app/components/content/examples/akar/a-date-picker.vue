<script setup lang="ts">
import {
  ADatePickerArrow,
  ADatePickerCalendar,
  ADatePickerCell,
  ADatePickerCellTrigger,
  ADatePickerContent,
  ADatePickerField,
  ADatePickerGrid,
  ADatePickerGridBody,
  ADatePickerGridHead,
  ADatePickerGridRow,
  ADatePickerHeadCell,
  ADatePickerHeader,
  ADatePickerHeading,
  ADatePickerInput,
  ADatePickerNext,
  ADatePickerPrev,
  ADatePickerRoot,
  ADatePickerTrigger,
  ALabel,
} from 'akar';
</script>

<template>
  <div class="flex flex-col gap-2">
    <ALabel
      class="text-sm"
      for="birthday"
    >
      Birthday
    </ALabel>
    <ADatePickerRoot
      id="birthday"
      :is-date-unavailable="date => date.day === 19"
    >
      <ADatePickerField
        v-slot="{ segments }"
        class="group text-sm color-text-highlighted px-2.5 py-1.5 rounded-md bg-background inline-flex gap-0.5 select-none ring ring-ring-accented ring-inset transition-colors items-center relative focus-visible:(ring-2 ring-primary ring-inset)"
      >
        <div class="flex items-center">
          <template
            v-for="item in segments"
            :key="item.part"
          >
            <ADatePickerInput
              class="text-center outline-hidden rounded transition-colors-280 data-[placeholder]:color-text-dimmed data-[segment=literal]:color-text-muted focus:bg-background-elevated"
              :class="{
                'w-11': item.part === 'year',
                'w-7': item.part === 'month' || item.part === 'day',
              }"
              :part="item.part"
            >
              {{ item.value }}
            </ADatePickerInput>
          </template>
        </div>

        <ADatePickerTrigger class="p-1 rounded focus:shadow-[0_0_0_2px] focus:shadow-black">
          <i
            class="i-lucide:calendar text-base"
          />
        </ADatePickerTrigger>
      </ADatePickerField>

      <ADatePickerContent
        :side-offset="4"
        class="will-change-[transform,opacity] border border-border rounded-xl bg-background shadow-sm"
      >
        <ADatePickerArrow class="fill-background stroke-background" />
        <ADatePickerCalendar
          v-slot="{ weekDays, grid }"
          class="p-4"
        >
          <ADatePickerHeader class="flex items-center justify-between">
            <ADatePickerPrev
              class="text-sm color-text font-medium p-1.5 rounded-md inline-flex gap-1.5 items-center focus-visible:bg-background-elevated hover:bg-background-elevated"
            >
              <i
                class="i-lucide:chevron-left size-4"
              />
            </ADatePickerPrev>

            <ADatePickerHeading class="text-black font-medium" />
            <ADatePickerNext
              class="text-sm color-text font-medium p-1.5 rounded-md inline-flex gap-1.5 items-center focus-visible:bg-background-elevated hover:bg-background-elevated"
            >
              <i
                class="i-lucide:chevron-right size-4"
              />
            </ADatePickerNext>
          </ADatePickerHeader>
          <div
            class="pt-4 flex flex-col space-y-4 sm:(flex-row space-x-4 space-y-0)"
          >
            <ADatePickerGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full select-none border-collapse space-y-1 focus:outline-none"
            >
              <ADatePickerGridHead>
                <ADatePickerGridRow class="mb-1 grid grid-cols-7 w-full">
                  <ADatePickerHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="text-xs color-primary rounded-md"
                  >
                    {{ day }}
                  </ADatePickerHeadCell>
                </ADatePickerGridRow>
              </ADatePickerGridHead>
              <ADatePickerGridBody>
                <ADatePickerGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="grid grid-cols-7 place-items-center"
                >
                  <ADatePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <ADatePickerCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="m-0.5 rounded-full flex size-8 whitespace-nowrap transition-colors-280 items-center justify-center relative data-[disabled]:(color-text-dimmed cursor-not-allowed) data-[outside-view]:color-text-muted data-[unavailable]:(color-text-muted line-through pointer-events-none) data-[today]:font-semibold focus:outline-none data-[highlighted]:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary data-[today]:not-[[data-selected]]:color-primary hover:not-[[data-selected]]:bg-primary/20 akar:data-[selected]:color-text-inverted akar:data-[selected]:bg-primary"
                    />
                  </ADatePickerCell>
                </ADatePickerGridRow>
              </ADatePickerGridBody>
            </ADatePickerGrid>
          </div>
        </ADatePickerCalendar>
      </ADatePickerContent>
    </ADatePickerRoot>
  </div>
</template>
