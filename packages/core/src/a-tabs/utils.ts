import type { StringOrNumber } from '~~/shared/types';

export function makeTriggerId(
  { baseId, value }:
  { baseId: string; value: StringOrNumber },
) {
  return `${baseId}-trigger-${value}`;
}

export function makeContentId(
  { baseId, value }:
  { baseId: string; value: StringOrNumber },
) {
  return `${baseId}-content-${value}`;
}
