import type { PCalendarProps, PCalendarSlots } from '../../src/runtime/components/calendar.vue';
import theme from '#build/pohon/calendar';
import { CalendarDate } from '@internationalized/date';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import Calendar from '../../src/runtime/components/calendar.vue';
import ComponentRender from '../component-render';

describe('calendar', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const variants = Object.keys(theme.variants.variant) as any;
  const date = new Date('2025-01-01');

  vi.setSystemTime(date);

  afterAll(() => {
    vi.useRealTimers();
  });

  it.each([
    // Props
    ['with modelValue', { props: { modelValue: new CalendarDate(2025, 1, 1) } }],
    ['with default value', { props: { defaultValue: new CalendarDate(2025, 1, 1) } }],
    ['with range', { props: { range: true } }],
    ['with multiple', { props: { multiple: true } }],
    ['with disabled', { props: { disabled: true } }],
    ['with readonly', { props: { readonly: true } }],
    ['with isDateDisabled', { props: { isDateDisabled: () => true } }],
    ['with isDateUnavailable', { props: { isDateUnavailable: () => true } }],
    ['with weekStartsOn', { props: { weekStartsOn: 1 } }],
    ['with weekdayFormat', { props: { weekdayFormat: 'short' } }],
    ['with numberOfMonths', { props: { numberOfMonths: 2 } }],
    ['with nextYear', { props: { nextYear: { size: 'lg', color: 'primary' } } }],
    ['with nextMonth', { props: { nextMonth: { size: 'lg', color: 'primary' } } }],
    ['with prevYear', { props: { prevYear: { size: 'lg', color: 'primary' } } }],
    ['with prevMonth', { props: { prevMonth: { size: 'lg', color: 'primary' } } }],
    ['without fixedWeeks', { props: { fixedWeeks: false } }],
    ['without monthControls', { props: { monthControls: false } }],
    ['without yearControls', { props: { yearControls: false } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ...variants.map((variant: string) => [`with variant ${variant}`, { props: { variant, defaultValue: new CalendarDate(2025, 1, 15) } }]),
    ['with color neutral', { props: { color: 'neutral' } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'max-w-sm' } }],
    ['with ui', { props: { pohon: { header: 'gap-4' } } }],
    // Slots
    ['with heading slot', { slots: { heading: () => 'Heading' } }],
    ['with day slot', { slots: { day: ({ day }: Parameters<PCalendarSlots['day']>[0]) => day.day } }],
    ['with week-day slot', { slots: { 'week-day': ({ day }: Parameters<PCalendarSlots['week-day']>[0]) => day } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PCalendarProps<false, false>; slots?: Partial<PCalendarSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Calendar);
    expect(html).toMatchSnapshot();
  });

  describe('emits', () => {
    it('update:modelValue event single', async () => {
      const wrapper = await mountSuspended(Calendar);
      const date = new CalendarDate(2025, 1, 1);

      await wrapper.setValue(date);
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[date]] });
    });

    it('update:modelValue event range', async () => {
      const wrapper = await mountSuspended(Calendar, { props: { range: true } });
      const date = [new CalendarDate(2025, 1, 1), new CalendarDate(2025, 1, 2)];

      await wrapper.setValue(date);
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[date]] });
    });
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Calendar, {
      props: {
        modelValue: new CalendarDate(2025, 1, 1),
        range: true,
        multiple: true,
        numberOfMonths: 2,
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
