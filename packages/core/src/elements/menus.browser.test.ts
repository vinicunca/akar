import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { createDropdownMenuHandle } from '@/DropdownMenu';
import { contextMenuElements, defineAkarElements, dropdownMenuElements, menubarElements } from '.';
import { cleanup, query, render } from './elements.test.helpers';

beforeAll(() => {
  defineAkarElements([dropdownMenuElements, contextMenuElements, menubarElements]);
});
afterEach(cleanup);

const CONTENT_STYLE = 'display: block; min-width: 160px; background: white';
// Custom elements are inline: give the menu parts a box, as a page would.
const STYLES = `<style>
  [role=menu], [role^=menuitem], [role=separator], [role=group] { display: block; }
  [role=menubar] { display: flex; gap: 8px; }
</style>`;

const DROPDOWN = `${STYLES}
  <button id="outside">Outside</button>
  <akar-dropdown-menu-root>
    <akar-dropdown-menu-trigger>Options</akar-dropdown-menu-trigger>
    <akar-dropdown-menu-portal>
      <akar-dropdown-menu-content side-offset="4" style="${CONTENT_STYLE}">
        <akar-dropdown-menu-label>Actions</akar-dropdown-menu-label>
        <akar-dropdown-menu-item data-test="new-tab">New tab</akar-dropdown-menu-item>
        <akar-dropdown-menu-item data-test="new-window">New window</akar-dropdown-menu-item>
        <akar-dropdown-menu-item data-test="private" disabled>New private window</akar-dropdown-menu-item>
        <akar-dropdown-menu-sub>
          <akar-dropdown-menu-sub-trigger data-test="more">More tools</akar-dropdown-menu-sub-trigger>
          <akar-dropdown-menu-portal>
            <akar-dropdown-menu-sub-content style="${CONTENT_STYLE}">
              <akar-dropdown-menu-item data-test="save">Save page as…</akar-dropdown-menu-item>
              <akar-dropdown-menu-item data-test="devtools">Developer tools</akar-dropdown-menu-item>
            </akar-dropdown-menu-sub-content>
          </akar-dropdown-menu-portal>
        </akar-dropdown-menu-sub>
        <akar-dropdown-menu-separator></akar-dropdown-menu-separator>
        <akar-dropdown-menu-checkbox-item data-test="bookmarks" text-value="Show bookmarks">
          <akar-dropdown-menu-item-indicator>✓</akar-dropdown-menu-item-indicator>
          Show bookmarks
        </akar-dropdown-menu-checkbox-item>
        <akar-dropdown-menu-group>
          <akar-dropdown-menu-label>People</akar-dropdown-menu-label>
          <akar-dropdown-menu-radio-group model-value="pedro">
            <akar-dropdown-menu-radio-item data-test="pedro" value="pedro">
              <akar-dropdown-menu-item-indicator>•</akar-dropdown-menu-item-indicator>
              Pedro
            </akar-dropdown-menu-radio-item>
            <akar-dropdown-menu-radio-item data-test="colm" value="colm">
              <akar-dropdown-menu-item-indicator>•</akar-dropdown-menu-item-indicator>
              Colm
            </akar-dropdown-menu-radio-item>
          </akar-dropdown-menu-radio-group>
        </akar-dropdown-menu-group>
        <akar-dropdown-menu-arrow></akar-dropdown-menu-arrow>
      </akar-dropdown-menu-content>
    </akar-dropdown-menu-portal>
  </akar-dropdown-menu-root>
`;

async function ready(trigger: HTMLElement) {
  await vi.waitFor(() => expect(trigger.getAttribute('aria-haspopup')).toBe('menu'));
}

describe('dropdown menu elements', () => {
  it('opens from the trigger, wires ARIA and positions the content', async () => {
    render(DROPDOWN);
    const trigger = query('akar-dropdown-menu-trigger');
    const content = query('akar-dropdown-menu-content');
    await ready(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(content.hasAttribute('data-akar-unmounted')).toBe(true);

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    expect(content.getAttribute('role')).toBe('menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-controls')).toBe(content.id);
    expect(content.getAttribute('aria-labelledby')).toBe(trigger.id);
    expect(query('[data-test=new-tab]').getAttribute('role')).toBe('menuitem');
    expect(query('[data-test=private]').getAttribute('aria-disabled')).toBe('true');
    expect(query('[data-test=bookmarks]').getAttribute('role')).toBe('menuitemcheckbox');
    expect(query('[data-test=pedro]').getAttribute('role')).toBe('menuitemradio');
    expect(query('akar-dropdown-menu-separator').getAttribute('role')).toBe('separator');
    expect(query('akar-dropdown-menu-group').getAttribute('role')).toBe('group');
    expect(query('[data-test=more]').getAttribute('aria-haspopup')).toBe('menu');
    await vi.waitFor(() => {
      // `side-offset`, plus the arrow's height (5). Floating UI snaps the content to a
      // whole device pixel, so a trigger ending mid-pixel (WebKit on Linux) leaves up
      // to half a pixel either way.
      expect(Math.abs(content.getBoundingClientRect().top - trigger.getBoundingClientRect().bottom - 9)).toBeLessThanOrEqual(0.5);
    });
  });

  it('navigates with arrow keys and typeahead, skipping disabled items', async () => {
    render(DROPDOWN);
    const trigger = query('akar-dropdown-menu-trigger');
    await ready(trigger);
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    // Opened from the keyboard: the first item is focused.
    await vi.waitFor(() => expect(document.activeElement).toBe(query('[data-test=new-tab]')));
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(query('[data-test=new-window]'));
    await userEvent.keyboard('{ArrowDown}');
    // `private` is disabled.
    expect(document.activeElement).toBe(query('[data-test=more]'));
    expect(query('[data-test=more]').hasAttribute('data-highlighted')).toBe(true);
    await userEvent.keyboard('{End}');
    expect(document.activeElement).toBe(query('[data-test=colm]'));
    await userEvent.keyboard('{Home}');
    expect(document.activeElement).toBe(query('[data-test=new-tab]'));
    // Typeahead, by the item's text (or `text-value`): "More tools", "Show bookmarks".
    await userEvent.keyboard('m');
    expect(document.activeElement).toBe(query('[data-test=more]'));
    await new Promise((resolve) => setTimeout(resolve, 1100));
    await userEvent.keyboard('sh');
    expect(document.activeElement).toBe(query('[data-test=bookmarks]'));
  });

  it('dispatches `select` and closes, returning focus to the trigger', async () => {
    render(DROPDOWN);
    const trigger = query('akar-dropdown-menu-trigger');
    const root = query('akar-dropdown-menu-root');
    await ready(trigger);
    const selected = vi.fn();
    const opens: Array<unknown> = [];
    query('[data-test=new-window]').addEventListener('select', selected);
    root.addEventListener('update-open', (event) => opens.push((event as CustomEvent).detail.value));

    trigger.focus();
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(document.activeElement).toBe(query('[data-test=new-tab]')));
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await vi.waitFor(() => expect(query('akar-dropdown-menu-content').hasAttribute('data-akar-unmounted')).toBe(true));
    expect(selected).toHaveBeenCalledOnce();
    expect(opens).toEqual([true, false]);
    expect(document.activeElement).toBe(trigger);
  });

  it('toggles checkbox and radio items, with their change events', async () => {
    render(DROPDOWN);
    const trigger = query('akar-dropdown-menu-trigger');
    await ready(trigger);
    await userEvent.click(trigger);
    const bookmarks = query('[data-test=bookmarks]');
    await vi.waitFor(() => expect(bookmarks.getAttribute('aria-checked')).toBe('false'));
    // A checkbox item is controlled, as in Vue: write the value back.
    const checked: Array<unknown> = [];
    bookmarks.addEventListener('update-model-value', (event) => {
      const { value } = (event as CustomEvent).detail;
      checked.push(value)
      ;(bookmarks as HTMLElement & { modelValue: unknown }).modelValue = value;
    });
    // Keep the menu open when an item is selected.
    bookmarks.addEventListener('select', (event) => event.preventDefault());
    await userEvent.click(bookmarks);
    await vi.waitFor(() => expect(bookmarks.getAttribute('aria-checked')).toBe('true'));
    expect(checked).toEqual([true]);
    expect(bookmarks.querySelector('akar-dropdown-menu-item-indicator')!.hasAttribute('data-akar-unmounted')).toBe(false);

    // So is a radio group.
    const group = query('akar-dropdown-menu-radio-group');
    const values: Array<unknown> = [];
    group.addEventListener('update-model-value', (event) => {
      const { value } = (event as CustomEvent).detail;
      values.push(value)
      ;(group as HTMLElement & { modelValue: unknown }).modelValue = value;
    });
    expect(query('[data-test=pedro]').getAttribute('aria-checked')).toBe('true');
    expect(query('[data-test=colm] akar-dropdown-menu-item-indicator').hasAttribute('data-akar-unmounted')).toBe(true);
    await userEvent.click(query('[data-test=colm]'));
    await vi.waitFor(() => expect(values).toEqual(['colm']));
    // The menu closed on select; reopen to see the new state.
    await vi.waitFor(() => expect(query('akar-dropdown-menu-content').hasAttribute('data-akar-unmounted')).toBe(true));
    await userEvent.click(trigger);
    await vi.waitFor(() => expect(query('[data-test=colm]').getAttribute('aria-checked')).toBe('true'));
    expect(query('[data-test=pedro]').getAttribute('aria-checked')).toBe('false');
    // Controlled through the properties, the items keep their state while the content is closed.
    expect(query('[data-test=bookmarks]').getAttribute('aria-checked')).toBe('true');
  });

  it('opens a submenu with ArrowRight and closes it with ArrowLeft', async () => {
    render(DROPDOWN);
    const trigger = query('akar-dropdown-menu-trigger');
    await ready(trigger);
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    await vi.waitFor(() => expect(document.activeElement).toBe(query('[data-test=new-tab]')));
    await userEvent.keyboard('{ArrowDown}{ArrowDown}');
    expect(document.activeElement).toBe(query('[data-test=more]'));

    await userEvent.keyboard('{ArrowRight}');
    const sub = query('akar-dropdown-menu-sub-content');
    await vi.waitFor(() => expect(sub.getAttribute('data-state')).toBe('open'));
    await vi.waitFor(() => expect(document.activeElement).toBe(query('[data-test=save]')));
    expect(query('[data-test=more]').getAttribute('aria-expanded')).toBe('true');
    expect(query('[data-test=more]').getAttribute('aria-controls')).toBe(sub.id);
    // Positioned to the right of its trigger.
    expect(sub.getBoundingClientRect().left).toBeGreaterThanOrEqual(Math.floor(query('[data-test=more]').getBoundingClientRect().right));
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(query('[data-test=devtools]'));

    await userEvent.keyboard('{ArrowLeft}');
    await vi.waitFor(() => expect(sub.hasAttribute('data-akar-unmounted')).toBe(true));
    expect(document.activeElement).toBe(query('[data-test=more]'));
    // The root menu is still open.
    expect(query('akar-dropdown-menu-content').getAttribute('data-state')).toBe('open');
  });

  it('opens a submenu on hover', async () => {
    render(DROPDOWN);
    const trigger = query('akar-dropdown-menu-trigger');
    await ready(trigger);
    await userEvent.click(trigger);
    await vi.waitFor(() => expect(query('akar-dropdown-menu-content').getAttribute('data-state')).toBe('open'));
    await userEvent.hover(query('[data-test=more]'));
    await vi.waitFor(() => expect(query('akar-dropdown-menu-sub-content').getAttribute('data-state')).toBe('open'));
  });

  it('closes on Escape and on an outside click', async () => {
    render(DROPDOWN);
    const trigger = query('akar-dropdown-menu-trigger');
    const content = query('akar-dropdown-menu-content');
    await ready(trigger);
    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    expect(document.activeElement).toBe(trigger);

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    // Modal by default: a backdrop keeps the page behind from taking pointer events.
    expect(document.querySelector('[data-akar-internal-backdrop]')).not.toBeNull();
    query('#outside').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
  });

  it('renders the arrow as an SVG inside the element', async () => {
    render(DROPDOWN);
    const trigger = query('akar-dropdown-menu-trigger');
    await ready(trigger);
    await userEvent.click(trigger);
    const arrow = query('akar-dropdown-menu-arrow');
    await vi.waitFor(() => expect(arrow.querySelector('svg')).not.toBeNull());
    const svg = arrow.querySelector('svg')!;
    expect(svg.namespaceURI).toBe('http://www.w3.org/2000/svg');
    expect(svg.getAttribute('viewBox')).toBe('0 0 12 6');
    expect(svg.getBoundingClientRect().width).toBe(10);
    expect(svg.querySelector('path')).not.toBeNull();
  });
});

describe('dropdown menu detached triggers (`handle`)', () => {
  const DETACHED = `${STYLES}
    <akar-dropdown-menu-trigger data-test="first">First</akar-dropdown-menu-trigger>
    <akar-dropdown-menu-trigger data-test="second">Second</akar-dropdown-menu-trigger>
    <akar-dropdown-menu-root>
      <akar-dropdown-menu-portal>
        <akar-dropdown-menu-content align="start" style="${CONTENT_STYLE}">
          <akar-dropdown-menu-item data-test="item">Item</akar-dropdown-menu-item>
        </akar-dropdown-menu-content>
      </akar-dropdown-menu-portal>
    </akar-dropdown-menu-root>
  `;

  it('connects triggers outside the root, given the handle as a property after connecting', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(DETACHED);
    const handle = createDropdownMenuHandle();
    const first = query('[data-test=first]');
    const second = query('[data-test=second]');
    // Outside any root, a trigger waits for its handle.
    expect(first.hasAttribute('data-akar-unmounted')).toBe(true);
    for (const el of [
      query('akar-dropdown-menu-root'),
      first,
      second,
    ]) {
      (el as HTMLElement & { handle: unknown }).handle = handle;
    }
    await vi.waitFor(() => expect(first.getAttribute('aria-haspopup')).toBe('menu'));
    expect(second.getAttribute('aria-expanded')).toBe('false');
    warn.mockRestore();

    await userEvent.click(second);
    const content = query('akar-dropdown-menu-content');
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    // Only the trigger that opened the menu reports it, and the menu is anchored to it.
    expect(second.getAttribute('aria-expanded')).toBe('true');
    expect(first.getAttribute('aria-expanded')).toBe('false');
    expect(second.getAttribute('aria-controls')).toBe(content.id);
    await vi.waitFor(() => {
      expect(Math.abs(content.getBoundingClientRect().left - second.getBoundingClientRect().left)).toBeLessThan(2);
    });

    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    expect(document.activeElement).toBe(second);

    // Imperatively, by the trigger's id. A menu trigger has no `id` prop: its id is generated.
    expect(second.id).not.toBe('');
    handle.open(second.id);
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    expect(handle.isOpen).toBe(true);
    handle.close();
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
  });
});

const CONTEXT_MENU = `${STYLES}
  <akar-context-menu-root>
    <akar-context-menu-trigger style="display: block; width: 300px; height: 150px; border: 1px dashed">
      Right-click here
    </akar-context-menu-trigger>
    <akar-context-menu-portal>
      <akar-context-menu-content style="${CONTENT_STYLE}">
        <akar-context-menu-item data-test="back">Back</akar-context-menu-item>
        <akar-context-menu-item data-test="forward" disabled>Forward</akar-context-menu-item>
        <akar-context-menu-item data-test="reload">Reload</akar-context-menu-item>
        <akar-context-menu-sub>
          <akar-context-menu-sub-trigger data-test="more">More tools</akar-context-menu-sub-trigger>
          <akar-context-menu-portal>
            <akar-context-menu-sub-content style="${CONTENT_STYLE}">
              <akar-context-menu-item data-test="save">Save page as…</akar-context-menu-item>
            </akar-context-menu-sub-content>
          </akar-context-menu-portal>
        </akar-context-menu-sub>
        <akar-context-menu-checkbox-item data-test="urls" model-value>Show full URLs</akar-context-menu-checkbox-item>
      </akar-context-menu-content>
    </akar-context-menu-portal>
  </akar-context-menu-root>
`;

describe('context menu elements', () => {
  it('opens at the pointer on right-click, with its events', async () => {
    render(CONTEXT_MENU);
    const trigger = query('akar-context-menu-trigger');
    const root = query('akar-context-menu-root');
    const content = query('akar-context-menu-content');
    await vi.waitFor(() => expect(trigger.hasAttribute('data-akar-owned')).toBe(true));
    const opens: Array<unknown> = [];
    root.addEventListener('update-open', (event) => opens.push((event as CustomEvent).detail.value));

    const rect = trigger.getBoundingClientRect();
    await userEvent.click(trigger, {
      button: 'right',
      position: { x: 120, y: 60 },
    });
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    expect(opens).toEqual([true]);
    expect(trigger.hasAttribute('data-popup-open')).toBe(true);
    expect(content.getAttribute('role')).toBe('menu');
    // Anchored to the pointer, not to the trigger.
    await vi.waitFor(() => {
      const box = content.getBoundingClientRect();
      expect(Math.abs(box.left - (rect.left + 120))).toBeLessThan(4);
      expect(Math.abs(box.top - (rect.top + 60))).toBeLessThan(4);
    });
    // Focus moves into the menu.
    await vi.waitFor(() => expect(content.contains(document.activeElement)).toBe(true));
    expect(query('[data-test=urls]').getAttribute('aria-checked')).toBe('true');
  });

  it('moves with the keyboard, into a submenu and back, and closes on Escape', async () => {
    render(CONTEXT_MENU);
    const trigger = query('akar-context-menu-trigger');
    const content = query('akar-context-menu-content');
    await vi.waitFor(() => expect(trigger.hasAttribute('data-akar-owned')).toBe(true));
    await userEvent.click(trigger, {
      button: 'right',
      position: { x: 10, y: 10 },
    });
    await vi.waitFor(() => expect(content.contains(document.activeElement)).toBe(true));

    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(query('[data-test=back]'));
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(query('[data-test=reload]'));
    await userEvent.keyboard('{ArrowDown}{ArrowRight}');
    const sub = query('akar-context-menu-sub-content');
    await vi.waitFor(() => expect(document.activeElement).toBe(query('[data-test=save]')));
    expect(sub.getAttribute('data-state')).toBe('open');
    await userEvent.keyboard('{ArrowLeft}');
    await vi.waitFor(() => expect(document.activeElement).toBe(query('[data-test=more]')));

    const selected = vi.fn();
    query('[data-test=reload]').addEventListener('select', selected);
    await userEvent.keyboard('r{Enter}');
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    expect(selected).toHaveBeenCalledOnce();

    await userEvent.click(trigger, {
      button: 'right',
      position: { x: 10, y: 10 },
    });
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
  });
});

const MENUBAR = `${STYLES}
  <button id="before">Before</button>
  <akar-menubar-root loop>
    <akar-menubar-menu value="file">
      <akar-menubar-trigger>File</akar-menubar-trigger>
      <akar-menubar-portal>
        <akar-menubar-content style="${CONTENT_STYLE}">
          <akar-menubar-item data-test="new">New tab</akar-menubar-item>
          <akar-menubar-item data-test="print">Print</akar-menubar-item>
        </akar-menubar-content>
      </akar-menubar-portal>
    </akar-menubar-menu>
    <akar-menubar-menu value="edit">
      <akar-menubar-trigger>Edit</akar-menubar-trigger>
      <akar-menubar-portal>
        <akar-menubar-content style="${CONTENT_STYLE}">
          <akar-menubar-item data-test="undo">Undo</akar-menubar-item>
          <akar-menubar-sub>
            <akar-menubar-sub-trigger data-test="find">Find</akar-menubar-sub-trigger>
            <akar-menubar-portal>
              <akar-menubar-sub-content style="${CONTENT_STYLE}">
                <akar-menubar-item data-test="search">Search the web</akar-menubar-item>
              </akar-menubar-sub-content>
            </akar-menubar-portal>
          </akar-menubar-sub>
        </akar-menubar-content>
      </akar-menubar-portal>
    </akar-menubar-menu>
    <akar-menubar-menu value="view">
      <akar-menubar-trigger>View</akar-menubar-trigger>
      <akar-menubar-portal>
        <akar-menubar-content style="${CONTENT_STYLE}">
          <akar-menubar-item data-test="zoom">Zoom</akar-menubar-item>
        </akar-menubar-content>
      </akar-menubar-portal>
    </akar-menubar-menu>
  </akar-menubar-root>
`;

describe('menubar elements', () => {
  function triggers() {
    return Array.from(document.querySelectorAll<HTMLElement>('akar-menubar-trigger'));
  }

  it('moves between triggers with the arrow keys, and opens with the keyboard', async () => {
    render(MENUBAR);
    const root = query('akar-menubar-root');
    const [file, edit, view] = triggers();
    await vi.waitFor(() => expect(root.getAttribute('role')).toBe('menubar'));
    expect(file.getAttribute('role')).toBe('menuitem');
    expect(file.getAttribute('aria-haspopup')).toBe('menu');
    const values: Array<unknown> = [];
    root.addEventListener('update-model-value', (event) => values.push((event as CustomEvent).detail.value));

    // One tab stop: Tab enters the menubar at its first trigger.
    query('#before').focus();
    await userEvent.keyboard('{Tab}');
    await vi.waitFor(() => expect(document.activeElement).toBe(file));
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(edit);
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(view);
    // `loop`: from the last trigger to the first.
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(file);

    await userEvent.keyboard('{ArrowDown}');
    await vi.waitFor(() => expect(document.activeElement).toBe(query('[data-test=new]')));
    expect(values).toEqual(['file']);
    expect(file.getAttribute('aria-expanded')).toBe('true');
    expect(file.getAttribute('aria-controls')).toBe(query('[data-test=new]').closest('akar-menubar-content')!.id);

    // With a menu open, ArrowRight opens the next one, focusing its content (as in Vue).
    const contentOf = (item: string) => query(`[data-test=${item}]`).closest<HTMLElement>('akar-menubar-content')!;
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(document.activeElement).toBe(contentOf('undo')));
    expect(values).toEqual(['file', 'edit']);
    expect(file.getAttribute('aria-expanded')).toBe('false');
    expect(edit.getAttribute('aria-expanded')).toBe('true');

    // Into the submenu, and on to the next menu from it.
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(query('[data-test=undo]'));
    await userEvent.keyboard('{ArrowDown}{ArrowRight}');
    await vi.waitFor(() => expect(document.activeElement).toBe(query('[data-test=search]')));
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(document.activeElement).toBe(contentOf('zoom')));
    expect(values.at(-1)).toBe('view');

    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(values.at(-1)).toBe(''));
    expect(document.activeElement).toBe(view);
  });

  it('opens on click and switches menus on hover while open', async () => {
    render(MENUBAR);
    const [file, edit] = triggers();
    await vi.waitFor(() => expect(file.getAttribute('aria-haspopup')).toBe('menu'));
    await userEvent.click(file);
    await vi.waitFor(() => expect(file.hasAttribute('data-popup-open')).toBe(true));
    await userEvent.hover(edit);
    await vi.waitFor(() => expect(edit.hasAttribute('data-popup-open')).toBe(true));
    expect(file.hasAttribute('data-popup-open')).toBe(false);
    await userEvent.click(query('[data-test=undo]'));
    await vi.waitFor(() => expect(edit.hasAttribute('data-popup-open')).toBe(false));
  });
});

describe('dropdown menu filter', () => {
  it('renders onto its `<input>`: reports the text, moves the highlight, selects with Enter and clears on Escape', async () => {
    render(`${STYLES}
      <akar-dropdown-menu-root>
        <akar-dropdown-menu-trigger>Assign</akar-dropdown-menu-trigger>
        <akar-dropdown-menu-portal>
          <akar-dropdown-menu-content style="${CONTENT_STYLE}">
            <akar-dropdown-menu-filter><input aria-label="Filter people" placeholder="Filter"></akar-dropdown-menu-filter>
            <akar-dropdown-menu-item data-test="ada">Ada</akar-dropdown-menu-item>
            <akar-dropdown-menu-item data-test="grace">Grace</akar-dropdown-menu-item>
          </akar-dropdown-menu-content>
        </akar-dropdown-menu-portal>
      </akar-dropdown-menu-root>`);
    const trigger = query('akar-dropdown-menu-trigger');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
    const filter = query('akar-dropdown-menu-filter');
    const input = filter.querySelector('input')!;
    const values: Array<unknown> = [];
    filter.addEventListener('update-model-value', (event) => values.push((event as CustomEvent).detail.value));
    const selected = vi.fn();
    query('[data-test=grace]').addEventListener('select', selected);

    await userEvent.click(trigger);
    const content = query('akar-dropdown-menu-content');
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    // The part's role and ARIA go on the `<input>`; your attributes stay.
    expect(input.getAttribute('placeholder')).toBe('Filter');
    input.focus();
    await userEvent.keyboard('gr');
    await vi.waitFor(() => expect(values.at(-1)).toBe('gr'));
    expect(input.value).toBe('gr');

    await userEvent.keyboard('{ArrowDown}{ArrowDown}');
    await vi.waitFor(() => expect(input.getAttribute('aria-activedescendant')).toBe(query('[data-test=grace]').id));
    expect(document.activeElement).toBe(input);

    // Escape clears the text first, without closing the menu.
    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(values.at(-1)).toBe(''));
    expect(content.getAttribute('data-state')).toBe('open');

    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    await vi.waitFor(() => expect(selected).toHaveBeenCalledOnce());
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
  });
});

describe('dropdown menu inside a shadow root', () => {
  it('portals into the shadow root, navigates by keyboard, opens a submenu and closes on an outside click', async () => {
    const shadowRoot = render('<div id="app"></div>').querySelector('#app')!.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = DROPDOWN;
    const get = (selector: string) => shadowRoot.querySelector<HTMLElement>(selector)!;
    const active = () => {
      let el = document.activeElement;
      while (el?.shadowRoot?.activeElement) {
        el = el.shadowRoot.activeElement;
      }
      return el;
    };
    const trigger = get('akar-dropdown-menu-trigger');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));

    trigger.focus();
    await userEvent.keyboard('{Enter}');
    const content = get('akar-dropdown-menu-content');
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    expect(content.closest('akar-dropdown-menu-portal')!.parentNode).toBe(shadowRoot);
    expect(shadowRoot.getElementById(content.getAttribute('aria-labelledby')!)).toBe(trigger);
    await vi.waitFor(() => expect(active()).toBe(get('[data-test=new-tab]')));
    await userEvent.keyboard('{ArrowDown}');
    expect(active()).toBe(get('[data-test=new-window]'));
    // The disabled item is skipped.
    await userEvent.keyboard('{ArrowDown}');
    expect(active()).toBe(get('[data-test=more]'));
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(active()).toBe(get('[data-test=save]')));
    await userEvent.keyboard('{ArrowLeft}');
    await vi.waitFor(() => expect(active()).toBe(get('[data-test=more]')));

    // A click outside lands on the modal menu's backdrop, rendered in the shadow root.
    const backdrop = shadowRoot.querySelector<HTMLElement>('[data-akar-internal-backdrop]')!;
    expect(backdrop).not.toBeNull();
    await userEvent.click(backdrop, {
      position: { x: 5, y: 5 },
    });
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
  });
});
