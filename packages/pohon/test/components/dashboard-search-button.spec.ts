import type { PDashboardSearchButtonProps } from '../../src/runtime/components/dashboard-search-button.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import DashboardSearchButton from '../../src/runtime/components/dashboard-search-button.vue';
import ComponentRender from '../component-render';

describe('dashboardSearchButton', () => {
  it.each([
    // Props
    ['with label', { props: { label: 'Open' } }],
    ['with icon', { props: { icon: 'i-lucide-house' } }],
    ['with kbds', { props: { kbds: ['alt', 'o'] } }],
    ['with collapsed', { props: { collapsed: true } }],
    ['with class', { props: { class: 'w-full' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PDashboardSearchButtonProps }) => {
    const html = await ComponentRender(nameOrHtml, options, DashboardSearchButton);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardSearchButton, {
      props: {
        label: 'Open',
        icon: 'i-lucide-house',
        kbds: ['alt', 'o'],
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
