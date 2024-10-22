<script setup lang="ts">
import { createCalendar, getLocalTimeZone, toCalendar, today } from '@internationalized/date';
import { computed, ref } from 'vue';

import { ALabel } from '~~/a-label';
import { ASelectContent, ASelectGroup, ASelectItem, ASelectItemIndicator, ASelectItemText, ASelectLabel, ASelectPortal, ASelectRoot, ASelectScrollDownButton, ASelectScrollUpButton, ASelectSeparator, ASelectTrigger, ASelectValue, ASelectViewport } from '~~/a-select';

import { ACalendarCell, ACalendarCellTrigger, ACalendarGrid, ACalendarGridBody, ACalendarGridHead, ACalendarGridRow, ACalendarHeadCell, ACalendarHeader, ACalendarHeading, ACalendarNext, ACalendarPrev, ACalendarRoot } from '..';

const preferences = [
  { locale: 'en-US', label: 'Default', ordering: 'gregory' },
  { label: 'Arabic (Algeria)', locale: 'ar-DZ', territories: 'DJ DZ EH ER IQ JO KM LB LY MA MR OM PS SD SY TD TN YE', ordering: 'gregory islamic islamic-civil islamic-tbla' },
  { label: 'Arabic (United Arab Emirates)', locale: 'ar-AE', territories: 'AE BH KW QA', ordering: 'gregory islamic-umalqura islamic islamic-civil islamic-tbla' },
  { label: 'Arabic (Egypt)', locale: 'AR-EG', territories: 'EG', ordering: 'gregory coptic islamic islamic-civil islamic-tbla' },
  { label: 'Arabic (Saudi Arabia)', locale: 'ar-SA', territories: 'SA', ordering: 'islamic-umalqura gregory islamic islamic-rgsa' },
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
const preferredACalendars = computed(() => pref.value ? pref.value.ordering.split(' ').map((p) => calendars.find((c) => c.key === p)).filter(Boolean) : [calendars[0]]);
const otherACalendars = computed(() => calendars.filter((c) => !preferredACalendars.value.some((p) => p!.key === c.key)));

function updateLocale(newLocale: string) {
  locale.value = newLocale;
  calendar.value = pref.value!.ordering.split(' ')[0];
}
const value = computed(() => toCalendar(today(getLocalTimeZone()), createCalendar(calendar.value)));
</script>

<template>
  <Story
    title="ACalendar/Locale and ACalendar ASelect"
    :layout="{ type: 'single' }"
  >
    <Variant title="default">
      <div class="flex flex-col gap-4">
        <ALabel class="text-mauve11">
          Locale
        </ALabel>
        <ASelectRoot
          v-model="locale"
          @update:model-value="updateLocale"
        >
          <ASelectTrigger
            class="h-[35px] min-w-[160px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] text-violet11 leading-none shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 data-[placeholder]:text-violet9 focus:shadow-[0_0_0_2px] focus:shadow-black"
            aria-label="Customise options"
          >
            <ASelectValue placeholder="Please select a locale">
              {{ pref!.label }}
            </ASelectValue>
            <Icon
              icon="radix-icons:chevron-down"
              class="h-4 w-4"
            />
          </ASelectTrigger>

          <ASelectPortal>
            <ASelectContent
              class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[160px] overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
              :side-offset="5"
            >
              <ASelectScrollUpButton
                class="h-[25px] flex cursor-default items-center justify-center bg-white text-violet11"
              >
                <i class="i-radix-icons:chevron-up" />
              </ASelectScrollUpButton>

              <ASelectViewport class="p-[5px]">
                <ASelectItem
                  v-for="(option, index) in preferences"
                  :key="index"
                  class="relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] text-violet11 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none"
                  :value="option.locale"
                >
                  <ASelectItemIndicator
                    class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                  >
                    <i class="i-radix-icons:check" />
                  </ASelectItemIndicator>
                  <ASelectItemText>
                    {{ option.label }}
                  </ASelectItemText>
                </ASelectItem>
              </ASelectViewport>

              <ASelectScrollDownButton
                class="h-[25px] flex cursor-default items-center justify-center bg-white text-violet11"
              >
                <i class="i-radix-icons:chevron-down" />
              </ASelectScrollDownButton>
            </ASelectContent>
          </ASelectPortal>
        </ASelectRoot>

        <ALabel class="text-mauve11">
          ACalendar
        </ALabel>
        <ASelectRoot v-model="calendar">
          <ASelectTrigger
            class="h-[35px] min-w-[160px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] text-violet11 leading-none shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 data-[placeholder]:text-violet9 focus:shadow-[0_0_0_2px] focus:shadow-black"
            aria-label="Customise options"
          >
            <ASelectValue placeholder="Please select a calendar">
              {{ calendars.find(c => c.key === calendar)?.name }}
            </ASelectValue>
            <Icon
              icon="radix-icons:chevron-down"
              class="h-4 w-4"
            />
          </ASelectTrigger>

          <ASelectPortal>
            <ASelectContent
              class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[160px] overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
              :side-offset="5"
            >
              <ASelectScrollUpButton
                class="h-[25px] flex cursor-default items-center justify-center bg-white text-violet11"
              >
                <i class="i-radix-icons:chevron-up" />
              </ASelectScrollUpButton>

              <ASelectViewport class="p-[5px]">
                <ASelectLabel
                  class="px-[25px] text-xs text-mauve11 leading-[25px]"
                >
                  Preferred
                </ASelectLabel>
                <ASelectGroup>
                  <ASelectItem
                    v-for="(option, index) in preferredACalendars"
                    :key="index"
                    class="relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] text-violet11 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none"
                    :value="option!.key"
                  >
                    <ASelectItemIndicator
                      class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                    >
                      <i class="i-radix-icons:check" />
                    </ASelectItemIndicator>
                    <ASelectItemText>
                      {{ option!.name }}
                    </ASelectItemText>
                  </ASelectItem>
                </ASelectGroup>
                <ASelectSeparator class="m-[5px] h-[1px] bg-violet6" />
                <ASelectLabel
                  class="px-[25px] text-xs text-mauve11 leading-[25px]"
                >
                  Other
                </ASelectLabel>
                <ASelectGroup>
                  <ASelectItem
                    v-for="(option, index) in otherACalendars"
                    :key="index"
                    class="relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] text-violet11 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none"
                    :value="option.key"
                  >
                    <ASelectItemIndicator
                      class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                    >
                      <i class="i-radix-icons:check" />
                    </ASelectItemIndicator>
                    <ASelectItemText>
                      {{ option.name }}
                    </ASelectItemText>
                  </ASelectItem>
                </ASelectGroup>
              </ASelectViewport>

              <ASelectScrollDownButton
                class="h-[25px] flex cursor-default items-center justify-center bg-white text-violet11"
              >
                <i class="i-radix-icons:chevron-down" />
              </ASelectScrollDownButton>
            </ASelectContent>
          </ASelectPortal>
        </ASelectRoot>

        <ACalendarRoot
          v-slot="{ weekDays, grid }"
          v-model="value"
          :locale="locale"
          class="mt-6 border border-black rounded-xl bg-white p-4 shadow-md"
        >
          <ACalendarHeader class="flex items-center justify-between">
            <ACalendarPrev
              class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
            >
              <Icon
                icon="i-radix-icons:chevron-left"
                class="h-6 w-6"
              />
            </ACalendarPrev>

            <ACalendarHeading class="text-[15px] text-black font-medium" />

            <ACalendarNext
              class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
            >
              <Icon
                icon="i-radix-icons:chevron-right"
                class="h-6 w-6"
              />
            </ACalendarNext>
          </ACalendarHeader>

          <div
            class="flex flex-col pt-4 sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0"
          >
            <ACalendarGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full border-collapse select-none space-y-1"
            >
              <ACalendarGridHead>
                <ACalendarGridRow class="grid grid-cols-7 mb-1 w-full">
                  <ACalendarHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="rounded-md text-xs text-black !font-normal"
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
                      class="relative h-8 w-8 flex items-center justify-center whitespace-nowrap border border-transparent rounded-lg bg-transparent text-sm text-black font-normal outline-none before:absolute before:top-[5px] before:hidden before:h-1 before:w-1 hover:border-black before:rounded-full before:bg-white data-[selected]:bg-black data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium data-[unavailable]:line-through focus:shadow-[0_0_0_2px] focus:shadow-black data-[today]:before:block data-[selected]:before:bg-white data-[today]:before:bg-grass9"
                    />
                  </ACalendarCell>
                </ACalendarGridRow>
              </ACalendarGridBody>
            </ACalendarGrid>
          </div>
        </ACalendarRoot>
      </div>
    </Variant>
  </Story>
</template>
