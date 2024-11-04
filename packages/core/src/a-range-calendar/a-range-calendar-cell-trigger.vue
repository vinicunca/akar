<script lang="ts">
import type { DateValue } from '@internationalized/date';

import { KEY_CODES } from '@vinicunca/perkakas';

export interface ARangeCalendarCellTriggerProps extends APrimitiveProps {
  day: DateValue;
  month: DateValue;
}
</script>

<script setup lang="ts">
import {
  getLocalTimeZone,
  isSameDay,
  isSameMonth,
  isToday,
} from '@internationalized/date';
import { computed, nextTick } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

import { APrimitive, usePrimitiveElement } from '~~/a-primitive';
import { isDateBetweenInclusive, toDate } from '~~/date';

import { injectARangeCalendarRootContext } from './a-range-calendar-root.vue';

const props = withDefaults(
  defineProps<ARangeCalendarCellTriggerProps>(),
  { as: 'div' },
);

defineSlots<{
  default: (props: {
    /** Current day */
    dayValue: string;
  }) => any;
}>();

const rootContext = injectARangeCalendarRootContext();

const { primitiveElement, currentElement } = usePrimitiveElement();

const labelText = computed(() =>
  rootContext.formatter.custom({
    date: toDate(props.day),
    options: {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
  }),
);

const isDisabled = computed(() => rootContext.isDateDisabled(props.day));
const isUnavailable = computed(() => rootContext.isDateUnavailable?.(props.day));
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

const SELECTOR = '[data-akar-calendar-cell-trigger]:not([data-disabled]):not([data-outside-month]):not([data-outside-visible-months])';

const isDateToday = computed(() => {
  return isToday(props.day, getLocalTimeZone());
});

const isOutsideView = computed(() => {
  return !isSameMonth(props.day, props.month);
});

const isOutsideVisibleView = computed(() =>
  rootContext.isOutsideVisibleView(props.day),
);

const dayValue = computed(() => props.day.day.toLocaleString(rootContext.locale.value));

const isFocusedDate = computed(() => {
  return !rootContext.disabled.value && isSameDay(props.day, rootContext.placeholder.value);
});

function changeDate(
  { event, date }:
  { date: DateValue; event: KeyboardEvent | MouseEvent },
) {
  if (rootContext.readonly.value) {
    return;
  }

  if (rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date)) {
    return;
  }

  rootContext.lastPressedDateValue.value = date.copy();

  if (rootContext.startValue.value && rootContext.highlightedRange.value === null) {
    if (
      isSameDay(date, rootContext.startValue.value)
      && !rootContext.preventDeselect.value
      && !rootContext.endValue.value
    ) {
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
    rootContext.endValue.value = undefined;
    rootContext.startValue.value = date.copy();
  }
}

function handleClick(event: MouseEvent) {
  changeDate({ date: props.day, event });
}

function handleFocus() {
  if (rootContext.isDateDisabled(props.day) || rootContext.isDateUnavailable?.(props.day)) {
    return;
  }

  rootContext.focusedValue.value = props.day.copy();
}

function handleArrowKey(event: KeyboardEvent) {
  event.preventDefault();
  event.stopPropagation();

  const parentElement = rootContext.parentElement.value!;
  const allCollectionItems: Array<HTMLElement> = parentElement
    ? Array.from(parentElement.querySelectorAll(SELECTOR))
    : [];

  const index = allCollectionItems.indexOf(currentElement.value);
  let newIndex = index;
  const indexIncrementation = 7;
  const sign = rootContext.dir.value === 'rtl' ? -1 : 1;
  switch (event.key) {
    case KEY_CODES.ARROW_DOWN:
      newIndex += indexIncrementation;
      break;
    case KEY_CODES.ARROW_LEFT:
      newIndex -= sign;
      break;
    case KEY_CODES.ARROW_RIGHT:
      newIndex += sign;
      break;
    case KEY_CODES.ARROW_UP:
      newIndex -= indexIncrementation;
      break;
    case KEY_CODES.ENTER:
    case KEY_CODES.SPACE:
      changeDate({ date: props.day, event });
      return;
    default:
      return;
  }

  if (newIndex >= 0 && newIndex < allCollectionItems.length) {
    allCollectionItems[newIndex].focus();
    return;
  }

  if (newIndex < 0) {
    if (rootContext.isPrevButtonDisabled()) {
      return;
    }
    rootContext.prevPage();
    nextTick(() => {
      const newCollectionItems: Array<HTMLElement> = parentElement
        ? Array.from(parentElement.querySelectorAll(SELECTOR))
        : [];
      newCollectionItems[newCollectionItems.length - Math.abs(newIndex)].focus();
    });
    return;
  }

  if (newIndex >= allCollectionItems.length) {
    if (rootContext.isNextButtonDisabled()) {
      return;
    }
    rootContext.nextPage();
    nextTick(() => {
      const newCollectionItems: Array<HTMLElement> = parentElement
        ? Array.from(parentElement.querySelectorAll(SELECTOR))
        : [];
      newCollectionItems[newIndex - allCollectionItems.length].focus();
    });
  }
}
</script>

<template>
  <APrimitive
    ref="primitiveElement"
    v-bind="props"
    role="button"
    :aria-label="labelText"
    data-akar-calendar-cell-trigger
    :aria-selected="isSelectedDate && !isUnavailable ? true : undefined"
    :aria-disabled="isOutsideView || isDisabled || isUnavailable ? true : undefined"
    :data-highlighted="isHighlighted && !isUnavailable ? '' : undefined"
    :data-selection-start="isSelectionStart ? true : undefined"
    :data-selection-end="isSelectionEnd ? true : undefined"
    :data-highlighted-start="isHighlightStart ? true : undefined"
    :data-highlighted-end="isHighlightEnd ? true : undefined"
    :data-selected="isSelectedDate && !isUnavailable ? true : undefined"
    :data-outside-visible-view="isOutsideVisibleView ? '' : undefined"
    :data-value="day.toString()"
    :data-disabled="isDisabled || isOutsideView ? '' : undefined"
    :data-unavailable="isUnavailable ? '' : undefined"
    :data-today="isDateToday ? '' : undefined"
    :data-outside-month="isOutsideView ? '' : undefined"
    :data-focused="isFocusedDate ? '' : undefined"
    :tabindex="isFocusedDate ? 0 : isOutsideView || isDisabled ? undefined : -1"
    @click="handleClick"
    @focusin="handleFocus"
    @mouseenter="handleFocus"
    @keydown.up.down.left.right.enter.space="handleArrowKey"
  >
    <slot :day-value="dayValue">
      {{ dayValue }}
    </slot>
  </APrimitive>
</template>
