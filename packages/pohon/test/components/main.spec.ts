import type { PMainProps, PMainSlots } from '../../src/runtime/components/main.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PMain from '../../src/runtime/components/main.vue';
import ComponentRender from '../component-render';

describe('PMain', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'main' } }],
    ['with class', { props: { class: 'min-h-full' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PMainProps; slots?: Partial<PMainSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PMain);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PMain, {
      slots: {
        default: () => 'Default slot',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
