import type { PDashboardToolbarProps, PDashboardToolbarSlots } from '../../src/runtime/components/dashboard-toolbar.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PDashboardToolbar from '../../src/runtime/components/dashboard-toolbar.vue';
import ComponentRender from '../component-render';

describe('dashboardToolbar', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'px-8' } }],
    ['with ui', { props: { pohon: { left: 'items-center' } }, slots: { left: (): string => 'Left slot' } }],
    // Slots
    ['with default slot', { slots: { default: (): string => 'Default slot' } }],
    ['with left slot', { slots: { left: (): string => 'Left slot' } }],
    ['with right slot', { slots: { right: (): string => 'Right slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PDashboardToolbarProps; slots?: Partial<PDashboardToolbarSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PDashboardToolbar);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PDashboardToolbar);

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
