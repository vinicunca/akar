import type { DateTimeGranularity } from '~~/date/comparators.date';
import type { HourCycle } from '~~/date/types.date';

export function getOptsByGranularity(
  { granularity, hourCycle }:
  { granularity: DateTimeGranularity; hourCycle: HourCycle },
) {
  const opts: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    hourCycle: hourCycle === 24 ? 'h24' : undefined,
    hour12: hourCycle === 24 ? false : undefined,
  };

  if (granularity === 'day') {
    delete opts.second;
    delete opts.hour;
    delete opts.minute;
    delete opts.timeZoneName;
  }

  if (granularity === 'hour') {
    delete opts.minute;
    delete opts.second;
  }

  if (granularity === 'minute') {
    delete opts.second;
  }

  return opts;
}
