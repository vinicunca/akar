import type { CardProps, CardSlots } from '../../src/runtime/components/Card.vue';
import theme from '#build/pohon/card';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Card from '../../src/runtime/components/Card.vue';
import ComponentRender from '../component-render';

describe('Card', () => {
  const variants = Object.keys(theme.variants.variant) as any;

  it.each([
    // Props
    ['with as', { props: { as: 'section' } }],
    ...variants.map((variant: string) => [`with variant ${variant}`, { props: { variant } }]),
    ['with class', { props: { class: 'rounded-xl' } }],
    ['with ui', { props: { pohon: { body: 'font-bold' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with header slot', { slots: { header: () => 'Header slot' } }],
    ['with footer slot', { slots: { footer: () => 'Footer slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: CardProps; slots?: Partial<CardSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Card);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Card);

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
