import type { PKbdProps, PKbdSlots } from '../../src/runtime/components/kbd.vue';
import theme from '#build/pohon/kbd';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PKbd from '../../src/runtime/components/kbd.vue';
import ComponentRender from '../component-render';

describe('PKbd', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const variants = Object.keys(theme.variants.variant) as any;

  it.each([
    // Props
    ['with value', { props: { value: 'K' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { value: 'K', size } }]),
    ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { value: 'K', variant } }]),
    ...variants.map((variant: string) => [`with neutral variant ${variant}`, { props: { value: 'K', variant, color: 'neutral' } }]),
    ['with as', { props: { value: 'K', as: 'span' } }],
    ['with class', { props: { value: 'K', class: 'font-bold' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PKbdProps; slots?: Partial<PKbdSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PKbd);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PKbd, {
      props: {
        value: 'K',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
