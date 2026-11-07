import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { comboboxElements, defineAkarElements, editableElements, listboxElements, selectElements, switchElements, tagsInputElements } from '.';
import { cleanup, query, render, settle } from './elements.test.helpers';

// Foundation pieces the collection families needed: parts rendered onto an
// `<input>` child (`target: 'input'`), fallback text (`text`), and a Teleport
// into a detached fragment (closed `SelectContent`).

beforeAll(() => {
  defineAkarElements([
    listboxElements,
    comboboxElements,
    selectElements,
    switchElements,
    tagsInputElements,
    editableElements,
  ]);
});
afterEach(cleanup);

describe('parts rendered onto an `<input>` child', () => {
  it('render onto the input you give them, keeping your attributes, and let go of it when removed', async () => {
    render(`
      <akar-listbox-root>
        <akar-listbox-filter disabled><input id="search" class="field" aria-label="Search"></akar-listbox-filter>
        <akar-listbox-content aria-label="Items"><akar-listbox-item value="a">A</akar-listbox-item></akar-listbox-content>
      </akar-listbox-root>
    `);
    const filter = query('akar-listbox-filter');
    const input = query<HTMLInputElement>('#search');
    await vi.waitFor(() => expect(input.getAttribute('type')).toBe('text'));
    // The host stays a plain wrapper; the input is the part.
    expect(filter.hasAttribute('type')).toBe(false);
    expect(input.className).toBe('field');
    // `disabled` is owned like any attribute the part renders.
    expect(input.disabled).toBe(true);
    expect(input.getAttribute('data-disabled')).toBe('');

    filter.remove();
    await settle();
    expect(input.hasAttribute('type')).toBe(false);
    expect(input.hasAttribute('data-disabled')).toBe(false);
    expect(input.disabled).toBe(false);
    expect(input.getAttribute('aria-label')).toBe('Search');
  });

  it('own `disabled` like an attribute: the consumer\'s value, and writes to it while rendered, are what remain', async () => {
    render(`
      <akar-listbox-root>
        <akar-listbox-filter id="first"><input id="kept" aria-label="Kept" disabled></akar-listbox-filter>
        <akar-listbox-content aria-label="Items"><akar-listbox-item value="a">A</akar-listbox-item></akar-listbox-content>
      </akar-listbox-root>
      <akar-listbox-root>
        <akar-listbox-filter id="second"><input id="written" aria-label="Written"></akar-listbox-filter>
        <akar-listbox-content aria-label="Items"><akar-listbox-item value="b">B</akar-listbox-item></akar-listbox-content>
      </akar-listbox-root>
    `);
    const kept = query<HTMLInputElement>('#kept');
    const written = query<HTMLInputElement>('#written');
    await vi.waitFor(() => expect(written.getAttribute('type')).toBe('text'));
    expect(kept.disabled).toBe(true);
    written.setAttribute('disabled', '');
    await settle();

    query('#first').remove();
    query('#second').remove();
    await settle();
    expect(kept.disabled).toBe(true);
    expect(written.disabled).toBe(true);
  });

  it('a `cloneNode()` copy starts from the input\'s own state', async () => {
    render(`
      <akar-combobox-root disabled>
        <akar-combobox-anchor><akar-combobox-input id="original"><input aria-label="Fruit"></akar-combobox-input></akar-combobox-anchor>
      </akar-combobox-root>
      <akar-combobox-root><akar-combobox-anchor id="other"></akar-combobox-anchor></akar-combobox-root>
    `);
    const host = query('#original');
    await vi.waitFor(() => expect(host.querySelector('input')!.getAttribute('role')).toBe('combobox'));
    expect(host.querySelector('input')!.disabled).toBe(true);
    const copy = host.cloneNode(true) as HTMLElement;
    copy.id = 'copy';
    query('#other').append(copy);
    const input = copy.querySelector('input')!;
    await vi.waitFor(() => expect(input.getAttribute('role')).toBe('combobox'));
    expect(input.disabled).toBe(false);
    copy.remove();
    await settle();
    expect(input.disabled).toBe(false);
    expect(input.hasAttribute('role')).toBe(false);
  });

  it('move to an input that replaces theirs', async () => {
    render(`
      <akar-listbox-root>
        <akar-listbox-filter><input id="old" aria-label="Search"></akar-listbox-filter>
        <akar-listbox-content aria-label="Items"><akar-listbox-item value="a">A</akar-listbox-item></akar-listbox-content>
      </akar-listbox-root>
    `);
    const old = query<HTMLInputElement>('#old');
    await vi.waitFor(() => expect(old.getAttribute('type')).toBe('text'));
    const next = document.createElement('input');
    next.setAttribute('aria-label', 'Search');
    old.replaceWith(next);
    await vi.waitFor(() => expect(next.getAttribute('type')).toBe('text'));
    expect(old.hasAttribute('type')).toBe(false);
    expect(query('akar-listbox-filter').children).toHaveLength(1);
  });

  it('create an input when they have none', async () => {
    render(`
      <akar-tags-input-root>
        <akar-tags-input-input placeholder="Add"></akar-tags-input-input>
      </akar-tags-input-root>
    `);
    const host = query('akar-tags-input-input');
    await vi.waitFor(() => expect(host.querySelector('input')?.placeholder).toBe('Add'));
    expect(host.children).toHaveLength(1);
    // It is the element's, not yours: it goes when the element is removed.
    host.remove();
    await settle();
    expect(host.children).toHaveLength(0);
  });

  it('type into the input: the value is the part\'s', async () => {
    render(`
      <akar-editable-root default-value="Hi" activation-mode="dblclick">
        <akar-editable-area><akar-editable-preview></akar-editable-preview><akar-editable-input></akar-editable-input></akar-editable-area>
      </akar-editable-root>
    `);
    await vi.waitFor(() => expect(query('akar-editable-preview').textContent).toBe('Hi'));
    await userEvent.dblClick(query('akar-editable-preview'));
    const input = query<HTMLInputElement>('akar-editable-input > input');
    await vi.waitFor(() => expect(document.activeElement).toBe(input));
    expect(input.value).toBe('Hi');
  });
});

describe('fallback text', () => {
  it('is the element\'s text while it has no children, and goes away with the part', async () => {
    render(`
      <akar-select-root default-value="b">
        <akar-select-trigger aria-label="Letter"><akar-select-value placeholder="Pick"></akar-select-value></akar-select-trigger>
        <akar-select-portal><akar-select-content>
          <akar-select-viewport><akar-select-item value="b"><akar-select-item-text>Bee</akar-select-item-text></akar-select-item></akar-select-viewport>
        </akar-select-content></akar-select-portal>
      </akar-select-root>
    `);
    const value = query('akar-select-value');
    await vi.waitFor(() => expect(value.textContent).toBe('Bee'));
    const trigger = query('akar-select-trigger');
    value.remove();
    await settle();
    expect(value.textContent).toBe('');
    // Back under its parent, it renders the text again.
    trigger.append(value);
    await vi.waitFor(() => expect(value.textContent).toBe('Bee'));
  });
});

describe('fallback text and the consumer\'s children', () => {
  const SELECT = (value = '') => `
    <akar-select-root>
      <akar-select-trigger aria-label="Letter"><akar-select-value placeholder="Pick">${value}</akar-select-value></akar-select-trigger>
      <akar-select-portal><akar-select-content>
        <akar-select-viewport><akar-select-item value="b"><akar-select-item-text>Bee</akar-select-item-text></akar-select-item></akar-select-viewport>
      </akar-select-content></akar-select-portal>
    </akar-select-root>
  `;

  it('children added later take the text\'s place, and stay through renders and removal', async () => {
    render(SELECT());
    const value = query('akar-select-value');
    await vi.waitFor(() => expect(value.textContent).toBe('Pick'));
    const icon = document.createElement('span');
    icon.textContent = 'Custom';
    value.append(icon);
    await settle();
    expect(value.textContent).toBe('Custom')
    ;(query('akar-select-root') as HTMLElement & { modelValue: string }).modelValue = 'b';
    await settle();
    expect(value.childNodes).toEqual(expect.objectContaining({ length: 1 }));
    expect(value.firstChild).toBe(icon);

    const trigger = query('akar-select-trigger');
    value.remove();
    await settle();
    expect(value.firstChild).toBe(icon);
    trigger.append(value);
  });

  it('comes back when the consumer removes its children', async () => {
    render(SELECT('<span id="mine">Mine</span>'));
    const value = query('akar-select-value');
    await vi.waitFor(() => expect(query('akar-select-trigger').getAttribute('role')).toBe('combobox'));
    await settle();
    expect(value.textContent).toBe('Mine');
    query('#mine').remove();
    await vi.waitFor(() => expect(value.textContent).toBe('Pick'));
  });
});

describe('form association', () => {
  const LISTBOX = (attributes = '') => `
    <akar-listbox-root name="x" default-value="a" ${attributes}>
      <akar-listbox-content aria-label="Items"><akar-listbox-item value="a">A</akar-listbox-item></akar-listbox-content>
    </akar-listbox-root>
  `;

  it('a root associated with a form by `form="id"` submits with it', async () => {
    render(`<form id="f"></form>${LISTBOX('form="f"')}`);
    await vi.waitFor(() => expect(new FormData(query<HTMLFormElement>('#f')).get('x')).toBe('a'));
    expect((query('akar-listbox-root') as HTMLElement & { form: HTMLFormElement | null }).form).toBe(query('#f'));
  });

  it('a root moved into a form after it rendered submits with it', async () => {
    render(`<form id="f"></form>${LISTBOX()}`);
    await vi.waitFor(() => expect(query('akar-listbox-item').getAttribute('role')).toBe('option'));
    query('#f').append(query('akar-listbox-root'));
    await vi.waitFor(() => expect(new FormData(query<HTMLFormElement>('#f')).get('x')).toBe('a'));
  });

  it('a switch associated by `form="id"` submits with it', async () => {
    render('<form id="g"></form><akar-switch-root name="s" form="g" default-value aria-label="S"></akar-switch-root>');
    await vi.waitFor(() => expect(new FormData(query<HTMLFormElement>('#g')).get('s')).toBe('on'));
  });
});

describe('a part\'s root-level `<style>`', () => {
  it('goes into the head while the part renders, and leaves with it', async () => {
    const styles = () => document.head.querySelectorAll('style').length;
    const before = styles();
    const container = render('');
    const mount = async () => {
      container.innerHTML = `
        <akar-select-root default-open>
          <akar-select-trigger aria-label="Letter"><akar-select-value placeholder="Pick"></akar-select-value></akar-select-trigger>
          <akar-select-portal><akar-select-content position="popper">
            <akar-select-viewport><akar-select-item value="b"><akar-select-item-text>Bee</akar-select-item-text></akar-select-item></akar-select-viewport>
          </akar-select-content></akar-select-portal>
        </akar-select-root>
      `;
      await vi.waitFor(() => expect(query('akar-select-item').getAttribute('role')).toBe('option'));
      await settle();
    };
    await mount();
    const mounted = styles();
    expect(mounted).toBeGreaterThan(before);
    for (let cycle = 0; cycle < 3; cycle++) {
      container.innerHTML = '';
      await settle();
      expect(styles()).toBe(before);
      await mount();
      expect(styles()).toBe(mounted);
    }
  });
});

describe('a Teleport into a detached fragment', () => {
  it('keeps the closed select content in place and hidden, its items rendered only for their labels', async () => {
    render(`
      <akar-select-root>
        <akar-select-trigger aria-label="Letter"><akar-select-value placeholder="Pick"></akar-select-value></akar-select-trigger>
        <akar-select-portal><akar-select-content>
          <akar-select-viewport><akar-select-item value="b"><akar-select-item-text>Bee</akar-select-item-text></akar-select-item></akar-select-viewport>
        </akar-select-content></akar-select-portal>
      </akar-select-root>
    `);
    const content = query('akar-select-content');
    const item = query('akar-select-item');
    await vi.waitFor(() => expect(query('akar-select-value').textContent).toBe('Pick'));
    // A closed select keeps no items mounted.
    expect(item.getAttribute('role')).toBeNull();
    expect(content.isConnected).toBe(true);
    expect(content.hasAttribute('data-akar-unmounted')).toBe(true);
    expect(content.getBoundingClientRect().height).toBe(0)
    // Setting the value renders the closed items once, out of the page, to register its label.
    ;(query('akar-select-root') as HTMLElement & { modelValue: string }).modelValue = 'b';
    await vi.waitFor(() => expect(query('akar-select-value').textContent).toBe('Bee'));
    expect(content.isConnected).toBe(true);
    expect(content.getBoundingClientRect().height).toBe(0);
  });
});
