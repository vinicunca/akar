import type { PSlideoverProps, PSlideoverSlots } from '../../src/runtime/components/slideover.vue';
import theme from '#build/pohon/slideover';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PSlideover from '../../src/runtime/components/slideover.vue';
import ComponentRender from '../component-render';

describe('pSlideover', () => {
  const sides = Object.keys(theme.variants.side) as any;

  const props = { open: true, portal: false };

  it.each([
    // Props
    ['with open', { props }],
    ['with title', { props: { ...props, title: 'Title' } }],
    ['with description', { props: { ...props, title: 'Title', description: 'Description' } }],
    ...sides.map((side: string) => [`with ${side} side`, { props: { ...props, side, title: 'Title', description: 'Description' } }]),
    ...sides.map((side: string) => [`with ${side} side inset`, { props: { ...props, side, inset: true, title: 'Title', description: 'Description' } }]),
    ['without overlay', { props: { ...props, overlay: false, title: 'Title', description: 'Description' } }],
    ['without transition', { props: { ...props, transition: false, title: 'Title', description: 'Description' } }],
    ['without close', { props: { ...props, close: false, title: 'Title', description: 'Description' } }],
    ['with closeIcon', { props: { ...props, closeIcon: 'i-lucide-trash' } }],
    ['with class', { props: { ...props, class: 'bg-elevated' } }],
    ['with ui', { props: { ...props, pohon: { close: 'end-2' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with header slot', { props, slots: { header: () => 'Header slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with actions slot', { props, slots: { actions: () => 'Actions slot' } }],
    ['with close slot', { props, slots: { close: () => 'Close slot' } }],
    ['with body slot', { props, slots: { body: () => 'Body slot' } }],
    ['with footer slot', { props, slots: { footer: () => 'Footer slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PSlideoverProps; slots?: Partial<PSlideoverSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PSlideover);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PSlideover, {
      props: {
        ...props,
        title: 'Title',
        description: 'Description',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
