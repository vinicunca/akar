<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';
import { KEY_CODES } from '@vinicunca/perkakas';

export interface AMonthPickerCellTriggerProps extends APrimitiveProps {
  /** The date value provided to the cell trigger */
  month: DateValue;
}

export interface AMonthPickerCellTriggerSlot {
  default?: (props: {
    /** Current month value (short name) */
    monthValue: string;
    /** Current disable state */
    disabled: boolean;
    /** Current selected state */
    selected: boolean;
    /** Current month/year is today state */
    today: boolean;
    /** Current unavailable state */
    unavailable: boolean;
  }) => any;
}
</script>

<script setup lang="ts">
import { endOfMonth, getLocalTimeZone, toCalendar, today } from '@internationalized/date';
import { computed, nextTick } from 'vue';
import { isSameYearMonth, toDate } from '../date';
import { APrimitive, usePrimitiveElement } from '../primitive';
import { injectAMonthPickerRootContext } from './month-picker-root.vue';

const props = withDefaults(
  defineProps<AMonthPickerCellTriggerProps>(),
  { as: 'div' },
);

defineSlots<AMonthPickerCellTriggerSlot>();

const rootContext = injectAMonthPickerRootContext();

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

const isSelectedMonth = computed(() => rootContext.isMonthSelected(props.month));

function changeMonth(date: DateValue) {
  if (rootContext.readonly.value) {
    return;
  }
  if (rootContext.isMonthDisabled(date) || rootContext.isMonthUnavailable?.(date)) {
    return;
  }

  rootContext.onMonthChange(date);
}

function handleClick() {
  if (isDisabled.value) {
    return;
  }
  changeMonth(props.month);
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
      changeMonth(props.month);
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
      }
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
    data-akar-month-picker-cell-trigger
    :aria-disabled="isDisabled || isUnavailable ? true : undefined"
    :data-selected="isSelectedMonth ? true : undefined"
    :data-value="month.toString()"
    :data-disabled="isDisabled ? '' : undefined"
    :data-unavailable="isUnavailable ? '' : undefined"
    :data-today="isCurrentMonth ? '' : undefined"
    :data-focused="isFocusedMonth ? '' : undefined"
    :tabindex="isFocusedMonth ? 0 : isDisabled ? undefined : -1"
    @click="handleClick"
    @keydown.up.down.left.right.space.enter.page-up.page-down="handleArrowKey"
    @keydown.enter.prevent
  >
    <slot
      :month-value="shortMonthValue"
      :disabled="isDisabled"
      :today="isCurrentMonth"
      :selected="isSelectedMonth"
      :unavailable="isUnavailable"
    >
      {{ shortMonthValue }}
    </slot>
  </APrimitive>
</template>
