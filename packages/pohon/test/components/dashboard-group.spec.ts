import type { PDashboardGroupProps, PDashboardGroupSlots } from '../../src/runtime/components/dashboard-group.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import DashboardGroup from '../../src/runtime/components/dashboard-group.vue';
import ComponentRender from '../component-render';

describe('dashboardGroup', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'inset-4' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PDashboardGroupProps; slots?: Partial<PDashboardGroupSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, DashboardGroup);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardGroup);

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
