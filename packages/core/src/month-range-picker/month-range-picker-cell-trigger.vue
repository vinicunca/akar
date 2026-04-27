<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface AMonthRangePickerCellTriggerProps extends APrimitiveProps {
  /** The date value provided to the cell trigger */
  month: DateValue;
}

export interface AMonthRangePickerCellTriggerSlot {
  default?: (props: {
    /** Current month value (short name) */
    monthValue: string;
    /** Current disable state */
    disabled: boolean;
    /** Current selected state */
    selected: boolean;
    /** Current month is today's month state */
    today: boolean;
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
import { endOfMonth, getLocalTimeZone, toCalendar, today } from '@internationalized/date';
import { KEY_CODES } from '@vinicunca/perkakas';
import { computed, nextTick } from 'vue';
import { isMonthBetweenInclusive, isSameYearMonth, toDate } from '../date';
import { APrimitive, usePrimitiveElement } from '../primitive';
import { injectAMonthRangePickerRootContext } from './month-range-picker-root.vue';

defineOptions({ name: 'AMonthRangePickerCellTrigger' });

const props = withDefaults(
  defineProps<AMonthRangePickerCellTriggerProps>(),
  { as: 'div' },
);

defineSlots<AMonthRangePickerCellTriggerSlot>();

const rootContext = injectAMonthRangePickerRootContext();

const { primitiveElement } = usePrimitiveElement();

const shortMonthValue = computed(() => {
  // eslint-disable-next-line ts/no-unused-expressions
  rootContext.locale.value;
  return rootContext.formatter.custom({
    date: toDate(props.month),
    options: { month: 'short' },
  });
});

const labelText = computed(() => {
  // eslint-disable-next-line ts/no-unused-expressions
  rootContext.locale.value;
  return rootContext.formatter.custom({
    date: toDate(props.month),
    options: { month: 'long', year: 'numeric' },
  });
});

const isUnavailable = computed(() => rootContext.isMonthUnavailable?.(props.month) ?? false);

const isCurrentMonth = computed(() => {
  const todayDate = toCalendar(today(getLocalTimeZone()), props.month.calendar);
  return isSameYearMonth(props.month, todayDate);
});

const isDisabled = computed(() => rootContext.isMonthDisabled(props.month));

const isFocusedMonth = computed(() => {
  return !rootContext.disabled.value && isSameYearMonth(props.month, rootContext.placeholder.value);
});

const isSelectedMonth = computed(() => rootContext.isSelected(props.month));
const isSelectionStart = computed(() => rootContext.isSelectionStart(props.month));
const isSelectionEnd = computed(() => rootContext.isSelectionEnd(props.month));
const isHighlightStart = computed(() => rootContext.isHighlightedStart(props.month));
const isHighlightEnd = computed(() => rootContext.isHighlightedEnd(props.month));
const isHighlighted = computed(() => rootContext.highlightedRange.value
  ? isMonthBetweenInclusive(props.month, rootContext.highlightedRange.value.start, rootContext.highlightedRange.value.end)
  : false);
const allowNonContiguousRanges = computed(() => rootContext.allowNonContiguousRanges.value);

function changeMonth(event: MouseEvent | KeyboardEvent, date: DateValue) {
  if (rootContext.readonly.value) {
    return;
  }
  if (rootContext.isMonthDisabled(date) || rootContext.isMonthUnavailable?.(date)) {
    return;
  }

  if (rootContext.startValue.value && rootContext.highlightedRange.value === null) {
    if (isSameYearMonth(date, rootContext.startValue.value) && !rootContext.preventDeselect.value && !rootContext.endValue.value) {
      rootContext.startValue.value = undefined;
      rootContext.onPlaceholderChange(date);
      rootContext.lastPressedDateValue.value = date.copy();
      return;
    } else if (!rootContext.endValue.value) {
      event.preventDefault();
      if (rootContext.lastPressedDateValue.value && isSameYearMonth(rootContext.lastPressedDateValue.value, date)) {
        rootContext.startValue.value = date.copy();
      }
      rootContext.lastPressedDateValue.value = date.copy();
      return;
    }
  }

  rootContext.lastPressedDateValue.value = date.copy();

  if (
    rootContext.startValue.value
    && rootContext.endValue.value
    && isSameYearMonth(rootContext.startValue.value, rootContext.endValue.value)
    && isSameYearMonth(rootContext.startValue.value, date)
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
  changeMonth(event, props.month);
}

function handleFocus() {
  if (isDisabled.value || rootContext.isMonthUnavailable?.(props.month)) {
    return;
  }
  rootContext.focusedValue.value = props.month.copy();
}

function handleArrowKey(event: KeyboardEvent) {
  if (isDisabled.value) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  const parentElement = rootContext.parentElement.value!;
  const sign = rootContext.dir.value === 'rtl' ? -1 : 1;

  switch (event.code) {
    case KEY_CODES.ARROW_RIGHT:
      shiftFocus(props.month, sign);
      break;
    case KEY_CODES.ARROW_LEFT:
      shiftFocus(props.month, -sign);
      break;
    case KEY_CODES.ARROW_UP:
      shiftFocus(props.month, -4);
      break;
    case KEY_CODES.ARROW_DOWN:
      shiftFocus(props.month, 4);
      break;
    case KEY_CODES.PAGE_UP:
      shiftFocusYear(-1);
      break;
    case KEY_CODES.PAGE_DOWN:
      shiftFocusYear(1);
      break;
    case KEY_CODES.ENTER:
    case KEY_CODES.SPACE:
      changeMonth(event, props.month);
  }

  function shiftFocus(currentMonth: DateValue, add: number, depth = 0) {
    if (depth > 48) {
      return;
    }
    const candidateMonthValue = currentMonth.add({ months: add });

    if ((rootContext.minValue.value && endOfMonth(candidateMonthValue).compare(rootContext.minValue.value) < 0)
      || (rootContext.maxValue.value && candidateMonthValue.set({ day: 1 }).compare(rootContext.maxValue.value) > 0)) {
      return;
    }

    const candidateMonth = parentElement.querySelector<HTMLElement>(`[data-value='${candidateMonthValue.toString()}']`);

    if (!candidateMonth) {
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
        shiftFocus(currentMonth, add, depth + 1);
      });
      return;
    }

    if (candidateMonth && candidateMonth.hasAttribute('data-disabled')) {
      return shiftFocus(candidateMonthValue, add, depth + 1);
    }

    rootContext.onPlaceholderChange(candidateMonthValue);
    candidateMonth?.focus();
  }

  function shiftFocusYear(years: number) {
    const candidateMonthValue = props.month.add({ years });

    if ((rootContext.minValue.value && endOfMonth(candidateMonthValue).compare(rootContext.minValue.value) < 0)
      || (rootContext.maxValue.value && candidateMonthValue.set({ day: 1 }).compare(rootContext.maxValue.value) > 0)) {
      return;
    }

    if (years > 0) {
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
      const candidateMonth = parentElement.querySelector<HTMLElement>(`[data-value='${candidateMonthValue.toString()}']`);
      if (candidateMonth && !candidateMonth.hasAttribute('data-disabled')) {
        rootContext.onPlaceholderChange(candidateMonthValue);
        candidateMonth?.focus();
        return;
      }

      shiftFocus(candidateMonthValue, years > 0 ? 1 : -1, 1);
    });
  }
}
</script>

<template>
  <APrimitive
    ref="primitiveElement"
    :as="props.as"
    :as-child="props.asChild"
    role="button"
    :aria-label="labelText"
    data-akar-month-range-picker-cell-trigger
    :aria-pressed="isSelectedMonth && (allowNonContiguousRanges || !isUnavailable) ? true : undefined"
    :aria-disabled="isDisabled || isUnavailable ? true : undefined"
    :data-highlighted="isHighlighted && (allowNonContiguousRanges || !isUnavailable) ? '' : undefined"
    :data-selection-start="isSelectionStart ? true : undefined"
    :data-selection-end="isSelectionEnd ? true : undefined"
    :data-highlighted-start="isHighlightStart ? true : undefined"
    :data-highlighted-end="isHighlightEnd ? true : undefined"
    :data-selected="isSelectedMonth && (allowNonContiguousRanges || !isUnavailable) ? true : undefined"
    :data-value="month.toString()"
    :data-disabled="isDisabled ? '' : undefined"
    :data-unavailable="isUnavailable ? '' : undefined"
    :data-today="isCurrentMonth ? '' : undefined"
    :data-focused="isFocusedMonth ? '' : undefined"
    :tabindex="isFocusedMonth ? 0 : isDisabled ? undefined : -1"
    @click="handleClick"
    @focusin="handleFocus"
    @mouseenter="handleFocus"
    @keydown.up.down.left.right.space.enter.page-up.page-down="handleArrowKey"
    @keydown.enter.prevent
  >
    <slot
      :month-value="shortMonthValue"
      :disabled="isDisabled"
      :today="isCurrentMonth"
      :selected="isSelectedMonth"
      :unavailable="isUnavailable"
      :highlighted="isHighlighted && (allowNonContiguousRanges || !isUnavailable)"
      :highlighted-start="isHighlightStart"
      :highlighted-end="isHighlightEnd"
      :selection-start="isSelectionStart"
      :selection-end="isSelectionEnd"
    >
      {{ shortMonthValue }}
    </slot>
  </APrimitive>
</template>
