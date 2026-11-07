// Custom elements driven by React, the way the "Custom elements" guide documents
// it. Runs twice: the `react19` and `react18` browser projects (React 18 through
// the `react18` / `react-dom18` aliases).
import type { AkarElementEvent } from '.';
import { createElement as h, useEffect, useRef, useState, version } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server.browser';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { akarElementFamilies, defineAkarElements, dialogElements } from '.';
import { cleanup, render, settle } from './elements.test.helpers';

beforeAll(() => {
  defineAkarElements(akarElementFamilies);
});
afterEach(cleanup);

const STYLE = { display: 'inline-block', width: 40, height: 20 };
const SLIDER_STYLE = {
  display: 'flex',
  position: 'relative',
  width: 200,
  height: 20,
} as const;
const THUMB_STYLE = { display: 'block', width: 10, height: 10 };
const major = Number(version.split('.')[0]);
type SwitchElement = HTMLElement & { modelValue?: boolean | null };

function mount(element: ReturnType<typeof h>) {
  const host = render('');
  const root = createRoot(host);
  flushSync(() => root.render(element));
  return { host, root };
}

describe.runIf(major >= 19)(`React ${version}`, () => {
  it('controlled switch: property in, `onupdate-model-value` out', async () => {
    const seen: Array<unknown> = [];
    function App() {
      const [checked, setChecked] = useState(false);
      return h('akar-switch-root', {
        'aria-label': 'Wi-Fi',
        'style': STYLE,
        'modelValue': checked,
        'disabled': false,
        'onupdate-model-value': (event: AkarElementEvent<boolean>) => {
          seen.push(event.detail.value);
          setChecked(event.detail.value);
        },
      });
    }
    const { host, root } = mount(h(App));
    const el = host.querySelector<SwitchElement>('akar-switch-root')!;
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));
    // React 19 sets props the element defines as properties.
    expect(el.modelValue).toBe(false);
    expect(el.hasAttribute('disabled')).toBe(false);

    await userEvent.click(el);
    await vi.waitFor(() => expect(el.getAttribute('aria-checked')).toBe('true'));
    expect(seen).toEqual([true]);
    root.unmount();
  });

  it('dropdown menu: `onselect` from an item, a controlled checkbox item', async () => {
    const selected = vi.fn();
    function App() {
      const [bookmarks, setBookmarks] = useState(false);
      const block = { display: 'block' };
      const checkbox = h('akar-dropdown-menu-checkbox-item', {
        'style': block,
        'modelValue': bookmarks,
        'onupdate-model-value': (event: AkarElementEvent<boolean>) => setBookmarks(event.detail.value),
      }, bookmarks ? 'Hide bookmarks' : 'Show bookmarks');
      const item = h('akar-dropdown-menu-item', { style: block, onselect: selected }, 'New tab');
      const content = h('akar-dropdown-menu-content', { style: block }, item, checkbox);
      return h('akar-dropdown-menu-root', null, h('akar-dropdown-menu-trigger', null, 'Options'), h('akar-dropdown-menu-portal', null, content));
    }
    const { host, root } = mount(h(App));
    const trigger = host.querySelector('akar-dropdown-menu-trigger')!;
    await vi.waitFor(() => expect(trigger.getAttribute('aria-haspopup')).toBe('menu'));

    await userEvent.click(trigger);
    const item = document.querySelector<HTMLElement>('akar-dropdown-menu-checkbox-item')!;
    await vi.waitFor(() => expect(item.getAttribute('role')).toBe('menuitemcheckbox'));
    expect(item.getAttribute('aria-checked')).toBe('false');
    await userEvent.click(item);
    // Selecting closes the menu; React re-rendered the item with the new value.
    await vi.waitFor(() => expect(item.textContent).toBe('Hide bookmarks'));
    expect((item as HTMLElement & { modelValue?: boolean }).modelValue).toBe(true);

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(item.getAttribute('aria-checked')).toBe('true'));
    await userEvent.click(document.querySelector<HTMLElement>('akar-dropdown-menu-item')!);
    expect(selected).toHaveBeenCalledOnce();
    root.unmount();
  });

  it('controlled listbox of objects: `value` and `modelValue` as properties, compared with `by`', async () => {
    const users = [
      { id: 1, name: 'Ada' },
      { id: 2, name: 'Grace' },
    ];
    const seen: Array<unknown> = [];
    function App() {
      const [selected, setSelected] = useState<unknown>({ id: 2 });
      return h('akar-listbox-root', {
        'by': 'id',
        'modelValue': selected,
        'onupdate-model-value': (event: AkarElementEvent) => {
          seen.push(event.detail.value);
          setSelected(event.detail.value);
        },
      }, h('akar-listbox-content', { 'aria-label': 'Users' }, users.map((user) => h('akar-listbox-item', { key: user.id, value: user }, user.name))));
    }
    const { host, root } = mount(h(App));
    const items = [
      ...host.querySelectorAll('akar-listbox-item'),
    ];
    await vi.waitFor(() => expect(items[1].getAttribute('aria-selected')).toBe('true'));
    await userEvent.click(items[0]);
    await vi.waitFor(() => expect(items[0].getAttribute('aria-selected')).toBe('true'));
    expect(items[1].getAttribute('aria-selected')).toBe('false');
    expect(seen).toEqual([users[0]]);
    root.unmount();
  });

  it('does not call a camelCase `onUpdateModelValue` (the typings reject it)', async () => {
    const spy = vi.fn();
    const { host, root } = mount(h('akar-switch-root', { 'aria-label': 'x', 'style': STYLE, 'onUpdateModelValue': spy }));
    const el = host.querySelector('akar-switch-root')!;
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));
    await userEvent.click(el);
    expect(el.getAttribute('aria-checked')).toBe('true');
    expect(spy).not.toHaveBeenCalled();
    root.unmount();
  });
  it('controlled slider: an array property in, `onupdate-model-value` out', async () => {
    const seen: Array<unknown> = [];
    function App() {
      const [value, setValue] = useState([30]);
      return h('akar-slider-root', {
        'style': SLIDER_STYLE,
        'modelValue': value,
        'onupdate-model-value': (event: AkarElementEvent<Array<number>>) => {
          seen.push(event.detail.value);
          setValue(event.detail.value);
        },
      }, h('akar-slider-thumb', { 'aria-label': 'Volume', 'style': THUMB_STYLE }));
    }
    const { host, root } = mount(h(App));
    const thumb = host.querySelector<HTMLElement>('akar-slider-thumb')!;
    await vi.waitFor(() => expect(thumb.getAttribute('aria-valuenow')).toBe('30'));
    thumb.focus();
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(thumb.getAttribute('aria-valuenow')).toBe('31'));
    expect(seen).toEqual([
      [31],
    ]);
    root.unmount();
  });

  it('controlled toggle group: an array property in, `onupdate-model-value` out', async () => {
    const seen: Array<unknown> = [];
    function App() {
      const [value, setValue] = useState<Array<string>>(['bold']);
      return h('akar-toggle-group-root', {
        'type': 'multiple',
        'aria-label': 'Formatting',
        'modelValue': value,
        'onupdate-model-value': (event: AkarElementEvent<Array<string>>) => {
          seen.push(event.detail.value);
          setValue(event.detail.value);
        },
      }, h('akar-toggle-group-item', { value: 'bold' }, 'B'), h('akar-toggle-group-item', { value: 'italic' }, 'I'));
    }
    const { host, root } = mount(h(App));
    const [bold, italic] = host.querySelectorAll('akar-toggle-group-item');
    await vi.waitFor(() => expect(bold.getAttribute('aria-pressed')).toBe('true'));
    await userEvent.click(italic);
    await vi.waitFor(() => expect(italic.getAttribute('aria-pressed')).toBe('true'));
    expect(seen).toEqual([
      ['bold', 'italic'],
    ]);
    root.unmount();
  });

  it('an `onform-submit` prop is a listener the form root sees, and prevents the native submission', async () => {
    const values: Array<unknown> = [];
    const native: Array<boolean> = [];
    const onNative = (event: Event) => {
      native.push(!event.defaultPrevented);
      event.preventDefault();
    };
    document.addEventListener('submit', onNative);
    const { host, root } = mount(h('akar-form-root', {
      'onform-submit': (event: AkarElementEvent) => values.push(event.detail.value),
    }, h('form', { noValidate: true }, h('button', { type: 'submit' }, 'Submit'))));
    try {
      await vi.waitFor(() => expect(host.querySelector('akar-form-root')!.hasAttribute('data-akar-unmounted')).toBe(false));
      await userEvent.click(host.querySelector('button')!);
      await vi.waitFor(() => expect(values).toEqual([{}]));
      expect(native).toEqual([false]);
    } finally {
      document.removeEventListener('submit', onNative);
      root.unmount();
    }
  });
});

describe.runIf(major === 18)(`React ${version}`, () => {
  it('controlled switch through a ref: property in, `addEventListener` out', async () => {
    const seen: Array<unknown> = [];
    function App() {
      const [checked, setChecked] = useState(false);
      const ref = useRef<SwitchElement>(null);
      useEffect(() => {
        const el = ref.current!;
        el.modelValue = checked;
        const onUpdate = (event: Event) => {
          seen.push((event as AkarElementEvent<boolean>).detail.value);
          setChecked((event as AkarElementEvent<boolean>).detail.value);
        };
        el.addEventListener('update-model-value', onUpdate);
        return () => el.removeEventListener('update-model-value', onUpdate);
      }, [checked]);
      return h('akar-switch-root', { 'ref': ref, 'aria-label': 'Wi-Fi', 'style': STYLE });
    }
    const { host, root } = mount(h(App));
    const el = host.querySelector<SwitchElement>('akar-switch-root')!;
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));
    await userEvent.click(el);
    await vi.waitFor(() => expect(el.getAttribute('aria-checked')).toBe('true'));
    expect(seen).toEqual([true]);
    root.unmount();
  });

  it('stringifies `disabled={false}` to `disabled="false"`, which is disabled like any HTML boolean attribute', async () => {
    const { host, root } = mount(h('akar-switch-root', { 'aria-label': 'x', 'style': STYLE, 'disabled': false }));
    const el = host.querySelector('akar-switch-root')!;
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));
    expect(el.hasAttribute('data-disabled')).toBe(true);
    expect(el.getAttribute('aria-disabled')).toBe('true');
    // Leave the prop out instead (`disabled={cond || undefined}`).
    root.render(h('akar-switch-root', { 'aria-label': 'x', 'style': STYLE }));
    await vi.waitFor(() => expect(el.hasAttribute('data-disabled')).toBe(false));
    await userEvent.click(el);
    expect(el.getAttribute('aria-checked')).toBe('true');
    root.unmount();
  });
  it('controlled slider through a ref: an array property in, `addEventListener` out', async () => {
    const seen: Array<unknown> = [];
    function App() {
      const [value, setValue] = useState([30]);
      const ref = useRef<HTMLElement & { modelValue?: Array<number> }>(null);
      useEffect(() => {
        const el = ref.current!;
        el.modelValue = value;
        const onUpdate = (event: Event) => {
          seen.push((event as AkarElementEvent<Array<number>>).detail.value);
          setValue((event as AkarElementEvent<Array<number>>).detail.value);
        };
        el.addEventListener('update-model-value', onUpdate);
        return () => el.removeEventListener('update-model-value', onUpdate);
      }, [value]);
      return h('akar-slider-root', { ref, style: SLIDER_STYLE }, h('akar-slider-thumb', { 'aria-label': 'Volume', 'style': THUMB_STYLE }));
    }
    const { host, root } = mount(h(App));
    const thumb = host.querySelector<HTMLElement>('akar-slider-thumb')!;
    await vi.waitFor(() => expect(thumb.getAttribute('aria-valuenow')).toBe('30'));
    thumb.focus();
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(thumb.getAttribute('aria-valuenow')).toBe('31'));
    expect(seen).toEqual([
      [31],
    ]);
    root.unmount();
  });
});

describe(`React ${version} hydration`, () => {
  it('hydrates server-rendered elements without a mismatch', async () => {
    const errors: Array<unknown> = [];
    const App = () => h('form', null, h('akar-switch-root', { 'aria-label': 'x', 'name': 'wifi', 'style': STYLE }), h('span', null, 'after'));
    const host = render(renderToString(h(App)));
    const el = host.querySelector('akar-switch-root')!;
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));
    // Nothing next to the element: the DOM React rendered is the DOM it hydrates.
    expect(host.querySelector('form')!.children.length).toBe(2);

    const root = hydrateRoot(host, h(App), {
      onRecoverableError: (error) => errors.push(String(error)),
    });
    await settle();
    await settle();
    expect(errors).toEqual([]);
    expect(host.querySelector('akar-switch-root')).toBe(el);
    root.unmount();
  });

  // A portal moves its element out of the server-rendered tree as soon as it is
  // defined, so the guide says to define overlay families after hydration.
  function DialogApp({ prefix }: { prefix: string }) {
    return h('div', null, h(`${prefix}-dialog-root`, null, h(`${prefix}-dialog-portal`, null, h(`${prefix}-dialog-content`, { 'aria-describedby': '' }, h(`${prefix}-dialog-title`, null, 'Title')))), h('span', null, 'after'));
  }

  it('hydrates a dialog with a portal when its elements are defined after hydration', async () => {
    const errors: Array<unknown> = [];
    const host = render(renderToString(h(DialogApp, { prefix: 'hyd' })));
    const root = hydrateRoot(host, h(DialogApp, { prefix: 'hyd' }), {
      onRecoverableError: (error) => errors.push(String(error)),
    });
    await settle();
    await settle();
    defineAkarElements([dialogElements], { prefix: 'hyd' });
    await vi.waitFor(() => expect(document.querySelector('hyd-dialog-portal')!.parentElement).toBe(document.body));
    expect(errors).toEqual([]);
    root.unmount();
  });

  it('reports a mismatch when the portal moved before hydration (what the guide warns about)', async () => {
    const errors: Array<unknown> = [];
    const host = render(renderToString(h(DialogApp, { prefix: 'akar' })));
    await vi.waitFor(() => expect(document.querySelector('akar-dialog-portal')!.parentElement).toBe(document.body));
    const root = hydrateRoot(host, h(DialogApp, { prefix: 'akar' }), {
      onRecoverableError: (error) => errors.push(String(error)),
    });
    await settle();
    await settle();
    expect(errors.length).toBeGreaterThan(0);
    root.unmount();
  });
});
