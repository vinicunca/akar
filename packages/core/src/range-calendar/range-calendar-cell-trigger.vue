<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface ARangeCalendarCellTriggerProps extends APrimitiveProps {
  day: DateValue;
  month: DateValue;
}

export interface RangeCalendarCellTriggerSlot {
  default?: (props: {
    /** Current day */
    dayValue: string;
    /** Current disable state */
    disabled: boolean;
    /** Current selected state */
    selected: boolean;
    /** Current today state */
    today: boolean;
    /** Current outside view state */
    outsideView: boolean;
    /** Current outside visible view state */
    outsideVisibleView: boolean;
    /** Current unavailable state */
    unavailable: boolean;
    /** Current highlighted state */
    highlighted: boolean;
    /** Current highlighted start state */
    highlightedStart: boolean;
    /** Current highlighted end state */
    highlightedEnd: boolean;
    /** Current selection start state */
    selectionStart: boolean;
    /** Current selection end state */
    selectionEnd: boolean;
  }) => any;
}
</script>

<script setup lang="ts">
import {
  getLocalTimeZone,
  isSameDay,
  isSameMonth,
  isToday,
} from '@internationalized/date';
import { KEY_CODES } from '@vinicunca/perkakas';
import { computed, nextTick } from 'vue';
import { isDateBetweenInclusive, toDate } from '../date';
import { APrimitive, usePrimitiveElement } from '../primitive';
import { injectARangeCalendarRootContext } from './range-calendar-root.vue';

const props = withDefaults(
  defineProps<ARangeCalendarCellTriggerProps>(),
  { as: 'div' },
);

defineSlots<RangeCalendarCellTriggerSlot>();

const rootContext = injectARangeCalendarRootContext();

const { primitiveElement } = usePrimitiveElement();

const labelText = computed(() => rootContext.formatter.custom({
  date: toDate(props.day),
  options: {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  },
}));

const isUnavailable = computed(() => rootContext.isDateUnavailable?.(props.day) ?? false);
const isSelectedDate = computed(() => rootContext.isSelected(props.day));
const isSelectionStart = computed(() => rootContext.isSelectionStart(props.day));
const isSelectionEnd = computed(() => rootContext.isSelectionEnd(props.day));
const isHighlightStart = computed(() => rootContext.isHighlightedStart(props.day));
const isHighlightEnd = computed(() => rootContext.isHighlightedEnd(props.day));
const isHighlighted = computed(() => rootContext.highlightedRange.value
  ? isDateBetweenInclusive({
      date: props.day,
      start: rootContext.highlightedRange.value.start,
      end: rootContext.highlightedRange.value.end,
    })
  : false);
const allowNonContiguousRanges = computed(() => rootContext.allowNonContiguousRanges.value);

const isDateToday = computed(() => {
  return isToday(props.day, getLocalTimeZone());
});

const isOutsideView = computed(() => {
  return !isSameMonth(props.day, props.month);
});

const isOutsideVisibleView = computed(() =>
  rootContext.isOutsideVisibleView(props.day),
);

const isDisabled = computed(() =>
  rootContext.isDateDisabled(props.day)
  || (rootContext.disableDaysOutsideCurrentView.value && isOutsideView.value),
);

const dayValue = computed(() => props.day.day.toLocaleString(rootContext.locale.value));

const isFocusedDate = computed(() => {
  return !rootContext.disabled.value && isSameDay(props.day, rootContext.placeholder.value);
});

function changeDate(event: KeyboardEvent | MouseEvent, date: DateValue) {
  if (rootContext.readonly.value) {
    return;
  }

  if (rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date)) {
    return;
  }

  rootContext.lastPressedDateValue.value = date.copy();

  if (rootContext.startValue.value && rootContext.highlightedRange.value === null) {
    if (isSameDay(date, rootContext.startValue.value) && !rootContext.preventDeselect.value && !rootContext.endValue.value) {
      rootContext.startValue.value = undefined;
      rootContext.onPlaceholderChange(date);
      return;
    } else if (!rootContext.endValue.value) {
      event.preventDefault();
      if (rootContext.lastPressedDateValue.value && isSameDay(rootContext.lastPressedDateValue.value, date)) {
        rootContext.startValue.value = date.copy();
      }
      return;
    }
  }

  if (
    rootContext.startValue.value
    && rootContext.endValue.value
    && isSameDay(rootContext.startValue.value, rootContext.endValue.value)
    && isSameDay(rootContext.endValue.value, date)
    && !rootContext.preventDeselect.value
  ) {
    rootContext.startValue.value = undefined;
    rootContext.endValue.value = undefined;
    rootContext.onPlaceholderChange(date);
    return;
  }

  if (!rootContext.startValue.value) {
    rootContext.startValue.value = date.copy();
  } else if (!rootContext.endValue.value) {
    rootContext.endValue.value = date.copy();
  } else if (rootContext.endValue.value && rootContext.startValue.value) {
    if (!rootContext.fixedDate.value) {
      rootContext.endValue.value = undefined;
      rootContext.startValue.value = date.copy();
    } else if (rootContext.fixedDate.value === 'start') {
      if (date.compare(rootContext.startValue.value) < 0) {
        rootContext.startValue.value = date.copy();
      } else {
        rootContext.endValue.value = date.copy();
      }
    } else if (rootContext.fixedDate.value === 'end') {
      if (date.compare(rootContext.endValue.value) > 0) {
        rootContext.endValue.value = date.copy();
      } else {
        rootContext.startValue.value = date.copy();
      }
    }
  }
}

function handleClick(event: MouseEvent) {
  if (isDisabled.value) {
    return;
  }

  changeDate(event, props.day);
}

function handleFocus() {
  if (rootContext.isDateDisabled(props.day) || rootContext.isDateUnavailable?.(props.day)) {
    return;
  }
  rootContext.focusedValue.value = props.day.copy();
}

function handleArrowKey(event: KeyboardEvent) {
  if (isDisabled.value) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const parentElement = rootContext.parentElement.value!;
  const indexIncrementation = 7;
  const sign = rootContext.dir.value === 'rtl' ? -1 : 1;

  switch (event.key) {
    case KEY_CODES.ARROW_RIGHT:
      shiftFocus(props.day, sign);
      break;
    case KEY_CODES.ARROW_LEFT:
      shiftFocus(props.day, -sign);
      break;
    case KEY_CODES.ARROW_UP:
      shiftFocus(props.day, -indexIncrementation);
      break;
    case KEY_CODES.ARROW_DOWN:
      shiftFocus(props.day, indexIncrementation);
      break;
    case KEY_CODES.ENTER:
    case KEY_CODES.SPACE:
      changeDate(event, props.day);
  }

  function shiftFocus(day: DateValue, add: number) {
    const candidateDayValue = day.add({ days: add });

    if (
      (
        rootContext.minValue.value
        && candidateDayValue.compare(rootContext.minValue.value) < 0
      )
      || (
        rootContext.maxValue.value
        && candidateDayValue.compare(rootContext.maxValue.value) > 0
      )
    ) {
      return;
    }

    const candidateDay = parentElement.querySelector<HTMLElement>(`[data-value='${candidateDayValue.toString()}']:not([data-outside-view])`);
    // If the date is not found it means we must change the page
    if (!candidateDay) {
      if (add > 0) {
        if (rootContext.isNextButtonDisabled()) {
          return;
        }
        rootContext.nextPage();
      } else {
        if (rootContext.isPrevButtonDisabled()) {
          return;
        }
        rootContext.prevPage();
      }
      nextTick(() => {
        shiftFocus(day, add);
      });
      return;
    }

    if (candidateDay && candidateDay.hasAttribute('data-disabled')) {
      return shiftFocus(candidateDayValue, add);
    }
    rootContext.onPlaceholderChange(candidateDayValue);
    candidateDay?.focus();
  }
}
</script>

<template>
  <APrimitive
    ref="primitiveElement"
    :as="as"
    :as-child="asChild"
    role="button"
    :aria-label="labelText"
    data-akar-calendar-cell-trigger
    :aria-pressed="isSelectedDate && (allowNonContiguousRanges || !isUnavailable) ? true : undefined"
    :aria-disabled="isDisabled || isUnavailable ? true : undefined"
    :data-highlighted="isHighlighted && (allowNonContiguousRanges || !isUnavailable) ? '' : undefined"
    :data-selection-start="isSelectionStart ? true : undefined"
    :data-selection-end="isSelectionEnd ? true : undefined"
    :data-highlighted-start="isHighlightStart ? true : undefined"
    :data-highlighted-end="isHighlightEnd ? true : undefined"
    :data-selected="isSelectedDate && (allowNonContiguousRanges || !isUnavailable) ? true : undefined"
    :data-outside-visible-view="isOutsideVisibleView ? '' : undefined"
    :data-value="day.toString()"
    :data-disabled="isDisabled ? '' : undefined"
    :data-unavailable="isUnavailable ? '' : undefined"
    :data-today="isDateToday ? '' : undefined"
    :data-outside-view="isOutsideView ? '' : undefined"
    :data-focused="isFocusedDate ? '' : undefined"
    :tabindex="isFocusedDate ? 0 : isOutsideView || isDisabled ? undefined : -1"
    @click="handleClick"
    @focusin="handleFocus"
    @mouseenter="handleFocus"
    @keydown.up.down.left.right.enter.space="handleArrowKey"
  >
    <slot
      :day-value="dayValue"
      :disabled="isDisabled"
      :today="isDateToday"
      :selected="isSelectedDate"
      :outside-view="isOutsideView"
      :outside-visible-view="isOutsideVisibleView"
      :unavailable="isUnavailable"
      :highlighted="isHighlighted && (allowNonContiguousRanges || !isUnavailable)"
      :highlighted-start="isHighlightStart"
      :highlighted-end="isHighlightEnd"
      :selection-start="isSelectionStart"
      :selection-end="isSelectionEnd"
    >
      {{ dayValue }}
    </slot>
  </APrimitive>
</template>
