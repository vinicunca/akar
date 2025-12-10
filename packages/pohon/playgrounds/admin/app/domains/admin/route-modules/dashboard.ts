import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: 'page.dashboard.title',
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('~/domains/admin/pages/dashboard/analytics.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: 'page.dashboard.analytics',
        },
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('~/domains/admin/pages/dashboard/workspace.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: 'page.dashboard.workspace',
        },
      },
    ],
  },
];

export default routes;
