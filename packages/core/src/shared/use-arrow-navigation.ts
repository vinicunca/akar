import { KEY_CODES } from '@vinicunca/perkakas';

import type { Direction } from './types';

type ArrowKeyOptions = 'both' | 'horizontal' | 'vertical';

interface ArrowNavigationOptions {
  /**
   * The arrow key options to allow navigation
   *
   * @defaultValue "both"
   */
  arrowKeyOptions?: ArrowKeyOptions;

  /**
   * The attribute name to find the collection items in the parent element.
   *
   * @defaultValue "data-akar-collection-item"
   */
  attributeName?: string;

  /**
   * The orientation of the collection
   *
   * @defaultValue "ltr"
   */
  dir?: Direction;

  /**
   * By default all currentElement would trigger navigation. If `true`, currentElement nodeName in the ignore list will return null
   *
   * @defaultValue false
   */
  enableIgnoredElement?: boolean;

  /**
   * Focus the element after navigation
   *
   * @defaultValue false
   */
  focus?: boolean;

  /**
   * The parent element where contains all the collection items, this will collect every item to be used when nav
   * It will be ignored if attributeName is provided
   *
   * @defaultValue []
   */
  itemsArray?: Array<HTMLElement>;

  /**
   * Allow loop navigation. If false, it will stop at the first and last element
   *
   * @defaultValue true
   */
  loop?: boolean;

  /**
   * Prevent the scroll when navigating. This happens when the direction of the
   * key matches the scroll direction of any ancestor scrollable elements.
   *
   * @defaultValue true
   */
  preventScroll?: boolean;
}

const ignoredElement = ['INPUT', 'TEXTAREA'];

/**
 * Allow arrow navigation for every html element with data-akar-collection-item tag
 *
 * @param params Parameters
 * @param params.event Keyboard event
 * @param params.currentElement Event initiator element or any element that wants to handle the navigation
 * @param params.parentElement Parent element where contains all the collection items, this will collect every item to be used when nav
 * @param params.options ArrowNavigationOptions
 * @returns the navigated html element or null if none
 */
export function useArrowNavigation(
  { event, currentElement, parentElement, options = {} }:
  {
    currentElement: HTMLElement;
    event: KeyboardEvent;
    options?: ArrowNavigationOptions;
    parentElement: HTMLElement | undefined;
  },
): HTMLElement | null {
  if (
    !currentElement
    || (options.enableIgnoredElement && ignoredElement.includes(currentElement.nodeName))
  ) {
    return null;
  }

  const {
    arrowKeyOptions = 'both',
    attributeName = '[data-akar-collection-item]',
    itemsArray = [],
    loop = true,
    dir = 'ltr',
    preventScroll = true,
    focus = false,
  } = options;

  const [right, left, up, down, home, end] = [
    event.key === KEY_CODES.ARROW_RIGHT,
    event.key === KEY_CODES.ARROW_LEFT,
    event.key === KEY_CODES.ARROW_UP,
    event.key === KEY_CODES.ARROW_DOWN,
    event.key === KEY_CODES.HOME,
    event.key === KEY_CODES.END,
  ];
  const goingVertical = up || down;
  const goingHorizontal = right || left;

  if (
    !home
    && !end
    && ((!goingVertical && !goingHorizontal)
      || (arrowKeyOptions === 'vertical' && goingHorizontal)
      || (arrowKeyOptions === 'horizontal' && goingVertical))
  ) {
    return null;
  }

  const allCollectionItems: Array<HTMLElement> = parentElement
    ? Array.from(parentElement.querySelectorAll(attributeName))
    : itemsArray;

  if (!allCollectionItems.length) {
    return null;
  }

  if (preventScroll) {
    event.preventDefault();
  }

  let item: HTMLElement | null = null;

  if (goingHorizontal || goingVertical) {
    let goForward;

    if (goingVertical) {
      goForward = down;
    } else {
      if (dir === 'ltr') {
        goForward = right;
      } else {
        goForward = left;
      }
    }

    item = findNextFocusableElement({
      elements: allCollectionItems,
      currentElement,
      options: {
        goForward,
        loop,
      },
    });
  } else if (home) {
    item = allCollectionItems.at(0) || null;
  } else if (end) {
    item = allCollectionItems.at(-1) || null;
  }

  if (focus) {
    item?.focus();
  }

  return item;
}

interface FindNextFocusableElementOptions {
  /**
   * Whether to search forwards or backwards.
   */
  goForward: boolean;
  /**
   * Whether to allow looping the search. If false, it will stop at the first/last element.
   *
   * @default true
   */
  loop?: boolean;
}

/**
 * Recursive function to find the next focusable element to avoid disabled elements
 *
 * @param params Parameters
 * @param params.elements Elements to navigate
 * @param params.currentElement Current active element
 * @param params.options
 * @returns next focusable element
 */
function findNextFocusableElement(
  { elements, currentElement, options, iterations = elements.length }:
  {
    currentElement: HTMLElement;
    elements: Array<HTMLElement>;
    iterations?: number;
    options: FindNextFocusableElementOptions;
  },
): HTMLElement | null {
  if (--iterations === 0) {
    return null;
  }

  const index = elements.indexOf(currentElement);
  const newIndex = options.goForward ? index + 1 : index - 1;

  if (!options.loop && (newIndex < 0 || newIndex >= elements.length)) {
    return null;
  }

  const adjustedNewIndex = (newIndex + elements.length) % elements.length;
  const candidate = elements[adjustedNewIndex];
  if (!candidate) {
    return null;
  }

  const isDisabled = candidate.hasAttribute('disabled')
    && candidate.getAttribute('disabled') !== 'false';

  if (isDisabled) {
    return findNextFocusableElement({
      elements,
      currentElement: candidate,
      options,
      iterations,
    });
  }

  return candidate;
}
