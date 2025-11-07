<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ALabel } from '../label';
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
} from '..';
</script>

<template>
  <Story title="Date Picker/Default">
    <Variant title="default">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-gray9 text-sm"
          for="date-field"
        >
          Birthday
        </ALabel>
        <ADatePickerRoot
          id="date-field"
          :is-date-unavailable="date => date.day === 19"
          locale="ar-SA"
        >
          <ADatePickerField
            v-slot="{ segments }"
            class="border-gray9 color-green10 placeholder:text-mauve5 p-1 text-center border rounded-lg bg-white flex select-none items-center data-[invalid]:border-red-500"
          >
            <template
              v-for="item in segments"
              :key="item.part"
            >
              <ADatePickerInput
                v-if="item.part === 'literal'"
                :part="item.part"
              >
                {{ item.value }}
              </ADatePickerInput>
              <ADatePickerInput
                v-else
                :part="item.part"
                class="data-[placeholder]:color-green9 px-1 py-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
              >
                {{ item.value }}
              </ADatePickerInput>
            </template>

            <ADatePickerTrigger class="ml-4 mr-1 focus:shadow-[0_0_0_2px] focus:shadow-black">
              <Icon
                icon="radix-icons:calendar"
                class="h-6 w-6"
              />
            </ADatePickerTrigger>
          </ADatePickerField>

          <ADatePickerContent
            :side-offset="8"
            class="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade will-change-[transform,opacity] rounded-lg bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
          >
            <ADatePickerArrow class="fill-white" />
            <ADatePickerCalendar
              v-slot="{ weekDays, grid }"
              class="p-4"
            >
              <ADatePickerHeader class="flex items-center justify-between">
                <ADatePickerPrev
                  class="text-black rounded-[9px] bg-transparent inline-flex h-8 w-8 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
                >
                  <Icon
                    icon="radix-icons:chevron-left"
                    class="h-6 w-6"
                  />
                </ADatePickerPrev>

                <ADatePickerHeading class="text-[15px] text-black font-medium" />
                <ADatePickerNext
                  class="text-black rounded-[9px] bg-transparent inline-flex h-8 w-8 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
                >
                  <Icon
                    icon="radix-icons:chevron-right"
                    class="h-6 w-6"
                  />
                </ADatePickerNext>
              </ADatePickerHeader>
              <div
                class="pt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              >
                <ADatePickerGrid
                  v-for="month in grid"
                  :key="month.value.toString()"
                  class="w-full select-none border-collapse space-y-1"
                >
                  <ADatePickerGridHead>
                    <ADatePickerGridRow class="mb-1 grid grid-cols-7 w-full">
                      <ADatePickerHeadCell
                        v-for="day in weekDays"
                        :key="day"
                        class="text-xs text-black !font-normal"
                      >
                        {{ day }}
                      </ADatePickerHeadCell>
                    </ADatePickerGridRow>
                  </ADatePickerGridHead>
                  <ADatePickerGridBody>
                    <ADatePickerGridRow
                      v-for="(weekDates, index) in month.rows"
                      :key="`weekDate-${index}`"
                      class="flex w-full"
                    >
                      <ADatePickerCell
                        v-for="weekDate in weekDates"
                        :key="weekDate.toString()"
                        :date="weekDate"
                      >
                        <ADatePickerCellTrigger
                          :day="weekDate"
                          :month="month.value"
                          class="data-[today]:before:bg-grass9 text-sm text-black font-normal outline-none border border-transparent rounded-lg bg-transparent flex h-8 w-8 whitespace-nowrap items-center justify-center relative data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium hover:border-black before:rounded-full before:bg-white data-[selected]:bg-black data-[unavailable]:line-through before:h-1 before:w-1 before:hidden focus:shadow-[0_0_0_2px] focus:shadow-black before:top-[5px] before:absolute data-[selected]:before:bg-white data-[today]:before:block"
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
    </Variant>
  </Story>
</template>
