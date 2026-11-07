import type { AkarElementEvent } from '.';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { defineAkarElements, paginationElements, stepperElements } from '.';
import { cleanup, query, render, settle } from './elements.test.helpers';

beforeAll(() => {
  defineAkarElements([paginationElements, stepperElements]);
});
afterEach(cleanup);

function events(el: Element, type: string) {
  const seen: Array<{ value: unknown; reason: unknown }> = [];
  el.addEventListener(type, (event) => {
    const { value, details } = (event as AkarElementEvent<unknown, { reason?: unknown }>).detail;
    seen.push({ value, reason: details?.reason });
  });
  return seen;
}

describe('pagination elements', () => {
  // No scoped slot: the page items are written out (or rendered from `update-page`).
  const PAGINATION = `
    <akar-pagination-root total="50" items-per-page="10" default-page="2">
      <akar-pagination-list>
        <akar-pagination-first>«</akar-pagination-first>
        <akar-pagination-prev>‹</akar-pagination-prev>
        <akar-pagination-list-item value="1">1</akar-pagination-list-item>
        <akar-pagination-list-item value="2">2</akar-pagination-list-item>
        <akar-pagination-list-item value="3">3</akar-pagination-list-item>
        <akar-pagination-ellipsis>…</akar-pagination-ellipsis>
        <akar-pagination-list-item value="5">5</akar-pagination-list-item>
        <akar-pagination-next>›</akar-pagination-next>
        <akar-pagination-last>»</akar-pagination-last>
      </akar-pagination-list>
    </akar-pagination-root>
  `;

  it('is a navigation landmark with button pages, and moves between pages', async () => {
    render(PAGINATION);
    const root = query('akar-pagination-root');
    const [one, two, three] = document.querySelectorAll<HTMLElement>('akar-pagination-list-item');
    const next = query('akar-pagination-next');
    const last = query('akar-pagination-last');
    await vi.waitFor(() => expect(two.getAttribute('aria-current')).toBe('page'));
    expect(root.getAttribute('role')).toBe('navigation');
    expect(two.getAttribute('role')).toBe('button');
    expect(two.getAttribute('data-selected')).toBe('true');
    expect(one.hasAttribute('aria-current')).toBe(false);
    expect(query('akar-pagination-ellipsis').getAttribute('data-type')).toBe('ellipsis');
    const changes = events(root, 'update-page');

    await userEvent.click(three);
    await vi.waitFor(() => expect(three.getAttribute('aria-current')).toBe('page'));
    // Buttons activate with the keyboard, like native ones.
    next.focus();
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(query('akar-pagination-list-item[value="3"]').hasAttribute('aria-current')).toBe(false));
    await userEvent.click(last);
    await vi.waitFor(() => expect(query('akar-pagination-list-item[value="5"]').getAttribute('aria-current')).toBe('page'));
    // On the last page, next and last are disabled.
    expect(next.getAttribute('aria-disabled')).toBe('true');
    expect(last.getAttribute('aria-disabled')).toBe('true');
    expect(changes.map((change) => change.value)).toEqual([3, 4, 5]);
  });

  it('can be controlled with the `page` property, and cancelled through `before-update-page`', async () => {
    render(PAGINATION);
    const root = query<HTMLElement & { page?: number }>('akar-pagination-root');
    const [one, two] = document.querySelectorAll<HTMLElement>('akar-pagination-list-item');
    await vi.waitFor(() => expect(two.getAttribute('aria-current')).toBe('page'));

    root.page = 1;
    await vi.waitFor(() => expect(one.getAttribute('aria-current')).toBe('page'));
    expect(query('akar-pagination-prev').getAttribute('aria-disabled')).toBe('true');

    root.page = undefined;
    root.addEventListener('before-update-page', (event) => event.preventDefault());
    await userEvent.click(query('akar-pagination-list-item[value="3"]'));
    expect(query('akar-pagination-list-item[value="3"]').hasAttribute('aria-current')).toBe(false);
  });
});

describe('stepper elements', () => {
  const STEPPER = `
    <akar-stepper-root default-value="1" aria-label="Checkout">
      <akar-stepper-item step="1">
        <akar-stepper-trigger>
          <akar-stepper-indicator>1</akar-stepper-indicator>
          <akar-stepper-title>Address</akar-stepper-title>
        </akar-stepper-trigger>
        <akar-stepper-description>Where to ship</akar-stepper-description>
        <akar-stepper-separator></akar-stepper-separator>
      </akar-stepper-item>
      <akar-stepper-item step="2">
        <akar-stepper-trigger>
          <akar-stepper-indicator>2</akar-stepper-indicator>
          <akar-stepper-title>Payment</akar-stepper-title>
        </akar-stepper-trigger>
        <akar-stepper-description>How to pay</akar-stepper-description>
        <akar-stepper-separator></akar-stepper-separator>
      </akar-stepper-item>
      <akar-stepper-item step="3">
        <akar-stepper-trigger>
          <akar-stepper-indicator>3</akar-stepper-indicator>
          <akar-stepper-title>Review</akar-stepper-title>
        </akar-stepper-trigger>
      </akar-stepper-item>
    </akar-stepper-root>
  `;

  it('wires titles and descriptions to the triggers, and announces the step', async () => {
    render(STEPPER);
    const root = query('akar-stepper-root');
    const [first, second] = document.querySelectorAll<HTMLElement>('akar-stepper-trigger');
    const [firstItem, secondItem, thirdItem] = document.querySelectorAll<HTMLElement>('akar-stepper-item');
    const [title] = document.querySelectorAll<HTMLElement>('akar-stepper-title');
    const [description] = document.querySelectorAll<HTMLElement>('akar-stepper-description');
    await vi.waitFor(() => expect(firstItem.getAttribute('aria-current')).toBe('true'));
    expect(root.getAttribute('role')).toBe('group');
    expect(first.getAttribute('role')).toBe('button');
    expect(first.getAttribute('aria-labelledby')).toBe(title.id);
    expect(first.getAttribute('aria-describedby')).toBe(description.id);
    expect(title.getAttribute('role')).toBe('heading');
    expect(title.getAttribute('aria-level')).toBe('4');
    expect(firstItem.getAttribute('data-state')).toBe('current');
    // Linear: only the next step can be reached.
    expect(query('akar-stepper-item[step="3"] akar-stepper-trigger').getAttribute('aria-disabled')).toBe('true');
    expect(thirdItem.hasAttribute('data-disabled')).toBe(true);
    expect(query('akar-stepper-separator').getAttribute('role')).toBe('none');
    // The live region the Vue component renders next to its content.
    const status = root.querySelector(':scope > [role="status"]')!;
    expect(status.textContent!.trim()).toBe('Step 1 of 3');
    expect(second.getAttribute('data-state')).toBe('upcoming');

    const changes = events(root, 'update-model-value');
    await userEvent.click(second);
    await vi.waitFor(() => expect(secondItem.getAttribute('aria-current')).toBe('true'));
    expect(first.getAttribute('data-state')).toBe('completed');
    await vi.waitFor(() => expect(status.textContent!.trim()).toBe('Step 2 of 3'));
    expect(changes).toEqual([
      { value: 2, reason: 'trigger-press' },
    ]);

    // It goes away with the part.
    root.remove();
    await vi.waitFor(() => expect(root.querySelector('[role="status"]')).toBeNull());
  });

  it('moves focus between triggers with the arrow keys', async () => {
    render(STEPPER.replace('default-value="1"', 'default-value="2"'));
    const [first, second, third] = document.querySelectorAll<HTMLElement>('akar-stepper-trigger');
    const items = document.querySelectorAll<HTMLElement>('akar-stepper-item');
    await vi.waitFor(() => expect(items[1].getAttribute('aria-current')).toBe('true'));
    second.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(third);
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(items[2].getAttribute('aria-current')).toBe('true'));
    await userEvent.keyboard('{ArrowLeft}');
    await userEvent.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(first);
  });

  it('a `cloneNode()` copy has one live region', async () => {
    const container = render(`
      <akar-stepper-root default-value="1">
        <akar-stepper-item step="1"><akar-stepper-trigger>1</akar-stepper-trigger></akar-stepper-item>
        <akar-stepper-item step="2"><akar-stepper-trigger>2</akar-stepper-trigger></akar-stepper-item>
      </akar-stepper-root>`);
    const root = query('akar-stepper-root');
    await vi.waitFor(() => expect(root.querySelector(':scope > [role=status]')).not.toBeNull());
    const clone = root.cloneNode(true) as HTMLElement;
    container.append(clone);
    await vi.waitFor(() => expect(clone.hasAttribute('data-akar-unmounted')).toBe(false));
    await settle();
    expect(clone.querySelectorAll(':scope > [role=status]')).toHaveLength(1);
  });
});
