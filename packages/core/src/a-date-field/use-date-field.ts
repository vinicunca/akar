import type { CalendarDateTime, CycleTimeOptions, DateFields, DateValue, TimeFields } from '@internationalized/date';

import { isIncludedIn, KEY_CODES } from '@vinicunca/perkakas';
import { computed, type Ref } from 'vue';

import {
  type DateSegmentExceptLiteral,
  type DateTimeSegmentPart,
  type DateTimeSegmentValueObj,
  getDaysInMonth,
  type HourCycle,
  toDate,
  type UseDateFormatter,
} from '~~/date';

import { isAcceptableSegmentKey, isNumberString, isSegmentNavigationKey } from './utils';

export interface UseDateFieldProps {
  disabled: Ref<boolean>;
  focusNext: () => void;
  formatter: UseDateFormatter;
  hasLeftFocus: Ref<boolean>;
  hourCycle: HourCycle;
  lastKeyZero: Ref<boolean>;
  modelValue: Ref<DateValue | undefined>;
  part: DateTimeSegmentPart;
  placeholder: Ref<DateValue>;
  readonly: Ref<boolean>;
  segmentValues: Ref<DateTimeSegmentValueObj>;
};

interface SegmentAttrProps {
  disabled: boolean;
  formatter: UseDateFormatter;
  hourCycle: HourCycle;
  placeholder: DateValue;
  segmentValues: DateTimeSegmentValueObj;
};

interface DateTimeValueIncrementation {
  dateRef: DateValue;
  event: KeyboardEvent;
  hourCycle?: HourCycle;
  part: keyof Omit<DateFields, 'era'> | keyof TimeFields;
  prevValue: null | number;
};

interface MinuteSecondIncrementProps {
  dateRef: DateValue;
  event: KeyboardEvent;
  part: keyof TimeFields;
  prevValue: null | number;
};

function commonSegmentAttrs(props: SegmentAttrProps) {
  return {
    role: 'spinbutton',
    contenteditable: true,
    tabindex: props.disabled ? undefined : 0,
    spellcheck: false,
    inputmode: 'numeric',
    autocorrect: 'off',
    enterkeyhint: 'next',
    style: 'caret-color: transparent;',
  };
}

function daySegmentAttrs(props: SegmentAttrProps) {
  const { segmentValues, placeholder } = props;
  const isEmpty = segmentValues.day === null;
  const date = segmentValues.day ? placeholder.set({ day: segmentValues.day }) : placeholder;

  const valueNow = date.day;
  const valueMin = 1;
  const valueMax = getDaysInMonth(date);
  const valueText = isEmpty ? 'Empty' : `${valueNow}`;

  return {
    ...commonSegmentAttrs(props),
    'aria-label': 'day,',
    'aria-valuemin': valueMin,
    'aria-valuemax': valueMax,
    'aria-valuenow': valueNow,
    'aria-valuetext': valueText,
    'data-placeholder': isEmpty ? '' : undefined,
  };
}

function monthSegmentAttrs(props: SegmentAttrProps) {
  const { segmentValues, placeholder, formatter } = props;
  const isEmpty = segmentValues.month === null;
  const date = segmentValues.month
    ? placeholder.set({ month: segmentValues.month })
    : placeholder;
  const valueNow = date.month;
  const valueMin = 1;
  const valueMax = 12;
  const valueText = isEmpty
    ? 'Empty'
    : `${valueNow} - ${formatter.fullMonth({
      date: toDate(date),
    })}`;

  return {
    ...commonSegmentAttrs(props),
    'aria-label': 'month, ',
    'contenteditable': true,
    'aria-valuemin': valueMin,
    'aria-valuemax': valueMax,
    'aria-valuenow': valueNow,
    'aria-valuetext': valueText,
    'data-placeholder': isEmpty ? '' : undefined,
  };
}

function yearSegmentAttrs(props: SegmentAttrProps) {
  const { segmentValues, placeholder } = props;
  const isEmpty = segmentValues.year === null;
  const date = segmentValues.year
    ? placeholder.set({ year: segmentValues.year })
    : placeholder;
  const valueMin = 1;
  const valueMax = 9999;
  const valueNow = date.year;
  const valueText = isEmpty ? 'Empty' : `${valueNow}`;

  return {
    ...commonSegmentAttrs(props),
    'aria-label': 'year, ',
    'aria-valuemin': valueMin,
    'aria-valuemax': valueMax,
    'aria-valuenow': valueNow,
    'aria-valuetext': valueText,
    'data-placeholder': isEmpty ? '' : undefined,
  };
}

function hourSegmentAttrs(props: SegmentAttrProps) {
  const { segmentValues, hourCycle, placeholder } = props;

  if (!('hour' in segmentValues) || !('hour' in placeholder)) {
    return {};
  }

  const isEmpty = segmentValues.hour === null;
  const date = segmentValues.hour
    ? placeholder.set({ hour: segmentValues.hour })
    : placeholder;
  const valueMin = hourCycle === 12 ? 1 : 0;
  const valueMax = hourCycle === 12 ? 12 : 23;
  const valueNow = date.hour;
  const valueText = isEmpty
    ? 'Empty'
    : `${valueNow} ${segmentValues.dayPeriod ?? ''}`;

  return {
    ...commonSegmentAttrs(props),
    'aria-label': 'hour, ',
    'aria-valuemin': valueMin,
    'aria-valuemax': valueMax,
    'aria-valuenow': valueNow,
    'aria-valuetext': valueText,
    'data-placeholder': isEmpty ? '' : undefined,
  };
}

function minuteSegmentAttrs(props: SegmentAttrProps) {
  const { segmentValues, placeholder } = props;

  if (!('minute' in segmentValues) || !('minute' in placeholder)) {
    return {};
  }

  const isEmpty = segmentValues.minute === null;
  const date = segmentValues.minute
    ? placeholder.set({ minute: segmentValues.minute })
    : placeholder;
  const valueNow = date.minute;
  const valueMin = 0;
  const valueMax = 59;
  const valueText = isEmpty
    ? 'Empty'
    : `${valueNow}`;

  return {
    ...commonSegmentAttrs(props),
    'aria-label': 'minute, ',
    'aria-valuemin': valueMin,
    'aria-valuemax': valueMax,
    'aria-valuenow': valueNow,
    'aria-valuetext': valueText,
    'data-placeholder': isEmpty ? '' : undefined,
  };
}

function secondSegmentAttrs(props: SegmentAttrProps) {
  const { segmentValues, placeholder } = props;

  if (!('second' in segmentValues) || !('second' in placeholder)) {
    return {};
  }

  const isEmpty = segmentValues.second === null;
  const date = segmentValues.second
    ? placeholder.set({ second: segmentValues.second })
    : placeholder;
  const valueNow = date.second;
  const valueMin = 0;
  const valueMax = 59;
  const valueText = isEmpty
    ? 'Empty'
    : `${valueNow}`;

  return {
    ...commonSegmentAttrs(props),
    'aria-label': 'second, ',
    'aria-valuemin': valueMin,
    'aria-valuemax': valueMax,
    'aria-valuenow': valueNow,
    'aria-valuetext': valueText,
    'data-placeholder': isEmpty ? '' : undefined,
  };
}

function dayPeriodSegmentAttrs(props: SegmentAttrProps) {
  const { segmentValues } = props;

  if (!('dayPeriod' in segmentValues)) {
    return {};
  }

  const valueMin = 0;
  const valueMax = 12;
  let valueNow: number;

  if (segmentValues.hour) {
    valueNow = segmentValues.hour > 12
      ? segmentValues.hour - 12
      : segmentValues.hour;
  } else {
    valueNow = 0;
  }

  const valueText = segmentValues.dayPeriod ?? 'AM';

  return {
    ...commonSegmentAttrs(props),
    'inputmode': 'text',
    'aria-label': 'AM/PM',
    'aria-valuemin': valueMin,
    'aria-valuemax': valueMax,
    'aria-valuenow': valueNow,
    'aria-valuetext': valueText,
  };
}

function literalSegmentAttrs(_props: SegmentAttrProps) {
  return {
    'aria-hidden': true,
    'data-segment': 'literal',
  };
}

function timeZoneSegmentAttrs(props: SegmentAttrProps) {
  return {
    'role': 'textbox',
    'aria-label': 'timezone, ',
    'data-readonly': true,
    'data-segment': 'timeZoneName',
    'tabindex': props.disabled ? undefined : 0,
    'style': 'caret-color: transparent;',
  };
}

const segmentBuilders = {
  day: {
    attrs: daySegmentAttrs,
  },
  month: {
    attrs: monthSegmentAttrs,
  },
  year: {
    attrs: yearSegmentAttrs,
  },
  hour: {
    attrs: hourSegmentAttrs,
  },
  minute: {
    attrs: minuteSegmentAttrs,
  },
  second: {
    attrs: secondSegmentAttrs,
  },
  dayPeriod: {
    attrs: dayPeriodSegmentAttrs,
  },
  literal: {
    attrs: literalSegmentAttrs,
  },
  timeZoneName: {
    attrs: timeZoneSegmentAttrs,
  },
};

export function useDateField(props: UseDateFieldProps) {
  const attributes = computed(() => segmentBuilders[props.part].attrs({
    disabled: props.disabled.value,
    placeholder: props.placeholder.value,
    hourCycle: props.hourCycle,
    segmentValues: props.segmentValues.value,
    formatter: props.formatter,
  }));

  function handleSegmentClick(event: MouseEvent) {
    const disabled = props.disabled.value;

    if (disabled) {
      event.preventDefault();
    }
  }

  // TODO: look into abstracting segment keydown functions since they have the same structure (checks -> arrow_up, arrow_down update -> number string update -> move to next -> backspace update)
  function handleDaySegmentKeydown(event: KeyboardEvent) {
    if (!isAcceptableSegmentKey(event.key) || isSegmentNavigationKey(event.key)) {
      return;
    }

    const prevValue = props.segmentValues.value.day;

    if (event.key === KEY_CODES.ARROW_DOWN || event.key === KEY_CODES.ARROW_UP) {
      props.segmentValues.value.day = dateTimeValueIncrementation({
        event,
        part: 'day',
        dateRef: props.placeholder.value,
        prevValue,
      });

      return;
    }

    if (isNumberString(event.key)) {
      const num = Number.parseInt(event.key);
      const segmentMonthValue = props.segmentValues.value.month;

      const daysInMonth = segmentMonthValue
        ? getDaysInMonth(props.placeholder.value.set({ month: segmentMonthValue }))
        : getDaysInMonth(props.placeholder.value);

      const { value, moveToNext } = updateDayOrMonth({ max: daysInMonth, num, prev: prevValue });

      props.segmentValues.value.day = value;

      if (moveToNext) {
        props.focusNext();
      }
    }

    if (event.key === KEY_CODES.BACKSPACE) {
      props.hasLeftFocus.value = false;
      props.segmentValues.value.day = deleteValue(prevValue);
    }
  }

  function handleMonthSegmentKeydown(event: KeyboardEvent) {
    if (!isAcceptableSegmentKey(event.key) || isSegmentNavigationKey(event.key)) {
      return;
    }

    const prevValue = props.segmentValues.value.month;

    if (event.key === KEY_CODES.ARROW_DOWN || event.key === KEY_CODES.ARROW_UP) {
      props.segmentValues.value.month = dateTimeValueIncrementation({
        event,
        part: 'month',
        dateRef: props.placeholder.value,
        prevValue,
      });

      return;
    }

    if (isNumberString(event.key)) {
      const num = Number.parseInt(event.key);
      const { value, moveToNext } = updateDayOrMonth({ max: 12, num, prev: prevValue });

      props.segmentValues.value.month = value;

      if (moveToNext) {
        props.focusNext();
      }
    }

    if (event.key === KEY_CODES.BACKSPACE) {
      props.hasLeftFocus.value = false;
      props.segmentValues.value.month = deleteValue(prevValue);
    }
  }

  function handleSegmentKeydown(event: KeyboardEvent) {
    const disabled = props.disabled.value;
    const readonly = props.readonly.value;

    if (event.key !== KEY_CODES.TAB) {
      event.preventDefault();
    }

    if (disabled || readonly) {
      return;
    }

    const segmentKeydownHandlers = {
      day: handleDaySegmentKeydown,
      month: handleMonthSegmentKeydown,
      year: handleYearSegmentKeydown,
      hour: handleHourSegmentKeydown,
      minute: handleMinuteSegmentKeydown,
      second: handleSecondSegmentKeydown,
      dayPeriod: handleDayPeriodSegmentKeydown,
      timeZoneName: () => {},
    } as const;

    segmentKeydownHandlers[props.part as keyof typeof segmentKeydownHandlers](event);

    if (
      (
        !isIncludedIn(event.key, [KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_RIGHT])
        && event.key !== KEY_CODES.TAB
        && event.key !== KEY_CODES.SHIFT
        && isAcceptableSegmentKey(event.key)
      ) && Object.values(props.segmentValues.value).every((item) => item !== null)
    ) {
      const updateObject = {
        ...props.segmentValues.value as Record<DateSegmentExceptLiteral, number>,
      };

      let dateRef = props.placeholder.value.copy();

      Object.keys(updateObject).forEach((part) => {
        const value = updateObject[part as DateSegmentExceptLiteral];
        dateRef = dateRef.set({ [part]: value });
      });

      props.modelValue.value = dateRef.copy();
    }
  }

  function handleYearSegmentKeydown(event: KeyboardEvent) {
    if (!isAcceptableSegmentKey(event.key) || isSegmentNavigationKey(event.key)) {
      return;
    }

    const prevValue = props.segmentValues.value.year;

    if (event.key === KEY_CODES.ARROW_DOWN || event.key === KEY_CODES.ARROW_UP) {
      props.segmentValues.value.year = dateTimeValueIncrementation({
        event,
        part: 'year',
        dateRef: props.placeholder.value,
        prevValue,
      });
      return;
    }

    if (isNumberString(event.key)) {
      const num = Number.parseInt(event.key);
      const { value, moveToNext } = updateYear({ num, prev: prevValue });

      props.segmentValues.value.year = value;

      if (moveToNext) {
        props.focusNext();
      }
    }

    if (event.key === KEY_CODES.BACKSPACE) {
      props.hasLeftFocus.value = false;
      props.segmentValues.value.year = deleteValue(prevValue);
    }
  }

  function handleHourSegmentKeydown(event: KeyboardEvent) {
    const dateRef = props.placeholder.value;
    if (
      !isAcceptableSegmentKey(event.key)
      || isSegmentNavigationKey(event.key)
      || !('hour' in dateRef)
      || !('hour' in props.segmentValues.value)
    ) {
      return;
    }

    const prevValue = props.segmentValues.value.hour;

    const hourCycle = props.hourCycle;

    if (event.key === KEY_CODES.ARROW_UP || event.key === KEY_CODES.ARROW_DOWN) {
      props.segmentValues.value.hour = dateTimeValueIncrementation({
        event,
        part: 'hour',
        dateRef: props.placeholder.value,
        prevValue,
        hourCycle,
      });

      if ('dayPeriod' in props.segmentValues.value) {
        if (props.segmentValues.value.hour < 12) {
          props.segmentValues.value.dayPeriod = 'AM';
        } else if (props.segmentValues.value.hour) {
          props.segmentValues.value.dayPeriod = 'PM';
        }
      }

      return;
    }

    if (isNumberString(event.key)) {
      const num = Number.parseInt(event.key);
      const { value, moveToNext } = updateHour({ num, prev: prevValue });

      if ('dayPeriod' in props.segmentValues.value && value && value > 12) {
        props.segmentValues.value.dayPeriod = 'PM';
      } else if ('dayPeriod' in props.segmentValues.value && value) {
        props.segmentValues.value.dayPeriod = 'AM';
      }

      props.segmentValues.value.hour = value;

      if (moveToNext) {
        props.focusNext();
      }
    }

    if (event.key === KEY_CODES.BACKSPACE) {
      props.hasLeftFocus.value = false;
      props.segmentValues.value.hour = deleteValue(prevValue);
    }
  }

  function handleMinuteSegmentKeydown(event: KeyboardEvent) {
    const dateRef = props.placeholder.value;

    if (
      !isAcceptableSegmentKey(event.key)
      || isSegmentNavigationKey(event.key)
      || !('minute' in dateRef)
      || !('minute' in props.segmentValues.value)
    ) {
      return;
    }

    const prevValue = props.segmentValues.value.minute;

    props.segmentValues.value.minute = minuteSecondIncrementation({
      event,
      part: 'minute',
      dateRef: props.placeholder.value,
      prevValue,
    });

    if (isNumberString(event.key)) {
      const num = Number.parseInt(event.key);

      const { value, moveToNext } = updateMinuteOrSecond({ num, prev: prevValue });

      props.segmentValues.value.minute = value;

      if (moveToNext) {
        props.focusNext();
      }
    }

    if (event.key === KEY_CODES.BACKSPACE) {
      props.hasLeftFocus.value = false;
      props.segmentValues.value.minute = deleteValue(prevValue);
    }
  }

  function handleSecondSegmentKeydown(event: KeyboardEvent) {
    const dateRef = props.placeholder.value;

    if (
      !isAcceptableSegmentKey(event.key)
      || isSegmentNavigationKey(event.key)
      || !('second' in dateRef)
      || !('second' in props.segmentValues.value)
    ) {
      return;
    }

    const prevValue = props.segmentValues.value.second;

    props.segmentValues.value.second = minuteSecondIncrementation({
      event,
      part: 'second',
      dateRef: props.placeholder.value,
      prevValue,
    });

    if (isNumberString(event.key)) {
      const num = Number.parseInt(event.key);
      const { value, moveToNext } = updateMinuteOrSecond({ num, prev: prevValue });

      props.segmentValues.value.second = value;

      if (moveToNext) {
        props.focusNext();
      }
    }

    if (event.key === KEY_CODES.BACKSPACE) {
      props.hasLeftFocus.value = false;
      props.segmentValues.value.second = deleteValue(prevValue);
    }
  }

  function handleDayPeriodSegmentKeydown(event: KeyboardEvent) {
    if ((
      (!isAcceptableSegmentKey(event.key) || isSegmentNavigationKey(event.key))
      && event.key !== 'a' && event.key !== 'p')
      || !('hour' in props.placeholder.value)
      || !('dayPeriod' in props.segmentValues.value)
    ) {
      return;
    }

    if (event.key === KEY_CODES.ARROW_UP || event.key === KEY_CODES.ARROW_DOWN) {
      if (props.segmentValues.value.dayPeriod === 'AM') {
        props.segmentValues.value.dayPeriod = 'PM';
        props.segmentValues.value.hour = props.segmentValues.value.hour! + 12;
        return;
      }
      props.segmentValues.value.dayPeriod = 'AM';
      props.segmentValues.value.hour = props.segmentValues.value.hour! - 12;
      return;
    }

    if (['a', 'A'].includes(event.key) && props.segmentValues.value.dayPeriod !== 'AM') {
      props.segmentValues.value.dayPeriod = 'AM';
      props.segmentValues.value.hour = props.segmentValues.value.hour! - 12;
      return;
    }

    if (['p', 'P'].includes(event.key) && props.segmentValues.value.dayPeriod !== 'PM') {
      props.segmentValues.value.dayPeriod = 'PM';
      props.segmentValues.value.hour = props.segmentValues.value.hour! + 12;
    }
  }

  function dateTimeValueIncrementation(
    { event, part, dateRef, prevValue, hourCycle }: DateTimeValueIncrementation,
  ): number {
    const sign = event.key === KEY_CODES.ARROW_UP ? 1 : -1;

    if (prevValue === null) {
      return dateRef[part as keyof Omit<DateFields, 'era'>];
    }

    if (part === 'hour' && 'hour' in dateRef) {
      const cycleArgs: [keyof DateFields | keyof TimeFields, number, CycleTimeOptions?] = [
        part,
        sign,
        { hourCycle },
      ];

      return dateRef
        .set({ [part as keyof DateValue]: prevValue })
        .cycle(...cycleArgs)[part];
    }

    const cycleArgs: [keyof DateFields, number] = [part as keyof DateFields, sign];
    if (part === 'day' && props.segmentValues.value.month !== null) {
      return dateRef
        .set({
          [part as keyof DateValue]: prevValue,
          month: props.segmentValues.value.month,
        })
        .cycle(...cycleArgs)[part as keyof Omit<DateFields, 'era'>];
    }

    return dateRef
      .set({ [part as keyof DateValue]: prevValue })
      .cycle(...cycleArgs)[part as keyof Omit<DateFields, 'era'>];
  }

  function updateDayOrMonth(
    { max, num, prev }: {
      max: number;
      num: number;
      prev: null | number;
    },
  ) {
    let moveToNext = false;
    const maxStart = Math.floor(max / 10);

    /**
     * If the user has left the segment, we want to reset the
     * `prev` value so that we can start the segment over again
     * when the user types a number.
     */
    if (props.hasLeftFocus.value) {
      props.hasLeftFocus.value = false;
      prev = null;
    }

    if (prev === null) {
    /**
     * If the user types a 0 as the first number, we want
     * to keep track of that so that when they type the next
     * number, we can move to the next segment.
     */

      if (num === 0) {
        props.lastKeyZero.value = true;
        return { value: null, moveToNext };
      }
      /**
       * If the last key was a 0, or if the first number is
       * greater than the max start digit (0-3 in most cases), then
       * we want to move to the next segment, since it's not possible
       * to continue typing a valid number in this segment.
       */

      if (props.lastKeyZero.value || num > maxStart) {
      // move to next
        moveToNext = true;
      }
      props.lastKeyZero.value = false;
      /**
       * If none of the above conditions are met, then we can just
       * return the number as the segment value and continue typing
       * in this segment.
       */
      return { value: num, moveToNext };
    }

    /**
     * If the number of digits is 2, or if the total with the existing digit
     * and the pressed digit is greater than the maximum value for this
     * month, then we will reset the segment as if the user had pressed the
     * backspace key and then typed the number.
     */
    const digits = prev.toString().length;
    const total = Number.parseInt(prev.toString() + num.toString());
    /**
     * If the number of digits is 2, or if the total with the existing digit
     * and the pressed digit is greater than the maximum value for this
     * month, then we will reset the segment as if the user had pressed the
     * backspace key and then typed the number.
     */

    if (digits === 2 || total > max) {
    /**
     * As we're doing elsewhere, we're checking if the number is greater
     * than the max start digit (0-3 in most months), and if so, we're
     * going to move to the next segment.
     */
      if (num > maxStart || total > max) {
      // move to next
        moveToNext = true;
      }
      return { value: num, moveToNext };
    }

    // move to next
    moveToNext = true;
    return { value: total, moveToNext };
  }

  function updateYear(
    { num, prev }: { num: number; prev: null | number },
  ) {
    let moveToNext = false;

    /**
     * If the user has left the segment, we want to reset the
     * `prev` value so that we can start the segment over again
     * when the user types a number.
     */
    // probably not implement, kind of weird
    if (props.hasLeftFocus.value) {
      props.hasLeftFocus.value = false;
      prev = null;
    }

    if (prev === null) {
      return { value: num === 0 ? 1 : num, moveToNext };
    }

    const str = prev.toString() + num.toString();

    if (str.length > 4) {
      return { value: num === 0 ? 1 : num, moveToNext };
    }

    if (str.length === 4) {
      moveToNext = true;
    }

    const int = Number.parseInt(str);

    return { value: int, moveToNext };
  }

  function minuteSecondIncrementation({
    event,
    part,
    dateRef,
    prevValue,
  }: MinuteSecondIncrementProps): number {
    const sign = event.key === KEY_CODES.ARROW_UP ? 1 : -1;
    const min = 0;
    const max = 59;

    if (prevValue === null) {
      return sign > 0 ? min : max;
    }

    const cycleArgs: [keyof TimeFields, number] = [part, sign];

    return (dateRef as CalendarDateTime)
      .set({ [part]: prevValue })
      .cycle(...cycleArgs)[part];
  }

  function updateMinuteOrSecond(
    { num, prev }:
    { num: number; prev: null | number },
  ) {
    const max = 59;
    let moveToNext = false;
    const maxStart = Math.floor(max / 10);

    /**
     * If the user has left the segment, we want to reset the
     * `prev` value so that we can start the segment over again
     * when the user types a number.
     */
    if (props.hasLeftFocus.value) {
      props.hasLeftFocus.value = false;
      prev = null;
    }

    if (prev === null) {
    /**
     * If the user types a 0 as the first number, we want
     * to keep track of that so that when they type the next
     * number, we can move to the next segment.
     */

      if (num === 0) {
        props.lastKeyZero.value = true;
        return { value: 0, moveToNext };
      }
      /**
       * If the last key was a 0, or if the first number is
       * greater than the max start digit (0-3 in most cases), then
       * we want to move to the next segment, since it's not possible
       * to continue typing a valid number in this segment.
       */

      if (props.lastKeyZero.value || num > maxStart) {
      // move to next
        moveToNext = true;
      }
      props.lastKeyZero.value = false;
      /**
       * If none of the above conditions are met, then we can just
       * return the number as the segment value and continue typing
       * in this segment.
       */
      return { value: num, moveToNext };
    }

    /**
     * If the number of digits is 2, or if the total with the existing digit
     * and the pressed digit is greater than the maximum value for this
     * month, then we will reset the segment as if the user had pressed the
     * backspace key and then typed the number.
     */
    const digits = prev.toString().length;
    const total = Number.parseInt(prev.toString() + num.toString());

    /**
     * If the number of digits is 2, or if the total with the existing digit
     * and the pressed digit is greater than the maximum value for this
     * month, then we will reset the segment as if the user had pressed the
     * backspace key and then typed the number.
     */

    if (digits === 2 || total > max) {
    /**
     * As we're doing elsewhere, we're checking if the number is greater
     * than the max start digit (0-3 in most months), and if so, we're
     * going to move to the next segment.
     */
      if (num > maxStart) {
      // move to next
        moveToNext = true;
      }
      return { value: num, moveToNext };
    }
    // move to next
    moveToNext = true;
    return { value: total, moveToNext };
  }

  function updateHour(
    { num, prev }:
    { num: number; prev: null | number },
  ) {
    const max = 24;
    let moveToNext = false;
    const maxStart = Math.floor(max / 10);

    /**
     * If the user has left the segment, we want to reset the
     * `prev` value so that we can start the segment over again
     * when the user types a number.
     */
    // probably not implement, kind of weird
    if (props.hasLeftFocus.value) {
      props.hasLeftFocus.value = false;
      prev = null;
    }

    if (prev === null) {
    /**
     * If the user types a 0 as the first number, we want
     * to keep track of that so that when they type the next
     * number, we can move to the next segment.
     */

      if (num === 0) {
        props.lastKeyZero.value = true;
        return { value: 0, moveToNext };
      }
      /**
       * If the last key was a 0, or if the first number is
       * greater than the max start digit (0-3 in most cases), then
       * we want to move to the next segment, since it's not possible
       * to continue typing a valid number in this segment.
       */

      if (props.lastKeyZero.value || num > maxStart) {
      // move to next
        moveToNext = true;
      }
      props.lastKeyZero.value = false;
      /**
       * If none of the above conditions are met, then we can just
       * return the number as the segment value and continue typing
       * in this segment.
       */
      return { value: num, moveToNext };
    }

    /**
     * If the number of digits is 2, or if the total with the existing digit
     * and the pressed digit is greater than the maximum value for this
     * month, then we will reset the segment as if the user had pressed the
     * backspace key and then typed the number.
     */
    const digits = prev.toString().length;
    const total = Number.parseInt(prev.toString() + num.toString());

    /**
     * If the number of digits is 2, or if the total with the existing digit
     * and the pressed digit is greater than the maximum value for this
     * month, then we will reset the segment as if the user had pressed the
     * backspace key and then typed the number.
     */

    if (digits === 2 || total > max) {
    /**
     * As we're doing elsewhere, we're checking if the number is greater
     * than the max start digit (0-3 in most months), and if so, we're
     * going to move to the next segment.
     */
      if (num > maxStart) {
      // move to next
        moveToNext = true;
      }
      return { value: num, moveToNext };
    }
    // move to next
    moveToNext = true;
    return { value: total, moveToNext };
  }

  function deleteValue(prevValue: null | number) {
    props.hasLeftFocus.value = false;

    if (prevValue === null) {
      return prevValue;
    }

    const str = prevValue.toString();

    if (str.length === 1) {
      props.modelValue.value = undefined;
      return null;
    }

    return Number.parseInt(str.slice(0, -1));
  }

  return {
    handleSegmentClick,
    handleSegmentKeydown,
    attributes,
  };
}
