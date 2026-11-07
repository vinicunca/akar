import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mount } from '@vue/test-utils';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { CalendarRoot } from '@/Calendar';
import { CheckboxGroupRoot } from '@/Checkbox';
import { DatePickerField } from '@/DatePicker';
import { DialogRoot } from '@/Dialog';
import { FieldError, FieldLabel } from '@/Field';
import { FormRoot } from '@/Form';
import { NumberFieldInput, NumberFieldRoot } from '@/NumberField';
import { PopoverContent } from '@/Popover';
import { SwitchRoot } from '@/Switch';
import * as source from '.';
import { akarElementFamilies, defineAkarElements, toEventType } from '.';
import { cleanup, query, render } from './elements.test.helpers';
import { getPartMeta, parseAttribute, reviveFormState, serializeFormState } from './meta';

describe('attribute and event mapping', () => {
  it('derives attributes and properties from the runtime props', () => {
    const meta = getPartMeta({
      component: SwitchRoot,
      attributes: { modelValue: 'booleanish' },
    });
    expect(meta.observedAttributes).toEqual(expect.arrayContaining([
      'model-value',
      'default-value',
      'disabled',
      'name',
      'id',
    ]));
    // `as` / `asChild` are not part of the element API.
    expect(meta.observedAttributes).not.toContain('as-child');
    expect(meta.properties).not.toContain('asChild');
    // `id` stays the native property, read through the attribute.
    expect(meta.properties).not.toContain('id');
    expect(meta.properties).toContain('modelValue');
    expect(meta.emits).toEqual(['beforeUpdate:modelValue', 'update:modelValue']);
    expect(meta.semantics).toEqual({ role: 'button', button: true });
    expect(meta.formAssociated).toBe(true);
  });

  it('leaves array, object and element props to properties', () => {
    expect(getPartMeta({ component: CheckboxGroupRoot }).observedAttributes).not.toContain('model-value');
    const popover = getPartMeta({
      component: PopoverContent,
      attributes: { reference: 'property' },
    });
    expect(popover.observedAttributes).not.toContain('reference');
    expect(popover.observedAttributes).toContain('side-offset');
    expect(popover.byAttribute.get('side-offset')?.kind).toBe('number');
  });

  it('parses attribute values by kind', () => {
    const open = { kind: 'boolean', attribute: 'open' } as const;
    expect(parseAttribute(open, '')).toBe(true);
    expect(parseAttribute(open, 'open')).toBe(true);
    // HTML boolean attribute: present means `true`, whatever the value.
    expect(parseAttribute(open, 'false')).toBe(true);
    expect(parseAttribute(open, null)).toBeUndefined();
    // Only a prop that defaults to `true` can be turned off with `"false"`.
    const modal = { kind: 'boolean', attribute: 'modal', defaultTrue: true } as const;
    expect(parseAttribute(modal, 'false')).toBe(false);
    expect(parseAttribute(modal, '')).toBe(true);
    const modelValue = { kind: 'booleanish', attribute: 'model-value' } as const;
    expect(parseAttribute(modelValue, '')).toBe(true);
    expect(parseAttribute(modelValue, 'false')).toBe(false);
    expect(parseAttribute(modelValue, 'indeterminate')).toBe('indeterminate');
    const sideOffset = { kind: 'number', attribute: 'side-offset' } as const;
    expect(parseAttribute(sideOffset, '8')).toBe(8);
    expect(parseAttribute(sideOffset, 'x')).toBeUndefined();
    expect(parseAttribute({ kind: 'string', attribute: 'value' }, 'a')).toBe('a');
  });

  it('parses number lists and ISO 8601 dates, times and intervals into Temporal values', () => {
    const numbers = { kind: 'numbers', attribute: 'default-value' } as const;
    expect(parseAttribute(numbers, '10 90')).toEqual([10, 90]);
    expect(parseAttribute(numbers, '10,90')).toEqual([10, 90]);
    expect(parseAttribute(numbers, '10 x')).toBeUndefined();

    const date = { kind: 'date', attribute: 'default-value' } as const;
    expect(parseAttribute(date, '2026-10-14')).toBeInstanceOf(Temporal.PlainDate);
    expect(parseAttribute(date, '2026-10-14T09:30')).toBeInstanceOf(Temporal.PlainDateTime);
    const zoned = parseAttribute(date, '2026-10-14T09:30+02:00[Europe/Paris]') as Temporal.ZonedDateTime;
    expect(zoned).toBeInstanceOf(Temporal.ZonedDateTime);
    expect(zoned.timeZoneId).toBe('Europe/Paris');
    expect(parseAttribute(date, '')).toBeUndefined();

    const time = { kind: 'time', attribute: 'default-value' } as const;
    expect(parseAttribute(time, '09:30')).toBeInstanceOf(Temporal.PlainTime);
    expect(String(parseAttribute(time, '09:30'))).toBe('09:30:00');
    expect(parseAttribute(time, '2026-10-14T09:30')).toBeInstanceOf(Temporal.PlainDateTime);

    const range = parseAttribute({ kind: 'date-range', attribute: 'default-value' }, '2026-10-05/2026-10-07') as Record<string, unknown>;
    expect(Object.keys(range)).toEqual(['start', 'end']);
    expect(String(range.start)).toBe('2026-10-05');
    expect(String(range.end)).toBe('2026-10-07');
    const times = parseAttribute({ kind: 'time-range', attribute: 'default-value' }, '09:00/17:30') as Record<string, unknown>;
    expect(String(times.end)).toBe('17:30:00');
    // The `/` of a time zone name is not the interval's.
    const zonedRange = parseAttribute({ kind: 'date-range', attribute: 'default-value' }, '2026-10-05T09:00+02:00[Europe/Paris]/2026-10-07T09:00+02:00[Europe/Paris]') as Record<string, Temporal.ZonedDateTime>;
    expect(zonedRange.start.timeZoneId).toBe('Europe/Paris');
    expect(zonedRange.end.day).toBe(7);

    // What `toString()` gives for other calendars: a calendar annotation is not a time zone.
    const japanese = parseAttribute(date, '2026-10-14[u-ca=japanese]') as Temporal.PlainDate;
    expect(japanese).toBeInstanceOf(Temporal.PlainDate);
    expect(japanese.calendarId).toBe('japanese');
    expect(parseAttribute(date, String(Temporal.PlainDateTime.from('2026-10-14T09:30').withCalendar('hebrew')))).toBeInstanceOf(Temporal.PlainDateTime);
    const persian = (day: string) => Temporal.PlainDate.from(day).withCalendar('persian');
    const persianRange = parseAttribute({ kind: 'date-range', attribute: 'default-value' }, `${persian('2026-10-05')}/${persian('2026-10-07')}`) as Record<string, Temporal.PlainDate>;
    expect(persianRange.end.calendarId).toBe('persian');
    // Temporal also takes a space between the date and the time.
    expect(String(parseAttribute(date, '2026-10-14 09:30'))).toBe('2026-10-14T09:30:00');

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(parseAttribute(date, '2026-13-45')).toBeUndefined();
    expect(parseAttribute({ kind: 'date-range', attribute: 'default-value' }, '2026-10-05')).toBeUndefined();
    expect(warn).toHaveBeenCalledTimes(2);
    warn.mockRestore();
  });

  it('writes Temporal model values to the form state as ISO strings, and reads them back', () => {
    const date = { kind: 'date', attribute: 'model-value' } as const;
    const state = serializeFormState(date, Temporal.PlainDate.from('2026-11-14'));
    expect(state).toBe('"2026-11-14"');
    expect(reviveFormState(date, state)).toBeInstanceOf(Temporal.PlainDate);
    expect(reviveFormState(date, serializeFormState(date, null))).toBeNull();
    const range = { kind: 'date-range', attribute: 'model-value' } as const;
    const revived = reviveFormState(range, serializeFormState(range, {
      start: Temporal.PlainDate.from('2026-10-05'),
      end: Temporal.PlainDate.from('2026-10-07'),
    })) as Record<string, unknown>;
    expect(String(revived.start)).toBe('2026-10-05');
    expect(String(revived.end)).toBe('2026-10-07');
    expect(reviveFormState(range, serializeFormState(range, { start: undefined, end: undefined }))).toEqual({ start: undefined, end: undefined });
    // Other kinds: JSON as is.
    expect(reviveFormState({ kind: 'numbers', attribute: 'model-value' }, serializeFormState({ kind: 'numbers' }, [20, 80]))).toEqual([20, 80]);
  });

  it('reads the part hints of the date and numeric families: `asChild` and forms', () => {
    expect(getPartMeta({ component: NumberFieldInput, target: 'input' }).inputTarget).toBe(true);
    expect(getPartMeta({ component: CalendarRoot, siblings: 'inside' }).siblings).toBe('inside');
    // A wrapping part without its own `asChild` prop can still declare it passes it through.
    expect(getPartMeta({ component: DatePickerField }).hasAsChild).toBe(false);
    const field = getPartMeta({ component: DatePickerField, asChild: true, formAssociated: true });
    expect(field.hasAsChild).toBe(true);
    expect(field.formAssociated).toBe(true);
    // A `name` prop makes a part form-associated by itself.
    expect(getPartMeta({ component: NumberFieldRoot }).formAssociated).toBe(true);
  });

  it('lets only props that default to `true` take `"false"`, never native attribute names', () => {
    const dialog = getPartMeta({ component: DialogRoot });
    expect(dialog.byAttribute.get('modal')?.defaultTrue).toBe(true);
    expect(dialog.byAttribute.get('open')?.defaultTrue).toBeUndefined();
    expect(getPartMeta({ component: SwitchRoot }).byAttribute.get('disabled')?.defaultTrue).toBeUndefined();
  });

  it('leaves fixed props out of the element API, and gates listened emits', () => {
    const label = getPartMeta({
      component: FieldLabel,
      fixedProps: { nativeLabel: false, for: undefined },
    });
    expect(label.observedAttributes).not.toContain('native-label');
    expect(label.observedAttributes).not.toContain('for');
    expect(label.properties).not.toContain('nativeLabel');
    expect(label.fixedProps).toEqual({ nativeLabel: false, for: undefined });
    const form = getPartMeta({
      component: FormRoot,
      listenedEmits: ['formSubmit'],
    });
    expect([...form.listenedEvents]).toEqual(['form-submit']);
    expect(getPartMeta({
      component: FieldError,
      attributes: { match: 'booleanish' },
    }).byAttribute.get('match')?.kind).toBe('booleanish');
    // `siblings: true` is `'after'`.
    expect(getPartMeta({ component: FormRoot, siblings: true }).siblings).toBe('after');
    expect(getPartMeta({ component: FormRoot, siblings: 'inside' }).siblings).toBe('inside');
    expect(getPartMeta({ component: FormRoot }).siblings).toBe(false);
  });

  it('names events in kebab-case, without colons', () => {
    expect(toEventType('update:modelValue')).toBe('update-model-value');
    expect(toEventType('beforeUpdate:open')).toBe('before-update-open');
    expect(toEventType('escapeKeyDown')).toBe('escape-key-down');
  });
});

// The bindings the guide documents for rendering the elements from Vue templates.
describe('bound from a Vue template', () => {
  beforeAll(() => {
    defineAkarElements([source.switchElements], { prefix: 'vuet' });
  });

  it.each([
    [':modelValue', true],
    [':model-value.camel.prop', true],
    [':modelValue.prop', true],
    // Without `.camel`, `.prop` sets a `model-value` property, not `modelValue`.
    [':model-value.prop', false],
  ])('`%s` sets the `modelValue` property: %s', (binding, sets) => {
    const wrapper = mount({ template: `<vuet-switch-root ${binding}="true" />` }, {
      attachTo: document.body,
      global: {
        config: {
          compilerOptions: {
            isCustomElement: (tag: string) => tag.startsWith('vuet-'),
          },
        },
      },
    });
    const el = wrapper.element as HTMLElement & { modelValue?: unknown };
    expect(el.modelValue === true).toBe(sets);
    wrapper.unmount();
  });
});

describe('accessibility (axe)', () => {
  beforeAll(() => {
    defineAkarElements(akarElementFamilies);
  });
  // Restores the `ResizeObserver` stub of the numeric inputs test, even when it
  // fails. Registered first: after-each hooks run in reverse, so after `cleanup`.
  afterEach(() => {
    vi.unstubAllGlobals();
  });
  afterEach(cleanup);

  async function mounted(selector: string) {
    await vi.waitFor(() => expect(query(selector).hasAttribute('data-akar-unmounted')).toBe(false));
  }

  it('form controls', async () => {
    // Labelled directly: jsdom has no `innerText`, which the switch reads its
    // `<label for>` text with (the browser suite covers that path).
    const container = render(`
      <form>
        <akar-switch-root aria-label="Wi-Fi" name="wifi"><akar-switch-thumb></akar-switch-thumb></akar-switch-root>
        <akar-checkbox-root aria-label="Accept" default-value><akar-checkbox-indicator>✓</akar-checkbox-indicator></akar-checkbox-root>
        <akar-toggle aria-label="Bold">B</akar-toggle>
      </form>
    `);
    await mounted('akar-checkbox-indicator');
    await mounted('akar-toggle');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('tabs', async () => {
    const container = render(`
      <akar-tabs-root default-value="one">
        <akar-tabs-list aria-label="Settings">
          <akar-tabs-trigger value="one">One</akar-tabs-trigger>
          <akar-tabs-trigger value="two">Two</akar-tabs-trigger>
        </akar-tabs-list>
        <akar-tabs-content value="one">Panel one</akar-tabs-content>
        <akar-tabs-content value="two">Panel two</akar-tabs-content>
      </akar-tabs-root>
    `);
    await mounted('akar-tabs-content[value="one"]');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('accordion and collapsible', async () => {
    const container = render(`
      <akar-accordion-root type="single" default-value="a">
        <akar-accordion-item value="a">
          <akar-accordion-header><akar-accordion-trigger>First</akar-accordion-trigger></akar-accordion-header>
          <akar-accordion-content>First panel</akar-accordion-content>
        </akar-accordion-item>
      </akar-accordion-root>
      <akar-collapsible-root default-open>
        <akar-collapsible-trigger>Details</akar-collapsible-trigger>
        <akar-collapsible-content>Body</akar-collapsible-content>
      </akar-collapsible-root>
    `);
    await mounted('akar-accordion-content');
    await mounted('akar-collapsible-content');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('an open dialog', async () => {
    render(`
      <akar-dialog-root default-open>
        <akar-dialog-trigger>Edit profile</akar-dialog-trigger>
        <akar-dialog-portal>
          <akar-dialog-overlay></akar-dialog-overlay>
          <akar-dialog-content>
            <akar-dialog-title>Edit profile</akar-dialog-title>
            <akar-dialog-description>Make changes to your profile.</akar-dialog-description>
            <akar-dialog-close>Save</akar-dialog-close>
          </akar-dialog-content>
        </akar-dialog-portal>
      </akar-dialog-root>
    `);
    await mounted('akar-dialog-close');
    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('display parts', async () => {
    const container = render(`
      <akar-aspect-ratio ratio="2"><span>Media</span></akar-aspect-ratio>
      <akar-avatar-root><akar-avatar-fallback>CT</akar-avatar-fallback></akar-avatar-root>
      <akar-separator></akar-separator>
      <akar-progress-root model-value="40" aria-label="Upload"><akar-progress-indicator></akar-progress-indicator></akar-progress-root>
      <button><akar-visually-hidden>Save</akar-visually-hidden></button>
    `);
    await mounted('akar-avatar-fallback');
    await mounted('akar-progress-indicator');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('radio and toggle groups, and a toolbar', async () => {
    const container = render(`
      <form>
        <akar-radio-group-root aria-label="Density" name="density" default-value="a">
          <akar-radio-group-item value="a" aria-label="Default"><akar-radio-group-indicator></akar-radio-group-indicator></akar-radio-group-item>
          <akar-radio-group-item value="b" aria-label="Compact"><akar-radio-group-indicator></akar-radio-group-indicator></akar-radio-group-item>
        </akar-radio-group-root>
        <akar-toggle-group-root type="multiple" aria-label="Formatting" name="format">
          <akar-toggle-group-item value="bold" aria-label="Bold">B</akar-toggle-group-item>
          <akar-toggle-group-item value="italic" aria-label="Italic">I</akar-toggle-group-item>
        </akar-toggle-group-root>
      </form>
      <akar-toolbar-root aria-label="Editing">
        <akar-toolbar-toggle-group type="single" aria-label="Alignment">
          <akar-toolbar-toggle-item value="left">Left</akar-toolbar-toggle-item>
        </akar-toolbar-toggle-group>
        <akar-toolbar-separator></akar-toolbar-separator>
        <akar-toolbar-button>Share</akar-toolbar-button>
      </akar-toolbar-root>
    `);
    await mounted('akar-radio-group-indicator');
    await mounted('akar-toolbar-button');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('pagination and stepper', async () => {
    const container = render(`
      <akar-pagination-root total="30" items-per-page="10">
        <akar-pagination-list>
          <akar-pagination-prev>Previous</akar-pagination-prev>
          <akar-pagination-list-item value="1">1</akar-pagination-list-item>
          <akar-pagination-list-item value="2">2</akar-pagination-list-item>
          <akar-pagination-ellipsis>…</akar-pagination-ellipsis>
          <akar-pagination-next>Next</akar-pagination-next>
        </akar-pagination-list>
      </akar-pagination-root>
      <akar-stepper-root default-value="1">
        <akar-stepper-item step="1">
          <akar-stepper-trigger>
            <akar-stepper-indicator>1</akar-stepper-indicator>
            <akar-stepper-title>Address</akar-stepper-title>
          </akar-stepper-trigger>
          <akar-stepper-description>Where to ship</akar-stepper-description>
          <akar-stepper-separator></akar-stepper-separator>
        </akar-stepper-item>
        <akar-stepper-item step="2">
          <akar-stepper-trigger>
            <akar-stepper-indicator>2</akar-stepper-indicator>
            <akar-stepper-title>Payment</akar-stepper-title>
          </akar-stepper-trigger>
        </akar-stepper-item>
      </akar-stepper-root>
    `);
    await mounted('akar-pagination-next');
    await mounted('akar-stepper-separator');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('scroll area and splitter', async () => {
    const container = render(`
      <akar-scroll-area-root type="always" style="height: 100px">
        <akar-scroll-area-viewport><p>Content</p></akar-scroll-area-viewport>
        <akar-scroll-area-scrollbar><akar-scroll-area-thumb></akar-scroll-area-thumb></akar-scroll-area-scrollbar>
      </akar-scroll-area-root>
      <akar-splitter-group direction="horizontal">
        <akar-splitter-panel default-size="50">Left</akar-splitter-panel>
        <akar-splitter-resize-handle aria-label="Resize"></akar-splitter-resize-handle>
        <akar-splitter-panel default-size="50">Right</akar-splitter-panel>
      </akar-splitter-group>
    `);
    await mounted('akar-scroll-area-viewport');
    await mounted('akar-splitter-resize-handle');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('a form with a field, in a config provider', async () => {
    const container = render(`
      <akar-config-provider dir="rtl">
        <akar-form-root>
          <form novalidate>
            <akar-field-root name="terms" required>
              <akar-field-label>Accept the terms</akar-field-label>
              <akar-checkbox-root></akar-checkbox-root>
              <akar-field-description>Required to continue.</akar-field-description>
              <akar-field-error match>Accept the terms to continue.</akar-field-error>
            </akar-field-root>
          </form>
        </akar-form-root>
      </akar-config-provider>
    `);
    await mounted('akar-field-error');
    await vi.waitFor(() => expect(query('akar-checkbox-root').getAttribute('aria-labelledby')).toBe(query('akar-field-label').id));
    expect(await axe(container)).toHaveNoViolations();
  });

  it('an open popover', async () => {
    render(`
      <akar-popover-root default-open>
        <akar-popover-trigger>Settings</akar-popover-trigger>
        <akar-popover-portal>
          <akar-popover-content>
            <akar-popover-close aria-label="Close">×</akar-popover-close>
          </akar-popover-content>
        </akar-popover-portal>
      </akar-popover-root>
    `);
    await mounted('akar-popover-close');
    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('a calendar rendered from its slot props', async () => {
    const container = render(`
      <akar-calendar-root default-value="2026-10-14" locale="en-US">
        <akar-calendar-header>
          <akar-calendar-prev aria-label="Previous month">‹</akar-calendar-prev>
          <akar-calendar-heading></akar-calendar-heading>
          <akar-calendar-next aria-label="Next month">›</akar-calendar-next>
        </akar-calendar-header>
      </akar-calendar-root>
    `);
    const root = query<HTMLElement & { slotProps?: { grid: Array<{ value: unknown; rows: Array<Array<unknown>> }>; weekDays: Array<string> } }>('akar-calendar-root');
    await vi.waitFor(() => expect(root.slotProps).toBeDefined());
    const { grid, weekDays } = root.slotProps!;
    root.insertAdjacentHTML('beforeend', grid.map((month) => `
      <akar-calendar-grid value="${month.value}">
        <akar-calendar-grid-head><akar-calendar-grid-row>${weekDays.map((day) => `<akar-calendar-head-cell>${day}</akar-calendar-head-cell>`).join('')}</akar-calendar-grid-row></akar-calendar-grid-head>
        <akar-calendar-grid-body>${month.rows.map((row) => `<akar-calendar-grid-row>${row.map((date) => `<akar-calendar-cell value="${date}"><akar-calendar-cell-trigger value="${date}">${String(date).slice(8)}</akar-calendar-cell-trigger></akar-calendar-cell>`).join('')}</akar-calendar-grid-row>`).join('')}</akar-calendar-grid-body>
      </akar-calendar-grid>`).join(''));
    await vi.waitFor(() => expect(query('akar-calendar-cell-trigger[value="2026-10-14"]').hasAttribute('data-selected')).toBe(true));
    // The grid is a `role="application"` table, as in the Vue component. There
    // its rows are native `<tr>`s, whose implicit role axe does not check; an
    // element's row role is explicit, and axe wants a table or grid around it.
    expect(await axe(container, {
      rules: {
        'aria-required-parent': { enabled: false },
      },
    })).toHaveNoViolations();
  });

  it('a date field', async () => {
    const container = render('<akar-date-field-root default-value="2026-10-14" locale="en-US" aria-label="Birthday"></akar-date-field-root>');
    const root = query<HTMLElement & { slotProps?: { segments: Array<{ part: string; value: string }> } }>('akar-date-field-root');
    await vi.waitFor(() => expect(root.slotProps).toBeDefined());
    root.innerHTML = root.slotProps!.segments.map((segment) => `<akar-date-field-input part="${segment.part}">${segment.value}</akar-date-field-input>`).join('');
    await vi.waitFor(() => expect(query('[data-akar-date-field-segment="day"]').getAttribute('aria-valuenow')).toBe('14'));
    expect(await axe(container)).toHaveNoViolations();
  });

  it('numeric and color inputs', async () => {
    // jsdom has no `ResizeObserver`, which the slider measures its thumbs with.
    vi.stubGlobal('ResizeObserver', class {
      observe() {}
      unobserve() {}
      disconnect() {}
    });
    const container = render(`
      <form>
        <akar-number-field-root name="n" default-value="2">
          <akar-number-field-decrement aria-label="Less">−</akar-number-field-decrement>
          <akar-number-field-input><input aria-label="Quantity"></akar-number-field-input>
          <akar-number-field-increment aria-label="More">+</akar-number-field-increment>
        </akar-number-field-root>
        <akar-pin-input-root aria-label="Code">
          <akar-pin-input-input index="0"><input aria-label="Digit 1"></akar-pin-input-input>
          <akar-pin-input-input index="1"><input aria-label="Digit 2"></akar-pin-input-input>
        </akar-pin-input-root>
        <akar-slider-root default-value="50"><akar-slider-track><akar-slider-range></akar-slider-range></akar-slider-track><akar-slider-thumb aria-label="Volume"></akar-slider-thumb></akar-slider-root>
        <akar-rating-root default-value="2" aria-label="Score">
          <akar-rating-item item="1"><akar-rating-item-indicator step="1" aria-label="1 star">★</akar-rating-item-indicator></akar-rating-item>
          <akar-rating-item item="2"><akar-rating-item-indicator step="2" aria-label="2 stars">★</akar-rating-item-indicator></akar-rating-item>
        </akar-rating-root>
        <akar-color-field-root default-value="#ff0000"><akar-color-field-input><input aria-label="Color"></akar-color-field-input></akar-color-field-root>
        <akar-color-swatch color="#00ff00"></akar-color-swatch>
      </form>
    `);
    await vi.waitFor(() => expect(query('akar-slider-thumb').getAttribute('aria-valuenow')).toBe('50'));
    await vi.waitFor(() => expect(query('akar-color-field-input input').getAttribute('data-akar-owned')).not.toBeNull());
    await vi.waitFor(() => expect(query('akar-rating-item-indicator').getAttribute('role')).toBe('radio'));
    expect(await axe(container)).toHaveNoViolations();
  });

  it('an open alert dialog', async () => {
    render(`
      <akar-alert-dialog-root default-open>
        <akar-alert-dialog-trigger>Delete</akar-alert-dialog-trigger>
        <akar-alert-dialog-portal>
          <akar-alert-dialog-overlay></akar-alert-dialog-overlay>
          <akar-alert-dialog-content>
            <akar-alert-dialog-title>Delete the file?</akar-alert-dialog-title>
            <akar-alert-dialog-description>This cannot be undone.</akar-alert-dialog-description>
            <akar-alert-dialog-cancel>Cancel</akar-alert-dialog-cancel>
            <akar-alert-dialog-action>Delete</akar-alert-dialog-action>
          </akar-alert-dialog-content>
        </akar-alert-dialog-portal>
      </akar-alert-dialog-root>
    `);
    await mounted('akar-alert-dialog-action');
    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('an open dropdown menu', async () => {
    render(`
      <akar-dropdown-menu-root default-open>
        <akar-dropdown-menu-trigger>Options</akar-dropdown-menu-trigger>
        <akar-dropdown-menu-portal>
          <akar-dropdown-menu-content>
            <akar-dropdown-menu-label>Edit</akar-dropdown-menu-label>
            <akar-dropdown-menu-item>Undo</akar-dropdown-menu-item>
            <akar-dropdown-menu-separator></akar-dropdown-menu-separator>
            <akar-dropdown-menu-checkbox-item>Show hidden</akar-dropdown-menu-checkbox-item>
            <akar-dropdown-menu-radio-group model-value="a">
              <akar-dropdown-menu-radio-item value="a">A</akar-dropdown-menu-radio-item>
            </akar-dropdown-menu-radio-group>
          </akar-dropdown-menu-content>
        </akar-dropdown-menu-portal>
      </akar-dropdown-menu-root>
    `);
    await mounted('akar-dropdown-menu-radio-item');
    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('a menubar and a navigation menu', async () => {
    const container = render(`
      <akar-menubar-root>
        <akar-menubar-menu value="file">
          <akar-menubar-trigger>File</akar-menubar-trigger>
          <akar-menubar-portal>
            <akar-menubar-content><akar-menubar-item>New</akar-menubar-item></akar-menubar-content>
          </akar-menubar-portal>
        </akar-menubar-menu>
      </akar-menubar-root>
      <akar-navigation-menu-root>
        <akar-navigation-menu-list>
          <akar-navigation-menu-item value="learn">
            <akar-navigation-menu-trigger>Learn</akar-navigation-menu-trigger>
            <akar-navigation-menu-content><a href="#a">A</a></akar-navigation-menu-content>
          </akar-navigation-menu-item>
          <akar-navigation-menu-item>
            <akar-navigation-menu-link href="#github">GitHub</akar-navigation-menu-link>
          </akar-navigation-menu-item>
        </akar-navigation-menu-list>
      </akar-navigation-menu-root>
    `);
    await mounted('akar-menubar-trigger');
    await mounted('akar-navigation-menu-link');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('an open tooltip and hover card', async () => {
    render(`
      <akar-tooltip-provider>
        <akar-tooltip-root default-open>
          <akar-tooltip-trigger>Bold</akar-tooltip-trigger>
          <akar-tooltip-portal><akar-tooltip-content>Make text bold</akar-tooltip-content></akar-tooltip-portal>
        </akar-tooltip-root>
      </akar-tooltip-provider>
      <akar-hover-card-root default-open>
        <akar-hover-card-trigger tabindex="0">Profile</akar-hover-card-trigger>
        <akar-hover-card-portal><akar-hover-card-content>About me</akar-hover-card-content></akar-hover-card-portal>
      </akar-hover-card-root>
    `);
    await mounted('akar-tooltip-content');
    await mounted('akar-hover-card-content');
    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('a toast', async () => {
    render(`
      <akar-toast-provider>
        <akar-toast-root duration="100000">
          <akar-toast-title>Saved</akar-toast-title>
          <akar-toast-description>Your file was saved.</akar-toast-description>
          <akar-toast-close aria-label="Close">×</akar-toast-close>
        </akar-toast-root>
        <akar-toast-viewport></akar-toast-viewport>
      </akar-toast-provider>
    `);
    await mounted('akar-toast-close');
    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('listbox', async () => {
    const container = render(`
      <akar-listbox-root default-value="b">
        <akar-listbox-filter><input aria-label="Search"></akar-listbox-filter>
        <akar-listbox-content aria-label="Letters">
          <akar-listbox-group>
            <akar-listbox-group-label>Letters</akar-listbox-group-label>
            <akar-listbox-item value="a">A</akar-listbox-item>
            <akar-listbox-item value="b">B<akar-listbox-item-indicator>✓</akar-listbox-item-indicator></akar-listbox-item>
          </akar-listbox-group>
        </akar-listbox-content>
      </akar-listbox-root>
    `);
    await mounted('akar-listbox-item-indicator');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('an open combobox and autocomplete', async () => {
    render(`
      <akar-combobox-root default-open>
        <akar-combobox-anchor>
          <akar-combobox-input><input aria-label="Fruit"></akar-combobox-input>
          <akar-combobox-trigger aria-label="Show fruits">▾</akar-combobox-trigger>
        </akar-combobox-anchor>
        <akar-combobox-portal>
          <akar-combobox-content>
            <akar-combobox-viewport>
              <akar-combobox-group>
                <akar-combobox-label>Fruits</akar-combobox-label>
                <akar-combobox-item value="apple">Apple</akar-combobox-item>
              </akar-combobox-group>
            </akar-combobox-viewport>
          </akar-combobox-content>
        </akar-combobox-portal>
      </akar-combobox-root>
      <akar-autocomplete-root>
        <akar-autocomplete-input><input aria-label="City"></akar-autocomplete-input>
      </akar-autocomplete-root>
    `);
    await mounted('akar-combobox-item');
    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('an open select', async () => {
    render(`
      <akar-select-root default-open default-value="a">
        <akar-select-trigger aria-label="Letter"><akar-select-value placeholder="Pick"></akar-select-value></akar-select-trigger>
        <akar-select-portal>
          <akar-select-content position="popper">
            <akar-select-viewport>
              <akar-select-group>
                <akar-select-label>Letters</akar-select-label>
                <akar-select-item value="a"><akar-select-item-text>A</akar-select-item-text></akar-select-item>
              </akar-select-group>
            </akar-select-viewport>
          </akar-select-content>
        </akar-select-portal>
      </akar-select-root>
    `);
    await mounted('akar-select-item');
    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('tree', async () => {
    const container = render('');
    const root = document.createElement('akar-tree-root') as HTMLElement & { items: Array<unknown>; getKey: (item: { id: string }) => string };
    root.setAttribute('aria-label', 'Files');
    root.items = [
      { id: 'a' },
      { id: 'b' },
    ];
    root.getKey = (item) => item.id;
    for (const item of root.items) {
      const el = document.createElement('akar-tree-item') as HTMLElement & { value: unknown };
      el.value = item;
      el.setAttribute('level', '1');
      el.textContent = (item as { id: string }).id;
      root.append(el);
    }
    container.append(root);
    await mounted('akar-tree-item');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('tags input, tag group and editable', async () => {
    const container = render(`
      <akar-tags-input-root>
        <akar-tags-input-item value="vue"><akar-tags-input-item-text></akar-tags-input-item-text><akar-tags-input-item-delete aria-label="Remove">×</akar-tags-input-item-delete></akar-tags-input-item>
        <akar-tags-input-input><input aria-label="Tags"></akar-tags-input-input>
        <akar-tags-input-clear aria-label="Clear">×</akar-tags-input-clear>
      </akar-tags-input-root>
      <akar-tag-group-root aria-label="Frameworks" selection-mode="single">
        <akar-tag-group-item value="vue" text-value="Vue"><span role="gridcell"><akar-tag-group-item-text>Vue</akar-tag-group-item-text><akar-tag-group-item-delete>×</akar-tag-group-item-delete></span></akar-tag-group-item>
      </akar-tag-group-root>
      <akar-editable-root default-value="Title">
        <akar-editable-area>
          <akar-editable-preview></akar-editable-preview>
          <akar-editable-input><input aria-label="Title"></akar-editable-input>
        </akar-editable-area>
        <akar-editable-edit-trigger>Edit</akar-editable-edit-trigger>
      </akar-editable-root>
    `);
    await mounted('akar-tags-input-item-text');
    await mounted('akar-tag-group-item-text');
    await mounted('akar-editable-preview');
    expect(await axe(container)).toHaveNoViolations();
  });
});

const PACKAGE_DIR = join(dirname(fileURLToPath(import.meta.url)), '../..');
const ELEMENTS_DIST = join(PACKAGE_DIR, 'dist/elements.js');
// Like `subpaths.test.ts`: skipped locally without a build, required on CI.
const hasDist = existsSync(ELEMENTS_DIST) || !!process.env.CI;

describe.skipIf(!hasDist)('built `akar/elements` entry (dist)', () => {
  afterEach(cleanup);

  it('is the `./elements` export and exposes the source API', async () => {
    const pkg = JSON.parse(readFileSync(join(PACKAGE_DIR, 'package.json'), 'utf8'));
    expect(pkg.exports['./elements'].import).toBe('./dist/elements.js');
    expect(existsSync(join(PACKAGE_DIR, 'dist/elements.d.ts'))).toBe(true);
    // Types-only subpaths, augmenting global / React types on request.
    for (const name of ['global', 'react']) {
      const types = pkg.exports[`./elements/${name}`].types;
      expect(types).toBe(`./dist/elements/${name}.d.ts`);
      expect(readFileSync(join(PACKAGE_DIR, types), 'utf8')).toContain('from \'../elements.js\'');
    }

    const built = await import(/* @vite-ignore */ pathToFileURL(ELEMENTS_DIST).href);
    expect(Object.keys(built).sort()).toEqual(Object.keys(source).sort());

    built.defineAkarElements([built.collapsibleElements], { prefix: 'built' });
    // The source is another copy of the library: it recognises the built copy's
    // elements as Akar elements, through the global symbol registry.
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    defineAkarElements([source.collapsibleElements], { prefix: 'built' });
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    render(`
      <built-collapsible-root>
        <built-collapsible-trigger>Details</built-collapsible-trigger>
        <built-collapsible-content>Body</built-collapsible-content>
      </built-collapsible-root>
    `);
    const trigger = query('built-collapsible-trigger');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
    trigger.click();
    await vi.waitFor(() => expect(query('built-collapsible-content').getAttribute('data-state')).toBe('open'));
    // Importing the built entry loads every family's modules, slow under coverage.
  }, 30_000);

  it('loads only the supported families', () => {
    const seen = new Set<string>();
    const walk = (file: string) => {
      if (seen.has(file)) {
        return;
      }
      seen.add(file);
      for (const [, specifier] of readFileSync(file, 'utf8').matchAll(/(?:from|import)\s*"(\.[^"]+)"/g)) {
        walk(resolve(dirname(file), specifier));
      }
    };
    walk(ELEMENTS_DIST);
    const loaded = Array.from(seen, (file) => relative(join(PACKAGE_DIR, 'dist'), file).replaceAll('\\', '/'));
    expect(loaded).toContain('elements/host.js');
    expect(loaded.filter((file) => /^ColorPicker\//.test(file))).toEqual([]);
  });
});
