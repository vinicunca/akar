import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import theme from '#build/pohon/user';
import PUser from '../../src/runtime/components/User.vue';
import { renderEach } from '../component-render';

describe('User', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const orientations = Object.keys(theme.variants.orientation) as any;

  const props = {
    name: 'Benjamin Canac',
    description: 'Software Engineer',
    avatar: { src: 'https://github.com/benjamincanac.png', alt: 'User avatar' },
  };

  renderEach(PUser, [
    // Props
    ['with name', { props: { name: props.name } }],
    ['with description', { props: { name: props.name, description: props.description } }],
    ['with to', { props: { ...props, to: 'https://github.com/benjamincanac' } }],
    ['with avatar', { props }],
    ['with chip', { props: { ...props, chip: { color: 'success' } } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ...orientations.map((orientation: string) => [`with orientation ${orientation}`, { props: { ...props, orientation } }]),
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'absolute' } }],
    ['with pohon', { props: { ...props, pohon: { name: 'font-bold' } } }],
    // Slots
    ['with avatar slot', { props, slots: { avatar: () => 'Avatar slot' } }],
    ['with name slot', { props, slots: { name: () => 'Name slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PUser, {
      props: {
        ...props,
        to: 'https://github.com/benjamincanac',
        chip: { color: 'info' },
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
