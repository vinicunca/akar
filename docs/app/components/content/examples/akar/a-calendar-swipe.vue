<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { usePointerSwipe } from '@vueuse/core';
import { ACalendarCell, ACalendarCellTrigger, ACalendarGrid, ACalendarGridBody, ACalendarGridHead, ACalendarGridRow, ACalendarHeadCell, ACalendarHeader, ACalendarHeading, ACalendarNext, ACalendarPrev, ACalendarRoot } from 'akar';
import { onMounted, ref, useTemplateRef } from 'vue';

const calendarRef = useTemplateRef('calendarRef');
const date = ref(new CalendarDate(2023, 1, 1));

function nextPage() {
  date.value = date.value.add({ months: 1 }).copy();
}

function prevPage() {
  date.value = date.value.subtract({ months: 1 }).copy();
}

onMounted(() => {
  if (calendarRef.value) {
    usePointerSwipe(calendarRef.value.$el, {
      onSwipeEnd(_e, direction) {
        if (direction === 'none') {
          // eslint-disable-next-line no-useless-return
          return;
        } else if (['down', 'right'].includes(direction)) {
          prevPage();
        } else {
          nextPage();
        }
      },
    });
  }
});
</script>

<template>
  <ACalendarRoot
    ref="calendarRef"
    v-slot="{ weekDays, grid }"
    v-model:placeholder="date"
    fixed-weeks
  >
    <ACalendarHeader class="flex items-center justify-between">
      <ACalendarPrev
        class="text-sm color-text font-medium p-1.5 rounded-md inline-flex gap-1.5 items-center focus-visible:bg-background-elevated hover:bg-background-elevated"
      >
        <i
          class="i-lucide:chevron-left h-4 w-4"
        />
      </ACalendarPrev>
      <ACalendarHeading class="text-sm font-medium mx-auto text-center truncate" />

      <ACalendarNext
        class="text-sm color-text font-medium p-1.5 rounded-md inline-flex gap-1.5 items-center focus-visible:bg-background-elevated hover:bg-background-elevated"
      >
        <i
          class="i-lucide:chevron-right h-4 w-4"
        />
      </ACalendarNext>
    </ACalendarHeader>
    <div
      class="pt-4 flex flex-col space-y-4 sm:(flex-row space-x-4 space-y-0)"
    >
      <ACalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="w-full select-none border-collapse space-y-1 focus:outline-none"
      >
        <ACalendarGridHead>
          <ACalendarGridRow class="mb-1 grid grid-cols-7 w-full">
            <ACalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="text-xs color-primary rounded-md"
            >
              {{ day }}
            </ACalendarHeadCell>
          </ACalendarGridRow>
        </ACalendarGridHead>
        <ACalendarGridBody class="grid">
          <ACalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="grid grid-cols-7 place-items-center"
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
                class="m-0.5 rounded-full flex size-8 whitespace-nowrap transition-colors-280 items-center justify-center relative data-[disabled]:(color-text-dimmed cursor-not-allowed) data-[outside-view]:color-text-muted data-[unavailable]:(color-text-muted line-through pointer-events-none) data-[today]:font-semibold focus:outline-none data-[highlighted]:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary data-[today]:not-[[data-selected]]:color-primary hover:not-[[data-selected]]:bg-primary/20 akar:data-[selected]:color-text-inverted akar:data-[selected]:bg-primary"
              />
            </ACalendarCell>
          </ACalendarGridRow>
        </ACalendarGridBody>
      </ACalendarGrid>
    </div>
  </ACalendarRoot>
</template>
