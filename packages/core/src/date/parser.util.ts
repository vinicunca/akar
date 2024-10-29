import type { DateFields, DateValue } from '@internationalized/date';
import type { Ref } from 'vue';

import {
  type DateSegmentPart,
  type DateTimeGranularity,
  type DateTimeSegmentContentObj,
  type DateTimeSegmentPart,
  type DateTimeSegmentValueObj,
  getDatePlaceholder,
  getOptsByGranularity,
  type HourCycle,
  isZonedDateTime,
  type TimeSegmentPart,
  toDate,
  type UseDateFormatter,
} from '~~/date';
import {
  DATE_SEGMENT_PARTS,
  EDITABLE_DATE_TIME_SEGMENT_PARTS,
  isDateSegmentPart,
  isEditableSegmentPart,
  TIME_SEGMENT_PARTS,
} from '~~/date/parts.date';

/* ----- Segment Values ----- */

const calendarDateTimeGranularities = ['hour', 'minute', 'second'];

interface SyncDateSegmentValuesProps {
  formatter: UseDateFormatter;
  value: DateValue;
};

interface SyncTimeSegmentValuesProps {
  formatter: UseDateFormatter;
  value: DateValue;
};

export function syncTimeSegmentValues(props: SyncTimeSegmentValuesProps) {
  return Object.fromEntries(TIME_SEGMENT_PARTS.map((part) => {
    if (part === 'dayPeriod') {
      return [part, props.formatter.dayPeriod(toDate(props.value))];
    }

    return [part, props.value[part as keyof DateValue]];
  })) as DateTimeSegmentValueObj;
}

export function syncSegmentValues(props: SyncDateSegmentValuesProps) {
  const { formatter } = props;

  const dateValues = DATE_SEGMENT_PARTS.map((part) => {
    return [part, props.value[part]];
  });

  if ('hour' in props.value) {
    const timeValues = syncTimeSegmentValues({ value: props.value, formatter });

    return { ...Object.fromEntries(dateValues), ...timeValues } as DateTimeSegmentValueObj;
  }

  return Object.fromEntries(dateValues) as DateTimeSegmentValueObj;
}

export function initializeTimeSegmentValues(): DateTimeSegmentValueObj {
  return Object.fromEntries(
    TIME_SEGMENT_PARTS.map((part) => {
      if (part === 'dayPeriod') {
        return [part, 'AM'];
      }

      return [part, null];
    }).filter(([key]) => {
      // eslint-disable-next-line sonar/prefer-single-boolean-return
      if (key === 'literal' || key === null) {
        return false;
      } else {
        return true;
      }
    }),
  );
}

export function initializeSegmentValues(granularity: DateTimeGranularity): DateTimeSegmentValueObj {
  const initialParts = EDITABLE_DATE_TIME_SEGMENT_PARTS.map((part) => {
    if (part === 'dayPeriod') {
      return [part, 'AM'];
    }

    return [part, null];
  }).filter(([key]) => {
    if (key === 'literal' || key === null) {
      return false;
    }
    if (granularity === 'day') {
      return !calendarDateTimeGranularities.includes(key) && key !== 'dayPeriod';
    } else {
      return true;
    }
  });

  return Object.fromEntries(initialParts);
}

interface SharedContentProps {
  dateRef: DateValue;
  formatter: UseDateFormatter;
  granularity: DateTimeGranularity;
  hideTimeZone: boolean;
  hourCycle: HourCycle;
  isTimeValue?: boolean;
};

type CreateDateContentObjProps = {
  locale: Ref<string>;
  segmentValues: DateTimeSegmentValueObj;
} & SharedContentProps;

export function createDateContent(props: CreateDateContentObjProps) {
  const contentObj = createContentObj(props);

  const contentArr = createContentArr({
    contentObj,
    ...props,
  });

  return {
    obj: contentObj,
    arr: contentArr,
  };
}

function createContentObj(props: CreateDateContentObjProps) {
  const { segmentValues, formatter, locale } = props;

  function getPartContent(part: DateSegmentPart | TimeSegmentPart) {
    if ('hour' in segmentValues) {
      const value = segmentValues[part];

      if (value !== null) {
        /**
         * Edge case for when the month field is filled and the day field snaps to the maximum value of the value of the placeholder month
         */
        if (part === 'day' && segmentValues.month !== null) {
          return formatter.part({
            dateObj: props.dateRef.set({
              [part as keyof DateFields]: value,
              month: segmentValues.month,
            }),
            type: part,
            options: {
              hourCycle: props.hourCycle === 24 ? 'h23' : undefined,
            },
          });
        }

        return formatter.part({
          dateObj: props.dateRef.set({
            [part]: value,
          }),
          type: part,
          options: {
            hourCycle: props.hourCycle === 24 ? 'h23' : undefined,
          },
        });
      } else {
        return getDatePlaceholder({
          field: part,
          value: '',
          locale: locale.value,
        });
      }
    } else {
      if (isDateSegmentPart(part)) {
        const value = segmentValues[part];
        if (value !== null) {
          if (part === 'day' && segmentValues.month !== null) {
            return formatter.part({
              dateObj: props.dateRef.set({
                [part]: value,
                month: segmentValues.month,
              }),
              type: part,
            });
          }

          return formatter.part({
            dateObj: props.dateRef.set({
              [part]: value,
            }),
            type: part,
          });
        } else {
          return getDatePlaceholder({
            field: part,
            value: '',
            locale: locale.value,
          });
        }
      }

      return '';
    }
  }

  return Object.keys(segmentValues).reduce((obj, part) => {
    if (!isEditableSegmentPart(part)) {
      return obj;
    }

    if ('hour' in segmentValues && part === 'dayPeriod') {
      const value = segmentValues[part];

      if (value !== null) {
        obj[part] = value;
      } else {
        obj[part] = getDatePlaceholder({
          field: part,
          value: 'AM',
          locale: locale.value,
        });
      }
    } else {
      obj[part] = getPartContent(part);
    }

    return obj;
  }, {} as DateTimeSegmentContentObj);
}

type CreateContentArrProps = {
  contentObj: DateTimeSegmentContentObj;
} & SharedContentProps;

function createContentArr(props: CreateContentArrProps) {
  const { granularity, formatter, contentObj, hideTimeZone, hourCycle, isTimeValue } = props;
  const parts = formatter.toParts({
    date: props.dateRef,
    options: getOptsByGranularity({ granularity, hourCycle, isTimeValue }),
  });

  return parts
    .map((part) => {
      const defaultParts = ['literal', 'timeZoneName', null];

      if (defaultParts.includes(part.type) || !isEditableSegmentPart(part.type)) {
        return {
          part: part.type,
          value: part.value,
        };
      }

      return {
        part: part.type,
        value: contentObj[part.type],
      };
    })
    .filter((segment): segment is { part: DateTimeSegmentPart; value: string } => {
      if (segment.part === null || segment.value === null) {
        return false;
      }

      // eslint-disable-next-line sonar/prefer-single-boolean-return
      if (
        segment.part === 'timeZoneName'
        && (!isZonedDateTime(props.dateRef) || hideTimeZone)
      ) {
        return false;
      }

      return true;
    });
}
