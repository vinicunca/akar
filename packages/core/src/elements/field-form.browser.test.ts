import type { AkarElementEvent } from '.';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { checkboxElements, defineAkarElements, fieldElements, formElements, toggleElements } from '.';
import { cleanup, query, render, settle } from './elements.test.helpers';

beforeAll(() => {
  defineAkarElements([
    fieldElements,
    formElements,
    checkboxElements,
    toggleElements,
  ]);
  // Elements whose events bubble, for listeners on an ancestor.
  defineAkarElements([formElements], {
    prefix: 'bub',
    events: { bubbles: true },
  });
});
afterEach(cleanup);

const BOX = 'style="display: inline-block; width: 20px; height: 20px"';

// `<akar-form-root>` cannot be a `<form>`: it handles the `submit` and `reset`
// events of the native form inside it, which validates nothing itself.
const FORM = `
  <akar-form-root>
    <form novalidate>
      <akar-field-root name="terms" required>
        <akar-field-label>Accept the terms</akar-field-label>
        <akar-checkbox-root ${BOX}></akar-checkbox-root>
        <akar-field-description>Required to continue.</akar-field-description>
        <akar-field-error match="valueMissing">Accept the terms to continue.</akar-field-error>
      </akar-field-root>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  </akar-form-root>
`;

/** Records whether the native submission went ahead, and stops it (no navigation in tests). */
function nativeSubmissions() {
  const submitted: Array<boolean> = [];
  const listener = (event: Event) => {
    // The form root's own `submit` event, when the elements' events bubble.
    if (event instanceof CustomEvent) {
      return;
    }
    submitted.push(!event.defaultPrevented);
    event.preventDefault();
  };
  document.addEventListener('submit', listener);
  return {
    submitted,
    stop: () => document.removeEventListener('submit', listener),
  };
}

describe('field elements', () => {
  it('label and describe a Akar element control', async () => {
    render(FORM);
    const checkbox = query('akar-checkbox-root');
    const label = query('akar-field-label');
    const description = query('akar-field-description');
    await vi.waitFor(() => expect(checkbox.getAttribute('aria-labelledby')).toBe(label.id));
    expect(label.id).not.toBe('');
    expect(label.hasAttribute('for')).toBe(false);
    expect(checkbox.getAttribute('aria-describedby')).toBe(description.id);
    expect(checkbox.getAttribute('aria-required')).toBe('true');
    expect(query('akar-field-error').hasAttribute('data-akar-unmounted')).toBe(true);

    // Not a native label: a click focuses the control instead of toggling it.
    await userEvent.click(label);
    expect(document.activeElement).toBe(checkbox);
    expect(checkbox.getAttribute('aria-checked')).toBe('false');

    // The field's state, on every part.
    await userEvent.click(checkbox);
    await vi.waitFor(() => expect(query('akar-field-root').hasAttribute('data-dirty')).toBe(true));
    expect(query('akar-field-root').hasAttribute('data-filled')).toBe(true);
    expect(label.hasAttribute('data-dirty')).toBe(true);
  });

  it('validate on submit: the error shows, describes the control and blocks the submission', async () => {
    const { submitted, stop } = nativeSubmissions();
    try {
      render(FORM);
      const formRoot = query('akar-form-root');
      const field = query('akar-field-root');
      const checkbox = query('akar-checkbox-root');
      const error = query('akar-field-error');
      const description = query('akar-field-description');
      await vi.waitFor(() => expect(checkbox.getAttribute('aria-describedby')).toBe(description.id));
      const onSubmit = vi.fn();
      formRoot.addEventListener('submit', (event) => {
        if (event instanceof CustomEvent) {
          onSubmit((event as AkarElementEvent).detail.value);
        }
      });

      await userEvent.click(query('button[type="submit"]'));
      await vi.waitFor(() => expect(error.hasAttribute('data-akar-unmounted')).toBe(false));
      expect(submitted).toEqual([false]);
      expect(onSubmit).not.toHaveBeenCalled();
      expect(field.hasAttribute('data-invalid')).toBe(true);
      expect(checkbox.getAttribute('aria-invalid')).toBe('true');
      expect(checkbox.getAttribute('aria-describedby')).toBe(`${description.id} ${error.id}`);
      // The first invalid control gets focus.
      expect(document.activeElement).toBe(checkbox);

      // After a submit, the field validates on change.
      await userEvent.click(checkbox);
      await vi.waitFor(() => expect(error.hasAttribute('data-akar-unmounted')).toBe(true));
      expect(field.hasAttribute('data-valid')).toBe(true);
      await userEvent.click(query('button[type="submit"]'));
      expect(submitted).toEqual([false, true]);
      expect(onSubmit).toHaveBeenCalledWith(expect.any(SubmitEvent));
      // Once: the element's own \`submit\` event does not reach the part's listener again.
      expect(onSubmit).toHaveBeenCalledTimes(1);
    } finally {
      stop();
    }
  });

  it('reports `form-submit` with the values, which prevents the native submission', async () => {
    const { submitted, stop } = nativeSubmissions();
    try {
      render(FORM);
      const formRoot = query('akar-form-root');
      const checkbox = query('akar-checkbox-root');
      await vi.waitFor(() => expect(checkbox.getAttribute('role')).toBe('checkbox'));
      await userEvent.click(checkbox);
      const onFormSubmit = vi.fn();
      const listener = (event: Event) => onFormSubmit((event as AkarElementEvent).detail.value);
      formRoot.addEventListener('form-submit', listener);

      await userEvent.click(query('button[type="submit"]'));
      await vi.waitFor(() => expect(onFormSubmit).toHaveBeenCalledWith({ terms: true }));
      expect(submitted).toEqual([false]);

      // Without a listener, the form submits natively again.
      formRoot.removeEventListener('form-submit', listener);
      await userEvent.click(query('button[type="submit"]'));
      await vi.waitFor(() => expect(submitted).toEqual([false, true]));
      expect(onFormSubmit).toHaveBeenCalledTimes(1);
    } finally {
      stop();
    }
  });

  it('follow `form-submit` listeners through `once`, `signal` and `capture`', async () => {
    const { submitted, stop } = nativeSubmissions();
    try {
      render(FORM);
      const formRoot = query('akar-form-root');
      const checkbox = query('akar-checkbox-root');
      await vi.waitFor(() => expect(checkbox.getAttribute('role')).toBe('checkbox'));
      await userEvent.click(checkbox);
      const submit = async (expected: Array<boolean>) => {
        await userEvent.click(query('button[type="submit"]'));
        await vi.waitFor(() => expect(submitted).toEqual(expected));
      };
      const listener = vi.fn();

      // Gone when its signal aborts; never added with an aborted one.
      const controller = new AbortController();
      formRoot.addEventListener('form-submit', listener, { signal: controller.signal });
      controller.abort();
      formRoot.addEventListener('form-submit', listener, { signal: controller.signal });
      await submit([true]);

      // A `once` listener removed before it fires, then added again for good.
      formRoot.addEventListener('form-submit', listener, { once: true });
      formRoot.removeEventListener('form-submit', listener);
      formRoot.addEventListener('form-submit', listener);
      await submit([true, false]);
      await submit([true, false, false]);
      formRoot.removeEventListener('form-submit', listener);

      // A `once` listener that adds itself again stays listened to.
      const again = vi.fn(() => formRoot.addEventListener('form-submit', again, { once: true }));
      formRoot.addEventListener('form-submit', again, { once: true });
      await submit([true, false, false, false]);
      await submit([true, false, false, false, false]);
      formRoot.removeEventListener('form-submit', again);

      // The same function as a capture and a bubble listener: two listeners.
      formRoot.addEventListener('form-submit', listener, true);
      formRoot.addEventListener('form-submit', listener);
      formRoot.removeEventListener('form-submit', listener);
      await submit([
        true,
        false,
        false,
        false,
        false,
        false,
      ]);
      formRoot.removeEventListener('form-submit', listener, { capture: true });
      await submit([
        true,
        false,
        false,
        false,
        false,
        false,
        true,
      ]);
      expect(again).toHaveBeenCalledTimes(2);
    } finally {
      stop();
    }
  });

  it('accept listener options the way the DOM reads them', async () => {
    render(`<akar-toggle>B</akar-toggle>${FORM}`);
    const formRoot = query('akar-form-root');
    // `null` options, on any event type and element.
    expect(() => query('akar-toggle').addEventListener('click', () => {}, null as never)).not.toThrow();
    const noop = () => {};
    expect(() => formRoot.addEventListener('form-submit', noop, null as never)).not.toThrow();
    expect(() => formRoot.removeEventListener('form-submit', noop, null as never)).not.toThrow();

    // A function as options (Lit passes the listener) is a dictionary: capture false.
    const { submitted, stop } = nativeSubmissions();
    try {
      const checkbox = query('akar-checkbox-root');
      await vi.waitFor(() => expect(checkbox.getAttribute('role')).toBe('checkbox'));
      await userEvent.click(checkbox);
      const listener = {
        handleEvent: vi.fn(),
      };
      formRoot.addEventListener('form-submit', listener, (() => {}) as never);
      formRoot.removeEventListener('form-submit', listener, false);
      await userEvent.click(query('button[type="submit"]'));
      await vi.waitFor(() => expect(submitted).toEqual([true]));
    } finally {
      stop();
    }
  });

  it('see a `form-submit` listener added or removed right before the submit', async () => {
    const { submitted, stop } = nativeSubmissions();
    try {
      render('<akar-form-root><form novalidate><button>Go</button></form></akar-form-root>');
      const formRoot = query('akar-form-root');
      await vi.waitFor(() => expect(formRoot.hasAttribute('data-akar-unmounted')).toBe(false));
      const form = query<HTMLFormElement>('form');
      const listener = vi.fn();
      formRoot.addEventListener('form-submit', listener);
      form.requestSubmit();
      expect(listener).toHaveBeenCalledTimes(1);
      expect(submitted).toEqual([false]);
      formRoot.removeEventListener('form-submit', listener);
      form.requestSubmit();
      expect(submitted).toEqual([false, true]);
      await settle();
    } finally {
      stop();
    }
  });

  it('with bubbling events, count a `form-submit` listener on an ancestor', async () => {
    const { submitted, stop } = nativeSubmissions();
    const values: Array<unknown> = [];
    const onFormSubmit = (event: Event) => values.push((event as AkarElementEvent).detail.value);
    document.addEventListener('form-submit', onFormSubmit);
    try {
      render('<bub-form-root><form novalidate><button>Go</button></form></bub-form-root>');
      await vi.waitFor(() => expect(query('bub-form-root').hasAttribute('data-akar-unmounted')).toBe(false));
      await userEvent.click(query('button'));
      expect(values).toEqual([{}]);
      expect(submitted).toEqual([false]);
    } finally {
      stop();
      document.removeEventListener('form-submit', onFormSubmit);
    }
  });

  it('show server errors from the `errors` property', async () => {
    render(FORM.replace('<akar-field-error match="valueMissing">Accept the terms to continue.</akar-field-error>', '<akar-field-error>Not accepted.</akar-field-error>'));
    const formRoot = query<HTMLElement & { errors?: Record<string, string> }>('akar-form-root');
    const error = query('akar-field-error');
    const checkbox = query('akar-checkbox-root');
    await vi.waitFor(() => expect(checkbox.getAttribute('role')).toBe('checkbox'));
    expect(error.hasAttribute('data-akar-unmounted')).toBe(true);

    formRoot.errors = { terms: 'Not accepted.' };
    await vi.waitFor(() => expect(error.hasAttribute('data-akar-unmounted')).toBe(false));
    expect(query('akar-field-root').hasAttribute('data-invalid')).toBe(true);
    // Editing the field dismisses it.
    await userEvent.click(checkbox);
    await vi.waitFor(() => expect(error.hasAttribute('data-akar-unmounted')).toBe(true));
  });

  it('reset with their form', async () => {
    const { stop } = nativeSubmissions();
    try {
      render(FORM);
      const field = query('akar-field-root');
      const checkbox = query('akar-checkbox-root');
      const error = query('akar-field-error');
      await vi.waitFor(() => expect(checkbox.getAttribute('role')).toBe('checkbox'));
      await userEvent.click(query('button[type="submit"]'));
      await vi.waitFor(() => expect(error.hasAttribute('data-akar-unmounted')).toBe(false));
      await userEvent.click(checkbox);
      await vi.waitFor(() => expect(field.hasAttribute('data-dirty')).toBe(true));

      await userEvent.click(query('button[type="reset"]'));
      await vi.waitFor(() => expect(checkbox.getAttribute('aria-checked')).toBe('false'));
      await vi.waitFor(() => expect(field.hasAttribute('data-dirty')).toBe(false));
      expect(field.hasAttribute('data-touched')).toBe(false);
      expect(field.hasAttribute('data-invalid')).toBe(false);
      expect(error.hasAttribute('data-akar-unmounted')).toBe(true);
    } finally {
      stop();
    }
  });

  it('disable their control, also from a disabled fieldset', async () => {
    render(`<form><fieldset disabled>${FORM.replace(/<\/?akar-form-root>|<\/?form[^>]*>/g, '')}</fieldset></form>`);
    const field = query('akar-field-root');
    const checkbox = query('akar-checkbox-root');
    await vi.waitFor(() => expect(field.hasAttribute('data-disabled')).toBe(true));
    await vi.waitFor(() => expect(checkbox.hasAttribute('data-disabled')).toBe(true));
    await userEvent.click(checkbox, { force: true });
    expect(checkbox.getAttribute('aria-checked')).toBe('false');
  });
});
