import type { PSeparatorProps, PSeparatorSlots } from '../../src/runtime/components/separator.vue';
import theme from '#build/pohon/separator';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PSeparator from '../../src/runtime/components/separator.vue';
import ComponentRender from '../component-render';

describe('PSeparator', () => {
  const types = Object.keys(theme.variants.type) as any;
  const sizes = Object.keys(theme.variants.size) as any;

  it.each([
    // Props
    ['with label', { props: { label: '+1' } }],
    ['with icon', { props: { icon: 'i-lucide-image' } }],
    ['with avatar', { props: { avatar: { src: 'https://github.com/benjamincanac.png' } } }],
    ['with orientation vertical', { props: { orientation: 'vertical' as const } }],
    ['with decorative', { props: { decorative: true } }],
    ...types.map((type: string) => [`with type ${type}`, { props: { type } }]),
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with color primary', { props: { color: 'primary' } }],
    ['with as', { props: { as: 'span' } }],
    ['with class', { props: { class: 'flex-row-reverse' } }],
    ['with ui', { props: { pohon: { label: 'text-lg' } } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PSeparatorProps; slots?: Partial<PSeparatorSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PSeparator);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PSeparator, {
      props: {
        label: '+1',
        icon: 'i-lucide-image',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
