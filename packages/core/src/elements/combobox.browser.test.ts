import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { autocompleteElements, comboboxElements, defineAkarElements } from '.';
import { cleanup, query, render, settle } from './elements.test.helpers';

beforeAll(() => {
  defineAkarElements([comboboxElements, autocompleteElements]);
});
afterEach(cleanup);

const COMBOBOX = `
  <button id="outside">Outside</button>
  <form>
    <akar-combobox-root name="fruit">
      <akar-combobox-anchor>
        <akar-combobox-input><input aria-label="Fruit" placeholder="Pick a fruit"></akar-combobox-input>
        <akar-combobox-trigger aria-label="Show fruits">▾</akar-combobox-trigger>
        <akar-combobox-cancel aria-label="Clear">×</akar-combobox-cancel>
      </akar-combobox-anchor>
      <akar-combobox-portal>
        <akar-combobox-content position="popper" style="background: white">
          <akar-combobox-viewport>
            <akar-combobox-empty>No fruit</akar-combobox-empty>
            <akar-combobox-group>
              <akar-combobox-label>Fruits</akar-combobox-label>
              <akar-combobox-item value="apple">Apple<akar-combobox-item-indicator>✓</akar-combobox-item-indicator></akar-combobox-item>
              <akar-combobox-item value="banana">Banana</akar-combobox-item>
              <akar-combobox-item value="blueberry">Blueberry</akar-combobox-item>
            </akar-combobox-group>
            <akar-combobox-separator></akar-combobox-separator>
            <akar-combobox-item value="carrot"></akar-combobox-item>
          </akar-combobox-viewport>
        </akar-combobox-content>
      </akar-combobox-portal>
    </akar-combobox-root>
  </form>
`;

function items() {
  return [
    ...document.querySelectorAll<HTMLElement>('akar-combobox-item'),
  ];
}

function shown() {
  return items().filter((item) => !item.hasAttribute('data-akar-unmounted')).map((item) => item.textContent);
}

async function mount(html = COMBOBOX) {
  const container = render(html);
  const input = query<HTMLInputElement>('akar-combobox-input > input');
  await vi.waitFor(() => expect(input.getAttribute('role')).toBe('combobox'));
  return {
    container,
    input,
    content: query('akar-combobox-content'),
  };
}

describe('combobox elements', () => {
  it('renders onto the `<input>` it holds, and opens a portaled listbox wired to it', async () => {
    const { input, content } = await mount();
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(input.placeholder).toBe('Pick a fruit');
    expect(content.hasAttribute('data-akar-unmounted')).toBe(true);

    await userEvent.click(query('akar-combobox-trigger'));
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(query('akar-combobox-portal').parentElement).toBe(document.body);
    expect(content.getAttribute('role')).toBe('listbox');
    expect(input.getAttribute('aria-controls')).toBe(content.id);
    const group = query('akar-combobox-group');
    expect(group.getAttribute('role')).toBe('group');
    expect(document.getElementById(group.getAttribute('aria-labelledby')!)!.textContent).toBe('Fruits');
    // An item without children shows its value, like the Vue component's fallback.
    expect(shown()).toEqual([
      'Apple✓',
      'Banana',
      'Blueberry',
      'carrot',
    ]);
    expect(document.activeElement).toBe(input);
  });

  it('renders `<akar-combobox-arrow>`\'s SVG inside it', async () => {
    const { content } = await mount(COMBOBOX.replace('</akar-combobox-viewport>', '</akar-combobox-viewport><akar-combobox-arrow width="20" height="10"></akar-combobox-arrow>'));
    await userEvent.click(query('akar-combobox-trigger'));
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    const arrow = query('akar-combobox-arrow');
    await vi.waitFor(() => expect(arrow.querySelector('svg')).toBeInstanceOf(SVGSVGElement));
    expect(arrow.querySelector('svg')!.getAttribute('width')).toBe('20');
    // Below the trigger, pointing up at it from the content's top edge.
    await vi.waitFor(() => expect(Math.round(arrow.querySelector('svg')!.getBoundingClientRect().bottom)).toBe(Math.round(content.getBoundingClientRect().top)));
  });

  it('filters while typing, highlights with the arrow keys and selects with Enter', async () => {
    const { input, content } = await mount();
    const root = query('akar-combobox-root');
    const values: Array<unknown> = [];
    const texts: Array<unknown> = [];
    root.addEventListener('update-model-value', (event) => values.push((event as CustomEvent).detail.value));
    query('akar-combobox-input').addEventListener('update-model-value', (event) => texts.push((event as CustomEvent).detail.value));

    await userEvent.type(input, 'b');
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    await vi.waitFor(() => expect(shown()).toEqual(['Banana', 'Blueberry']));
    expect(texts).toEqual(['b']);
    expect(query('akar-combobox-empty').hasAttribute('data-akar-unmounted')).toBe(true);
    await vi.waitFor(() => expect(input.getAttribute('aria-activedescendant')).toBe(items()[1].id));
    await userEvent.keyboard('{ArrowDown}');
    expect(input.getAttribute('aria-activedescendant')).toBe(items()[2].id);
    expect(items()[2].hasAttribute('data-highlighted')).toBe(true);

    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    expect(values).toEqual(['blueberry']);
    expect(input.value).toBe('blueberry');
    expect(new FormData(query('form')).get('fruit')).toBe('blueberry');

    await userEvent.clear(input);
    await userEvent.type(input, 'xyz');
    await vi.waitFor(() => expect(query('akar-combobox-empty').hasAttribute('data-akar-unmounted')).toBe(false));
    expect(shown()).toEqual([]);
    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
  });

  it('shows the selection with a `displayValue` set before it connects, and clears it from the cancel button', async () => {
    // `displayValue` (like `by`) is read once, when the root sets up: set it before
    // the element is connected (or defined).
    const template = document.createElement('template');
    template.innerHTML = COMBOBOX;
    const root = template.content.querySelector('akar-combobox-root') as HTMLElement & { displayValue: unknown; defaultValue: unknown };
    root.displayValue = (value: string) => value.toUpperCase();
    root.defaultValue = 'apple';
    render('').append(template.content);
    const input = query<HTMLInputElement>('akar-combobox-input > input');
    await vi.waitFor(() => expect(input.value).toBe('APPLE'));
    const cleared: Array<unknown> = [];
    query('akar-combobox-input').addEventListener('update-model-value', (event) => cleared.push((event as CustomEvent).detail.value));
    await userEvent.click(query('akar-combobox-cancel'));
    await vi.waitFor(() => expect(input.value).toBe(''));
    expect(cleared).toEqual(['']);
  });

  it('selects objects with `multiple`, compared with `by`, and submits each of them', async () => {
    const { container, input, content } = await mount(COMBOBOX.replace('<akar-combobox-root name="fruit">', '<akar-combobox-root name="fruit" multiple by="id">'));
    const fruits = [
      { id: 'a', name: 'Apple' },
      { id: 'b', name: 'Banana' },
      { id: 'c', name: 'Blueberry' },
      { id: 'd', name: 'Carrot' },
    ];
    items().forEach((item, index) => (item as HTMLElement & { value: unknown }).value = fruits[index]);
    const root = query<HTMLElement & { modelValue: unknown }>('akar-combobox-root');
    root.modelValue = [
      { id: 'b' },
    ];
    root.addEventListener('update-model-value', (event) => root.modelValue = (event as CustomEvent).detail.value);

    await userEvent.click(query('akar-combobox-trigger'));
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    expect(content.getAttribute('aria-multiselectable')).toBe('true');
    expect(items().map((item) => item.getAttribute('aria-selected'))).toEqual(['false', 'true', 'false', 'false']);
    await userEvent.click(items()[3]);
    await vi.waitFor(() => expect(items()[3].getAttribute('aria-selected')).toBe('true'));
    // Stays open for more.
    expect(content.getAttribute('data-state')).toBe('open');
    expect(root.modelValue).toEqual([
      { id: 'b' },
      { id: 'd', name: 'Carrot' },
    ]);
    const form = container.querySelector('form')!;
    await vi.waitFor(() => expect([
      ...new FormData(form).keys(),
    ]).toEqual(['fruit[0][id]', 'fruit[1][id]', 'fruit[1][name]']));
    expect(document.activeElement).toBe(input);
  });

  it('closes on an outside click', async () => {
    const { content } = await mount();
    await userEvent.click(query('akar-combobox-trigger'));
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    await userEvent.click(query('#outside'));
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
  });
});

describe('combobox inside a shadow root', () => {
  it('portals its content into the shadow root, filters and selects there', async () => {
    const host = render('<div></div>').firstElementChild!;
    const shadowRoot = host.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = COMBOBOX;
    const get = (selector: string) => shadowRoot.querySelector<HTMLElement>(selector)!;
    const input = get('akar-combobox-input > input') as HTMLInputElement;
    await vi.waitFor(() => expect(input.getAttribute('role')).toBe('combobox'));

    await userEvent.type(input, 'ban');
    const content = get('akar-combobox-content');
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    expect(get('akar-combobox-portal').parentNode).toBe(shadowRoot);
    expect(shadowRoot.getElementById(input.getAttribute('aria-controls')!)).toBe(content);
    // The viewport's scrollbar style goes into the shadow root, where it applies.
    expect([
      ...shadowRoot.querySelectorAll('style'),
    ].some((style) => style.textContent!.includes('data-akar-combobox-viewport'))).toBe(true);
    const items = [
      ...shadowRoot.querySelectorAll<HTMLElement>('akar-combobox-item'),
    ];
    await vi.waitFor(() => expect(items.filter((item) => !item.hasAttribute('data-akar-unmounted'))).toEqual([items[1]]));
    expect(input.getAttribute('aria-activedescendant')).toBe(items[1].id);
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(input.value).toBe('banana'));
    expect(content.hasAttribute('data-akar-unmounted')).toBe(true);
  });
});

describe('autocomplete elements', () => {
  it('suggests from the typed text and completes it with the highlighted item', async () => {
    render(`
      <akar-autocomplete-root name="city">
        <akar-autocomplete-anchor>
          <akar-autocomplete-input><input aria-label="City"></akar-autocomplete-input>
        </akar-autocomplete-anchor>
        <akar-autocomplete-portal>
          <akar-autocomplete-content style="background: white">
            <akar-autocomplete-viewport>
              <akar-autocomplete-item value="Paris"></akar-autocomplete-item>
              <akar-autocomplete-item value="Prague"></akar-autocomplete-item>
              <akar-autocomplete-item value="Rome"></akar-autocomplete-item>
            </akar-autocomplete-viewport>
          </akar-autocomplete-content>
        </akar-autocomplete-portal>
      </akar-autocomplete-root>
    `);
    const input = query<HTMLInputElement>('akar-autocomplete-input > input');
    await vi.waitFor(() => expect(input.getAttribute('role')).toBe('combobox'));
    const root = query('akar-autocomplete-root');
    const values: Array<unknown> = [];
    root.addEventListener('update-model-value', (event) => values.push((event as CustomEvent).detail.value));

    await userEvent.type(input, 'p');
    const content = query('akar-autocomplete-content');
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    const shownItems = () => Array.from(document.querySelectorAll('akar-autocomplete-item:not([data-akar-unmounted])'), (item) => item.textContent);
    await vi.waitFor(() => expect(shownItems()).toEqual(['Paris', 'Prague']));
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    await vi.waitFor(() => expect(input.value).toBe('Prague'));
    // The model is the text: free text included.
    expect(values.at(-1)).toBe('Prague');
    expect(values[0]).toBe('p');
  });
});

void settle;
