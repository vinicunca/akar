<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { AppConfig } from '@nuxt/schema';
import type {
  ACalendarCellTriggerProps,
  ACalendarRootEmits,
  ACalendarRootProps,
  ARangeCalendarRootEmits,
  ARangeCalendarRootProps,
  DateRange,
} from 'akar';
import type { PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/calendar';

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

type _CalendarRootProps = Omit<ACalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale' | 'calendarLabel' | 'multiple'>;
type _RangeCalendarRootProps = Omit<ARangeCalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale' | 'calendarLabel' | 'multiple'>;

export interface PCalendarProps<R extends boolean = false, M extends boolean = false> extends _RangeCalendarRootProps, _CalendarRootProps {
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
  class?: any;
  pohon?: Calendar['slots'];
}

export interface PCalendarEmits<R extends boolean, M extends boolean> extends Omit<ACalendarRootEmits & ARangeCalendarRootEmits, 'update:modelValue'> {
  'update:modelValue': [date: CalendarModelValue<R, M>];
}

export interface PCalendarSlots {
  'heading': (props: { value: string }) => any;
  'day': (props: Pick<ACalendarCellTriggerProps, 'day'>) => any;
  'week-day': (props: { day: string }) => any;
}
</script>

<script setup lang="ts" generic="R extends boolean, M extends boolean">
import { useAppConfig } from '#imports';
import { reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'akar';
import {
  ACalendar,
  ARangeCalendar,
} from 'akar/namespaced';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PButton from './button.vue';

const props = withDefaults(
  defineProps<PCalendarProps<R, M>>(),
  {
    fixedWeeks: true,
    monthControls: true,
    yearControls: true,
  },
);
const emits = defineEmits<PCalendarEmits<R, M>>();
defineSlots<PCalendarSlots>();

const { dir, t } = useLocale();
const appConfig = useAppConfig() as Calendar['AppConfig'];
const pohonProp = useComponentPohon('calendar', props);

const rootProps = useForwardPropsEmits(
  reactiveOmit(
    props,
    'range',
    'modelValue',
    'defaultValue',
    'color',
    'variant',
    'size',
    'monthControls',
    'yearControls',
    'class',
    'pohon',
  ),
  emits,
);

const nextYearIcon = computed(() =>
  props.nextYearIcon || (dir.value === 'rtl'
    ? appConfig.pohon.icons.chevronDoubleLeft
    : appConfig.pohon.icons.chevronDoubleRight
  ),
);
const nextMonthIcon = computed(() =>
  props.nextMonthIcon || (dir.value === 'rtl'
    ? appConfig.pohon.icons.chevronLeft
    : appConfig.pohon.icons.chevronRight
  ),
);
const prevYearIcon = computed(() =>
  props.prevYearIcon || (dir.value === 'rtl'
    ? appConfig.pohon.icons.chevronDoubleRight
    : appConfig.pohon.icons.chevronDoubleLeft
  ),
);
const prevMonthIcon = computed(() =>
  props.prevMonthIcon || (dir.value === 'rtl'
    ? appConfig.pohon.icons.chevronRight
    : appConfig.pohon.icons.chevronLeft
  ),
);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.calendar || {}),
  })({
    color: props.color,
    variant: props.variant,
    size: props.size,
  }),
);

function paginateYear(date: DateValue, sign: -1 | 1) {
  if (sign === -1) {
    return date.subtract({ years: 1 });
  }

  return date.add({ years: 1 });
}

const CalendarComponent = computed(() => props.range ? ARangeCalendar : ACalendar);
</script>

<template>
  <CalendarComponent.Root
    v-slot="{ weekDays, grid }"
    v-bind="rootProps"
    :model-value="(modelValue as DateValue | DateValue[])"
    :default-value="(defaultValue as DateValue)"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="calendar-root"
  >
    <CalendarComponent.Header
      :class="pohon.header({ class: pohonProp?.header })"
      data-pohon="calendar-header"
    >
      <CalendarComponent.Prev
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
      </CalendarComponent.Prev>
      <CalendarComponent.Prev
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
      </CalendarComponent.Prev>

      <CalendarComponent.Heading
        v-slot="{ headingValue }"
        :class="pohon.heading({ class: pohonProp?.heading })"
        data-pohon="calendar-heading"
      >
        <slot
          name="heading"
          :value="headingValue"
        >
          {{ headingValue }}
        </slot>
      </CalendarComponent.Heading>

      <CalendarComponent.Next
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
      </CalendarComponent.Next>

      <CalendarComponent.Next
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
      </CalendarComponent.Next>
    </CalendarComponent.Header>

    <div
      :class="pohon.body({ class: pohonProp?.body })"
      data-pohon="calendar-body"
    >
      <CalendarComponent.Grid
        v-for="month in grid"
        :key="month.value.toString()"
        :class="pohon.grid({ class: pohonProp?.grid })"
        data-pohon="calendar-grid"
      >
        <CalendarComponent.GridHead>
          <CalendarComponent.GridRow
            :class="pohon.gridWeekDaysRow({ class: pohonProp?.gridWeekDaysRow })"
            data-pohon="calendar-grid-week-days-row"
          >
            <CalendarComponent.HeadCell
              v-for="day in weekDays"
              :key="day"
              :class="pohon.headCell({ class: pohonProp?.headCell })"
              data-pohon="calendar-head-cell"
            >
              <slot
                name="week-day"
                :day="day"
              >
                {{ day }}
              </slot>
            </CalendarComponent.HeadCell>
          </CalendarComponent.GridRow>
        </CalendarComponent.GridHead>
        <CalendarComponent.GridBody
          :class="pohon.gridBody({ class: pohonProp?.gridBody })"
          data-pohon="calendar-grid-body"
        >
          <CalendarComponent.GridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            :class="pohon.gridRow({ class: pohonProp?.gridRow })"
            data-pohon="calendar-grid-row"
          >
            <CalendarComponent.Cell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              :class="pohon.cell({ class: pohonProp?.cell })"
              data-pohon="calendar-cell"
            >
              <CalendarComponent.CellTrigger
                :day="weekDate"
                :month="month.value"
                :class="pohon.cellTrigger({ class: pohonProp?.cellTrigger })"
                data-pohon="calendar-cell-trigger"
              >
                <slot
                  name="day"
                  :day="weekDate"
                >
                  {{ weekDate.day }}
                </slot>
              </CalendarComponent.CellTrigger>
            </CalendarComponent.Cell>
          </CalendarComponent.GridRow>
        </CalendarComponent.GridBody>
      </CalendarComponent.Grid>
    </div>
  </CalendarComponent.Root>
</template>
