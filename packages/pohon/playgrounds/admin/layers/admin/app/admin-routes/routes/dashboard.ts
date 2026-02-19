import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: 'pages.dashboard.title',
    },
    name: 'Dashboard',
    path: '/admin/dashboard',
    children: [
      {
        name: 'Analytics',
        path: '/admin/dashboard/analytics',
        component: () => import('../pages/dashboard/analytics.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: 'pages.dashboard.analytics',
        },
      },
      {
        name: 'Workspace',
        path: '/admin/dashboard/workspace',
        component: () => import('../pages/dashboard/workspace.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: 'pages.dashboard.workspace',
        },
      },
    ],
  },
];

export default routes;
