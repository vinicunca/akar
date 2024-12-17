<script setup lang="ts">
import { Icon } from '@iconify/vue'
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
  type ADateRangePickerRootEmits,
  type ADateRangePickerRootProps,
  ADateRangePickerTrigger,
} from '..'
import { useForwardPropsEmits } from '~~/shared'

const props = defineProps<ADateRangePickerRootProps>()
const emits = defineEmits<ADateRangePickerRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ADateRangePickerRoot v-bind="forwarded">
    <ADateRangePickerField
      v-slot="{ segments }"
      class="flex select-none items-center rounded-lg text-center text-green10 placeholder:text-mauve5 border border-gray9 p-1 bg-white data-[invalid]:border-red-500"
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
          class="rounded-md p-1 hover:bg-grass4 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9"
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
          class="rounded-md p-1 hover:bg-grass4 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9"
        >
          {{ item.value }}
        </ADateRangePickerInput>
      </template>
      <ADateRangePickerTrigger class="ml-4 focus:shadow-[0_0_0_2px] focus:shadow-black">
        <Icon
          icon="radix-icons:calendar"
          class="w-6 h-6"
        />
      </ADateRangePickerTrigger>
    </ADateRangePickerField>

    <ADateRangePickerContent
      :side-offset="10"
      class="rounded-lg bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
    >
      <ADateRangePickerArrow class="fill-white" />
      <ADateRangePickerCalendar
        v-slot="{ weekDays, grid }"
        class="p-4"
      >
        <ADateRangePickerHeader class="flex items-center justify-between">
          <ADateRangePickerPrev
            class="inline-flex items-center cursor-pointer text-black justify-center rounded-md bg-transparent w-8 h-8 hover:bg-green10 hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            <Icon
              icon="radix-icons:chevron-left"
              class="w-5 h-5"
            />
          </ADateRangePickerPrev>

          <ADateRangePickerHeading class="text-[15px] text-black font-medium" />
          <ADateRangePickerNext
            class="inline-flex items-center cursor-pointer text-black justify-center rounded-md bg-transparent w-8 h-8 hover:bg-green10 hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            <Icon
              icon="radix-icons:chevron-right"
              class="w-5 h-5"
            />
          </ADateRangePickerNext>
        </ADateRangePickerHeader>
        <div
          class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <ADateRangePickerGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full border-collapse select-none space-y-1"
          >
            <ADateRangePickerGridHead>
              <ADateRangePickerGridRow class="mb-1 flex w-full justify-between">
                <ADateRangePickerHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="w-8 h-8 rounded-md text-xs font-normal text-black"
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
                  class="relative text-center text-sm p-0"
                >
                  <ADateRangePickerCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="relative flex items-center justify-center whitespace-nowrap bg-transparent text-sm font-normal text-black w-8 h-8 outline-offset-0 outline-none data-[selection-start]:rounded-l-lg data-[selection-end]:rounded-r-lg focus:outline-black hover:outline-black data-[selected]:bg-green10 data-[selected]:font-medium data-[disabled]:text-black/30 data-[selected]:text-white data-[highlighted]:bg-grass9/30 data-[selection-start]:bg-green10  data-[selection-end]:bg-green10  data-[unavailable]:text-black/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-grass9 data-[selected]:before:bg-white"
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
