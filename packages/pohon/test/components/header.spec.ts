import type { PHeaderProps, PHeaderSlots } from '../../src/runtime/components/header.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PHeader from '../../src/runtime/components/header.vue';
import ComponentRender from '../component-render';

describe('PHeader', () => {
  it.each([
    // Props
    ['with title', { props: { title: 'Documentation' } }],
    ['with to', { props: { to: '/docs' } }],
    ['with mode modal', { props: { open: true, mode: 'modal' as const, menu: { portal: false } } }],
    ['with mode slideover', { props: { open: true, mode: 'slideover' as const, menu: { portal: false } } }],
    ['with mode drawer', { props: { open: true, mode: 'drawer' as const, menu: { portal: false } } }],
    ['without toggle', { props: { toggle: false } }],
    ['with toggle', { props: { toggle: { color: 'primary' as const, variant: 'solid' as const } } }],
    ['with toggleSide', { props: { toggleSide: 'left' as const } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'border-b-0' } }],
    ['with ui', { props: { pohon: { container: 'gap-1.5' } } }],
    // Slots
    ['with title slot', { slots: { title: () => 'Title slot' } }],
    ['with left slot', { slots: { left: () => 'Left slot' } }],
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with right slot', { slots: { right: () => 'Right slot' } }],
    ['with toggle slot', { slots: { toggle: () => 'Toggle slot' } }],
    ['with top slot', { slots: { top: () => 'Top slot' } }],
    ['with bottom slot', { slots: { bottom: () => 'Bottom slot' } }],
    ['with body slot', { slots: { body: () => 'Body slot' } }],
    ['with content slot', { slots: { content: () => 'Content slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PHeaderProps; slots?: Partial<PHeaderSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PHeader);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PHeader, {
      props: {
        title: 'Documentation',
        to: '/docs',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
