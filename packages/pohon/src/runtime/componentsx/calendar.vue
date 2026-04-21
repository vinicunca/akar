<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { AppConfig } from '@nuxt/schema';
import type { CalendarCellTriggerProps, CalendarRootEmits, CalendarRootProps, DateRange, RangeCalendarRootEmits, RangeCalendarRootProps } from 'akar';
import type { VNode } from 'vue';
import type { PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/calendar';
import { getWeekNumber } from 'akar/date';

type Calendar = ComponentConfig<typeof theme, AppConfig, 'calendar'>;

type CalendarDefaultValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? DateRange
  : M extends true
    ? Array<DateValue>
    : DateValue;
type CalendarModelValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? (DateRange | null)
  : M extends true
    ? (Array<DateValue> | undefined)
    : (DateValue | undefined);

type _CalendarRootProps = Omit<CalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale' | 'calendarLabel' | 'multiple'>;
type _RangeCalendarRootProps = Omit<RangeCalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale' | 'calendarLabel' | 'multiple'>;

export interface CalendarProps<R extends boolean = false, M extends boolean = false> extends _RangeCalendarRootProps, _CalendarRootProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon to use for the next year control.
   * @defaultValue appConfig.pohon.icons.chevronDoubleRight
   * @IconifyIcon
   */
  nextYearIcon?: PIconProps['name'];
  /**
   * Configure the next year button.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  nextYear?: Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon to use for the next month control.
   * @defaultValue appConfig.pohon.icons.chevronRight
   * @IconifyIcon
   */
  nextMonthIcon?: PIconProps['name'];
  /**
   * Configure the next month button.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  nextMonth?: Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon to use for the previous year control.
   * @defaultValue appConfig.pohon.icons.chevronDoubleLeft
   * @IconifyIcon
   */
  prevYearIcon?: PIconProps['name'];
  /**
   * Configure the prev year button.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  prevYear?: Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon to use for the previous month control.
   * @defaultValue appConfig.pohon.icons.chevronLeft
   * @IconifyIcon
   */
  prevMonthIcon?: PIconProps['name'];
  /**
   * Configure the prev month button.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  prevMonth?: Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * @defaultValue 'primary'
   */
  color?: Calendar['variants']['color'];
  /**
   * @defaultValue 'solid'
   */
  variant?: Calendar['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Calendar['variants']['size'];
  /** Whether or not a range of dates can be selected */
  range?: R & boolean;
  /** Whether or not multiple dates can be selected */
  multiple?: M & boolean;
  /** Show month controls */
  monthControls?: boolean;
  /** Show year controls */
  yearControls?: boolean;
  defaultValue?: CalendarDefaultValue<R, M>;
  modelValue?: CalendarModelValue<R, M>;
  weekNumbers?: boolean;
  class?: any;
  pohon?: Calendar['slots'];
}

export interface CalendarEmits<R extends boolean = false, M extends boolean = false> extends Omit<CalendarRootEmits & RangeCalendarRootEmits, 'update:modelValue'> {
  'update:modelValue': [value: CalendarModelValue<R, M>];
}

export interface CalendarSlots {
  'heading'?: (props: { value: string }) => Array<VNode>;
  'day'?: (props: Pick<CalendarCellTriggerProps, 'day'>) => Array<VNode>;
  'week-day'?: (props: { day: string }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="R extends boolean, M extends boolean">
import { useAppConfig } from '#imports';
import { reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'akar';
import { RangeCalendar, Calendar as SingleCalendar } from 'akar/namespaced';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PButton from './button.vue';

const props = withDefaults(defineProps<CalendarProps<R, M>>(), {
  fixedWeeks: true,
  monthControls: true,
  yearControls: true,
});
const emits = defineEmits<CalendarEmits<R, M>>();
defineSlots<CalendarSlots>();

const { dir, t, locale } = useLocale();
const appConfig = useAppConfig() as Calendar['AppConfig'];
const pohonProp = useComponentPohon('calendar', props);

const rootProps = useForwardPropsEmits(reactiveOmit(props, 'range', 'modelValue', 'defaultValue', 'color', 'variant', 'size', 'monthControls', 'yearControls', 'class', 'pohon'), emits);

const nextYearIcon = computed(() => props.nextYearIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.chevronDoubleLeft : appConfig.pohon.icons.chevronDoubleRight));
const nextMonthIcon = computed(() => props.nextMonthIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.chevronLeft : appConfig.pohon.icons.chevronRight));
const prevYearIcon = computed(() => props.prevYearIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.chevronDoubleRight : appConfig.pohon.icons.chevronDoubleLeft));
const prevMonthIcon = computed(() => props.prevMonthIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.chevronRight : appConfig.pohon.icons.chevronLeft));

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.calendar || {}) })({
  color: props.color,
  size: props.size,
  variant: props.variant,
  weekNumbers: props.weekNumbers,
}));

function paginateYear(date: DateValue, sign: -1 | 1) {
  if (sign === -1) {
    return date.subtract({ years: 1 });
  }

  return date.add({ years: 1 });
}

const Calendar = computed(() => props.range ? RangeCalendar : SingleCalendar);
</script>

<template>
  <Calendar.Root
    v-slot="{ weekDays, grid }"
    v-bind="rootProps"
    :model-value="(modelValue as DateValue | DateValue[])"
    :default-value="(defaultValue as DateValue)"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <Calendar.Header
      data-slot="header"
      :class="pohon.header({ class: pohonProp?.header })"
    >
      <Calendar.Prev
        v-if="props.yearControls"
        :prev-page="(date: DateValue) => paginateYear(date, -1)"
        :aria-label="t('calendar.prevYear')"
        as-child
      >
        <PButton
          :icon="prevYearIcon"
          :size="props.size"
          color="neutral"
          variant="ghost"
          v-bind="props.prevYear"
        />
      </Calendar.Prev>
      <Calendar.Prev
        v-if="props.monthControls"
        :aria-label="t('calendar.prevMonth')"
        as-child
      >
        <PButton
          :icon="prevMonthIcon"
          :size="props.size"
          color="neutral"
          variant="ghost"
          v-bind="props.prevMonth"
        />
      </Calendar.Prev>
      <Calendar.Heading
        v-slot="{ headingValue }"
        data-slot="heading"
        :class="pohon.heading({ class: pohonProp?.heading })"
      >
        <slot
          name="heading"
          :value="headingValue"
        >
          {{ headingValue }}
        </slot>
      </Calendar.Heading>
      <Calendar.Next
        v-if="props.monthControls"
        :aria-label="t('calendar.nextMonth')"
        as-child
      >
        <PButton
          :icon="nextMonthIcon"
          :size="props.size"
          color="neutral"
          variant="ghost"
          v-bind="props.nextMonth"
        />
      </Calendar.Next>
      <Calendar.Next
        v-if="props.yearControls"
        :next-page="(date: DateValue) => paginateYear(date, 1)"
        :aria-label="t('calendar.nextYear')"
        as-child
      >
        <PButton
          :icon="nextYearIcon"
          :size="props.size"
          color="neutral"
          variant="ghost"
          v-bind="props.nextYear"
        />
      </Calendar.Next>
    </Calendar.Header>
    <div
      data-slot="body"
      :class="pohon.body({ class: pohonProp?.body })"
    >
      <Calendar.Grid
        v-for="month in grid"
        :key="month.value.toString()"
        data-slot="grid"
        :class="pohon.grid({ class: pohonProp?.grid })"
      >
        <Calendar.GridHead>
          <Calendar.GridRow
            data-slot="gridWeekDaysRow"
            :class="pohon.gridWeekDaysRow({ class: pohonProp?.gridWeekDaysRow })"
          >
            <Calendar.HeadCell
              v-for="day in weekDays"
              :key="day"
              data-slot="headCell"
              :class="pohon.headCell({ class: pohonProp?.headCell })"
            >
              <slot
                name="week-day"
                :day="day"
              >
                {{ day }}
              </slot>
            </Calendar.HeadCell>
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody
          data-slot="gridBody"
          :class="pohon.gridBody({ class: pohonProp?.gridBody })"
        >
          <Calendar.GridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            data-slot="gridRow"
            :class="pohon.gridRow({ class: pohonProp?.gridRow })"
          >
            <td
              v-if="weekNumbers && weekDates[0]"
              role="gridcell"
              data-slot="cellWeek"
              :class="pohon.cellWeek({ class: pohonProp?.cellWeek })"
            >
              {{ getWeekNumber(weekDates[0], locale.code) }}
            </td>
            <Calendar.Cell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              data-slot="cell"
              :class="pohon.cell({ class: pohonProp?.cell })"
            >
              <Calendar.CellTrigger
                :day="weekDate"
                :month="month.value"
                data-slot="cellTrigger"
                :class="pohon.cellTrigger({ class: pohonProp?.cellTrigger })"
              >
                <slot
                  name="day"
                  :day="weekDate"
                >
                  {{ weekDate.day }}
                </slot>
              </Calendar.CellTrigger>
            </Calendar.Cell>
          </Calendar.GridRow>
        </Calendar.GridBody>
      </Calendar.Grid>
    </div>
  </Calendar.Root>
</template>
