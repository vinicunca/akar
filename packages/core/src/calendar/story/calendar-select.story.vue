<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { createCalendar, getLocalTimeZone, toCalendar, today } from '@internationalized/date';
import { computed, ref } from 'vue';
import { ALabel } from '~~/label';
import { ASelectContent, ASelectGroup, ASelectItem, ASelectItemIndicator, ASelectItemText, ASelectLabel, ASelectPortal, ASelectRoot, ASelectScrollDownButton, ASelectScrollUpButton, ASelectSeparator, ASelectTrigger, ASelectValue, ASelectViewport } from '~~/select';
import { ACalendarCell, ACalendarCellTrigger, ACalendarGrid, ACalendarGridBody, ACalendarGridHead, ACalendarGridRow, ACalendarHeadCell, ACalendarHeader, ACalendarHeading, ACalendarNext, ACalendarPrev, ACalendarRoot } from '..';

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
  <Story
    title="Calendar/Locale and Calendar Select"
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
            class="text-violet11 hover:bg-mauve3 data-[placeholder]:text-violet9 text-[13px] leading-none px-[15px] outline-none rounded bg-white inline-flex gap-[5px] h-[35px] min-w-[160px] shadow-[0_2px_10px] shadow-black/10 items-center justify-between focus:shadow-[0_0_0_2px] focus:shadow-black"
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
              class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade will-change-[opacity,transform] rounded bg-white min-w-[160px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] overflow-hidden"
              :side-offset="5"
            >
              <ASelectScrollUpButton
                class="text-violet11 bg-white flex h-[25px] cursor-default items-center justify-center"
              >
                <Icon icon="radix-icons:chevron-up" />
              </ASelectScrollUpButton>

              <ASelectViewport class="p-[5px]">
                <ASelectItem
                  v-for="(option, index) in preferences"
                  :key="index"
                  class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
                  :value="option.locale"
                >
                  <ASelectItemIndicator
                    class="inline-flex w-[25px] items-center left-0 justify-center absolute"
                  >
                    <Icon icon="radix-icons:check" />
                  </ASelectItemIndicator>
                  <ASelectItemText>
                    {{ option.label }}
                  </ASelectItemText>
                </ASelectItem>
              </ASelectViewport>

              <ASelectScrollDownButton
                class="text-violet11 bg-white flex h-[25px] cursor-default items-center justify-center"
              >
                <Icon icon="radix-icons:chevron-down" />
              </ASelectScrollDownButton>
            </ASelectContent>
          </ASelectPortal>
        </ASelectRoot>

        <ALabel class="text-mauve11">
          Calendar
        </ALabel>
        <ASelectRoot v-model="calendar">
          <ASelectTrigger
            class="text-violet11 hover:bg-mauve3 data-[placeholder]:text-violet9 text-[13px] leading-none px-[15px] outline-none rounded bg-white inline-flex gap-[5px] h-[35px] min-w-[160px] shadow-[0_2px_10px] shadow-black/10 items-center justify-between focus:shadow-[0_0_0_2px] focus:shadow-black"
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
              class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade will-change-[opacity,transform] rounded bg-white min-w-[160px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] overflow-hidden"
              :side-offset="5"
            >
              <ASelectScrollUpButton
                class="text-violet11 bg-white flex h-[25px] cursor-default items-center justify-center"
              >
                <Icon icon="radix-icons:chevron-up" />
              </ASelectScrollUpButton>

              <ASelectViewport class="p-[5px]">
                <ASelectLabel
                  class="text-mauve11 text-xs leading-[25px] px-[25px]"
                >
                  Preferred
                </ASelectLabel>
                <ASelectGroup>
                  <ASelectItem
                    v-for="(option, index) in preferredCalendars"
                    :key="index"
                    class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
                    :value="option!.key"
                  >
                    <ASelectItemIndicator
                      class="inline-flex w-[25px] items-center left-0 justify-center absolute"
                    >
                      <Icon icon="radix-icons:check" />
                    </ASelectItemIndicator>
                    <ASelectItemText>
                      {{ option!.name }}
                    </ASelectItemText>
                  </ASelectItem>
                </ASelectGroup>
                <ASelectSeparator class="bg-violet6 m-[5px] h-[1px]" />
                <ASelectLabel
                  class="text-mauve11 text-xs leading-[25px] px-[25px]"
                >
                  Other
                </ASelectLabel>
                <ASelectGroup>
                  <ASelectItem
                    v-for="(option, index) in otherCalendars"
                    :key="index"
                    class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
                    :value="option.key"
                  >
                    <ASelectItemIndicator
                      class="inline-flex w-[25px] items-center left-0 justify-center absolute"
                    >
                      <Icon icon="radix-icons:check" />
                    </ASelectItemIndicator>
                    <ASelectItemText>
                      {{ option.name }}
                    </ASelectItemText>
                  </ASelectItem>
                </ASelectGroup>
              </ASelectViewport>

              <ASelectScrollDownButton
                class="text-violet11 bg-white flex h-[25px] cursor-default items-center justify-center"
              >
                <Icon icon="radix-icons:chevron-down" />
              </ASelectScrollDownButton>
            </ASelectContent>
          </ASelectPortal>
        </ASelectRoot>

        <ACalendarRoot
          v-slot="{ weekDays, grid }"
          v-model="value"
          :locale="locale"
          class="mt-6 p-4 border border-black rounded-xl bg-white shadow-md"
        >
          <ACalendarHeader class="flex items-center justify-between">
            <ACalendarPrev
              class="text-black rounded-[9px] bg-transparent inline-flex h-10 w-10 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
            >
              <Icon
                icon="radix-icons:chevron-left"
                class="h-6 w-6"
              />
            </ACalendarPrev>

            <ACalendarHeading class="text-[15px] text-black font-medium" />

            <ACalendarNext
              class="text-black rounded-[9px] bg-transparent inline-flex h-10 w-10 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
            >
              <Icon
                icon="radix-icons:chevron-right"
                class="h-6 w-6"
              />
            </ACalendarNext>
          </ACalendarHeader>

          <div
            class="pt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <ACalendarGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full select-none border-collapse space-y-1"
            >
              <ACalendarGridHead>
                <ACalendarGridRow class="mb-1 grid grid-cols-7 w-full">
                  <ACalendarHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="text-xs text-black rounded-md !font-normal"
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
                    class="text-sm text-center relative"
                  >
                    <ACalendarCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="data-[today]:before:bg-grass9 text-sm text-black font-normal outline-none border border-transparent rounded-lg bg-transparent flex h-8 w-8 whitespace-nowrap items-center justify-center relative data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium hover:border-black before:rounded-full before:bg-white data-[selected]:bg-black data-[unavailable]:line-through before:h-1 before:w-1 before:hidden focus:shadow-[0_0_0_2px] focus:shadow-black before:top-[5px] before:absolute data-[selected]:before:bg-white data-[today]:before:block"
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
