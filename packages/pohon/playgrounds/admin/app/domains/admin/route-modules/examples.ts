import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    meta: {
      icon: 'ion:layers-outline',
      keepAlive: true,
      order: 1000,
      title: 'examples.title',
    },
    name: 'Examples',
    path: '/examples',
    children: [
      {
        name: 'FormExample',
        path: '/examples/form',
        meta: {
          icon: 'mdi:form-select',
          title: 'examples.form.title',
        },
        children: [
          {
            name: 'FormBasicExample',
            path: '/examples/form/basic',
            component: () => import('~/domains/admin/pages/examples/form/basic.vue'),
            meta: {
              title: 'examples.form.basic',
            },
          },
          {
            name: 'FormQueryExample',
            path: '/examples/form/query',
            component: () => import('~/domains/admin/pages/examples/form/query.vue'),
            meta: {
              title: 'examples.form.query',
            },
          },
          {
            name: 'FormRulesExample',
            path: '/examples/form/rules',
            component: () => import('~/domains/admin/pages/examples/form/rules.vue'),
            meta: {
              title: 'examples.form.rules',
            },
          },
          {
            name: 'FormDynamicExample',
            path: '/examples/form/dynamic',
            component: () => import('~/domains/admin/pages/examples/form/dynamic.vue'),
            meta: {
              title: 'examples.form.dynamic',
            },
          },
          {
            name: 'FormLayoutExample',
            path: '/examples/form/custom-layout',
            component: () => import('~/domains/admin/pages/examples/form/custom-layout.vue'),
            meta: {
              title: 'examples.form.layout',
            },
          },
          {
            name: 'FormCustomExample',
            path: '/examples/form/custom',
            component: () => import('~/domains/admin/pages/examples/form/custom.vue'),
            meta: {
              title: 'examples.form.custom',
            },
          },
          {
            name: 'FormApiExample',
            path: '/examples/form/api',
            component: () => import('~/domains/admin/pages/examples/form/api.vue'),
            meta: {
              title: 'examples.form.api',
            },
          },
          {
            name: 'FormMergeExample',
            path: '/examples/form/merge',
            component: () => import('~/domains/admin/pages/examples/form/merge.vue'),
            meta: {
              title: 'examples.form.merge',
            },
          },
          {
            name: 'FormScrollToErrorExample',
            path: '/examples/form/scroll-to-error-test',
            component: () =>
              import('~/domains/admin/pages/examples/form/scroll-to-error-test.vue'),
            meta: {
              title: 'examples.form.scrollToError',
            },
          },
        ],
      },
      {
        name: 'VxeTableExample',
        path: '/examples/vxe-table',
        meta: {
          icon: 'lucide:table',
          title: 'examples.vxeTable.title',
        },
        children: [
          {
            name: 'VxeTableBasicExample',
            path: '/examples/vxe-table/basic',
            component: () => import('~/domains/admin/pages/examples/vxe-table/basic.vue'),
            meta: {
              title: 'examples.vxeTable.basic',
            },
          },
          {
            name: 'VxeTableRemoteExample',
            path: '/examples/vxe-table/remote',
            component: () => import('~/domains/admin/pages/examples/vxe-table/remote.vue'),
            meta: {
              title: 'examples.vxeTable.remote',
            },
          },
          {
            name: 'VxeTableTreeExample',
            path: '/examples/vxe-table/tree',
            component: () => import('~/domains/admin/pages/examples/vxe-table/tree.vue'),
            meta: {
              title: 'examples.vxeTable.tree',
            },
          },
          {
            name: 'VxeTableFixedExample',
            path: '/examples/vxe-table/fixed',
            component: () => import('~/domains/admin/pages/examples/vxe-table/fixed.vue'),
            meta: {
              title: 'examples.vxeTable.fixed',
            },
          },
          {
            name: 'VxeTableCustomCellExample',
            path: '/examples/vxe-table/custom-cell',
            component: () =>
              import('~/domains/admin/pages/examples/vxe-table/custom-cell.vue'),
            meta: {
              title: 'examples.vxeTable.custom-cell',
            },
          },
          {
            name: 'VxeTableFormExample',
            path: '/examples/vxe-table/form',
            component: () => import('~/domains/admin/pages/examples/vxe-table/form.vue'),
            meta: {
              title: 'examples.vxeTable.form',
            },
          },
          {
            name: 'VxeTableEditCellExample',
            path: '/examples/vxe-table/edit-cell',
            component: () => import('~/domains/admin/pages/examples/vxe-table/edit-cell.vue'),
            meta: {
              title: 'examples.vxeTable.editCell',
            },
          },
          {
            name: 'VxeTableEditRowExample',
            path: '/examples/vxe-table/edit-row',
            component: () => import('~/domains/admin/pages/examples/vxe-table/edit-row.vue'),
            meta: {
              title: 'examples.vxeTable.editRow',
            },
          },
          {
            name: 'VxeTableVirtualExample',
            path: '/examples/vxe-table/virtual',
            component: () => import('~/domains/admin/pages/examples/vxe-table/virtual.vue'),
            meta: {
              title: 'examples.vxeTable.virtual',
            },
          },
        ],
      },
      {
        name: 'CaptchaExample',
        path: '/examples/captcha',
        meta: {
          icon: 'logos:recaptcha',
          title: 'examples.captcha.title',
        },
        children: [
          {
            name: 'DragVerifyExample',
            path: '/examples/captcha/slider',
            component: () =>
              import('~/domains/admin/pages/examples/captcha/slider.vue'),
            meta: {
              title: 'examples.captcha.sliderCaptcha',
            },
          },
          {
            name: 'RotateVerifyExample',
            path: '/examples/captcha/slider-rotate',
            component: () =>
              import('~/domains/admin/pages/examples/captcha/slider-rotate.vue'),
            meta: {
              title: 'examples.captcha.sliderRotateCaptcha',
            },
          },
          {
            name: 'TranslateVerifyExample',
            path: '/examples/captcha/slider-translate',
            component: () =>
              import('~/domains/admin/pages/examples/captcha/slider-translate.vue'),
            meta: {
              title: 'examples.captcha.sliderTranslateCaptcha',
            },
          },
          {
            name: 'CaptchaPointSelectionExample',
            path: '/examples/captcha/point-selection',
            component: () =>
              import('~/domains/admin/pages/examples/captcha/point-selection.vue'),
            meta: {
              title: 'examples.captcha.pointSelection',
            },
          },
        ],
      },
      {
        name: 'ModalExample',
        path: '/examples/modal',
        component: () => import('~/domains/admin/pages/examples/modal.vue'),
        meta: {
          icon: 'system-uicons:window-content',
          keepAlive: true,
          title: 'examples.modal.title',
        },
      },
      {
        name: 'DrawerExample',
        path: '/examples/drawer',
        component: () => import('~/domains/admin/pages/examples/drawer.vue'),
        meta: {
          icon: 'iconoir:drawer',
          keepAlive: true,
          title: 'examples.drawer.title',
        },
      },
      {
        name: 'EllipsisExample',
        path: '/examples/ellipsis',
        component: () => import('~/domains/admin/pages/examples/ellipsis.vue'),
        meta: {
          icon: 'ion:ellipsis-horizontal',
          title: 'examples.ellipsis.title',
        },
      },
      {
        name: 'VueResizeDemo',
        path: '/demos/resize/basic',
        component: () => import('~/domains/admin/pages/examples/resize.vue'),
        meta: {
          icon: 'material-symbols:resize',
          title: 'examples.resize.title',
        },
      },
      {
        name: 'ColPageDemo',
        path: '/examples/layout/col-page',
        component: () => import('~/domains/admin/pages/examples/layout/col-page.vue'),
        meta: {
          badge: 'Alpha',
          badgeVariants: 'destructive',
          icon: 'material-symbols:horizontal-distribute',
          title: 'examples.layout.col-page',
        },
      },
      {
        name: 'TippyDemo',
        path: '/examples/tippy',
        component: () => import('~/domains/admin/pages/examples/tippy.vue'),
        meta: {
          icon: 'mdi:message-settings-outline',
          title: 'Tippy',
        },
      },
      {
        name: 'JsonViewer',
        path: '/examples/json-viewer',
        component: () => import('~/domains/admin/pages/examples/json-viewer.vue'),
        meta: {
          icon: 'tabler:json',
          title: 'JsonViewer',
        },
      },
      {
        name: 'Motion',
        path: '/examples/motion',
        component: () => import('~/domains/admin/pages/examples/motion.vue'),
        meta: {
          icon: 'mdi:animation-play',
          title: 'Motion',
        },
      },
      {
        name: 'CountTo',
        path: '/examples/count-to',
        component: () => import('~/domains/admin/pages/examples/count-to.vue'),
        meta: {
          icon: 'mdi:animation-play',
          title: 'CountTo',
        },
      },
      {
        name: 'Loading',
        path: '/examples/loading',
        component: () => import('~/domains/admin/pages/examples/loading.vue'),
        meta: {
          icon: 'mdi:circle-double',
          title: 'Loading',
        },
      },
      {
        name: 'ButtonGroup',
        path: '/examples/button-group',
        component: () => import('~/domains/admin/pages/examples/button-group.vue'),
        meta: {
          icon: 'mdi:check-circle',
          title: 'examples.button-group.title',
        },
      },
    ],
  },
];

export default routes;
