import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: 'pages.demos.title',
    },
    name: 'Demos',
    path: '/admin/demos',
    children: [
      {
        meta: {
          icon: 'mdi:shield-key-outline',
          title: 'pages.demos.access.frontendPermissions',
        },
        name: 'AccessDemos',
        path: '/admin/demos/access',
        children: [
          {
            name: 'AccessPageControlDemo',
            path: '/admin/demos/access/page-control',
            component: () => import('~/domains/admin/pages/demos/access/page-control.vue'),
            meta: {
              icon: 'mdi:page-previous-outline',
              title: 'pages.demos.access.pageAccess',
            },
          },
          {
            name: 'AccessButtonControlDemo',
            path: '/admin/demos/access/button-control',
            component: () => import('~/domains/admin/pages/demos/access/button-control.vue'),
            meta: {
              icon: 'mdi:button-cursor',
              title: 'pages.demos.access.buttonControl',
            },
          },
          {
            name: 'AccessMenuVisible403Demo',
            path: '/admin/demos/access/menu-visible-403',
            component: () =>
              import('~/domains/admin/pages/demos/access/menu-visible-403.vue'),
            meta: {
              authority: ['no-body'],
              icon: 'mdi:button-cursor',
              menuVisibleWithForbidden: true,
              title: 'pages.demos.access.menuVisible403',
            },
          },
          {
            name: 'AccessSuperVisibleDemo',
            path: '/admin/demos/access/super-visible',
            component: () => import('~/domains/admin/pages/demos/access/super-visible.vue'),
            meta: {
              authority: ['super'],
              icon: 'mdi:button-cursor',
              title: 'pages.demos.access.superVisible',
            },
          },
          {
            name: 'AccessAdminVisibleDemo',
            path: '/admin/demos/access/admin-visible',
            component: () => import('~/domains/admin/pages/demos/access/admin-visible.vue'),
            meta: {
              authority: ['admin'],
              icon: 'mdi:button-cursor',
              title: 'pages.demos.access.adminVisible',
            },
          },
          {
            name: 'AccessUserVisibleDemo',
            path: '/admin/demos/access/user-visible',
            component: () => import('~/domains/admin/pages/demos/access/user-visible.vue'),
            meta: {
              authority: ['user'],
              icon: 'mdi:button-cursor',
              title: 'pages.demos.access.userVisible',
            },
          },
        ],
      },
      // 功能
      {
        meta: {
          icon: 'mdi:feature-highlight',
          title: 'pages.demos.features.title',
        },
        name: 'FeaturesDemos',
        path: '/admin/demos/features',
        children: [
          {
            name: 'LoginExpiredDemo',
            path: '/admin/demos/features/login-expired',
            component: () =>
              import('~/domains/admin/pages/demos/features/login-expired.vue'),
            meta: {
              icon: 'mdi:encryption-expiration',
              title: 'pages.demos.features.loginExpired',
            },
          },
          {
            name: 'IconsDemo',
            path: '/admin/demos/features/icons',
            component: () => import('~/domains/admin/pages/demos/features/icons.vue'),
            meta: {
              icon: 'lucide:annoyed',
              title: 'pages.demos.features.icons',
            },
          },
          {
            name: 'WatermarkDemo',
            path: '/admin/demos/features/watermark',
            component: () =>
              import('~/domains/admin/pages/demos/features/watermark.vue'),
            meta: {
              icon: 'lucide:tags',
              title: 'pages.demos.features.watermark',
            },
          },
          {
            name: 'FeatureTabsDemo',
            path: '/admin/demos/features/tabs',
            component: () => import('~/domains/admin/pages/demos/features/tabs.vue'),
            meta: {
              icon: 'lucide:app-window',
              title: 'pages.demos.features.tabs',
            },
          },
          {
            name: 'FeatureTabDetailDemo',
            path: '/admin/demos/features/tabs/detail/:id',
            component: () =>
              import('~/domains/admin/pages/demos/features/tabs/detail/[id].vue'),
            meta: {
              activePath: '/admin/demos/features/tabs',
              hideInMenu: true,
              maxNumOfOpenTab: 3,
              title: 'pages.demos.features.tabDetail',
            },
          },
          {
            name: 'HideChildrenInMenuParentDemo',
            path: '/admin/demos/features/hide-menu-children',
            meta: {
              hideChildrenInMenu: true,
              icon: 'ic:round-menu',
              title: 'pages.demos.features.hideChildrenInMenu',
            },
            children: [
              {
                name: 'HideChildrenInMenuDemo',
                path: '',
                component: () =>
                  import(
                    '~/domains/admin/pages/demos/features/hide-menu-children/index.vue',
                  ),
                meta: {
                  // hideInMenu: true,
                  title: 'pages.demos.features.hideChildrenInMenu',
                },
              },
              {
                name: 'HideChildrenInMenuChildrenDemo',
                path: '/admin/demos/features/hide-menu-children/children',
                component: () =>
                  import(
                    '~/domains/admin/pages/demos/features/hide-menu-children/children.vue',
                  ),
                meta: {
                  activePath: '/admin/demos/features/hide-menu-children',
                  title: 'pages.demos.features.hideChildrenInMenu',
                },
              },
            ],
          },
          {
            name: 'FullScreenDemo',
            path: '/admin/demos/features/full-screen',
            component: () =>
              import('~/domains/admin/pages/demos/features/full-screen.vue'),
            meta: {
              icon: 'lucide:fullscreen',
              title: 'pages.demos.features.fullScreen',
            },
          },
          {
            name: 'FileDownloadDemo',
            path: '/admin/demos/features/file-download',
            component: () =>
              import('~/domains/admin/pages/demos/features/file-download.vue'),
            meta: {
              icon: 'lucide:hard-drive-download',
              title: 'pages.demos.features.fileDownload',
            },
          },
          {
            name: 'ClipboardDemo',
            path: '/admin/demos/features/clipboard',
            component: () =>
              import('~/domains/admin/pages/demos/features/clipboard.vue'),
            meta: {
              icon: 'lucide:copy',
              title: 'pages.demos.features.clipboard',
            },
          },
          {
            name: 'MenuQueryDemo',
            path: '/admin/demos/menu-query',
            component: () =>
              import('~/domains/admin/pages/demos/features/menu-query.vue'),
            meta: {
              icon: 'lucide:curly-braces',
              query: {
                id: 1,
              },
              title: 'pages.demos.features.menuWithQuery',
            },
          },
          {
            name: 'NewWindowDemo',
            path: '/admin/demos/new-window',
            component: () =>
              import('~/domains/admin/pages/demos/features/new-window.vue'),
            meta: {
              icon: 'lucide:app-window',
              openInNewWindow: true,
              title: 'pages.demos.features.openInNewWindow',
            },
          },
          {
            name: 'VueQueryDemo',
            path: '/admin/demos/features/vue-query',
            component: () =>
              import('~/domains/admin/pages/demos/features/vue-query.vue'),
            meta: {
              icon: 'lucide:git-pull-request-arrow',
              title: 'Tanstack Query',
            },
          },
          {
            name: 'RequestParamsSerializerDemo',
            path: '/admin/demos/features/request-params-serializer',
            component: () =>
              import(
                '~/domains/admin/pages/demos/features/request-params-serializer.vue',
              ),
            meta: {
              icon: 'lucide:git-pull-request-arrow',
              title: 'pages.demos.features.requestParamsSerializer',
            },
          },
          {
            name: 'BigIntDemo',
            path: '/admin/demos/features/json-bigint',
            component: () =>
              import('~/domains/admin/pages/demos/features/json-bigint.vue'),
            meta: {
              icon: 'lucide:grape',
              title: 'JSON BigInt',
            },
          },
        ],
      },
      {
        name: 'BreadcrumbDemos',
        path: '/admin/demos/breadcrumb',
        meta: {
          icon: 'lucide:navigation',
          title: 'pages.demos.breadcrumb.navigation',
        },
        children: [
          {
            name: 'BreadcrumbLateralDemo',
            path: '/admin/demos/breadcrumb/lateral',
            component: () => import('~/domains/admin/pages/demos/breadcrumb/lateral.vue'),
            meta: {
              icon: 'lucide:navigation',
              title: 'pages.demos.breadcrumb.lateral',
            },
          },
          {
            name: 'BreadcrumbLateralDetailDemo',
            path: '/admin/demos/breadcrumb/lateral-detail',
            component: () =>
              import('~/domains/admin/pages/demos/breadcrumb/lateral-detail.vue'),
            meta: {
              activePath: '/admin/demos/breadcrumb/lateral',
              hideInMenu: true,
              title: 'pages.demos.breadcrumb.lateralDetail',
            },
          },
          {
            name: 'BreadcrumbLevelDemo',
            path: '/admin/demos/breadcrumb/level',
            meta: {
              icon: 'lucide:navigation',
              title: 'pages.demos.breadcrumb.level',
            },
            children: [
              {
                name: 'BreadcrumbLevelDetailDemo',
                path: '/admin/demos/breadcrumb/level/detail',
                component: () =>
                  import('~/domains/admin/pages/demos/breadcrumb/level/detail.vue'),
                meta: {
                  title: 'pages.demos.breadcrumb.levelDetail',
                },
              },
            ],
          },
        ],
      },
      {
        meta: {
          icon: 'mdi:lightbulb-error-outline',
          title: 'pages.demos.fallback.title',
        },
        name: 'FallbackDemos',
        path: '/admin/demos/fallback',
        children: [
          {
            name: 'Fallback403Demo',
            path: '/admin/demos/fallback/403',
            component: () => import('~/domains/admin/pages/demos/fallback/403.vue'),
            meta: {
              icon: 'mdi:do-not-disturb-alt',
              title: '403',
            },
          },
          {
            name: 'Fallback404Demo',
            path: '/admin/demos/fallback/404',
            component: () => import('~/domains/admin/pages/demos/fallback/404.vue'),
            meta: {
              icon: 'mdi:table-off',
              title: '404',
            },
          },
          {
            name: 'Fallback500Demo',
            path: '/admin/demos/fallback/500',
            component: () =>
              import('~/domains/admin/pages/demos/fallback/500.vue'),
            meta: {
              icon: 'mdi:server-network-off',
              title: '500',
            },
          },
          {
            name: 'FallbackOfflineDemo',
            path: '/admin/demos/fallback/offline',
            component: () => import('~/domains/admin/pages/demos/fallback/offline.vue'),
            meta: {
              icon: 'mdi:offline',
              title: 'pages.ui.fallback.offline',
            },
          },
        ],
      },
      // 菜单徽标
      {
        meta: {
          badgeType: 'dot',
          badgeVariants: 'destructive',
          icon: 'lucide:circle-dot',
          title: 'pages.demos.badge.title',
        },
        name: 'BadgeDemos',
        path: '/admin/demos/badge',
        children: [
          {
            name: 'BadgeDotDemo',
            component: () => import('~/domains/admin/pages/demos/badge/dot.vue'),
            path: '/admin/demos/badge/dot',
            meta: {
              badgeType: 'dot',
              icon: 'lucide:square-dot',
              title: 'pages.demos.badge.dot',
            },
          },
          {
            name: 'BadgeTextDemo',
            component: () => import('~/domains/admin/pages/demos/badge/text.vue'),
            path: '/admin/demos/badge/text',
            meta: {
              badge: '10',
              icon: 'lucide:square-dot',
              title: 'pages.demos.badge.text',
            },
          },
          {
            name: 'BadgeColorDemo',
            component: () => import('~/domains/admin/pages/demos/badge/color.vue'),
            path: '/admin/demos/badge/color',
            meta: {
              badge: 'Hot',
              badgeVariants: 'destructive',
              icon: 'lucide:square-dot',
              title: 'pages.demos.badge.color',
            },
          },
        ],
      },
      // 菜单激活图标
      {
        meta: {
          activeIcon: 'fluent-emoji:radioactive',
          icon: 'bi:radioactive',
          title: 'pages.demos.activeIcon.title',
        },
        name: 'ActiveIconDemos',
        path: '/admin/demos/active-icon',
        children: [
          {
            name: 'ActiveIconDemo',
            component: () => import('~/domains/admin/pages/demos/active-icon/children.vue'),
            path: '/admin/demos/active-icon/children',
            meta: {
              activeIcon: 'fluent-emoji:radioactive',
              icon: 'bi:radioactive',
              title: 'pages.demos.activeIcon.children',
            },
          },
        ],
      },
      // 外部链接
      {
        meta: {
          icon: 'ic:round-settings-input-composite',
          title: 'pages.demos.outside.title',
        },
        name: 'OutsideDemos',
        path: '/admin/demos/outside',
        children: [
          {
            name: 'IframeDemos',
            path: '/admin/demos/outside/iframe',
            meta: {
              icon: 'mdi:newspaper-variant-outline',
              title: 'pages.demos.outside.embedded',
            },
            children: [
              {
                name: 'VueDocumentDemo',
                path: '/admin/demos/outside/iframe/vue-document',
                component: () => import('~/layouts/blank.vue'),
                meta: {
                  icon: 'logos:vue',
                  iframeSrc: 'https://cn.vuejs.org/',
                  keepAlive: true,
                  title: 'Vue',
                },
              },
              {
                name: 'TailwindcssDemo',
                path: '/admin/demos/outside/iframe/tailwindcss',
                component: () => import('~/layouts/blank.vue'),
                meta: {
                  icon: 'devicon:tailwindcss',
                  iframeSrc: 'https://tailwindcss.com/',
                  // keepAlive: true,
                  title: 'Tailwindcss',
                },
              },
            ],
          },
          {
            name: 'ExternalLinkDemos',
            path: '/admin/demos/outside/external-link',
            meta: {
              icon: 'mdi:newspaper-variant-multiple-outline',
              title: 'pages.demos.outside.externalLink',
            },
            children: [
              {
                name: 'ViteDemo',
                path: '/admin/demos/outside/external-link/vite',
                component: () => import('~/layouts/blank.vue'),
                meta: {
                  icon: 'logos:vitejs',
                  link: 'https://vitejs.dev/',
                  title: 'Vite',
                },
              },
              {
                name: 'VueUseDemo',
                path: '/admin/demos/outside/external-link/vue-use',
                component: () => import('~/layouts/blank.vue'),
                meta: {
                  icon: 'logos:vueuse',
                  link: 'https://vueuse.org',
                  title: 'VueUse',
                },
              },
            ],
          },
        ],
      },
      // 嵌套菜单
      {
        meta: {
          icon: 'ic:round-menu',
          title: 'pages.demos.nested.title',
        },
        name: 'NestedDemos',
        path: '/admin/demos/nested',
        children: [
          {
            name: 'Menu1Demo',
            path: '/admin/demos/nested/menu1',
            component: () => import('~/domains/admin/pages/demos/nested/menu1.vue'),
            meta: {
              icon: 'ic:round-menu',
              keepAlive: true,
              title: 'pages.demos.nested.menu1',
            },
          },
          {
            name: 'Menu2Demo',
            path: '/admin/demos/nested/menu2',
            meta: {
              icon: 'ic:round-menu',
              keepAlive: true,
              title: 'pages.demos.nested.menu2',
            },
            children: [
              {
                name: 'Menu21Demo',
                path: '/admin/demos/nested/menu2/menu2-1',
                component: () => import('~/domains/admin/pages/demos/nested/menu2/menu2-1.vue'),
                meta: {
                  icon: 'ic:round-menu',
                  keepAlive: true,
                  title: 'pages.demos.nested.menu2_1',
                },
              },
            ],
          },
          {
            name: 'Menu3Demo',
            path: '/admin/demos/nested/menu3',
            meta: {
              icon: 'ic:round-menu',
              title: 'pages.demos.nested.menu3',
            },
            children: [
              {
                name: 'Menu31Demo',
                path: '/admin/demos/nested/menu3/menu3-1',
                component: () => import('~/domains/admin/pages/demos/nested/menu3/menu3-1.vue'),
                meta: {
                  icon: 'ic:round-menu',
                  keepAlive: true,
                  title: 'pages.demos.nested.menu3_1',
                },
              },
              {
                name: 'Menu32Demo',
                path: '/admin/demos/nested/menu3/menu3-2',
                meta: {
                  icon: 'ic:round-menu',
                  title: 'pages.demos.nested.menu3_2',
                },
                children: [
                  {
                    name: 'Menu321Demo',
                    path: '/admin/demos/nested/menu3/menu3-2/menu3-2-1',
                    component: () =>
                      import('~/domains/admin/pages/demos/nested/menu3/menu3-2/menu3-2-1.vue'),
                    meta: {
                      icon: 'ic:round-menu',
                      keepAlive: true,
                      title: 'pages.demos.nested.menu3_2_1',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
