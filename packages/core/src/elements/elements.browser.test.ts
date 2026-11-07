import type { AkarElementEvent } from '.';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { defineComponent } from 'vue';
import {
  akarElementFamilies,
  collapsibleElements,
  defineAkarElements,
  defineSwitchElements,
  switchElements,
  toggleElements,
} from '.';
import { cleanup, query, render, settle } from './elements.test.helpers';

// Every test drives the elements from plain DOM APIs: there is no Vue app here.
afterEach(cleanup);

type SwitchElement = HTMLElement & { modelValue?: unknown; disabled?: boolean };

const SWITCH_STYLE = 'style="display: inline-block; width: 40px; height: 20px"';

describe('registration', () => {
  it('registers nothing on import', () => {
    expect(customElements.get('akar-switch-root')).toBeUndefined();
  });

  it('defines one tag per part, and is idempotent', () => {
    expect(defineSwitchElements()).toEqual(['akar-switch-root', 'akar-switch-thumb']);
    const constructor = customElements.get('akar-switch-root');
    expect(constructor).toBeDefined();

    expect(() => defineAkarElements([switchElements])).not.toThrow();
    expect(customElements.get('akar-switch-root')).toBe(constructor);
  });

  it('accepts a custom tag prefix', () => {
    expect(defineAkarElements([toggleElements], { prefix: 'acme' })).toEqual(['acme-toggle']);
    expect(customElements.get('acme-toggle')).toBeDefined();
  });

  it('rejects an invalid prefix', () => {
    expect(() => defineAkarElements([toggleElements], { prefix: 'Bad Prefix' })).toThrow(/invalid tag prefix/);
    // Custom element names allow no uppercase letters: rejected up front, not by `customElements.define`.
    expect(() => defineAkarElements([toggleElements], { prefix: 'acmeUI' })).toThrow(/invalid tag prefix/);
    expect(() => defineAkarElements([toggleElements], { prefix: 'acme_ui' })).not.toThrow();
  });

  it('logs a part\'s own setup error instead of treating it as a missing parent', async () => {
    const broken = defineComponent({
      name: 'BrokenRoot',
      setup() {
        throw new Error('broken setup');
      },
    });
    defineAkarElements([
      {
        name: 'broken',
        parts: { BrokenRoot: broken },
      },
    ], { prefix: 'err' });
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render('<err-broken-root></err-broken-root>');
    await settle();
    expect(error).toHaveBeenCalledWith(expect.objectContaining({ message: 'broken setup' }));
    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining('cannot render outside'));
    error.mockRestore();
    warn.mockRestore();
  });

  it('rebinds to ancestors defined later, so registration order does not matter', async () => {
    render(`
      <order-collapsible-root>
        <order-collapsible-trigger>Details</order-collapsible-trigger>
        <order-collapsible-content>
          <order-switch-root aria-label="Wi-Fi" ${SWITCH_STYLE}></order-switch-root>
        </order-collapsible-content>
      </order-collapsible-root>
    `);
    defineAkarElements([switchElements], { prefix: 'order' });
    const switchEl = query('order-switch-root');
    // Undefined ancestors are skipped, not waited for: the switch works on its own.
    await vi.waitFor(() => expect(switchEl.getAttribute('role')).toBe('switch'));
    await userEvent.click(switchEl);
    expect(switchEl.getAttribute('aria-checked')).toBe('true');

    // Defined later, the collapsible takes the switch in: closed content, so it unmounts…
    defineAkarElements([collapsibleElements], { prefix: 'order' });
    await vi.waitFor(() => expect(switchEl.hasAttribute('data-akar-unmounted')).toBe(true));
    // …and comes back, with its state, when the content opens.
    await userEvent.click(query('order-collapsible-trigger'));
    await vi.waitFor(() => expect(switchEl.getAttribute('aria-checked')).toBe('true'));
  });

  it('does not wait forever under an undefined element of a registered prefix', async () => {
    defineAkarElements([switchElements], { prefix: 'stray' });
    render(`<stray-unknown-part><stray-switch-root aria-label="Wi-Fi" ${SWITCH_STYLE}></stray-switch-root></stray-unknown-part>`);
    await vi.waitFor(() => expect(query('stray-switch-root').getAttribute('role')).toBe('switch'));
  });

  it('waits, without throwing, when a part is placed outside its root', async () => {
    defineAkarElements([collapsibleElements], { prefix: 'lone' });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render('<lone-collapsible-trigger>Details</lone-collapsible-trigger>');
    const trigger = query('lone-collapsible-trigger');
    await settle();
    expect(trigger.hasAttribute('data-akar-unmounted')).toBe(true);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('cannot render outside its family\'s root'));
    warn.mockRestore();

    // Moved under a root, it renders there.
    const root = document.createElement('lone-collapsible-root');
    trigger.before(root);
    root.append(trigger);
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
  });

  it('rebinds a part inside a shadow root below an ancestor defined later', async () => {
    const container = render('<lateb-collapsible-root><div class="host"></div><lateb-collapsible-content>c</lateb-collapsible-content></lateb-collapsible-root>');
    const shadowRoot = container.querySelector('.host')!.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<latea-collapsible-trigger>T</latea-collapsible-trigger>';
    const trigger = shadowRoot.querySelector('latea-collapsible-trigger')!;
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    defineAkarElements([collapsibleElements], { prefix: 'latea' });
    await settle();
    expect(trigger.hasAttribute('aria-expanded')).toBe(false);
    warn.mockRestore();
    defineAkarElements([collapsibleElements], { prefix: 'lateb' });
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
  });

  it('binds a nested trigger to the nearest root of its family', async () => {
    defineAkarElements([collapsibleElements], { prefix: 'nest' });
    render(`
      <nest-collapsible-root default-open>
        <nest-collapsible-trigger>O</nest-collapsible-trigger>
        <nest-collapsible-content class="outer">
          <nest-collapsible-root>
            <nest-collapsible-trigger id="inner-trigger">I</nest-collapsible-trigger>
            <nest-collapsible-content class="inner">inner</nest-collapsible-content>
          </nest-collapsible-root>
        </nest-collapsible-content>
      </nest-collapsible-root>`);
    const trigger = query('#inner-trigger');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
    await userEvent.click(trigger);
    await vi.waitFor(() => expect(query('.inner').getAttribute('data-state')).toBe('open'));
    expect(query('.outer').getAttribute('data-state')).toBe('open');
    expect(trigger.getAttribute('aria-controls')).toBe(query('.inner').id);
  });

  it('keeps properties set before the element was defined', async () => {
    const el = document.createElement('late-switch-root') as SwitchElement;
    el.setAttribute('aria-label', 'Wi-Fi');
    el.modelValue = true;
    render('').append(el);
    defineAkarElements([switchElements], { prefix: 'late' });
    await vi.waitFor(() => expect(el.getAttribute('aria-checked')).toBe('true'));
    expect(el.modelValue).toBe(true);
  });
});

describe('props', () => {
  beforeAll(() => {
    defineAkarElements(akarElementFamilies);
  });

  it('reads kebab-case attributes, and follows their changes', async () => {
    render(`<akar-switch-root aria-label="Wi-Fi" default-value disabled ${SWITCH_STYLE}></akar-switch-root>`);
    const el = query('akar-switch-root');
    await vi.waitFor(() => expect(el.getAttribute('aria-checked')).toBe('true'));
    expect(el.hasAttribute('data-disabled')).toBe(true);

    el.removeAttribute('disabled');
    await vi.waitFor(() => expect(el.hasAttribute('data-disabled')).toBe(false));

    // `"false"` is an explicit `false`: here it makes the switch controlled and off.
    el.setAttribute('model-value', 'false');
    await vi.waitFor(() => expect(el.getAttribute('aria-checked')).toBe('false'));
  });

  it('exposes props as properties, reflecting only `disabled` to its attribute', async () => {
    render(`<akar-switch-root aria-label="Wi-Fi" ${SWITCH_STYLE}></akar-switch-root>`);
    const el = query<SwitchElement>('akar-switch-root');
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));

    el.modelValue = true;
    await vi.waitFor(() => expect(el.getAttribute('aria-checked')).toBe('true'));
    expect(el.hasAttribute('model-value')).toBe(false);

    // A form-associated host is `:disabled` by its attribute: the property keeps it in step.
    el.disabled = true;
    await vi.waitFor(() => expect(el.hasAttribute('data-disabled')).toBe(true));
    expect(el.disabled).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);

    el.disabled = undefined;
    await vi.waitFor(() => expect(el.hasAttribute('data-disabled')).toBe(false));
    expect(el.hasAttribute('disabled')).toBe(false);
  });

  it('takes object and array values as properties only', async () => {
    render(`
      <akar-checkbox-group-root aria-label="Toppings" default-value="cheese">
        <akar-checkbox-root value="cheese" aria-label="Cheese"></akar-checkbox-root>
        <akar-checkbox-root value="ham" aria-label="Ham"></akar-checkbox-root>
      </akar-checkbox-group-root>
    `);
    const group = query<HTMLElement & { modelValue?: Array<string> }>('akar-checkbox-group-root');
    const [cheese, ham] = document.querySelectorAll('akar-checkbox-root');
    await vi.waitFor(() => expect(ham.getAttribute('aria-checked')).toBe('false'));
    // An array prop has no attribute: `default-value` is not read.
    expect(cheese.getAttribute('aria-checked')).toBe('false');
    expect((customElements.get('akar-checkbox-group-root') as unknown as { observedAttributes: Array<string> }).observedAttributes)
      .not
      .toContain('default-value');

    group.modelValue = ['ham'];
    await vi.waitFor(() => expect(ham.getAttribute('aria-checked')).toBe('true'));
    expect(cheese.getAttribute('aria-checked')).toBe('false');
  });
});

describe('events', () => {
  beforeAll(() => {
    defineAkarElements(akarElementFamilies);
  });

  it('dispatches `update-*` with `{ value, details }`, without bubbling', async () => {
    const container = render(`<akar-switch-root aria-label="Wi-Fi" ${SWITCH_STYLE}></akar-switch-root>`);
    const el = query('akar-switch-root');
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));
    const onUpdate = vi.fn();
    const onBubbled = vi.fn();
    el.addEventListener('update-model-value', onUpdate);
    container.addEventListener('update-model-value', onBubbled);

    await userEvent.click(el);
    expect(onUpdate).toHaveBeenCalledTimes(1);
    const event = onUpdate.mock.calls[0][0] as AkarElementEvent<boolean, { reason: string; event?: Event }>;
    expect(event).toBeInstanceOf(CustomEvent);
    expect(event.detail.value).toBe(true);
    expect(event.detail.details.reason).toBe('trigger-press');
    expect(event.detail.details.event).toBeInstanceOf(MouseEvent);
    expect(onBubbled).not.toHaveBeenCalled();
    expect(el.getAttribute('data-state')).toBe('checked');
  });

  it('cancels the change when `before-update-*` is prevented', async () => {
    render(`<akar-switch-root aria-label="Wi-Fi" ${SWITCH_STYLE}></akar-switch-root>`);
    const el = query('akar-switch-root');
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));
    const onUpdate = vi.fn();
    el.addEventListener('before-update-model-value', (event) => event.preventDefault());
    el.addEventListener('update-model-value', onUpdate);

    await userEvent.click(el);
    expect(onUpdate).not.toHaveBeenCalled();
    expect(el.getAttribute('aria-checked')).toBe('false');
  });

  it('stays controlled: the consumer applies the value from the event', async () => {
    render(`<akar-switch-root aria-label="Wi-Fi" model-value="false" ${SWITCH_STYLE}></akar-switch-root>`);
    const el = query<SwitchElement>('akar-switch-root');
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));
    const values: Array<unknown> = [];
    el.addEventListener('update-model-value', (event) => {
      values.push((event as AkarElementEvent).detail.value);
    });

    await userEvent.click(el);
    expect(values).toEqual([true]);
    // Nothing applied it yet.
    expect(el.getAttribute('aria-checked')).toBe('false');

    el.modelValue = true;
    await vi.waitFor(() => expect(el.getAttribute('aria-checked')).toBe('true'));
  });
});

describe('the host is the rendered part', () => {
  beforeAll(() => {
    defineAkarElements(akarElementFamilies);
  });

  it('keeps the consumer\'s attributes, classes and styles, and restores them when the part unmounts', async () => {
    render(`
      <akar-collapsible-root>
        <akar-collapsible-trigger class="trigger">Details</akar-collapsible-trigger>
        <akar-collapsible-content class="panel" style="color: rgb(255, 0, 0)" data-testid="panel">Body</akar-collapsible-content>
      </akar-collapsible-root>
    `);
    const trigger = query('akar-collapsible-trigger');
    const content = query('akar-collapsible-content');
    const consumerAttributes = ['class', 'data-testid', 'style'];
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
    expect(trigger.className).toBe('trigger');
    expect(trigger.getAttribute('data-state')).toBe('closed');
    // Not rendered while closed.
    expect(content.hasAttribute('data-akar-unmounted')).toBe(true);
    expect(getComputedStyle(content).display).toBe('none');

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    expect(content.className).toBe('panel');
    expect(content.style.color).toBe('rgb(255, 0, 0)');
    expect(content.style.getPropertyValue('--akar-collapsible-content-height')).not.toBe('');
    expect(trigger.getAttribute('aria-controls')).toBe(content.id);
    expect(getComputedStyle(content).display).not.toBe('none');

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    // Back to exactly what the consumer wrote, plus the unmounted state.
    expect(content.getAttributeNames().sort()).toEqual([
      ...consumerAttributes,
      'data-akar-unmounted',
      'hidden',
      'inert',
    ].sort());
    expect(content.getAttribute('style')).toBe('color: rgb(255, 0, 0);');
  });

  it('keeps a part-owned attribute while mounted, and gives back what the consumer wrote meanwhile', async () => {
    render(`
      <akar-collapsible-root default-open>
        <akar-collapsible-trigger>Details</akar-collapsible-trigger>
        <akar-collapsible-content id="mine" hidden>Body</akar-collapsible-content>
      </akar-collapsible-root>
    `);
    const trigger = query('akar-collapsible-trigger');
    const content = query('akar-collapsible-content');
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    // `id` is a prop of the content: the consumer's, referenced by the trigger.
    expect(trigger.getAttribute('aria-controls')).toBe('mine');
    content.setAttribute('data-state', 'tampered');
    // Removing it leaves the part to generate one.
    content.removeAttribute('id');
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    expect(trigger.getAttribute('aria-controls')).toBe(content.id);

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    // What the consumer wrote while the part owned the attributes is what they get back.
    expect(content.hasAttribute('id')).toBe(false);
    expect(content.getAttribute('data-state')).toBe('tampered');
    // They set `hidden` themselves: it is theirs, and stays.
    expect(content.getAttribute('data-akar-unmounted')).toBe('inert');
    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(false));
    expect(content.hasAttribute('hidden')).toBe(true);
  });

  it('hides an unrendered part even when the consumer sets `display`', async () => {
    render(`
      <akar-collapsible-root>
        <akar-collapsible-trigger>Details</akar-collapsible-trigger>
        <akar-collapsible-content style="display: flex">Body</akar-collapsible-content>
      </akar-collapsible-root>
    `);
    const trigger = query('akar-collapsible-trigger');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
    expect(getComputedStyle(query('akar-collapsible-content')).display).toBe('none');
  });

  it('takes part in forms and is labelled by `<label for>`', async () => {
    const container = render(`
      <form>
        <label for="wifi">Wi-Fi</label>
        <akar-switch-root id="wifi" name="wifi" ${SWITCH_STYLE}></akar-switch-root>
      </form>
    `);
    const el = query('akar-switch-root');
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));
    expect(el.getAttribute('aria-label')).toBe('Wi-Fi');
    const form = container.querySelector('form')!;
    expect(new FormData(form).get('wifi')).toBeNull();

    await userEvent.click(container.querySelector('label')!);
    await vi.waitFor(() => expect(el.getAttribute('aria-checked')).toBe('true'));
    expect(new FormData(form).get('wifi')).toBe('on');
  });
});

describe('shadowRoot option', () => {
  it('slots the children; context, state and events work the same', async () => {
    defineAkarElements([switchElements], { prefix: 'shadow', shadowRoot: true });
    render(`<shadow-switch-root aria-label="Wi-Fi" ${SWITCH_STYLE}><shadow-switch-thumb></shadow-switch-thumb></shadow-switch-root>`);
    const el = query('shadow-switch-root');
    const thumb = query('shadow-switch-thumb');
    await vi.waitFor(() => expect(thumb.getAttribute('data-state')).toBe('unchecked'));
    expect(el.shadowRoot?.querySelector('slot')).not.toBeNull();
    expect(thumb.assignedSlot).toBe(el.shadowRoot!.querySelector('slot'));

    await userEvent.click(el);
    expect(el.getAttribute('aria-checked')).toBe('true');
    expect(thumb.getAttribute('data-state')).toBe('checked');
  });
});

describe('lifecycle', () => {
  beforeAll(() => {
    defineAkarElements(akarElementFamilies);
  });

  it('tears down when removed, and mounts again when re-inserted', async () => {
    const container = render(`<akar-switch-root aria-label="Wi-Fi" default-value ${SWITCH_STYLE}></akar-switch-root>`);
    const el = query('akar-switch-root');
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));

    el.remove();
    await settle();
    // Everything the part added is gone.
    expect(el.getAttributeNames().sort()).toEqual(['aria-label', 'default-value', 'style']);

    container.append(el);
    await vi.waitFor(() => expect(el.getAttribute('aria-checked')).toBe('true'));
  });

  it('survives being moved within the document', async () => {
    const container = render(`<div id="a"><akar-switch-root aria-label="Wi-Fi" ${SWITCH_STYLE}></akar-switch-root></div><div id="b"></div>`);
    const el = query('akar-switch-root');
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));
    await userEvent.click(el);
    expect(el.getAttribute('aria-checked')).toBe('true');

    container.querySelector('#b')!.append(el);
    await settle();
    // Same app, same state.
    expect(el.getAttribute('aria-checked')).toBe('true');
  });
});
