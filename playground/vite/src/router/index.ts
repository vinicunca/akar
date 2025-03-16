import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/home-view.vue'),
    },
    {
      path: '/test',
      children: [
        {
          path: 'controlled',
          component: () => import('../views/tests/controlled-view.vue'),
        },
        {
          path: 'no-drag-element',
          component: () => import('../views/tests/no-drag-element-view.vue'),
        },
        {
          path: 'initial-snap',
          component: () => import('../views/tests/initial-snap-view.vue'),
        },
        {
          path: 'direction',
          component: () => import('../views/tests/direction-view.vue'),
        },
        {
          path: 'nested-drawer',
          component: () => import('../views/tests/nested-drawer-view.vue'),
        },
        {
          path: 'non-dismissible',
          component: () => import('../views/tests/non-dismissible-view.vue'),
        },
        {
          path: 'scrollable-with-inputs',
          component: () => import('../views/tests/scrollable-with-inputs-view.vue'),
        },
        {
          path: 'without-scaled-background',
          component: () => import('../views/tests/without-scaled-background-view.vue'),
        },
        {
          path: 'with-handle',
          component: () => import('../views/tests/with-handle-view.vue'),
        },
        {
          path: 'with-scaled-background',
          component: () => import('../views/tests/with-scaled-background-view.vue'),
        },
        {
          path: 'with-snap-points',
          component: () => import('../views/tests/with-snap-points-view.vue'),
        },
      ],
    },
  ],
});

export default router;
