import type { PDashboardSidebarToggleProps } from '../../src/runtime/components/dashboard-sidebar-toggle.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import DashboardGroup from '../../src/runtime/components/dashboard-group.vue';
import DashboardSidebarToggle from '../../src/runtime/components/dashboard-sidebar-toggle.vue';

const DashboardWrapper = defineComponent({
  components: {
    PDashboardGroup: DashboardGroup as any,
    PDashboardSidebarToggle: DashboardSidebarToggle as any,
  },
  inheritAttrs: false,
  template: `<PDashboardGroup>
  <PDashboardSidebarToggle v-bind="$attrs" />
</PDashboardGroup>`,
});

describe('dashboardSidebarToggle', () => {
  it.each([
    // Props
    ['with color', { props: { color: 'primary' as const } }],
    ['with variant', { props: { variant: 'solid' as const } }],
    ['with side', { props: { side: 'right' as const } }],
    ['with class', { props: { class: 'p-3' } }],
  ])('renders %s correctly', async (_: string, options: { props?: PDashboardSidebarToggleProps }) => {
    const wrapper = await mountSuspended(DashboardWrapper, options);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardWrapper);

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
