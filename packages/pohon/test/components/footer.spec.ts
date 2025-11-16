import type { PFooterProps, PFooterSlots } from '../../src/runtime/components/footer.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PFooter from '../../src/runtime/components/footer.vue';
import ComponentRender from '../component-render';

describe('pFooter', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'relative' } }],
    ['with ui', { props: { pohon: { container: 'lg:gap-x-1.5' } } }],
    // Slots
    ['with left slot', { slots: { left: () => 'Left slot' } }],
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with right slot', { slots: { right: () => 'Right slot' } }],
    ['with top slot', { slots: { top: () => 'Top slot' } }],
    ['with bottom slot', { slots: { bottom: () => 'Bottom slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PFooterProps; slots?: Partial<PFooterSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PFooter);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PFooter, {
      slots: {
        default: () => 'Default slot',
        left: () => 'Left slot',
        right: () => 'Right slot',
        top: () => 'Top slot',
        bottom: () => 'Bottom slot',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
