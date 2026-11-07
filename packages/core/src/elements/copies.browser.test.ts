// Two copies of `akar/elements` on one page: this source and the built dist.
// CI downloads the build job's dist; locally it is skipped without a build
// (`pnpm --filter akar build`).
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { akarElementFamilies, defineAkarElements } from '.';
import { cleanup, query, render, settle } from './elements.test.helpers';

type Elements = typeof import('.');
const dist = import.meta.glob<Elements>('../../dist/elements.js');
const loadCopy = Object.values(dist)[0];

describe.skipIf(!loadCopy)('two copies of the library', () => {
  const SW = 'style="display:inline-block;width:40px;height:20px"';

  beforeAll(async () => {
    defineAkarElements(akarElementFamilies);
    const copy = await loadCopy!();
    copy.defineAkarElements([copy.switchElements, copy.dialogElements], { prefix: 'cpb' });
  });
  afterEach(cleanup);

  it('a part of one copy inside a part of the other follows it', async () => {
    render(`
      <akar-collapsible-root default-open>
        <akar-collapsible-trigger>T</akar-collapsible-trigger>
        <akar-collapsible-content><cpb-switch-root aria-label="x" ${SW}></cpb-switch-root></akar-collapsible-content>
      </akar-collapsible-root>`);
    const el = query('cpb-switch-root');
    await vi.waitFor(() => expect(el.getAttribute('role')).toBe('switch'));
    await userEvent.click(query('akar-collapsible-trigger'));
    await vi.waitFor(() => expect(query('akar-collapsible-content').hasAttribute('data-akar-unmounted')).toBe(true));
    await settle();
    expect(el.hasAttribute('role')).toBe(false);
  });

  it('keeps ids unique across copies', async () => {
    render(`<akar-toggle aria-label="a">A</akar-toggle>
      <cpb-dialog-root default-open><cpb-dialog-portal><cpb-dialog-content><cpb-dialog-title>t</cpb-dialog-title></cpb-dialog-content></cpb-dialog-portal></cpb-dialog-root>
      <akar-dialog-root default-open><akar-dialog-portal><akar-dialog-content><akar-dialog-title>t</akar-dialog-title></akar-dialog-content></akar-dialog-portal></akar-dialog-root>`);
    await vi.waitFor(() => expect(document.querySelectorAll('[role=dialog]').length).toBe(2));
    const ids = Array.from(document.querySelectorAll('[id]'), (el) => el.id).filter((id) => id.includes('akarel'));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('a part needing the other copy\'s context stays unrendered and warns, without throwing', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    render('<akar-dialog-root><cpb-dialog-trigger>Open</cpb-dialog-trigger></akar-dialog-root>');
    await settle();
    await settle();
    expect(query('cpb-dialog-trigger').hasAttribute('data-akar-unmounted')).toBe(true);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('same copy'));
    expect(error).not.toHaveBeenCalled();
    warn.mockRestore();
    error.mockRestore();
  });
});
