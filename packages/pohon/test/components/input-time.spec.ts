import type { PInputTimeProps, PInputTimeSlots } from '../../src/runtime/components/input-time.vue';
import theme from '#build/pohon/input-time';
import { Time } from '@internationalized/date';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import PInputTime from '../../src/runtime/components/input-time.vue';
import ComponentRender from '../component-render';

describe('inputTime', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const variants = Object.keys(theme.variants.variant) as any;
  const date = new Date('2025-01-01');

  vi.setSystemTime(date);

  afterAll(() => {
    vi.useRealTimers();
  });

  it.each([
    // Props
    ['with modelValue', { props: { modelValue: new Time(12, 30) } }],
    ['with default value', { props: { defaultValue: new Time(12, 30) } }],
    ['with placeholder', { props: { placeholder: new Time(12, 30) } }],
    ['with disabled', { props: { disabled: true, modelValue: new Time(12, 30) } }],
    ['with required', { props: { required: true, modelValue: new Time(12, 30) } }],
    ['with readonly', { props: { readonly: true, modelValue: new Time(12, 30) } }],
    ['with hour cycle 24', { props: { hourCycle: 24 as const } }],
    ['with hour cycle 12', { props: { hourCycle: 12 as const } }],
    ['with granularity', { props: { granularity: 'minute' as const } }],
    ['with hide time zone', { props: { hideTimeZone: true } }],
    ['with max value', { props: { maxValue: new Time(12, 30) } }],
    ['with min value', { props: { minValue: new Time(12, 30) } }],
    ['with icon', { props: { icon: 'i-lucide-clock' } }],
    ['with leadingIcon', { props: { leadingIcon: 'i-lucide-arrow-left' } }],
    ['with trailingIcon', { props: { trailingIcon: 'i-lucide-arrow-right' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { variant, defaultValue: new Time(12, 30) } }]),
    ...variants.map((variant: string) => [`with neutral variant ${variant}`, { props: { variant, color: 'neutral', defaultValue: new Time(12, 30) } }]),
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'max-w-sm' } }],
    ['with ui', { props: { pohon: { base: 'rounded-full' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PInputTimeProps; slots?: Partial<PInputTimeSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PInputTime);
    expect(html).toMatchSnapshot();
  });

  describe('emits', () => {
    it('update:modelValue event', async () => {
      const wrapper = await mountSuspended(PInputTime);
      const time = new Time(12, 30);

      await wrapper.setValue(time);
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[time]] });
    });
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PInputTime, {
      props: {
        modelValue: new Time(12, 30),
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
