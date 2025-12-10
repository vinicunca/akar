import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    meta: {
      icon: 'ion:settings-outline',
      order: 9997,
      title: 'system.title',
    },
    name: 'System',
    path: '/system',
    children: [
      {
        path: '/system/role',
        name: 'SystemRole',
        meta: {
          icon: 'mdi:account-group',
          title: 'system.role.title',
        },
        component: () => import('~/domains/admin/pages/systems/roles.vue'),
      },
      {
        path: '/system/menu',
        name: 'SystemMenu',
        meta: {
          icon: 'mdi:menu',
          title: 'system.menu.title',
        },
        component: () => import('~/domains/admin/pages/systems/menus.vue'),
      },
      {
        path: '/system/dept',
        name: 'SystemDept',
        meta: {
          icon: 'charm:organisation',
          title: 'system.dept.title',
        },
        component: () => import('~/domains/admin/pages/systems/depts.vue'),
      },
    ],
  },
];

export default routes;
