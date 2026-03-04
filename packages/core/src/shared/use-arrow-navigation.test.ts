import { KEY_CODES } from '@vinicunca/perkakas';
import { beforeEach, describe, expect, it } from 'vitest';
import { useArrowNavigation } from './use-arrow-navigation';

describe('useArrowNavigation', () => {
  let parentElement: HTMLElement;
  let child1: HTMLElement;
  let child2: HTMLElement;
  let child3: HTMLElement;

  beforeEach(() => {
    parentElement = document.createElement('div');
    child1 = document.createElement('div');
    child2 = document.createElement('div');
    child3 = document.createElement('div');

    child1.setAttribute('data-akar-collection-item', '');
    child2.setAttribute('data-akar-collection-item', '');
    child3.setAttribute('data-akar-collection-item', '');

    parentElement.appendChild(child1);
    parentElement.appendChild(child2);
    parentElement.appendChild(child3);
  });

  it('should navigate horizontally', () => {
    const event = new KeyboardEvent('keydown', { key: KEY_CODES.ARROW_RIGHT });
    const nextElement = useArrowNavigation({
      event,
      currentElement: child1,
      parentElement,
      options: {
        arrowKeyOptions: 'horizontal',
      },
    });

    expect(nextElement).toStrictEqual(child2);
  });

  it('should navigate vertically', () => {
    const event = new KeyboardEvent('keydown', { key: KEY_CODES.ARROW_DOWN });
    const nextElement = useArrowNavigation({
      event,
      currentElement: child1,
      parentElement,
      options: {
        arrowKeyOptions: 'vertical',
      },
    });

    expect(nextElement).toStrictEqual(child2);
  });

  it('should not navigate with arrow keys when arrowKeyOptions is not set to both', () => {
    const nextElementHorizontal = useArrowNavigation({
      event: new KeyboardEvent('keydown', { key: KEY_CODES.ARROW_DOWN }),
      currentElement: child1,
      parentElement,
      options: {
        arrowKeyOptions: 'horizontal',
      },
    });

    expect(nextElementHorizontal).toBeNull();

    const nextElementVertical = useArrowNavigation({
      event: new KeyboardEvent('keydown', { key: KEY_CODES.ARROW_LEFT }),
      currentElement: child1,
      parentElement,
      options: {
        arrowKeyOptions: 'vertical',
      },
    });

    expect(nextElementVertical).toBeNull();
  });

  it('should return null if there are no items in the collection', () => {
    const event = new KeyboardEvent('keydown', { key: KEY_CODES.ARROW_RIGHT });
    const nextElement = useArrowNavigation({
      event,
      currentElement: child1,
      parentElement: document.createElement('div'),
    });
    expect(nextElement).toBeNull();
  });

  it('should loop through items if loop is set to true', () => {
    const event = new KeyboardEvent('keydown', { key: KEY_CODES.ARROW_LEFT });
    const nextElement = useArrowNavigation({
      event,
      currentElement: child3,
      parentElement,
      options: {
        loop: true,
      },
    });
    expect(nextElement).toStrictEqual(child1);
  });

  it('should not loop through items if loop is set to false', () => {
    const event = new KeyboardEvent('keydown', { key: KEY_CODES.ARROW_LEFT });
    const nextElement = useArrowNavigation({
      event,
      currentElement: child1,
      parentElement,
      options: {
        loop: false,
      },
    });
    expect(nextElement).toBeNull();
  });

  it('should skip disabled items', () => {
    child2.setAttribute('disabled', 'true');
    child3.setAttribute('disabled', 'true');
    const event = new KeyboardEvent('keydown', { key: KEY_CODES.ARROW_RIGHT });
    const nextElement = useArrowNavigation({ event, currentElement: child1, parentElement });
    expect(nextElement).toBeNull();
  });

  it('should navigate correctly in rtl', () => {
    const event = new KeyboardEvent('keydown', { key: KEY_CODES.ARROW_RIGHT });
    const nextElement = useArrowNavigation({
      event,
      currentElement: child1,
      parentElement,
      options: {
        dir: 'rtl',
      },
    });
    expect(nextElement).toStrictEqual(child3);
  });

  it('should navigate to the first item', () => {
    const event = new KeyboardEvent('keydown', { key: KEY_CODES.HOME });
    const nextElement = useArrowNavigation({ event, currentElement: child1, parentElement });
    expect(nextElement).toStrictEqual(child3);
  });

  it('should navigate to the last item', () => {
    const event = new KeyboardEvent('keydown', { key: KEY_CODES.END });
    const nextElement = useArrowNavigation({ event, currentElement: child2, parentElement });
    expect(nextElement).toStrictEqual(child1);
  });

  it('should navigate to the first item when there is only one item and currentElement is not in the collection', () => {
    const singleContainer = document.createElement('div');

    const singleChild = document.createElement('div');

    singleChild.setAttribute('data-akar-collection-item', '');

    singleContainer.appendChild(singleChild);

    const externalElement = document.createElement('input');

    const event = new KeyboardEvent('keydown', { key: KEY_CODES.ARROW_DOWN });

    const nextElement = useArrowNavigation({ event, currentElement: externalElement, parentElement: singleContainer });

    expect(nextElement).toStrictEqual(singleChild);
  });

  it('should navigate to the last item when pressing ArrowUp from an external element', () => {
    const event = new KeyboardEvent('keydown', { key: KEY_CODES.ARROW_UP });

    const multipleContainer = document.createElement('div');

    const c1 = document.createElement('div');

    const c2 = document.createElement('div');

    const c3 = document.createElement('div');

    c1.setAttribute('data-akar-collection-item', '');

    c2.setAttribute('data-akar-collection-item', '');

    c3.setAttribute('data-akar-collection-item', '');

    multipleContainer.appendChild(c1);

    multipleContainer.appendChild(c2);

    multipleContainer.appendChild(c3);

    const externalElement = document.createElement('input');

    const nextElement = useArrowNavigation({ event, currentElement: externalElement, parentElement: multipleContainer });

    expect(nextElement).toStrictEqual(c3);
  });
});
