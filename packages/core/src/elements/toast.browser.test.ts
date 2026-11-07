import type { AkarElementEvent } from '.';
import type { ToastObject } from '@/Toast';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { hoverForMousePointerId } from '@/test/browser';
import { createToastManager } from '@/Toast';
import { defineAkarElements, toastElements } from '.';
import { cleanup, query, render, settle } from './elements.test.helpers';

beforeAll(() => {
  defineAkarElements([toastElements]);
});
afterEach(cleanup);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const STYLES = `<style>
  akar-toast-viewport { display: flex; flex-direction: column; position: fixed; bottom: 0; right: 0; width: 320px; margin: 0; padding: 16px; list-style: none }
  akar-toast-root { display: block; padding: 12px; background: white; border: 1px solid; transform: translateX(var(--akar-toast-swipe-move-x, 0)) }
</style>`;

function toast(attrs = '') {
  return `
    <akar-toast-root ${attrs}>
      <akar-toast-title>Scheduled: Catch up</akar-toast-title>
      <akar-toast-description>Friday at 5pm</akar-toast-description>
      <akar-toast-action alt-text="Undo the schedule">Undo</akar-toast-action>
      <akar-toast-close aria-label="Close">×</akar-toast-close>
    </akar-toast-root>`;
}

function provider(children: string, attrs = '') {
  return `${STYLES}
    <button id="before">Before</button>
    <akar-toast-provider ${attrs}>
      ${children}
      <akar-toast-viewport></akar-toast-viewport>
    </akar-toast-provider>`;
}

type Reasons = Array<unknown>;
function trackClose(root: HTMLElement): Reasons {
  const reasons: Reasons = [];
  root.addEventListener('update-open', (event) => {
    const { value, details } = (event as AkarElementEvent<boolean, { reason: string }>).detail;
    reasons.push([value, details.reason]);
  });
  return reasons;
}

/**
 * A mouse drag on `el` by `dx` pixels (synthetic events: the gesture reads
 * coordinates only). It captures the pointer, so they carry the real mouse's id.
 */
async function drag(el: HTMLElement, dx: number) {
  const pointerId = await hoverForMousePointerId(el);
  const box = el.getBoundingClientRect();
  const y = box.top + box.height / 2;
  const x = box.left + 10;
  const init = {
    bubbles: true,
    cancelable: true,
    composed: true,
    pointerId,
    pointerType: 'mouse',
    isPrimary: true,
    clientY: y,
  };
  el.dispatchEvent(new PointerEvent('pointerdown', {
    ...init,
    clientX: x,
    button: 0,
    buttons: 1,
  }));
  for (let step = 1; step <= 5; step++) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    el.dispatchEvent(new PointerEvent('pointermove', { ...init, clientX: x + (dx * step) / 5, buttons: 1 }));
  }
  el.dispatchEvent(new PointerEvent('pointerup', {
    ...init,
    clientX: x + dx,
    button: 0,
    buttons: 0,
  }));
}

describe('toast elements', () => {
  it('renders a toast into the labelled viewport, and announces it', async () => {
    render(provider(toast('duration="100000"')));
    const viewport = query('akar-toast-viewport');
    const root = query('akar-toast-root');
    await vi.waitFor(() => expect(root.getAttribute('data-state')).toBe('open'));
    // The toast moved into the viewport, a list in a labelled region.
    expect(viewport.contains(root)).toBe(true);
    expect(viewport.getAttribute('role')).toBe('list');
    expect(root.getAttribute('role')).toBe('listitem');
    const region = viewport.closest('[role=region]')!;
    expect(region.getAttribute('aria-label')).toBe('Notifications (F8)');
    // The announcement is a live region in the document, where the toast was declared.
    await vi.waitFor(() => expect(document.querySelector('[role=alert]')?.textContent).toContain('Scheduled: Catch up'));
    const alert = document.querySelector('[role=alert]')!;
    expect(alert.getAttribute('aria-live')).toBe('assertive');
    expect(query('akar-toast-provider').contains(alert)).toBe(true);
    expect(query('akar-toast-action').getAttribute('role')).toBe('button');
  });

  it('leaves the announcement out of a `cloneNode()` copy', async () => {
    render(provider(toast('duration="100000"')));
    const root = query('akar-toast-root');
    await vi.waitFor(() => expect(document.querySelector('[role=alert]')?.textContent).toContain('Scheduled: Catch up'));
    const copy = query('akar-toast-provider').cloneNode(true) as HTMLElement;
    const alerts = (node: ParentNode) => node.querySelectorAll('[data-akar-relocated][role=alert], [data-akar-relocated] [role=alert]');
    expect(alerts(copy).length).toBe(1);
    render('').append(copy);
    // The copied toast announces itself again; the original's copy is gone.
    await vi.waitFor(() => expect(copy.querySelector('akar-toast-root')!.getAttribute('data-state')).toBe('open'));
    expect(alerts(copy).length).toBeLessThanOrEqual(1);
    expect(root.isConnected).toBe(true);
    expect(alerts(query('akar-toast-provider')).length).toBe(1);
  });

  it('closes after its duration with the `timeout` reason, and pauses while hovered', async () => {
    render(provider(toast('duration="2000"')));
    const root = query('akar-toast-root');
    const reasons = trackClose(root);
    const paused = vi.fn();
    root.addEventListener('pause', paused);
    await vi.waitFor(() => expect(root.getAttribute('data-state')).toBe('open'));

    await userEvent.hover(root);
    await vi.waitFor(() => expect(paused).toHaveBeenCalled());
    // Longer than the duration: still open while paused.
    await wait(2300);
    expect(root.getAttribute('data-state')).toBe('open');

    const resumed = vi.fn();
    root.addEventListener('resume', resumed);
    await userEvent.hover(query('#before'));
    await vi.waitFor(() => expect(resumed).toHaveBeenCalled());
    await vi.waitFor(() => expect(reasons).toEqual([
      [false, 'timeout'],
    ]), { timeout: 5000 });
    await vi.waitFor(() => expect(root.hasAttribute('data-akar-unmounted')).toBe(true));
  });

  it('closes from the close button and the action, with their reasons', async () => {
    render(provider(`${toast('duration="100000" data-test="a"')}${toast('duration="100000" data-test="b"')}`));
    const [a, b] = [
      query('[data-test=a]'),
      query('[data-test=b]'),
    ];
    await vi.waitFor(() => expect(b.getAttribute('data-state')).toBe('open'));
    const reasonsA = trackClose(a);
    const reasonsB = trackClose(b);
    await userEvent.click(a.querySelector('akar-toast-close')!);
    await vi.waitFor(() => expect(reasonsA).toEqual([
      [false, 'close-press'],
    ]));
    await userEvent.click(b.querySelector('akar-toast-action')!);
    await vi.waitFor(() => expect(reasonsB).toEqual([
      [false, 'action-press'],
    ]));
  });

  it('closes on a swipe past the threshold, with the swipe events', async () => {
    render(provider(toast('duration="100000"'), 'swipe-threshold="40"'));
    const root = query('akar-toast-root');
    await vi.waitFor(() => expect(root.getAttribute('data-state')).toBe('open'));
    const reasons = trackClose(root);
    const events: Array<string> = [];
    for (const type of [
      'swipe-start',
      'swipe-move',
      'swipe-cancel',
      'swipe-end',
    ]) {
      root.addEventListener(type, () => events.push(type));
    }

    // Too short: snaps back.
    await drag(root, 20);
    await settle();
    expect(events).toContain('swipe-cancel');
    expect(root.getAttribute('data-state')).toBe('open');

    events.length = 0;
    await drag(root, 120);
    await vi.waitFor(() => expect(reasons).toEqual([
      [false, 'swipe'],
    ]));
    expect(events[0]).toBe('swipe-start');
    expect(events).toContain('swipe-move');
    expect(events.at(-1)).toBe('swipe-end');
  });

  it('moves focus to the viewport with the F8 hotkey and closes the focused toast on Escape', async () => {
    render(provider(toast('duration="100000"')));
    const root = query('akar-toast-root');
    await vi.waitFor(() => expect(root.getAttribute('data-state')).toBe('open'));
    const reasons = trackClose(root);
    query('#before').focus();
    await userEvent.keyboard('{F8}');
    await vi.waitFor(() => expect(document.activeElement).toBe(query('akar-toast-viewport')));
    await userEvent.keyboard('{Tab}');
    expect(document.activeElement).toBe(root);
    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(reasons).toEqual([
      [false, 'escape-key'],
    ]));
  });

  it('renders the toasts of an imperative manager from `update-toasts`', async () => {
    render(provider(''));
    const providerEl = query<HTMLElement & { toastManager: unknown }>('akar-toast-provider');
    const manager = createToastManager();
    // Added before the provider subscribes: kept until it does.
    manager.add({ title: 'Saved', description: 'Your file was saved.', duration: 100000 });
    const lists: Array<Array<ToastObject>> = [];
    const roots = new Map<string, HTMLElement & { toast: ToastObject }>();
    providerEl.addEventListener('update-toasts', (event) => {
      const toasts = (event as AkarElementEvent<Array<ToastObject>>).detail.value;
      lists.push(toasts);
      // Render one toast root per toast, keyed by id.
      for (const item of toasts) {
        let el = roots.get(item.id);
        if (!el) {
          el = document.createElement('akar-toast-root') as HTMLElement & { toast: ToastObject };
          el.innerHTML = `<akar-toast-title>${item.title}</akar-toast-title><akar-toast-description>${item.description}</akar-toast-description>`;
          roots.set(item.id, el);
          providerEl.prepend(el);
        }
        el.toast = item;
      }
      for (const [id, el] of roots) {
        if (!toasts.some((item) => item.id === id)) {
          el.remove();
          roots.delete(id);
        }
      }
    });
    providerEl.toastManager = manager;
    await vi.waitFor(() => expect(lists.at(-1)?.map((item) => item.title)).toEqual(['Saved']));
    const [first] = roots.values();
    await vi.waitFor(() => expect(first.getAttribute('data-state')).toBe('open'));
    expect(query('akar-toast-viewport').contains(first)).toBe(true);

    const id = manager.add({
      title: 'Deleted',
      description: 'One item.',
      status: 'success',
      duration: 100000,
    });
    await vi.waitFor(() => expect(lists.at(-1)?.map((item) => item.title)).toEqual(['Deleted', 'Saved']));
    const second = roots.get(id)!;
    await vi.waitFor(() => expect(second.getAttribute('data-status')).toBe('success'));

    // Closing through the manager closes the toast, which then leaves the list.
    const closed = vi.fn();
    second.addEventListener('update-open', closed);
    manager.close(id);
    await vi.waitFor(() => expect(closed).toHaveBeenCalled());
    await vi.waitFor(() => expect(lists.at(-1)?.map((item) => item.title)).toEqual(['Saved']));
    expect(second.isConnected).toBe(false);
  });
});
