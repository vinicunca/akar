<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  AYearPickerCell,
  AYearPickerCellTrigger,
  AYearPickerGrid,
  AYearPickerGridBody,
  AYearPickerGridRow,
  AYearPickerHeader,
  AYearPickerHeading,
  AYearPickerNext,
  AYearPickerPrev,
  AYearPickerRoot,
} from '..';
</script>

<template>
  <Story
    title="YearPicker/Default"
    :layout="{ type: 'single' }"
  >
    <Variant title="default">
      <AYearPickerRoot
        v-slot="{ grid }"
        class="mt-6 p-4 border border-black rounded-xl bg-white shadow-md"
      >
        <AYearPickerHeader class="flex items-center justify-between">
          <AYearPickerPrev
            class="text-black rounded-[9px] bg-transparent inline-flex h-10 w-10 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-left"
              class="h-6 w-6"
            />
          </AYearPickerPrev>

          <AYearPickerHeading class="text-[15px] text-black font-medium" />

          <AYearPickerNext
            class="text-black rounded-[9px] bg-transparent inline-flex h-10 w-10 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-right"
              class="h-6 w-6"
            />
          </AYearPickerNext>
        </AYearPickerHeader>

        <AYearPickerGrid class="mt-4 w-full select-none border-collapse space-y-1">
          <AYearPickerGridBody class="grid">
            <AYearPickerGridRow
              v-for="(yearRow, rowIndex) in grid.rows"
              :key="`yearRow-${rowIndex}`"
              class="gap-1 grid grid-cols-4"
            >
              <AYearPickerCell
                v-for="year in yearRow"
                :key="year.toString()"
                :date="year"
                class="text-sm text-center relative"
              >
                <AYearPickerCellTrigger
                  :year="year"
                  class="data-[today]:before:bg-grass9 text-sm text-black font-normal outline-none border border-transparent rounded-lg bg-transparent flex h-10 w-full whitespace-nowrap items-center justify-center relative data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium hover:border-black before:rounded-full before:bg-white data-[selected]:bg-black data-[unavailable]:line-through before:h-1 before:w-1 before:hidden data-[disabled]:pointer-events-none focus:shadow-[0_0_0_2px] focus:shadow-black before:top-[5px] before:absolute data-[selected]:before:bg-white data-[today]:before:block"
                />
              </AYearPickerCell>
            </AYearPickerGridRow>
          </AYearPickerGridBody>
        </AYearPickerGrid>
      </AYearPickerRoot>
    </Variant>
  </Story>
</template>
