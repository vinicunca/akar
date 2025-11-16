import type { PAvatarProps, PAvatarSlots } from '../../src/runtime/components/avatar.vue';
import theme from '#build/pohon/avatar';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Avatar from '../../src/runtime/components/avatar.vue';
import ComponentRender from '../component-render';

describe('avatar', () => {
  const sizes = Object.keys(theme.variants.size) as any;

  it.each([
    // Props
    ['with src', { props: { src: 'https://github.com/benjamincanac.png' } }],
    ['with alt', { props: { alt: 'Benjamin Canac' } }],
    ['with text', { props: { text: '+1' } }],
    ['with icon', { props: { icon: 'i-lucide-image' } }],
    ['with chip', { props: { chip: { text: '1' } } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { src: 'https://github.com/benjamincanac.png', size } }]),
    ['with as', { props: { as: 'section' } }],
    ['with as (object)', { props: { src: 'https://github.com/benjamincanac.png', as: { root: 'section', img: 'p' } } }],
    ['with as (partial object)', { props: { src: 'https://github.com/benjamincanac.png', as: { img: 'p' } } }],
    ['with class', { props: { class: 'bg-default' } }],
    ['with ui', { props: { pohon: { fallback: 'font-bold' } } }],
    // Slots
    ['with default slot', { slots: { default: '🇫🇷' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PAvatarProps; slots?: PAvatarSlots }) => {
    const html = await ComponentRender(nameOrHtml, options, Avatar);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: {
        alt: 'Benjamin Canac',
        src: 'https://github.com/benjamincanac.png',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
