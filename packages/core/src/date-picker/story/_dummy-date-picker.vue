<script setup lang="ts">
import type { ADatePickerRootEmits, ADatePickerRootProps } from '..';
import { Icon } from '@iconify/vue';
import { useForwardPropsEmits } from '~~/shared';
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

const props = defineProps<ADatePickerRootProps>();
const emits = defineEmits<ADatePickerRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ADatePickerRoot
    v-bind="forwarded"
  >
    <ADatePickerField
      v-slot="{ segments }"
      class="flex select-none items-center border border-gray9 rounded-lg bg-white p-1 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
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
          class="rounded-5px px-1 py-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
      class="will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade rounded-lg bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
    >
      <ADatePickerArrow class="fill-white" />
      <ADatePickerCalendar
        v-slot="{ weekDays, grid }"
        class="p-4"
      >
        <ADatePickerHeader class="flex items-center justify-between">
          <ADatePickerPrev
            class="h-8 w-8 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-left"
              class="h-6 w-6"
            />
          </ADatePickerPrev>

          <ADatePickerHeading class="text-[15px] text-black font-medium" />
          <ADatePickerNext
            class="h-8 w-8 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-right"
              class="h-6 w-6"
            />
          </ADatePickerNext>
        </ADatePickerHeader>
        <div
          class="flex flex-col pt-4 sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0"
        >
          <ADatePickerGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full border-collapse select-none space-y-1"
          >
            <ADatePickerGridHead>
              <ADatePickerGridRow class="grid grid-cols-7 mb-1 w-full">
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
                class="w-full flex"
              >
                <ADatePickerCell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                >
                  <ADatePickerCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="relative h-8 w-8 flex items-center justify-center whitespace-nowrap border border-transparent rounded-lg bg-transparent text-sm text-black font-normal outline-none before:absolute before:top-[5px] before:hidden before:h-1 before:w-1 hover:border-black before:rounded-full before:bg-white data-[selected]:bg-black data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium data-[unavailable]:line-through focus:shadow-[0_0_0_2px] focus:shadow-black data-[today]:before:block data-[selected]:before:bg-white data-[today]:before:bg-grass9"
                  />
                </ADatePickerCell>
              </ADatePickerGridRow>
            </ADatePickerGridBody>
          </ADatePickerGrid>
        </div>
      </ADatePickerCalendar>
    </ADatePickerContent>
  </ADatePickerRoot>
</template>
