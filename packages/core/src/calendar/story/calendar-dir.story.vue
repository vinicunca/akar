<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { AConfigProvider } from '../AConfigProvider';
import { ACalendarCell, ACalendarCellTrigger, ACalendarGrid, ACalendarGridBody, ACalendarGridHead, ACalendarGridRow, ACalendarHeadCell, ACalendarHeader, ACalendarHeading, ACalendarNext, ACalendarPrev, ACalendarRoot } from '..';
</script>

<template>
  <Story
    title="Calendar/Direction"
    :layout="{ type: 'single' }"
  >
    <Variant title="default">
      <AConfigProvider dir="rtl">
        <ACalendarRoot
          v-slot="{ weekDays, grid }"

          class="mt-6 p-4 border border-black rounded-xl bg-white shadow-md"
        >
          <ACalendarHeader class="flex items-center justify-between">
            <ACalendarPrev
              class="text-black rounded-[9px] bg-transparent inline-flex h-10 w-10 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
            >
              <Icon
                icon="radix-icons:chevron-left"
                class="h-6 w-6"
              />
            </ACalendarPrev>

            <ACalendarHeading class="text-[15px] text-black font-medium" />

            <ACalendarNext
              class="text-black rounded-[9px] bg-transparent inline-flex h-10 w-10 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
            >
              <Icon
                icon="radix-icons:chevron-right"
                class="h-6 w-6"
              />
            </ACalendarNext>
          </ACalendarHeader>

          <div
            class="pt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <ACalendarGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full select-none border-collapse space-y-1"
            >
              <ACalendarGridHead>
                <ACalendarGridRow class="mb-1 grid grid-cols-7 w-full">
                  <ACalendarHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="text-xs text-black rounded-md !font-normal"
                  >
                    {{ day }}
                  </ACalendarHeadCell>
                </ACalendarGridRow>
              </ACalendarGridHead>
              <ACalendarGridBody class="grid">
                <ACalendarGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="grid grid-cols-7"
                >
                  <ACalendarCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                    class="text-sm text-center relative"
                  >
                    <ACalendarCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="data-[today]:before:bg-grass9 text-sm text-black font-normal outline-none border border-transparent rounded-lg bg-transparent flex h-8 w-8 whitespace-nowrap items-center justify-center relative data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium hover:border-black before:rounded-full before:bg-white data-[selected]:bg-black data-[unavailable]:line-through before:h-1 before:w-1 before:hidden focus:shadow-[0_0_0_2px] focus:shadow-black before:top-[5px] before:absolute data-[selected]:before:bg-white data-[today]:before:block"
                    />
                  </ACalendarCell>
                </ACalendarGridRow>
              </ACalendarGridBody>
            </ACalendarGrid>
          </div>
        </ACalendarRoot>
      </AConfigProvider>
    </Variant>
  </Story>
</template>
