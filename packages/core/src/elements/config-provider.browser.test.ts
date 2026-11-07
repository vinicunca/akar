import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import {
  configProviderElements,
  defineAkarElements,
  dialogElements,
  scrollAreaElements,
  toggleGroupElements,
} from '.';
import { cleanup, query, render } from './elements.test.helpers';

beforeAll(() => {
  // `configProviderElements` is defined by the "defined later" test below.
  defineAkarElements([toggleGroupElements, dialogElements, scrollAreaElements]);
});
afterEach(cleanup);

const TOGGLES = `
  <akar-toggle-group-root type="single" aria-label="Alignment">
    <akar-toggle-group-item value="left">Left</akar-toggle-group-item>
    <akar-toggle-group-item value="center">Center</akar-toggle-group-item>
    <akar-toggle-group-item value="right">Right</akar-toggle-group-item>
  </akar-toggle-group-root>
`;

/** An element with an open shadow root holding `html`. */
function shadowHost(container: HTMLElement, html: string) {
  const host = document.createElement('div');
  host.attachShadow({ mode: 'open' }).innerHTML = html;
  container.append(host);
  return host.shadowRoot!;
}

describe('config provider element', () => {
  it('reaches elements that were defined before it, through the light DOM in between', async () => {
    render(`<akar-config-provider dir="rtl"><section>${TOGGLES}</section></akar-config-provider>`);
    const root = query('akar-toggle-group-root');
    await vi.waitFor(() => expect(root.getAttribute('dir')).toBe('ltr'));

    // Defined now: the elements below move under it.
    defineAkarElements([configProviderElements]);
    await vi.waitFor(() => expect(root.getAttribute('dir')).toBe('rtl'));
    const [left, center] = document.querySelectorAll<HTMLElement>('akar-toggle-group-item');
    left.focus();
    // Right to left: ArrowLeft moves forward.
    await userEvent.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(center);
  });

  it('updates the elements below when its attributes change', async () => {
    defineAkarElements([configProviderElements]);
    render(`<akar-config-provider>${TOGGLES}</akar-config-provider>`);
    const provider = query('akar-config-provider');
    const root = query('akar-toggle-group-root');
    await vi.waitFor(() => expect(root.getAttribute('dir')).toBe('ltr'));
    // `dir` stays the native attribute and property.
    provider.dir = 'rtl';
    await vi.waitFor(() => expect(root.getAttribute('dir')).toBe('rtl'));
    // A part's own `dir` wins.
    root.setAttribute('dir', 'ltr');
    await vi.waitFor(() => expect(root.getAttribute('dir')).toBe('ltr'));
    provider.removeAttribute('dir');
    expect(provider.hasAttribute('data-akar-unmounted')).toBe(false);
  });

  it('sets the default portal target and the `nonce` of the parts below', async () => {
    defineAkarElements([configProviderElements]);
    render(`
      <div id="layer"></div>
      <akar-config-provider teleport-to="#layer" nonce="test-nonce">
        <akar-dialog-root default-open>
          <akar-dialog-portal>
            <akar-dialog-content aria-describedby="">
              <akar-dialog-title>Title</akar-dialog-title>
            </akar-dialog-content>
          </akar-dialog-portal>
        </akar-dialog-root>
        <akar-dialog-root default-open>
          <akar-dialog-portal to="body">
            <akar-dialog-content aria-describedby="" id="own">
              <akar-dialog-title>Own target</akar-dialog-title>
            </akar-dialog-content>
          </akar-dialog-portal>
        </akar-dialog-root>
        <akar-scroll-area-root><akar-scroll-area-viewport>Content</akar-scroll-area-viewport></akar-scroll-area-root>
      </akar-config-provider>
    `);
    const layer = query('#layer');
    await vi.waitFor(() => expect(layer.querySelector('akar-dialog-portal')).not.toBeNull());
    expect(layer.querySelector('akar-dialog-content')!.getAttribute('role')).toBe('dialog');
    // A portal's own `to` wins.
    expect(query('#own').closest('akar-dialog-portal')!.parentElement).toBe(document.body);
    const style = () => [
      ...document.head.querySelectorAll('style'),
    ].find((style) => style.textContent!.includes('[data-akar-scroll-area-viewport]'));
    await vi.waitFor(() => expect(style()).toBeDefined());
    expect(style()!.nonce).toBe('test-nonce');
  });

  describe('in shadow roots', () => {
    it('provides to elements inside a shadow root below it', async () => {
      defineAkarElements([configProviderElements]);
      const container = render('<akar-config-provider dir="rtl"></akar-config-provider>');
      const shadow = shadowHost(container.querySelector('akar-config-provider')!, TOGGLES);
      const root = shadow.querySelector<HTMLElement>('akar-toggle-group-root')!;
      await vi.waitFor(() => expect(root.getAttribute('dir')).toBe('rtl'));
      const [left, center] = shadow.querySelectorAll<HTMLElement>('akar-toggle-group-item');
      left.focus();
      await userEvent.keyboard('{ArrowLeft}');
      expect(shadow.activeElement).toBe(center);
    });

    it('works inside a shadow root, where `teleport-to` is looked up first', async () => {
      defineAkarElements([configProviderElements]);
      const container = render('');
      const shadow = shadowHost(container, `
        <div id="layer"></div>
        <akar-config-provider dir="rtl" teleport-to="#layer">
          ${TOGGLES}
          <akar-dialog-root default-open>
            <akar-dialog-portal>
              <akar-dialog-content aria-describedby="">
                <akar-dialog-title>Title</akar-dialog-title>
              </akar-dialog-content>
            </akar-dialog-portal>
          </akar-dialog-root>
        </akar-config-provider>
      `);
      // A `#layer` in the document too: the shadow root's own wins.
      render('<div id="layer"></div>');
      const root = shadow.querySelector<HTMLElement>('akar-toggle-group-root')!;
      await vi.waitFor(() => expect(root.getAttribute('dir')).toBe('rtl'));
      const layer = shadow.querySelector('#layer')!;
      await vi.waitFor(() => expect(layer.querySelector('akar-dialog-content')).not.toBeNull());
      expect(document.querySelector('#layer')!.children).toHaveLength(0);
    });
  });
});
