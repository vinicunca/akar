import type { AkarElementEvent } from '.';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { defineAkarElements, scrollAreaElements, splitterElements } from '.';
import { cleanup, query, render, settle } from './elements.test.helpers';

beforeAll(() => {
  defineAkarElements([scrollAreaElements, splitterElements]);
});
afterEach(cleanup);

describe('scroll area elements', () => {
  // The viewport is the part's own wrapper: style it through its data attribute.
  const SCROLL_AREA = `
    <style>[data-akar-scroll-area-viewport] { width: 100%; height: 100%; }</style>
    <akar-scroll-area-root type="always" style="display: block; width: 200px; height: 100px">
      <akar-scroll-area-viewport style="display: block">
        <div style="width: 400px; height: 400px">Content</div>
      </akar-scroll-area-viewport>
      <akar-scroll-area-scrollbar orientation="vertical" style="display: block; width: 10px">
        <akar-scroll-area-thumb style="display: block; background: black"></akar-scroll-area-thumb>
      </akar-scroll-area-scrollbar>
      <akar-scroll-area-scrollbar orientation="horizontal" style="display: block; height: 10px">
        <akar-scroll-area-thumb style="display: block; background: black"></akar-scroll-area-thumb>
      </akar-scroll-area-scrollbar>
      <akar-scroll-area-corner style="display: block"></akar-scroll-area-corner>
    </akar-scroll-area-root>
  `;

  it('scrolls a viewport wrapped around its content, with custom scrollbars', async () => {
    render(SCROLL_AREA);
    const root = query('akar-scroll-area-root');
    const content = query('akar-scroll-area-viewport');
    const [vertical, horizontal] = document.querySelectorAll<HTMLElement>('akar-scroll-area-scrollbar');
    const [thumb] = document.querySelectorAll<HTMLElement>('akar-scroll-area-thumb');
    // The scrolling viewport is a wrapper the part renders around the element.
    await vi.waitFor(() => expect(content.parentElement!.hasAttribute('data-akar-scroll-area-viewport')).toBe(true));
    const viewport = content.parentElement!;
    expect(viewport.parentElement).toBe(root);
    expect(viewport.style.overflowY).toBe('scroll');
    // Its stylesheet hiding the native scrollbars is in the document.
    expect([
      ...document.head.querySelectorAll('style'),
    ].some((style) => style.textContent!.includes('[data-akar-scroll-area-viewport]'))).toBe(true);
    expect(viewport.offsetWidth - viewport.clientWidth).toBe(0);

    expect(vertical.getAttribute('data-orientation')).toBe('vertical');
    expect(horizontal.getAttribute('data-orientation')).toBe('horizontal');
    await vi.waitFor(() => expect(thumb.getBoundingClientRect().height).toBeGreaterThan(0));
    expect(thumb.getBoundingClientRect().height).toBeLessThan(vertical.getBoundingClientRect().height);
    await vi.waitFor(() => expect(query('akar-scroll-area-corner').hasAttribute('data-akar-unmounted')).toBe(false));

    const thumbTop = thumb.getBoundingClientRect().top;
    viewport.scrollTop = 200;
    await vi.waitFor(() => expect(thumb.getBoundingClientRect().top).toBeGreaterThan(thumbTop));

    // Wheeling over the scrollbar scrolls the viewport.
    viewport.scrollTop = 0;
    await userEvent.wheel(vertical, {
      delta: { y: 100 },
    });
    await vi.waitFor(() => expect(viewport.scrollTop).toBeGreaterThan(0));
  });

  it('leaves no wrapper behind when it is moved', async () => {
    const container = render(SCROLL_AREA);
    const root = query('akar-scroll-area-root');
    const content = query('akar-scroll-area-viewport');
    await vi.waitFor(() => expect(content.parentElement!.hasAttribute('data-akar-scroll-area-viewport')).toBe(true));
    root.remove();
    await vi.waitFor(() => expect(content.parentElement).toBe(root));
    container.append(root);
    await vi.waitFor(() => expect(content.parentElement!.hasAttribute('data-akar-scroll-area-viewport')).toBe(true));
    expect(root.querySelectorAll('[data-akar-scroll-area-viewport]')).toHaveLength(1);
  });

  it('takes its styles out of the document when it unmounts', async () => {
    render(SCROLL_AREA);
    const content = query('akar-scroll-area-viewport');
    await vi.waitFor(() => expect(content.parentElement!.hasAttribute('data-akar-scroll-area-viewport')).toBe(true));
    const styles = () => [
      ...document.head.querySelectorAll('style'),
    ].filter((style) => style.textContent!.includes('[data-akar-scroll-area-viewport]'));
    expect(styles()).toHaveLength(1);
    await cleanup();
    expect(styles()).toHaveLength(0);
  });

  it('a `cloneNode()` copy has one viewport wrapper', async () => {
    const container = render(SCROLL_AREA);
    const root = query('akar-scroll-area-root');
    const content = query('akar-scroll-area-viewport');
    await vi.waitFor(() => expect(content.parentElement!.hasAttribute('data-akar-scroll-area-viewport')).toBe(true));
    const clone = root.cloneNode(true) as HTMLElement;
    container.append(clone);
    const copy = clone.querySelector('akar-scroll-area-viewport')!;
    await vi.waitFor(() => expect(copy.hasAttribute('data-akar-unmounted')).toBe(false));
    await settle();
    expect(clone.querySelectorAll('[data-akar-scroll-area-viewport]')).toHaveLength(1);
  });
});

describe('splitter elements', () => {
  // The group fills its container, as in Vue.
  const SPLITTER = `
    <div style="width: 408px; height: 100px">
      <akar-splitter-group direction="horizontal">
        <akar-splitter-panel default-size="40" min-size="20">Left</akar-splitter-panel>
        <akar-splitter-resize-handle style="width: 8px"></akar-splitter-resize-handle>
        <akar-splitter-panel default-size="60" min-size="20">Right</akar-splitter-panel>
      </akar-splitter-group>
    </div>
  `;

  it('lays out the panels, and resizes them with the keyboard', async () => {
    render(SPLITTER);
    const group = query('akar-splitter-group');
    const [left, right] = document.querySelectorAll<HTMLElement>('akar-splitter-panel');
    const handle = query('akar-splitter-resize-handle');
    await vi.waitFor(() => expect(left.style.flexGrow).toBe('40'));
    expect(right.style.flexGrow).toBe('60');
    expect(left.getBoundingClientRect().width).toBeCloseTo(160, 0);
    expect(handle.getAttribute('role')).toBe('separator');
    expect(handle.getAttribute('aria-controls')).toBe(left.id);
    expect(handle.getAttribute('aria-valuenow')).toBe('40');
    expect(handle.getAttribute('tabindex')).toBe('0');
    const layouts: Array<unknown> = [];
    group.addEventListener('update-layout', (event) => {
      const { value, details } = (event as AkarElementEvent<Array<number>, { reason: string }>).detail;
      layouts.push([value, details.reason]);
    });

    handle.focus();
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(handle.getAttribute('aria-valuenow')).toBe('50'));
    expect(left.style.flexGrow).toBe('50');
    await userEvent.keyboard('{Home}');
    await vi.waitFor(() => expect(handle.getAttribute('aria-valuenow')).toBe('20'));
    expect(layouts).toEqual([
      [
        [50, 50],
        'keyboard',
      ],
      [
        [20, 80],
        'keyboard',
      ],
    ]);
  });

  it('resizes the panels by dragging the handle', async () => {
    render(SPLITTER);
    const group = query('akar-splitter-group');
    const [left, right] = document.querySelectorAll<HTMLElement>('akar-splitter-panel');
    const handle = query('akar-splitter-resize-handle');
    await vi.waitFor(() => expect(left.style.flexGrow).toBe('40'));
    const reasons: Array<unknown> = [];
    group.addEventListener('update-layout', (event) => reasons.push((event as AkarElementEvent<unknown, { reason: string }>).detail.details.reason));
    // `force`: the drag sets a global cursor style mid-gesture (as in Vue's test).
    await userEvent.dragAndDrop(handle, right, { force: true } as never);
    await vi.waitFor(() => expect(left.getBoundingClientRect().width).toBeGreaterThan(200));
    expect(reasons.at(-1)).toBe('drag');
  });
});
