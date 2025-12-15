import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    meta: {
      icon: 'ion:settings-outline',
      order: 9997,
      title: 'pages.system.title',
    },
    name: 'System',
    path: '/admin/system',
    children: [
      {
        path: '/admin/system/role',
        name: 'SystemRole',
        meta: {
          icon: 'mdi:account-group',
          title: 'pages.system.role.title',
        },
        component: () => import('~/domains/admin/pages/systems/roles.vue'),
      },
      {
        path: '/admin/system/menu',
        name: 'SystemMenu',
        meta: {
          icon: 'mdi:menu',
          title: 'pages.system.menu.title',
        },
        component: () => import('~/domains/admin/pages/systems/menus.vue'),
      },
      {
        path: '/admin/system/dept',
        name: 'SystemDept',
        meta: {
          icon: 'charm:organisation',
          title: 'pages.system.dept.title',
        },
        component: () => import('~/domains/admin/pages/systems/depts.vue'),
      },
    ],
  },
];

export default routes;
