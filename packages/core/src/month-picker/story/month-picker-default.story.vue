<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  AMonthPickerCell,
  AMonthPickerCellTrigger,
  AMonthPickerGrid,
  AMonthPickerGridBody,
  AMonthPickerGridRow,
  AMonthPickerHeader,
  AMonthPickerHeading,
  AMonthPickerNext,
  AMonthPickerPrev,
  AMonthPickerRoot,
} from '..';
</script>

<template>
  <Story
    title="MonthPicker/Default"
    :layout="{ type: 'single' }"
  >
    <Variant title="default">
      <AMonthPickerRoot
        v-slot="{ grid }"
        class="mt-6 p-4 border border-black rounded-xl bg-white shadow-md"
      >
        <AMonthPickerHeader class="flex items-center justify-between">
          <AMonthPickerPrev
            class="text-black rounded-[9px] bg-transparent inline-flex h-10 w-10 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-left"
              class="h-6 w-6"
            />
          </AMonthPickerPrev>

          <AMonthPickerHeading class="text-[15px] text-black font-medium" />

          <AMonthPickerNext
            class="text-black rounded-[9px] bg-transparent inline-flex h-10 w-10 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-right"
              class="h-6 w-6"
            />
          </AMonthPickerNext>
        </AMonthPickerHeader>

        <AMonthPickerGrid class="mt-4 w-full select-none border-collapse space-y-1">
          <AMonthPickerGridBody class="grid">
            <AMonthPickerGridRow
              v-for="(monthRow, rowIndex) in grid.rows"
              :key="`monthRow-${rowIndex}`"
              class="gap-1 grid grid-cols-4"
            >
              <AMonthPickerCell
                v-for="month in monthRow"
                :key="month.toString()"
                :date="month"
                class="text-sm text-center relative"
              >
                <AMonthPickerCellTrigger
                  :month="month"
                  class="data-[today]:before:bg-grass9 text-sm text-black font-normal outline-none border border-transparent rounded-lg bg-transparent flex h-10 w-full whitespace-nowrap items-center justify-center relative data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium hover:border-black before:rounded-full before:bg-white data-[selected]:bg-black data-[unavailable]:line-through before:h-1 before:w-1 before:hidden data-[disabled]:pointer-events-none focus:shadow-[0_0_0_2px] focus:shadow-black before:top-[5px] before:absolute data-[selected]:before:bg-white data-[today]:before:block"
                />
              </AMonthPickerCell>
            </AMonthPickerGridRow>
          </AMonthPickerGridBody>
        </AMonthPickerGrid>
      </AMonthPickerRoot>
    </Variant>
  </Story>
</template>
