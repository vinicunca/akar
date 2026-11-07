import type { AkarElementEvent } from '.';
import type { Color } from '@/shared/color';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { colorToString } from '@/shared/color';
import {
  colorAreaElements,
  colorFieldElements,
  colorSliderElements,
  colorSwatchElements,
  colorSwatchPickerElements,
  defineAkarElements,
} from '.';
import { cleanup, query, render } from './elements.test.helpers';

beforeAll(() => {
  defineAkarElements([
    colorAreaElements,
    colorFieldElements,
    colorSliderElements,
    colorSwatchElements,
    colorSwatchPickerElements,
  ]);
});
afterEach(cleanup);

/** The `update-model-value` colors, as hex strings. */
function trackColors(el: Element) {
  const values: Array<string> = [];
  el.addEventListener('update-model-value', (event) => {
    values.push(colorToString((event as AkarElementEvent<Color>).detail.value, 'hex'));
  });
  return values;
}

describe('color field elements', () => {
  const FIELD = `
    <form onsubmit="return false">
      <akar-color-field-root name="color" default-value="#ff0000">
        <akar-color-field-input><input aria-label="Color"></akar-color-field-input>
      </akar-color-field-root>
    </form>
  `;

  it('takes a CSS color string as an attribute, edits in its native input, and submits the hex value', async () => {
    const container = render(FIELD);
    const root = query('akar-color-field-root');
    const input = query<HTMLInputElement>('akar-color-field-input input');
    await vi.waitFor(() => expect(input.value).toBe('#ff0000'));
    const form = container.querySelector('form')!;
    await vi.waitFor(() => expect(new FormData(form).get('color')).toBe('#ff0000'));
    const values = trackColors(root);

    await userEvent.clear(input);
    await userEvent.type(input, '#00ff00{Enter}');
    await vi.waitFor(() => expect(values).toEqual(['#00ff00']));
    await vi.waitFor(() => expect(new FormData(form).get('color')).toBe('#00ff00'));

    form.reset();
    await vi.waitFor(() => expect(input.value).toBe('#ff0000'));
    // The reset's event carries a `Color`, as the part's own do, not the CSS string default.
    expect(values).toEqual(['#00ff00', '#ff0000']);
  });

  it('takes a `Color` object as a property', async () => {
    render('<akar-color-field-root><akar-color-field-input><input aria-label="Color"></akar-color-field-input></akar-color-field-root>');
    const root = query<HTMLElement & { modelValue?: string | Color }>('akar-color-field-root');
    const input = query<HTMLInputElement>('input');
    root.modelValue = {
      space: 'rgb',
      r: 0,
      g: 0,
      b: 255,
      alpha: 1,
    };
    await vi.waitFor(() => expect(input.value).toBe('#0000ff'));
  });
});

describe('color slider elements', () => {
  it('is a slider over one channel, moved with the keyboard, and submits the color', async () => {
    const container = render(`
      <form>
        <akar-color-slider-root name="hue" channel="hue" default-value="hsl(0, 100%, 50%)" style="display: flex; position: relative; width: 200px; height: 20px">
          <akar-color-slider-track style="display: block; flex-grow: 1"><akar-color-slider-thumb style="display: block; width: 10px; height: 10px"></akar-color-slider-thumb></akar-color-slider-track>
        </akar-color-slider-root>
      </form>
    `);
    const root = query('akar-color-slider-root');
    const thumb = query('akar-color-slider-thumb');
    await vi.waitFor(() => expect(thumb.getAttribute('role')).toBe('slider'));
    expect(thumb.getAttribute('aria-label')).toBe('Hue');
    expect(thumb.getAttribute('aria-valuemax')).toBe('360');
    expect(query('akar-color-slider-track').style.background).toContain('linear-gradient');
    const values = trackColors(root);

    thumb.focus();
    await userEvent.keyboard('{End}');
    expect(thumb.getAttribute('aria-valuenow')).toBe('360');
    await userEvent.keyboard('{Home}{ArrowRight}');
    expect(thumb.getAttribute('aria-valuenow')).toBe('1');
    expect(values.length).toBe(3);
    await vi.waitFor(() => expect(new FormData(container.querySelector('form')!).get('hue')).toBe(values.at(-1)));
  });
});

describe('color area elements', () => {
  const AREA = `
    <form>
      <akar-color-area-root default-value="hsb(0, 50%, 50%)" x-channel="saturation" y-channel="brightness" x-name="saturation" y-name="brightness">
        <akar-color-area-area style="display: block; position: relative; width: 100px; height: 100px">
          <akar-color-area-thumb style="display: block; width: 10px; height: 10px"></akar-color-area-thumb>
        </akar-color-area-area>
      </akar-color-area-root>
    </form>
  `;

  it('puts its two channel inputs inside the thumb, and moves with the keyboard', async () => {
    const container = render(AREA);
    const root = query('akar-color-area-root');
    const thumb = query('akar-color-area-thumb');
    await vi.waitFor(() => expect(thumb.querySelectorAll('input[type="range"]').length).toBe(2));
    const [x, y] = thumb.querySelectorAll<HTMLInputElement>('input');
    expect(x.getAttribute('aria-label')).toBe('Saturation');
    expect(y.getAttribute('aria-label')).toBe('Brightness');
    expect(x.value).toBe('50');
    const form = container.querySelector('form')!;
    await vi.waitFor(() => expect(new FormData(form).get('saturation')).toBe('50'));
    const values = trackColors(root);

    await userEvent.tab();
    expect(document.activeElement).toBe(x);
    await userEvent.keyboard('{ArrowRight}{ArrowUp}');
    expect(x.value).toBe('51');
    expect(y.value).toBe('51');
    expect(values.length).toBe(2);
    await vi.waitFor(() => expect(new FormData(form).get('brightness')).toBe('51'));
  });

  it('moves the thumb to where the area is pressed', async () => {
    render(AREA);
    const area = query('akar-color-area-area');
    const thumb = query('akar-color-area-thumb');
    await vi.waitFor(() => expect(thumb.querySelectorAll('input').length).toBe(2));
    const [x, y] = thumb.querySelectorAll<HTMLInputElement>('input');
    await userEvent.click(area, {
      position: { x: 75, y: 25 },
    });
    await vi.waitFor(() => expect(x.value).toBe('75'));
    expect(y.value).toBe('75');
  });
});

describe('color swatch elements', () => {
  it('is an image named after its color', async () => {
    render('<akar-color-swatch color="#ff0000"></akar-color-swatch>');
    const swatch = query('akar-color-swatch');
    await vi.waitFor(() => expect(swatch.getAttribute('role')).toBe('img'));
    expect(swatch.getAttribute('aria-label')).toBe('vibrant red');
    expect(swatch.style.getPropertyValue('--akar-color-swatch-color')).toBe('#ff0000');
  });

  it('is a listbox of swatches in a picker, selected by click and keyboard', async () => {
    const container = render(`
      <form><akar-color-swatch-picker-root name="color" default-value="#ff0000" aria-label="Colors">
        ${['#ff0000', '#00ff00', '#0000ff'].map((color) => `
          <akar-color-swatch-picker-item value="${color}" style="display: inline-block; width: 20px; height: 20px">
            <akar-color-swatch-picker-item-swatch></akar-color-swatch-picker-item-swatch>
            <akar-color-swatch-picker-item-indicator>✓</akar-color-swatch-picker-item-indicator>
          </akar-color-swatch-picker-item>`).join('')}
      </akar-color-swatch-picker-root></form>
    `);
    const root = query('akar-color-swatch-picker-root');
    const items = [
      ...document.querySelectorAll<HTMLElement>('akar-color-swatch-picker-item'),
    ];
    const indicators = [
      ...document.querySelectorAll<HTMLElement>('akar-color-swatch-picker-item-indicator'),
    ];
    await vi.waitFor(() => expect(items[0].getAttribute('aria-selected')).toBe('true'));
    expect(root.getAttribute('role')).toBe('listbox');
    expect(items[1].getAttribute('role')).toBe('option');
    expect(items[1].getAttribute('aria-label')).toBe('vibrant green');
    expect(indicators[1].hasAttribute('data-akar-unmounted')).toBe(true);
    const values: Array<unknown> = [];
    root.addEventListener('update-model-value', (event) => values.push((event as AkarElementEvent).detail.value));

    await userEvent.click(items[1]);
    await vi.waitFor(() => expect(items[1].getAttribute('aria-selected')).toBe('true'));
    expect(indicators[1].hasAttribute('data-akar-unmounted')).toBe(false);
    await userEvent.keyboard('{ArrowRight}{Enter}');
    await vi.waitFor(() => expect(items[2].getAttribute('aria-selected')).toBe('true'));
    expect(values).toEqual(['#00ff00', '#0000ff']);
    await vi.waitFor(() => expect([
      ...new FormData(container.querySelector('form')!),
    ]).toEqual([
      ['color', '#0000ff'],
    ]));
  });
});
