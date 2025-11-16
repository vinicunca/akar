import type { PAlertProps, PAlertSlots } from '../../src/runtime/components/alert.vue';
import theme from '#build/pohon/alert';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Alert from '../../src/runtime/components/alert.vue';
import ComponentRender from '../component-render';

describe('alert', () => {
  const variants = Object.keys(theme.variants.variant) as any;

  const props = { title: 'Alert' };

  it.each([
    // Props
    ['with title', { props }],
    ['with description', { props: { ...props, description: 'Description' } }],
    ['with icon', { props: { ...props, icon: 'i-lucide-lightbulb' } }],
    ['with avatar', { props: { ...props, avatar: { src: 'https://github.com/benjamincanac.png' } } }],
    ['with actions', { props: { ...props, actions: [{ label: 'Action' }] } }],
    ['with orientation vertical', { props: { ...props, icon: 'i-lucide-lightbulb', description: 'This is a description', actions: [{ label: 'Action' }], orientation: 'vertical' as const } }],
    ['with orientation horizontal', { props: { ...props, icon: 'i-lucide-lightbulb', description: 'This is a description', actions: [{ label: 'Action' }], orientation: 'horizontal' as const } }],
    ['with close', { props: { ...props, close: true } }],
    ['with closeIcon', { props: { ...props, close: true, closeIcon: 'i-lucide-trash' } }],
    ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { ...props, variant } }]),
    ...variants.map((variant: string) => [`with neutral variant ${variant}`, { props: { ...props, variant, color: 'neutral' } }]),
    ['with as', { props: { ...props, as: 'article' } }],
    ['with class', { props: { ...props, class: 'w-48' } }],
    ['with ui', { props: { ...props, pohon: { title: 'font-bold' } } }],
    // Slots
    ['with leading slot', { props, slots: { title: () => 'Leading slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with close slot', { props, slots: { close: () => 'Close slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PAlertProps; slots?: Partial<PAlertSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Alert);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Alert, {
      props: {
        title: 'Alert',
        icon: 'i-lucide-lightbulb',
        description: 'This is a description',
        actions: [{ label: 'Action' }],
        close: true,
        avatar: {
          src: 'https://github.com/benjamincanac.png',
          alt: 'Benjamin Canac',
        },
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
