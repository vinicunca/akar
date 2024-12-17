<script setup lang="ts">
import { Icon } from '@iconify/vue'
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
} from '..'
import { ALabel } from '~~/label'
</script>

<template>
  <Story title="Date Picker/Default">
    <Variant title="default">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-sm text-gray9"
          for="date-field"
        >Birthday</ALabel>
        <ADatePickerRoot
          id="date-field"
          :is-date-unavailable="date => date.day === 19"
          locale="ar-SA"
        >
          <ADatePickerField
            v-slot="{ segments }"
            class="bg-white flex select-none items-center rounded-lg text-center text-green10 placeholder:text-mauve5 border border-gray9 p-1 data-[invalid]:border-red-500"
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
                class="rounded-5px px-1 py-1 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9"
              >
                {{ item.value }}
              </ADatePickerInput>
            </template>

            <ADatePickerTrigger class="ml-4 mr-1 focus:shadow-[0_0_0_2px] focus:shadow-black">
              <Icon
                icon="radix-icons:calendar"
                class="w-6 h-6"
              />
            </ADatePickerTrigger>
          </ADatePickerField>

          <ADatePickerContent
            :side-offset="8"
            class="rounded-lg bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          >
            <ADatePickerArrow class="fill-white" />
            <ADatePickerCalendar
              v-slot="{ weekDays, grid }"
              class="p-4"
            >
              <ADatePickerHeader class="flex items-center justify-between">
                <ADatePickerPrev
                  class="inline-flex items-center cursor-pointer text-black justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-black hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
                >
                  <Icon
                    icon="radix-icons:chevron-left"
                    class="w-6 h-6"
                  />
                </ADatePickerPrev>

                <ADatePickerHeading class="text-[15px] text-black font-medium" />
                <ADatePickerNext
                  class="inline-flex items-center cursor-pointer text-black justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-black hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
                >
                  <Icon
                    icon="radix-icons:chevron-right"
                    class="w-6 h-6"
                  />
                </ADatePickerNext>
              </ADatePickerHeader>
              <div
                class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              >
                <ADatePickerGrid
                  v-for="month in grid"
                  :key="month.value.toString()"
                  class="w-full border-collapse select-none space-y-1"
                >
                  <ADatePickerGridHead>
                    <ADatePickerGridRow class="mb-1 grid w-full grid-cols-7">
                      <ADatePickerHeadCell
                        v-for="day in weekDays"
                        :key="day"
                        class="text-xs !font-normal text-black"
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
                          class="relative flex items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-transparent text-sm font-normal text-black w-8 h-8 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black hover:border-black data-[selected]:bg-black data-[selected]:font-medium data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-grass9 data-[selected]:before:bg-white"
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
