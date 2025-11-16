import type { PDrawerProps, PDrawerSlots } from '../../src/runtime/components/drawer.vue';
import theme from '#build/pohon/drawer';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Drawer from '../../src/runtime/components/drawer.vue';
import ComponentRender from '../component-render';

describe('drawer', () => {
  const directions = Object.keys(theme.variants.direction) as any;

  const props = { open: true, portal: false };

  it.each([
    // Props
    ['with title', { props: { ...props, title: 'Title' } }],
    ['with description', { props: { ...props, title: 'Title', description: 'Description' } }],
    ...directions.map((direction: string) => [`with direction ${direction}`, { props: { ...props, direction, title: 'Title', description: 'Description' } }]),
    ...directions.map((direction: string) => [`with direction ${direction} inset`, { props: { ...props, direction, inset: true, title: 'Title', description: 'Description' } }]),
    ['without handle', { props: { ...props, handle: false, title: 'Title', description: 'Description' } }],
    ['without overlay', { props: { ...props, overlay: false, title: 'Title', description: 'Description' } }],
    ['with class', { props: { ...props, class: 'bg-elevated' } }],
    ['with ui', { props: { ...props, pohon: { handle: 'w-20' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with header slot', { props, slots: { header: () => 'Header slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with body slot', { props, slots: { body: () => 'Body slot' } }],
    ['with footer slot', { props, slots: { footer: () => 'Footer slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PDrawerProps; slots?: Partial<PDrawerSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Drawer);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Drawer, {
      props: {
        open: true,
        portal: false,
        title: 'Title',
        description: 'Description',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
