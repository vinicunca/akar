export const TOAST_SWIPE_START = 'toast.swipeStart';
export const TOAST_SWIPE_MOVE = 'toast.swipeMove';
export const TOAST_SWIPE_CANCEL = 'toast.swipeCancel';
export const TOAST_SWIPE_END = 'toast.swipeEnd';

export const VIEWPORT_NAME = 'AToastViewport';
export const VIEWPORT_DEFAULT_HOTKEY = ['F8'];
export const VIEWPORT_PAUSE = 'toast.viewportPause';
export const VIEWPORT_RESUME = 'toast.viewportResume';

export type SwipeDirection = 'down' | 'left' | 'right' | 'up';

export type SwipeEvent = Omit<
  CustomEvent<{ originalEvent: PointerEvent; delta: { x: number; y: number } }>,
  'currentTarget'
> & { currentTarget: EventTarget & HTMLElement };

export function handleAndDispatchCustomEvent<
  E extends CustomEvent,
  OriginalEvent extends Event,
>(
  name: string,
  handler: ((event: E) => void) | undefined,
  detail: (E extends CustomEvent<infer D>
    ? D
    : never) & { originalEvent: OriginalEvent },
) {
  const currentTarget = detail.originalEvent.currentTarget as HTMLElement;
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail,
  });
  if (handler) {
    currentTarget.addEventListener(name, handler as EventListener, { once: true });
  }

  currentTarget.dispatchEvent(event);
}

export function isDeltaInDirection(delta: { x: number; y: number }, direction: SwipeDirection, threshold = 0) {
  const deltaX = Math.abs(delta.x);
  const deltaY = Math.abs(delta.y);
  const isDeltaX = deltaX > deltaY;
  if (direction === 'left' || direction === 'right') {
    return isDeltaX && deltaX > threshold;
  } else {
    return !isDeltaX && deltaY > threshold;
  }
}

export function isHTMLElement(node: any): node is HTMLElement {
  return node.nodeType === node.ELEMENT_NODE;
}

export function getAnnounceTextContent(container: HTMLElement) {
  const textContent: Array<string> = [];
  const childNodes = Array.from(container.childNodes);

  childNodes.forEach((node) => {
    if (node.nodeType === node.TEXT_NODE && node.textContent) {
      textContent.push(node.textContent);
    }
    if (isHTMLElement(node)) {
      const isHidden = node.ariaHidden || node.hidden || node.style.display === 'none';
      const isExcluded = node.dataset.akarToastAnnounceExclude === '';

      if (!isHidden) {
        if (isExcluded) {
          const altText = node.dataset.akarToastAnnounceAlt;
          if (altText) {
            textContent.push(altText);
          }
        } else {
          textContent.push(...getAnnounceTextContent(node));
        }
      }
    }
  });
  // We return a collection of text rather than a single concatenated string.
  // This allows SR VO to naturally pause break between nodes while announcing.
  return textContent;
}
