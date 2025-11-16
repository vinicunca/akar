import type { PDashboardSidebarProps, PDashboardSidebarSlots } from '../../src/runtime/components/dashboard-sidebar.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import DashboardGroup from '../../src/runtime/components/dashboard-group.vue';
import DashboardSidebar from '../../src/runtime/components/dashboard-sidebar.vue';

const DashboardWrapper = defineComponent({
  components: {
    PDashboardGroup: DashboardGroup as any,
    PDashboardSidebar: DashboardSidebar as any,
  },
  inheritAttrs: false,
  template: `<PDashboardGroup>
  <PDashboardSidebar v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </PDashboardSidebar>
</PDashboardGroup>`,
});

describe('dashboardSidebar', () => {
  it.each([
    // Props
    ['with id', { props: { id: 'test' } }],
    ['with side right', { props: { side: 'right' as const } }],
    ['with minSize', { props: { minSize: 10 } }],
    ['with maxSize', { props: { maxSize: 100 } }],
    ['with defaultSize', { props: { defaultSize: 50 } }],
    ['with resizable', { props: { resizable: true } }],
    ['with collapsedSize', { props: { collapsed: true, collapsedSize: 10 } }],
    ['with collapsible', { props: { collapsible: true } }],
    ['with mode modal', { props: { open: true, mode: 'modal' as const, menu: { portal: false } } }],
    ['with mode slideover', { props: { open: true, mode: 'slideover' as const, menu: { portal: false } } }],
    ['with mode drawer', { props: { open: true, mode: 'drawer' as const, menu: { portal: false } } }],
    ['without toggle', { props: { toggle: false, menu: { portal: false } } }],
    ['with toggle', { props: { toggle: { color: 'primary' as const, variant: 'solid' as const }, menu: { portal: false } } }],
    ['with toggleSide', { props: { open: true, toggleSide: 'right' as const, menu: { portal: false } } }],
    ['with class', { props: { class: 'border-none' } }],
    ['with ui', { props: { pohon: { body: 'py-4' } } }],
    // Slots
    ['with header slot', { slots: { header: () => 'Header slot' } }],
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with footer slot', { slots: { footer: () => 'Footer slot' } }],
    ['with toggle slot', { slots: { toggle: () => 'Toggle slot' } }],
    ['with content slot', { slots: { content: () => 'Content slot' } }],
    ['with resize-handle slot', { slots: { 'resize-handle': () => 'Resize handle slot' } }],
  ])('renders %s correctly', async (
    _: string,
    options: { props?: PDashboardSidebarProps; slots?: Partial<PDashboardSidebarSlots> },
  ) => {
    const wrapper = await mountSuspended(DashboardWrapper, options);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardWrapper, {
      props: {
        id: 'test',
        resizable: true,
        collapsible: true,
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
