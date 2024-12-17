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
    name: string;
    handler: ((event: E) => void) | undefined;
    detail: (E extends CustomEvent<infer D>
      ? D
      : never) & { originalEvent: OriginalEvent };
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
