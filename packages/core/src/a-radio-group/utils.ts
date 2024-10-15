import { type AcceptableValue, handleAndDispatchCustomEvent } from '~~/shared';

export type SelectEvent = CustomEvent<{ originalEvent: MouseEvent; value?: AcceptableValue }>;
export const RADIO_SELECT = 'radio.select';

export function handleSelect(
  { event, value, callback }:
  {
    callback: (event: SelectEvent) => void;
    event: MouseEvent;
    value?: AcceptableValue;
  },

) {
  const eventDetail = { originalEvent: event, value };

  handleAndDispatchCustomEvent({
    name: RADIO_SELECT,
    handler: callback,
    detail: eventDetail,
  });
}
