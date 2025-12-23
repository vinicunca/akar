import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    meta: {
      icon: 'ion:layers-outline',
      keepAlive: true,
      order: 1000,
      title: 'pages.examples.title',
    },
    name: 'Examples',
    path: '/admin/examples',
    children: [
      {
        name: 'FormExample',
        path: '/admin/examples/form',
        meta: {
          icon: 'mdi:form-select',
          title: 'pages.examples.form.title',
        },
        children: [
          {
            name: 'FormBasicExample',
            path: '/admin/examples/form/basic',
            component: () => import('~/domains/admin/pages/examples/form/basic.vue'),
            meta: {
              title: 'pages.examples.form.basic',
            },
          },
          {
            name: 'FormQueryExample',
            path: '/admin/examples/form/query',
            component: () => import('~/domains/admin/pages/examples/form/query.vue'),
            meta: {
              title: 'pages.examples.form.query',
            },
          },
          {
            name: 'FormRulesExample',
            path: '/admin/examples/form/rules',
            component: () => import('~/domains/admin/pages/examples/form/rules.vue'),
            meta: {
              title: 'pages.examples.form.rules',
            },
          },
          {
            name: 'FormDynamicExample',
            path: '/admin/examples/form/dynamic',
            component: () => import('~/domains/admin/pages/examples/form/dynamic.vue'),
            meta: {
              title: 'pages.examples.form.dynamic',
            },
          },
          {
            name: 'FormLayoutExample',
            path: '/admin/examples/form/custom-layout',
            component: () => import('~/domains/admin/pages/examples/form/custom-layout.vue'),
            meta: {
              title: 'pages.examples.form.layout',
            },
          },
          {
            name: 'FormCustomExample',
            path: '/admin/examples/form/custom',
            component: () => import('~/domains/admin/pages/examples/form/custom.vue'),
            meta: {
              title: 'pages.examples.form.custom',
            },
          },
          {
            name: 'FormApiExample',
            path: '/admin/examples/form/api',
            component: () => import('~/domains/admin/pages/examples/form/api.vue'),
            meta: {
              title: 'pages.examples.form.api',
            },
          },
          {
            name: 'FormMergeExample',
            path: '/admin/examples/form/merge',
            component: () => import('~/domains/admin/pages/examples/form/merge.vue'),
            meta: {
              title: 'pages.examples.form.merge',
            },
          },
          {
            name: 'FormScrollToErrorExample',
            path: '/admin/examples/form/scroll-to-error-test',
            component: () =>
              import('~/domains/admin/pages/examples/form/scroll-to-error-test.vue'),
            meta: {
              title: 'pages.examples.form.scrollToError',
            },
          },
        ],
      },
      {
        name: 'VxeTableExample',
        path: '/admin/examples/vxe-table',
        meta: {
          icon: 'lucide:table',
          title: 'pages.examples.vxeTable.title',
        },
        children: [
          {
            name: 'VxeTableBasicExample',
            path: '/admin/examples/vxe-table/basic',
            component: () => import('~/domains/admin/pages/examples/vxe-table/basic.vue'),
            meta: {
              title: 'pages.examples.vxeTable.basic',
            },
          },
          {
            name: 'VxeTableRemoteExample',
            path: '/admin/examples/vxe-table/remote',
            component: () => import('~/domains/admin/pages/examples/vxe-table/remote.vue'),
            meta: {
              title: 'pages.examples.vxeTable.remote',
            },
          },
          {
            name: 'VxeTableTreeExample',
            path: '/admin/examples/vxe-table/tree',
            component: () => import('~/domains/admin/pages/examples/vxe-table/tree.vue'),
            meta: {
              title: 'pages.examples.vxeTable.tree',
            },
          },
          {
            name: 'VxeTableFixedExample',
            path: '/admin/examples/vxe-table/fixed',
            component: () => import('~/domains/admin/pages/examples/vxe-table/fixed.vue'),
            meta: {
              title: 'pages.examples.vxeTable.fixed',
            },
          },
          {
            name: 'VxeTableCustomCellExample',
            path: '/admin/examples/vxe-table/custom-cell',
            component: () =>
              import('~/domains/admin/pages/examples/vxe-table/custom-cell.vue'),
            meta: {
              title: 'pages.examples.vxeTable.custom-cell',
            },
          },
          {
            name: 'VxeTableFormExample',
            path: '/admin/examples/vxe-table/form',
            component: () => import('~/domains/admin/pages/examples/vxe-table/form.vue'),
            meta: {
              title: 'pages.examples.vxeTable.form',
            },
          },
          {
            name: 'VxeTableEditCellExample',
            path: '/admin/examples/vxe-table/edit-cell',
            component: () => import('~/domains/admin/pages/examples/vxe-table/edit-cell.vue'),
            meta: {
              title: 'pages.examples.vxeTable.editCell',
            },
          },
          {
            name: 'VxeTableEditRowExample',
            path: '/admin/examples/vxe-table/edit-row',
            component: () => import('~/domains/admin/pages/examples/vxe-table/edit-row.vue'),
            meta: {
              title: 'pages.examples.vxeTable.editRow',
            },
          },
          {
            name: 'VxeTableVirtualExample',
            path: '/admin/examples/vxe-table/virtual',
            component: () => import('~/domains/admin/pages/examples/vxe-table/virtual.vue'),
            meta: {
              title: 'pages.examples.vxeTable.virtual',
            },
          },
        ],
      },
      {
        name: 'CaptchaExample',
        path: '/admin/examples/captcha',
        meta: {
          icon: 'logos:recaptcha',
          title: 'pages.examples.captcha.title',
        },
        children: [
          {
            name: 'DragVerifyExample',
            path: '/admin/examples/captcha/slider',
            component: () =>
              import('~/domains/admin/pages/examples/captcha/slider.vue'),
            meta: {
              title: 'pages.examples.captcha.sliderCaptcha',
            },
          },
          {
            name: 'RotateVerifyExample',
            path: '/admin/examples/captcha/slider-rotate',
            component: () =>
              import('~/domains/admin/pages/examples/captcha/slider-rotate.vue'),
            meta: {
              title: 'pages.examples.captcha.sliderRotateCaptcha',
            },
          },
          {
            name: 'TranslateVerifyExample',
            path: '/admin/examples/captcha/slider-translate',
            component: () =>
              import('~/domains/admin/pages/examples/captcha/slider-translate.vue'),
            meta: {
              title: 'pages.examples.captcha.sliderTranslateCaptcha',
            },
          },
          {
            name: 'CaptchaPointSelectionExample',
            path: '/admin/examples/captcha/point-selection',
            component: () =>
              import('~/domains/admin/pages/examples/captcha/point-selection.vue'),
            meta: {
              title: 'pages.examples.captcha.pointSelection',
            },
          },
        ],
      },
      {
        name: 'ModalExample',
        path: '/admin/examples/modal',
        component: () => import('~/domains/admin/pages/examples/modal.vue'),
        meta: {
          icon: 'system-uicons:window-content',
          keepAlive: true,
          title: 'pages.examples.modal.title',
        },
      },
      {
        name: 'DrawerExample',
        path: '/admin/examples/drawer',
        component: () => import('~/domains/admin/pages/examples/drawer.vue'),
        meta: {
          icon: 'iconoir:drawer',
          keepAlive: true,
          title: 'pages.examples.drawer.title',
        },
      },
      {
        name: 'EllipsisExample',
        path: '/admin/examples/ellipsis',
        component: () => import('~/domains/admin/pages/examples/ellipsis.vue'),
        meta: {
          icon: 'ion:ellipsis-horizontal',
          title: 'pages.examples.ellipsis.title',
        },
      },
      {
        name: 'VueResizeDemo',
        path: '/admin/demos/resize/basic',
        component: () => import('~/domains/admin/pages/examples/resize.vue'),
        meta: {
          icon: 'material-symbols:resize',
          title: 'pages.examples.resize.title',
        },
      },
      {
        name: 'ColPageDemo',
        path: '/admin/examples/layout/col-page',
        component: () => import('~/domains/admin/pages/examples/layout/col-page.vue'),
        meta: {
          badge: 'Alpha',
          badgeVariants: 'destructive',
          icon: 'material-symbols:horizontal-distribute',
          title: 'pages.examples.layout.col-page',
        },
      },
      {
        name: 'TippyDemo',
        path: '/admin/examples/tippy',
        component: () => import('~/domains/admin/pages/examples/tippy.vue'),
        meta: {
          icon: 'mdi:message-settings-outline',
          title: 'Tippy',
        },
      },
      {
        name: 'JsonViewer',
        path: '/admin/examples/json-viewer',
        component: () => import('~/domains/admin/pages/examples/json-viewer.vue'),
        meta: {
          icon: 'tabler:json',
          title: 'JsonViewer',
        },
      },
      {
        name: 'Motion',
        path: '/admin/examples/motion',
        component: () => import('~/domains/admin/pages/examples/motion.vue'),
        meta: {
          icon: 'mdi:animation-play',
          title: 'Motion',
        },
      },
      {
        name: 'CountTo',
        path: '/admin/examples/count-to',
        component: () => import('~/domains/admin/pages/examples/count-to.vue'),
        meta: {
          icon: 'mdi:animation-play',
          title: 'CountTo',
        },
      },
      {
        name: 'Loading',
        path: '/admin/examples/loading',
        component: () => import('~/domains/admin/pages/examples/loading.vue'),
        meta: {
          icon: 'mdi:circle-double',
          title: 'Loading',
        },
      },
      {
        name: 'ButtonGroup',
        path: '/admin/examples/button-group',
        component: () => import('~/domains/admin/pages/examples/button-group.vue'),
        meta: {
          icon: 'mdi:check-circle',
          title: 'pages.examples.button-group.title',
        },
      },
    ],
  },
];

export default routes;
