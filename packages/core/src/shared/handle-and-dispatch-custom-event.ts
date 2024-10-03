export function handleAndDispatchCustomEvent<
  E extends CustomEvent,
  OriginalEvent extends Event,
>(
  {
    name,
    handler,
    detail,
  }:
  {
    detail: { originalEvent: OriginalEvent } & (E extends CustomEvent<infer D>
      ? D
      : never);
    handler: ((event: E) => void) | undefined;
    name: string;
  },
) {
  const target = detail.originalEvent.target;

  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail,
  });

  if (handler) {
    target.addEventListener(name, handler as EventListener, { once: true });
  }

  target.dispatchEvent(event);
}
