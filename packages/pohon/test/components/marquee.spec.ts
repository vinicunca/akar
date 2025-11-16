import type { PMarqueeProps, PMarqueeSlots } from '../../src/runtime/components/marquee.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PMarquee from '../../src/runtime/components/marquee.vue';
import ComponentRender from '../component-render';

describe('PMarquee', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'text-xl' } }],
    ['with pauseOnHover', { props: { pauseOnHover: true } }],
    ['with reverse', { props: { reverse: true } }],
    ['with orientation', { props: { orientation: 'vertical' as const } }],
    ['with repeat', { props: { repeat: 6 } }],
    ['with overlay off', { props: { overlay: false } }],
    ['with ui', { props: { pohon: { content: 'gap-4' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PMarqueeProps; slots?: Partial<PMarqueeSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PMarquee);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PMarquee, {
      slots: {
        default: () => 'Default slot',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
