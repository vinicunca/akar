<script setup lang="ts">
import { createCalendar, getLocalTimeZone, toCalendar, today } from '@internationalized/date';
import { ACalendarCell, ACalendarCellTrigger, ACalendarGrid, ACalendarGridBody, ACalendarGridHead, ACalendarGridRow, ACalendarHeadCell, ACalendarHeader, ACalendarHeading, ACalendarNext, ACalendarPrev, ACalendarRoot, ALabel, ASelectContent, ASelectGroup, ASelectItem, ASelectItemIndicator, ASelectItemText, ASelectLabel, ASelectPortal, ASelectRoot, ASelectScrollDownButton, ASelectScrollUpButton, ASelectSeparator, ASelectTrigger, ASelectValue, ASelectViewport } from 'akar';
import { computed, ref } from 'vue';

const preferences = [
  { locale: 'en-US', label: 'Default', ordering: 'gregory' },
  { label: 'Arabic (Algeria)', locale: 'ar-DZ', territories: 'DJ DZ EH ER IQ JO KM LB LY MA MR OM PS SD SY TD TN YE', ordering: 'gregory islamic islamic-civil islamic-tbla' },
  { label: 'Arabic (United Arab Emirates)', locale: 'ar-AE', territories: 'AE BH KW QA', ordering: 'gregory islamic-umalqura islamic islamic-civil islamic-tbla' },
  { label: 'Arabic (Egypt)', locale: 'AR-EG', territories: 'EG', ordering: 'gregory coptic islamic islamic-civil islamic-tbla' },
  { label: 'Arabic (Saudi Arabia)', locale: 'ar-SA', territories: 'SA', ordering: 'islamic-umalqura gregory islamic islamic-rgsa' },
  { label: 'Farsi (Iran)', locale: 'fa-IR', territories: 'IR', ordering: 'persian gregory islamic islamic-civil islamic-tbla' },
  { label: 'Farsi (Afghanistan)', locale: 'fa-AF', territories: 'AF IR', ordering: 'persian gregory islamic islamic-civil islamic-tbla' },
  { label: 'Amharic (Ethiopia)', locale: 'am-ET', territories: 'ET', ordering: 'gregory ethiopic ethioaa' },
  { label: 'Hebrew (Israel)', locale: 'he-IL', territories: 'IL', ordering: 'gregory hebrew islamic islamic-civil islamic-tbla' },
  { label: 'Hindi (India)', locale: 'hi-IN', territories: 'IN', ordering: 'gregory indian' },
  { label: 'Japanese (Japan)', locale: 'ja-JP', territories: 'JP', ordering: 'gregory japanese' },
  { label: 'Thai (Thailand)', locale: 'th-TH', territories: 'TH', ordering: 'buddhist gregory' },
  { label: 'Chinese (Taiwan)', locale: 'zh-TW', territories: 'TW', ordering: 'gregory roc chinese' },
];

const calendars = [
  { key: 'gregory', name: 'Gregorian' },
  { key: 'japanese', name: 'Japanese' },
  { key: 'buddhist', name: 'Buddhist' },
  { key: 'roc', name: 'Taiwan' },
  { key: 'persian', name: 'Persian' },
  { key: 'indian', name: 'Indian' },
  { key: 'islamic-umalqura', name: 'Islamic (Umm al-Qura)' },
  { key: 'islamic-civil', name: 'Islamic Civil' },
  { key: 'islamic-tbla', name: 'Islamic Tabular' },
  { key: 'hebrew', name: 'Hebrew' },
  { key: 'coptic', name: 'Coptic' },
  { key: 'ethiopic', name: 'Ethiopic' },
  { key: 'ethioaa', name: 'Ethiopic (Amete Alem)' },
];

const locale = ref(preferences[0].locale);
const calendar = ref(calendars[0].key);

const pref = computed(() => preferences.find((p) => p.locale === locale.value));
const preferredCalendars = computed(() => pref.value ? pref.value.ordering.split(' ').map((p) => calendars.find((c) => c.key === p)).filter(Boolean) : [calendars[0]]);
const otherCalendars = computed(() => calendars.filter((c) => !preferredCalendars.value.some((p) => p!.key === c.key)));

function updateLocale(newLocale: string) {
  locale.value = newLocale;
  calendar.value = pref.value!.ordering.split(' ')[0];
}
const value = computed(() => toCalendar(today(getLocalTimeZone()), createCalendar(calendar.value)));
</script>

<template>
  <div class="flex flex-col gap-4">
    <ALabel class="text-white">
      Locale
    </ALabel>
    <ASelectRoot
      v-model="locale"
      @update:model-value="updateLocale"
    >
      <ASelectTrigger
        class="text-grass11 hover:bg-mauve3 data-[placeholder]:text-green9 text-xs leading-none px-[15px] outline-none rounded-md bg-white inline-flex gap-[5px] h-[35px] min-w-[160px] shadow-[0_2px_10px] shadow-black/10 items-center justify-between focus:shadow-[0_0_0_2px] focus:shadow-black"
        aria-label="Select a locale"
      >
        <ASelectValue placeholder="Please select a locale">
          {{ pref!.label }}
        </ASelectValue>
        <i
          class="i-lucide:chevron-down h-3.5 w-3.5"
        />
      </ASelectTrigger>

      <ASelectPortal>
        <ASelectContent
          class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade will-change-[opacity,transform] rounded-md bg-white min-w-[160px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-[100]"
          :side-offset="5"
        >
          <ASelectScrollUpButton class="text-violet11 bg-white flex h-[25px] cursor-default items-center justify-center">
            <i class="i-lucide:chevron-up" />
          </ASelectScrollUpButton>

          <ASelectViewport class="p-[5px]">
            <ASelectItem
              v-for="(option, index) in preferences"
              :key="index"
              class="text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-green9 data-[highlighted]:text-green1 text-xs leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
              :value="option.locale"
            >
              <ASelectItemIndicator class="inline-flex w-[25px] items-center left-0 justify-center absolute">
                <i class="i-lucide:check" />
              </ASelectItemIndicator>
              <ASelectItemText>
                {{ option.label }}
              </ASelectItemText>
            </ASelectItem>
          </ASelectViewport>

          <ASelectScrollDownButton class="text-violet11 bg-white flex h-[25px] cursor-default items-center justify-center">
            <i class="i-lucide:chevron-down" />
          </ASelectScrollDownButton>
        </ASelectContent>
      </ASelectPortal>
    </ASelectRoot>
    <ALabel class="text-white">
      Calendar
    </ALabel>
    <ASelectRoot v-model="calendar">
      <ASelectTrigger
        class="text-grass11 hover:bg-mauve3 data-[placeholder]:text-green9 text-xs leading-none px-[15px] outline-none rounded-md bg-white inline-flex gap-[5px] h-[35px] min-w-[160px] shadow-[0_2px_10px] shadow-black/10 items-center justify-between focus:shadow-[0_0_0_2px] focus:shadow-black"
        aria-label="Select a calendar"
      >
        <ASelectValue placeholder="Please select a calendar">
          {{ calendars.find(c => c.key === calendar)?.name }}
        </ASelectValue>

        <i
          class="i-lucide:chevron-down h-3.5 w-3.5"
        />
      </ASelectTrigger>

      <ASelectPortal>
        <ASelectContent
          class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade will-change-[opacity,transform] rounded-md bg-white min-w-[160px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-[100]"
          :side-offset="5"
        >
          <ASelectScrollUpButton class="text-violet11 bg-white flex h-[25px] cursor-default items-center justify-center">
            <i class="i-lucide:chevron-up" />
          </ASelectScrollUpButton>

          <ASelectViewport class="p-[5px]">
            <ASelectLabel class="text-mauve11 text-xs leading-[25px] px-[25px]">
              Preferred
            </ASelectLabel>
            <ASelectGroup>
              <ASelectItem
                v-for="(option, index) in preferredCalendars"
                :key="index"
                class="text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-green9 data-[highlighted]:text-green1 text-xs leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
                :value="option!.key"
              >
                <ASelectItemIndicator class="inline-flex w-[25px] items-center left-0 justify-center absolute">
                  <i class="i-lucide:check" />
                </ASelectItemIndicator>
                <ASelectItemText>
                  {{ option!.name }}
                </ASelectItemText>
              </ASelectItem>
            </ASelectGroup>
            <ASelectSeparator class="bg-green6 m-[5px] h-[1px]" />
            <ASelectLabel class="text-mauve11 text-xs leading-[25px] px-[25px]">
              Other
            </ASelectLabel>
            <ASelectGroup>
              <ASelectItem
                v-for="(option, index) in otherCalendars"
                :key="index"
                class="text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-green9 data-[highlighted]:text-green1 text-xs leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
                :value="option.key"
              >
                <ASelectItemIndicator class="inline-flex w-[25px] items-center left-0 justify-center absolute">
                  <i class="i-lucide:check" />
                </ASelectItemIndicator>
                <ASelectItemText>
                  {{ option.name }}
                </ASelectItemText>
              </ASelectItem>
            </ASelectGroup>
          </ASelectViewport>

          <ASelectScrollDownButton class="text-violet11 bg-white flex h-[25px] cursor-default items-center justify-center">
            <i class="i-lucide:chevron-down" />
          </ASelectScrollDownButton>
        </ASelectContent>
      </ASelectPortal>
    </ASelectRoot>

    <ACalendarRoot
      v-slot="{ weekDays, grid }"
      :model-value="value"
      :locale="locale"
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
  </div>
</template>
