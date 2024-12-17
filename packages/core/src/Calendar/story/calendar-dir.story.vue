<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ACalendarCell, ACalendarCellTrigger, ACalendarGrid, ACalendarGridBody, ACalendarGridHead, ACalendarGridRow, ACalendarHeadCell, ACalendarHeader, ACalendarHeading, ACalendarNext, ACalendarPrev, ACalendarRoot } from '..'
import { AConfigProvider } from '~~/AConfigProvider'
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

          class="mt-6 rounded-xl border border-black bg-white p-4 shadow-md"
        >
          <ACalendarHeader class="flex items-center justify-between">
            <ACalendarPrev
              class="inline-flex items-center cursor-pointer text-black justify-center rounded-[9px] bg-transparent w-10 h-10 hover:bg-black hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              <Icon
                icon="radix-icons:chevron-left"
                class="w-6 h-6"
              />
            </ACalendarPrev>

            <ACalendarHeading class="text-[15px] text-black font-medium" />

            <ACalendarNext
              class="inline-flex items-center cursor-pointer text-black justify-center rounded-[9px] bg-transparent w-10 h-10 hover:bg-black hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              <Icon
                icon="radix-icons:chevron-right"
                class="w-6 h-6"
              />
            </ACalendarNext>
          </ACalendarHeader>

          <div
            class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <ACalendarGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full border-collapse select-none space-y-1"
            >
              <ACalendarGridHead>
                <ACalendarGridRow class="mb-1 grid w-full grid-cols-7">
                  <ACalendarHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="rounded-md text-xs !font-normal text-black"
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
                    class="relative text-center text-sm"
                  >
                    <ACalendarCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="relative flex items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-transparent text-sm font-normal text-black w-8 h-8 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black hover:border-black data-[selected]:bg-black data-[selected]:font-medium data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-grass9 data-[selected]:before:bg-white"
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
