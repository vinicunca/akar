import type { AkarElementEvent } from '.';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { accordionElements, collapsibleElements, defineAkarElements, tabsElements } from '.';
import { cleanup, query, render } from './elements.test.helpers';

beforeAll(() => {
  defineAkarElements([tabsElements, accordionElements, collapsibleElements]);
});
afterEach(cleanup);

const TABS = `
  <akar-tabs-root default-value="one">
    <akar-tabs-list aria-label="Settings">
      <akar-tabs-trigger value="one">One</akar-tabs-trigger>
      <akar-tabs-trigger value="two">Two</akar-tabs-trigger>
      <akar-tabs-trigger value="three" disabled>Three</akar-tabs-trigger>
    </akar-tabs-list>
    <akar-tabs-content value="one">Panel one</akar-tabs-content>
    <akar-tabs-content value="two">Panel two</akar-tabs-content>
    <akar-tabs-content value="three">Panel three</akar-tabs-content>
  </akar-tabs-root>
`;

describe('tabs elements', () => {
  it('moves focus with the arrow keys and activates the focused tab', async () => {
    render(TABS);
    const [one, two] = document.querySelectorAll<HTMLElement>('akar-tabs-trigger');
    const [panelOne, panelTwo] = document.querySelectorAll<HTMLElement>('akar-tabs-content');
    await vi.waitFor(() => expect(one.getAttribute('aria-selected')).toBe('true'));
    expect(panelOne.getAttribute('role')).toBe('tabpanel');
    expect(panelOne.getAttribute('aria-labelledby')).toBe(one.id);
    expect(one.getAttribute('aria-controls')).toBe(panelOne.id);
    expect(panelTwo.hasAttribute('data-akar-unmounted')).toBe(true);

    await userEvent.click(one);
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(two);
    await vi.waitFor(() => expect(two.getAttribute('aria-selected')).toBe('true'));
    expect(panelTwo.getAttribute('data-state')).toBe('checked');
    expect(panelOne.hasAttribute('data-akar-unmounted')).toBe(true);

    // The disabled tab is skipped and focus loops back to the first.
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(one);
  });

  it('in manual mode, activates on Enter only', async () => {
    render(TABS.replace('default-value="one"', 'default-value="one" activation-mode="manual"'));
    const [one, two] = document.querySelectorAll<HTMLElement>('akar-tabs-trigger');
    await vi.waitFor(() => expect(one.getAttribute('aria-selected')).toBe('true'));
    const onUpdate = vi.fn();
    query('akar-tabs-root').addEventListener('update-model-value', (event) => onUpdate((event as AkarElementEvent).detail.value));

    await userEvent.click(one);
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(two);
    expect(two.getAttribute('aria-selected')).toBe('false');
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(two.getAttribute('aria-selected')).toBe('true'));
    expect(onUpdate).toHaveBeenCalledWith('two');
  });
});

describe('accordion elements', () => {
  const ACCORDION = `
    <akar-accordion-root type="single" collapsible>
      <akar-accordion-item value="a">
        <akar-accordion-header><akar-accordion-trigger>First</akar-accordion-trigger></akar-accordion-header>
        <akar-accordion-content>First panel</akar-accordion-content>
      </akar-accordion-item>
      <akar-accordion-item value="b">
        <akar-accordion-header><akar-accordion-trigger>Second</akar-accordion-trigger></akar-accordion-header>
        <akar-accordion-content>Second panel</akar-accordion-content>
      </akar-accordion-item>
    </akar-accordion-root>
  `;

  it('exposes headings and buttons, and opens one item at a time', async () => {
    render(ACCORDION);
    const [first, second] = document.querySelectorAll<HTMLElement>('akar-accordion-trigger');
    const [firstPanel, secondPanel] = document.querySelectorAll<HTMLElement>('akar-accordion-content');
    await vi.waitFor(() => expect(first.getAttribute('aria-expanded')).toBe('false'));
    const header = query('akar-accordion-header');
    expect(header.getAttribute('role')).toBe('heading');
    expect(header.getAttribute('aria-level')).toBe('3');
    expect(first.getAttribute('role')).toBe('button');

    await userEvent.click(first);
    await vi.waitFor(() => expect(firstPanel.getAttribute('data-state')).toBe('open'));
    expect(firstPanel.getAttribute('role')).toBe('region');
    expect(firstPanel.getAttribute('aria-labelledby')).toBe(first.id);

    await userEvent.click(second);
    await vi.waitFor(() => expect(secondPanel.getAttribute('data-state')).toBe('open'));
    expect(firstPanel.hasAttribute('data-akar-unmounted')).toBe(true);
  });

  it('moves focus between triggers with the arrow keys and toggles with Enter / Space', async () => {
    render(ACCORDION);
    const [first, second] = document.querySelectorAll<HTMLElement>('akar-accordion-trigger');
    await vi.waitFor(() => expect(first.getAttribute('aria-expanded')).toBe('false'));
    first.focus();

    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(second);
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(second.getAttribute('aria-expanded')).toBe('true'));
    await userEvent.keyboard(' ');
    await vi.waitFor(() => expect(second.getAttribute('aria-expanded')).toBe('false'));
    await userEvent.keyboard('{Home}');
    expect(document.activeElement).toBe(first);
  });

  it('takes an array model as a property in `multiple` mode', async () => {
    render(ACCORDION.replace('type="single" collapsible', 'type="multiple"'));
    const root = query<HTMLElement & { modelValue?: Array<string> }>('akar-accordion-root');
    const [first, second] = document.querySelectorAll<HTMLElement>('akar-accordion-trigger');
    await vi.waitFor(() => expect(first.getAttribute('aria-expanded')).toBe('false'));

    root.modelValue = ['a', 'b'];
    await vi.waitFor(() => expect(second.getAttribute('aria-expanded')).toBe('true'));
    expect(first.getAttribute('aria-expanded')).toBe('true');
  });
});

describe('collapsible elements', () => {
  it('dispatches `update-open` and can be controlled with the `open` property', async () => {
    render(`
      <akar-collapsible-root>
        <akar-collapsible-trigger>Details</akar-collapsible-trigger>
        <akar-collapsible-content>Body</akar-collapsible-content>
      </akar-collapsible-root>
    `);
    const root = query<HTMLElement & { open?: boolean }>('akar-collapsible-root');
    const trigger = query('akar-collapsible-trigger');
    const content = query('akar-collapsible-content');
    // `open` is an HTML boolean attribute (present means open): a controlled
    // closed state is set as a property.
    root.open = false;
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
    const onUpdate = vi.fn();
    root.addEventListener('update-open', onUpdate);
    await userEvent.click(trigger);
    // Controlled: nothing changes until the consumer applies the value.
    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(content.hasAttribute('data-akar-unmounted')).toBe(true);

    root.addEventListener('update-open', (event) => {
      root.open = (event as AkarElementEvent<boolean>).detail.value;
    });

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    expect(root.getAttribute('data-state')).toBe('open');

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('keeps the content closed when `before-update-open` is prevented', async () => {
    render(`
      <akar-collapsible-root>
        <akar-collapsible-trigger>Details</akar-collapsible-trigger>
        <akar-collapsible-content>Body</akar-collapsible-content>
      </akar-collapsible-root>
    `);
    const root = query('akar-collapsible-root');
    const trigger = query('akar-collapsible-trigger');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
    root.addEventListener('before-update-open', (event) => event.preventDefault());

    await userEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(query('akar-collapsible-content').hasAttribute('data-akar-unmounted')).toBe(true);
  });
});
