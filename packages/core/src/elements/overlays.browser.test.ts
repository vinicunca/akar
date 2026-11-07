import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { defineAkarElements, dialogElements, popoverElements } from '.';
import { cleanup, query, render, settle } from './elements.test.helpers';

beforeAll(() => {
  defineAkarElements([dialogElements, popoverElements]);
});
afterEach(cleanup);

const DIALOG = `
  <button id="outside">Outside</button>
  <akar-dialog-root>
    <akar-dialog-trigger>Edit profile</akar-dialog-trigger>
    <akar-dialog-portal>
      <akar-dialog-overlay style="position: fixed; inset: 0"></akar-dialog-overlay>
      <akar-dialog-content style="position: fixed; top: 100px; left: 100px; width: 240px; background: white">
        <akar-dialog-title>Edit profile</akar-dialog-title>
        <akar-dialog-description>Make changes to your profile.</akar-dialog-description>
        <input id="name" aria-label="Name">
        <akar-dialog-close>Save</akar-dialog-close>
      </akar-dialog-content>
    </akar-dialog-portal>
  </akar-dialog-root>
`;

async function openDialog() {
  render(DIALOG);
  const trigger = query('akar-dialog-trigger');
  await vi.waitFor(() => expect(trigger.getAttribute('aria-haspopup')).toBe('dialog'));
  await userEvent.click(trigger);
  await vi.waitFor(() => expect(document.activeElement).toBe(query('#name')));
  return {
    trigger,
    content: query('akar-dialog-content'),
  };
}

describe('dialog elements', () => {
  it('portals the content to the body, labels it and traps focus', async () => {
    const { content } = await openDialog();
    // The portal element itself moved to the body.
    expect(content.closest('akar-dialog-portal')!.parentElement).toBe(document.body);
    expect(content.getAttribute('role')).toBe('dialog');
    expect(document.getElementById(content.getAttribute('aria-labelledby')!)!.textContent).toBe('Edit profile');
    expect(document.getElementById(content.getAttribute('aria-describedby')!)!.textContent).toBe('Make changes to your profile.');

    await userEvent.keyboard('{Tab}');
    expect(document.activeElement).toBe(query('akar-dialog-close'));
    await userEvent.keyboard('{Tab}');
    expect(document.activeElement).toBe(query('#name'));
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    expect(document.activeElement).toBe(query('akar-dialog-close'));
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    const { trigger, content } = await openDialog();
    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    expect(document.activeElement).toBe(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('stays open when `escape-key-down` is prevented', async () => {
    const { content } = await openDialog();
    content.addEventListener('escape-key-down', (event) => event.preventDefault());
    await userEvent.keyboard('{Escape}');
    await settle();
    expect(content.getAttribute('data-state')).toBe('open');
  });

  it('closes from the close button and the overlay, and blocks the page behind', async () => {
    const { trigger, content } = await openDialog();
    await userEvent.click(query('akar-dialog-close'));
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    // Hit testing is real: the point over the outside button resolves to the
    // dialog's backdrop (the overlay, or the content's internal backdrop above it).
    const outside = query('#outside').getBoundingClientRect();
    const hit = document.elementFromPoint(outside.left + 2, outside.top + 2) as HTMLElement;
    expect(query('#outside').contains(hit)).toBe(false);
    expect(query('akar-dialog-portal').contains(hit)).toBe(true);
    await userEvent.click(hit, {
      position: { x: 5, y: 5 },
    });
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
  });

  it('cancels opening when `before-update-open` is prevented', async () => {
    render(DIALOG);
    const trigger = query('akar-dialog-trigger');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-haspopup')).toBe('dialog'));
    query('akar-dialog-root').addEventListener('before-update-open', (event) => event.preventDefault());
    await userEvent.click(trigger);
    await settle();
    expect(query('akar-dialog-content').hasAttribute('data-akar-unmounted')).toBe(true);
  });

  it('removes the portaled content from the body when the root is removed', async () => {
    await openDialog();
    await cleanup();
    expect(document.querySelector('akar-dialog-portal')).toBeNull();
    expect(document.querySelector('[data-akar-focus-guard]')).toBeNull();
    // The scroll lock is released on a timer.
    await vi.waitFor(() => expect(document.body.style.overflow).toBe(''));
  });
});

const POPOVER = `
  <button id="outside">Outside</button>
  <akar-popover-root>
    <akar-popover-trigger>Settings</akar-popover-trigger>
    <akar-popover-portal>
      <akar-popover-content side-offset="8" style="display: block; width: 160px; background: white">
        <input id="width" aria-label="Width">
        <akar-popover-close aria-label="Close">×</akar-popover-close>
      </akar-popover-content>
    </akar-popover-portal>
  </akar-popover-root>
`;

describe('popover elements', () => {
  it('positions the content below the trigger and focuses it', async () => {
    render(POPOVER);
    const trigger = query('akar-popover-trigger');
    const content = query('akar-popover-content');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.getAttribute('data-side')).toBe('bottom'));
    await vi.waitFor(() => expect(document.activeElement).toBe(query('#width')));
    await vi.waitFor(() => {
      const triggerRect = trigger.getBoundingClientRect();
      // Snapped to a whole device pixel: within half a pixel of the offset.
      expect(Math.abs(content.getBoundingClientRect().top - triggerRect.bottom - 8)).toBeLessThanOrEqual(0.5);
    });
    expect(trigger.getAttribute('aria-controls')).toBe(content.id);
  });

  it('closes on an outside click, and on Escape returning focus to the trigger', async () => {
    render(POPOVER);
    const trigger = query('akar-popover-trigger');
    const content = query('akar-popover-content');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    await userEvent.click(query('#outside'));
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(document.activeElement).toBe(query('#width')));
    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    expect(document.activeElement).toBe(trigger);
  });

  it('closes from the close button and toggles from the trigger', async () => {
    render(POPOVER);
    const trigger = query('akar-popover-trigger');
    const content = query('akar-popover-content');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    await userEvent.click(query('akar-popover-close'));
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
  });
});

const FORCED = `
  <akar-dialog-root>
    <akar-dialog-portal force-mount>
      <akar-dialog-content force-mount aria-describedby="">
        <akar-dialog-title>Title</akar-dialog-title>
      </akar-dialog-content>
    </akar-dialog-portal>
  </akar-dialog-root>`;

describe('force-mounted portals', () => {
  it('move to their target with the first render', () => {
    render(FORCED);
    // Elements mount when connected: no scheduler turn before the portal moves.
    expect(query('akar-dialog-portal').parentElement).toBe(document.body);
  });
});

describe('inside another shadow root', () => {
  function inShadowRoot(html: string, host = render('<div id="app"></div>').querySelector<HTMLElement>('#app')!) {
    const shadowRoot = host.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = html;
    const get = <E extends Element = HTMLElement>(selector: string) => shadowRoot.querySelector<E>(selector)!;
    const active = () => {
      let el = document.activeElement;
      while (el?.shadowRoot?.activeElement) {
        el = el.shadowRoot.activeElement;
      }
      return el;
    };
    return { shadowRoot, get, active };
  }

  it('keeps the dialog in the shadow root: labelled, focus trapped, Escape closes', async () => {
    const { shadowRoot, get, active } = inShadowRoot(DIALOG);
    const trigger = get('akar-dialog-trigger');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-haspopup')).toBe('dialog'));
    await userEvent.click(trigger);
    await vi.waitFor(() => expect(active()).toBe(get('#name')));

    const content = get('akar-dialog-content');
    expect(content.closest('akar-dialog-portal')!.parentNode).toBe(shadowRoot);
    expect(shadowRoot.getElementById(content.getAttribute('aria-labelledby')!)!.textContent).toBe('Edit profile');

    await userEvent.keyboard('{Tab}');
    expect(active()).toBe(get('akar-dialog-close'));
    await userEvent.keyboard('{Tab}');
    expect(active()).toBe(get('#name'));

    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
    expect(active()).toBe(trigger);
  });

  it('closes the popover on a click outside it, in the shadow root or the document', async () => {
    const page = render('<button id="page">Page</button>').querySelector('#page')!;
    const { get } = inShadowRoot(POPOVER);
    const trigger = get('akar-popover-trigger');
    const content = get('akar-popover-content');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    // A click inside the content keeps it open (deep target, not the retargeted host).
    await userEvent.click(get('#width'));
    await settle();
    expect(content.getAttribute('data-state')).toBe('open');
    await userEvent.click(get('#outside'));
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));

    await userEvent.click(trigger);
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    await userEvent.click(page);
    await vi.waitFor(() => expect(content.hasAttribute('data-akar-unmounted')).toBe(true));
  });

  it('renders a force-mounted portal into the shadow root, never via the body', () => {
    const { shadowRoot, get } = inShadowRoot(FORCED);
    expect(get('akar-dialog-portal').parentNode).toBe(shadowRoot);
    expect(document.body.querySelector(':scope > akar-dialog-portal')).toBeNull();
  });

  it('portals into the shadow root a dialog is moved into', async () => {
    const container = render(`<div id="app"></div><div id="staging">${DIALOG}</div>`);
    const shadowRoot = container.querySelector('#app')!.attachShadow({ mode: 'open' });
    const trigger = query('akar-dialog-trigger');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-haspopup')).toBe('dialog'));
    shadowRoot.append(query('akar-dialog-root'));
    await settle();
    await userEvent.click(trigger);
    const content = shadowRoot.querySelector('akar-dialog-content')!;
    await vi.waitFor(() => expect(content.getAttribute('data-state')).toBe('open'));
    expect(content.closest('akar-dialog-portal')!.parentNode).toBe(shadowRoot);
  });

  it('portals into the body a dialog moved out of a shadow root that is then removed', async () => {
    const container = render('<div id="app"></div><div id="dest"></div>');
    const { shadowRoot, get } = inShadowRoot(DIALOG, container.querySelector<HTMLElement>('#app')!);
    const trigger = get('akar-dialog-trigger');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-haspopup')).toBe('dialog'));
    container.querySelector('#dest')!.append(shadowRoot.querySelector('akar-dialog-root')!);
    shadowRoot.host.remove();
    await settle();
    await userEvent.click(trigger);
    await vi.waitFor(() => expect(document.querySelector('akar-dialog-content')?.getAttribute('data-state')).toBe('open'));
    expect(document.querySelector('akar-dialog-portal')!.parentNode).toBe(document.body);
  });
});
