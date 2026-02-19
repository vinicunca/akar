import type { PCollapsibleProps, PCollapsibleSlots } from '../../src/runtime/components/collapsible.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Collapsible from '../../src/runtime/components/collapsible.vue';
import ComponentRender from '../component-render';

describe('Collapsible', () => {
  const props = { open: true };

  it.each([
    // Props
    ['with open', { props }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with unmountOnHide', { props: { ...props, unmountOnHide: false } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with class', { props: { ...props, class: 'flex flex-col gap-2 w-48' } }],
    ['with ui', { props: { ...props, pohon: { content: 'bg-elevated' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PCollapsibleProps; slots?: Partial<PCollapsibleSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Collapsible);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Collapsible, {
      props: {
        open: true,
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
