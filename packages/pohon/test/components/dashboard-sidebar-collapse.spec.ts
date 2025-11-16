import type { PDashboardSidebarCollapseProps } from '../../src/runtime/components/dashboard-sidebar-collapse.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import DashboardGroup from '../../src/runtime/components/dashboard-group.vue';
import DashboardSidebarCollapse from '../../src/runtime/components/dashboard-sidebar-collapse.vue';

const DashboardWrapper = defineComponent({
  components: {
    PDashboardGroup: DashboardGroup as any,
    PDashboardSidebarCollapse: DashboardSidebarCollapse as any,
  },
  inheritAttrs: false,
  template: `<PDashboardGroup>
  <PDashboardSidebarCollapse v-bind="$attrs" />
</PDashboardGroup>`,
});

describe('dashboardSidebarCollapse', () => {
  it.each([
    // Props
    ['with color', { props: { color: 'primary' as const } }],
    ['with variant', { props: { variant: 'solid' as const } }],
    ['with side', { props: { side: 'right' as const } }],
    ['with class', { props: { class: 'p-3' } }],
  ])('renders %s correctly', async (_: string, options: { props?: PDashboardSidebarCollapseProps }) => {
    const wrapper = await mountSuspended(DashboardWrapper, options);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardWrapper);

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
