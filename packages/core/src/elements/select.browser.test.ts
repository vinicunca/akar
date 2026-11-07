import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { defineAkarElements, selectElements } from '.';
import { cleanup, query, render } from './elements.test.helpers';

beforeAll(() => {
  defineAkarElements([selectElements]);
});
afterEach(cleanup);

function SELECT(rootAttributes = '', contentAttributes = '') {
  return `
  <button id="outside">Outside</button>
  <form>
    <akar-select-root name="fruit" ${rootAttributes}>
      <akar-select-trigger aria-label="Fruit" style="display: inline-block; width: 160px">
        <akar-select-value placeholder="Pick a fruit"></akar-select-value>
        <akar-select-icon>▾</akar-select-icon>
      </akar-select-trigger>
      <akar-select-portal>
        <akar-select-content ${contentAttributes} style="display: block; background: white">
          <akar-select-scroll-up-button>▴</akar-select-scroll-up-button>
          <akar-select-viewport>
            <akar-select-group>
              <akar-select-label>Fruits</akar-select-label>
              <akar-select-item value="apple">
                <akar-select-item-text>Apple</akar-select-item-text>
                <akar-select-item-indicator>✓</akar-select-item-indicator>
              </akar-select-item>
              <akar-select-item value="banana"><akar-select-item-text>Banana</akar-select-item-text></akar-select-item>
              <akar-select-item value="blueberry" disabled><akar-select-item-text>Blueberry</akar-select-item-text></akar-select-item>
              <akar-select-item value="cherry"><akar-select-item-text>Cherry</akar-select-item-text></akar-select-item>
            </akar-select-group>
            <akar-select-separator></akar-select-separator>
          </akar-select-viewport>
          <akar-select-scroll-down-button>▾</akar-select-scroll-down-button>
        </akar-select-content>
      </akar-select-portal>
    </akar-select-root>
  </form>
`;
}

function items() {
  return [
    ...document.querySelectorAll<HTMLElement>('akar-select-item'),
  ];
}

async function mount(html = SELECT()) {
  const container = render(html);
  const trigger = query('akar-select-trigger');
  await vi.waitFor(() => expect(trigger.getAttribute('role')).toBe('combobox'));
  return {
    container,
    trigger,
    content: query('akar-select-content'),
    value: query('akar-select-value'),
  };
}

async function open(trigger: HTMLElement) {
  await userEvent.click(trigger);
  const content = query('akar-select-content');
  await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
  return content;
}

describe('select elements', () => {
  it('shows the placeholder, then the selected label, in `<akar-select-value>`', async () => {
    const { trigger, value } = await mount();
    expect(value.textContent).toBe('Pick a fruit');
    expect(value.hasAttribute('data-placeholder')).toBe(true);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    const content = await open(trigger);
    expect(query('akar-select-portal').parentElement).toBe(document.body);
    expect(content.getAttribute('role')).toBe('listbox');
    expect(trigger.getAttribute('aria-controls')).toBe(content.id);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    await userEvent.click(items()[1]);
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    expect(value.textContent).toBe('Banana');
    expect(value.hasAttribute('data-placeholder')).toBe(false);
  });

  it('starts closed when moved, like the other overlays, and keeps its value', async () => {
    const { container, trigger } = await mount();
    const content = await open(trigger);
    await userEvent.click(items()[1]);
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    await open(trigger);
    const root = query('akar-select-root');
    container.append(root);
    const moved = query('akar-select-trigger');
    await vi.waitFor(() => expect(moved.getAttribute('aria-expanded')).toBe('false'));
    expect(query('akar-select-value').textContent).toBe('Banana');
  });

  it('renders `<akar-select-arrow>`\'s SVG inside it, in popper position', async () => {
    const { trigger } = await mount(SELECT('', 'position="popper"').replace('</akar-select-viewport>', '</akar-select-viewport><akar-select-arrow width="20" height="10"></akar-select-arrow>'));
    await open(trigger);
    const arrow = query('akar-select-arrow');
    await vi.waitFor(() => expect(arrow.querySelector('svg')).toBeInstanceOf(SVGSVGElement));
    expect(arrow.querySelector('svg')!.getAttribute('width')).toBe('20');
    // Below the trigger, pointing up at it from the content's top edge.
    await vi.waitFor(() => expect(Math.round(arrow.querySelector('svg')!.getBoundingClientRect().bottom)).toBe(Math.round(query('akar-select-content').getBoundingClientRect().top)));
    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(arrow.querySelector('svg')).toBeNull());
  });

  it('shows the label of a default value before it was ever opened', async () => {
    const { value } = await mount(SELECT('default-value="cherry"'));
    await vi.waitFor(() => expect(value.textContent).toBe('Cherry'));
  });

  it('selects by typing on the closed trigger, though a closed select keeps no items rendered', async () => {
    const { trigger, value } = await mount();
    expect(query('akar-select-content').hasAttribute('data-akar-unmounted')).toBe(true);
    trigger.focus();
    await userEvent.keyboard('c');
    await vi.waitFor(() => expect(value.textContent).toBe('Cherry'));
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('takes its labels from an `items` property', async () => {
    const template = document.createElement('template');
    template.innerHTML = SELECT('default-value="cherry"');
    const root = template.content.querySelector('akar-select-root') as HTMLElement & { items: unknown };
    root.items = {
      apple: 'Apple',
      banana: 'Banana',
      blueberry: 'Blueberry',
      cherry: 'Cherry (from items)',
    };
    render('').append(template.content);
    await vi.waitFor(() => expect(query('akar-select-value').textContent).toBe('Cherry (from items)'));
    root.items = { cherry: 'Cherry!' };
    await vi.waitFor(() => expect(query('akar-select-value').textContent).toBe('Cherry!'));
  });

  it('keeps children you give `<akar-select-value>` instead of its text', async () => {
    render(SELECT().replace('<akar-select-value placeholder="Pick a fruit"></akar-select-value>', '<akar-select-value placeholder="Pick a fruit"><b>Custom</b></akar-select-value>'));
    const value = query('akar-select-value');
    await vi.waitFor(() => expect(query('akar-select-trigger').getAttribute('role')).toBe('combobox'));
    expect(value.innerHTML).toBe('<b>Custom</b>');
  });

  it('navigates with the keyboard, skipping disabled items, and selects with Enter', async () => {
    const { trigger, value } = await mount(SELECT('', 'position="popper"'));
    const root = query('akar-select-root');
    const changes: Array<unknown> = [];
    root.addEventListener('update-model-value', (event) => changes.push((event as CustomEvent).detail.value));
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    const content = query('akar-select-content');
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    await vi.waitFor(() => expect(document.activeElement).toBe(items()[0]));
    expect(items()[0].hasAttribute('data-highlighted')).toBe(true);
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(items()[1]);
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(items()[3]);
    // Typeahead.
    await userEvent.keyboard('a');
    expect(document.activeElement).toBe(items()[0]);
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    expect(changes).toEqual(['apple']);
    expect(value.textContent).toBe('Apple');
    expect(document.activeElement).toBe(trigger);

    // The selected item is checked, and its indicator rendered.
    await open(trigger);
    expect(items()[0].getAttribute('aria-selected')).toBe('true');
    expect(query('akar-select-item-indicator').hasAttribute('data-akar-unmounted')).toBe(false);
    expect(document.getElementById(query('akar-select-group').getAttribute('aria-labelledby')!)!.textContent).toBe('Fruits');
    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
  });

  it('submits through a native select, resets, and reports `required`', async () => {
    const { container, trigger } = await mount(SELECT('required'));
    const form = container.querySelector('form')!;
    expect(form.checkValidity()).toBe(false);
    expect(query('akar-select-root').matches(':invalid')).toBe(true);
    await open(trigger);
    await userEvent.click(items()[3]);
    await vi.waitFor(() => expect(new FormData(form).get('fruit')).toBe('cherry'));
    expect(form.checkValidity()).toBe(true);
    form.reset();
    await vi.waitFor(() => expect(query('akar-select-value').textContent).toBe('Pick a fruit'));
    expect(form.checkValidity()).toBe(false);
  });

  it('selects several objects with `multiple`, compared with `by`', async () => {
    const { container, trigger, value } = await mount(SELECT('multiple by="id"', 'position="popper"'));
    const fruits = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ];
    items().forEach((item, index) => (item as HTMLElement & { value: unknown }).value = fruits[index]);
    const root = query<HTMLElement & { modelValue: unknown }>('akar-select-root');
    root.modelValue = [
      { id: 4 },
    ];
    root.addEventListener('update-model-value', (event) => root.modelValue = (event as CustomEvent).detail.value);
    const content = await open(trigger);
    expect(items()[3].getAttribute('aria-selected')).toBe('true');
    await userEvent.click(items()[0]);
    await vi.waitFor(() => expect(items()[0].getAttribute('aria-selected')).toBe('true'));
    // Stays open.
    expect(content.getAttribute('data-state')).toBe('open');
    expect(root.modelValue).toEqual([
      { id: 4 },
      { id: 1 },
    ]);
    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(value.textContent).toBe('Cherry, Apple'));
    expect(new FormData(container.querySelector('form')!).getAll('fruit')).toHaveLength(2);
  });
});
