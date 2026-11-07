// Regression (#3111 review): a closed custom-element select stays live.
// Focus 9: custom elements Select — label / typeahead freshness while closed (real Chromium).
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { defineAkarElements, selectElements } from '.';
import { cleanup, query, render } from './elements.test.helpers';

beforeAll(() => {
  defineAkarElements([selectElements]);
});
afterEach(cleanup);

function SELECT(rootAttrs = '') {
  return `
  <form>
    <akar-select-root name="fruit" ${rootAttrs}>
      <akar-select-trigger aria-label="Fruit"><akar-select-value placeholder="Pick"></akar-select-value></akar-select-trigger>
      <akar-select-portal>
        <akar-select-content>
          <akar-select-viewport>
            <akar-select-item value="apple"><akar-select-item-text>Apple</akar-select-item-text></akar-select-item>
            <akar-select-item value="banana"><akar-select-item-text>Banana</akar-select-item-text></akar-select-item>
            <akar-select-item value="cherry"><akar-select-item-text>Cherry</akar-select-item-text></akar-select-item>
          </akar-select-viewport>
        </akar-select-content>
      </akar-select-portal>
    </akar-select-root>
  </form>`;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function mountSel(attrs = '') {
  render(SELECT(attrs));
  const trigger = query('akar-select-trigger');
  await vi.waitFor(() => expect(trigger.getAttribute('role')).toBe('combobox'));
  await sleep(1200); // past the idle harvest
  return {
    trigger,
    value: query('akar-select-value'),
  };
}
const itemText = (v: string) => document.querySelector(`akar-select-item[value="${v}"] akar-select-item-text`) as HTMLElement;

describe('elements select while closed', () => {
  it('without a form, a focus renders no lean items and the first key still matches', async () => {
    render(SELECT().replace('<form>', '<div>').replace('</form>', '</div>').replace('name="fruit"', ''));
    const trigger = query('akar-select-trigger');
    await vi.waitFor(() => expect(trigger.getAttribute('role')).toBe('combobox'));
    trigger.focus();
    await sleep(700); // past any idle time
    const value = query('akar-select-value');
    expect(value.textContent).toBe('Pick');
    await userEvent.keyboard('c');
    await vi.waitFor(() => expect(value.textContent).toBe('Cherry'));
  });

  it('a selected item\'s text changed while closed shows in akar-select-value', async () => {
    const { value } = await mountSel('default-value="cherry"');
    await vi.waitFor(() => expect(value.textContent).toBe('Cherry'));
    itemText('cherry').textContent = 'Cerise';
    await sleep(300);
    expect(value.textContent).toBe('Cerise');
  });

  // The root's `modelValue` property stays undefined on an uncontrolled root, so these read the visible value.
  it('closed typeahead reaches an enabled item', async () => {
    const { trigger, value } = await mountSel();
    trigger.focus();
    await sleep(100);
    await userEvent.keyboard('b');
    await vi.waitFor(() => expect(value.textContent).toBe('Banana'));
  });

  it('an item disabled while closed is skipped by closed typeahead', async () => {
    const { trigger, value } = await mountSel();
    trigger.focus();
    await sleep(100);
    document.querySelector('akar-select-item[value="banana"]')!.setAttribute('disabled', '');
    await sleep(100);
    await userEvent.keyboard('b');
    await sleep(300);
    expect(value.textContent).toBe('Pick');
  });

  it('items reordered in the light DOM while closed: typeahead follows document order', async () => {
    const { trigger, value } = await mountSel();
    trigger.focus();
    await sleep(300);
    const blueberry = document.createElement('akar-select-item');
    blueberry.setAttribute('value', 'blueberry');
    blueberry.innerHTML = '<akar-select-item-text>Blueberry</akar-select-item-text>';
    document.querySelector('akar-select-viewport')!.append(blueberry);
    await sleep(300);
    document.querySelector('akar-select-viewport')!.prepend(blueberry);
    await sleep(300);
    await userEvent.keyboard('b');
    await vi.waitFor(() => expect(value.textContent).toBe('Blueberry'));
  });
});
