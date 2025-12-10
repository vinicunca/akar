import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: 'demos.title',
    },
    name: 'Demos',
    path: '/demos',
    children: [
      {
        meta: {
          icon: 'mdi:shield-key-outline',
          title: 'demos.access.frontendPermissions',
        },
        name: 'AccessDemos',
        path: '/demos/access',
        children: [
          {
            name: 'AccessPageControlDemo',
            path: '/demos/access/page-control',
            component: () => import('~/domains/admin/pages/demos/access.vue'),
            meta: {
              icon: 'mdi:page-previous-outline',
              title: 'demos.access.pageAccess',
            },
          },
          {
            name: 'AccessButtonControlDemo',
            path: '/demos/access/button-control',
            component: () => import('~/domains/admin/pages/demos/access/button-control.vue'),
            meta: {
              icon: 'mdi:button-cursor',
              title: 'demos.access.buttonControl',
            },
          },
          {
            name: 'AccessMenuVisible403Demo',
            path: '/demos/access/menu-visible-403',
            component: () =>
              import('~/domains/admin/pages/demos/access/menu-visible-403.vue'),
            meta: {
              authority: ['no-body'],
              icon: 'mdi:button-cursor',
              menuVisibleWithForbidden: true,
              title: 'demos.access.menuVisible403',
            },
          },
          {
            name: 'AccessSuperVisibleDemo',
            path: '/demos/access/super-visible',
            component: () => import('~/domains/admin/pages/demos/access/super-visible.vue'),
            meta: {
              authority: ['super'],
              icon: 'mdi:button-cursor',
              title: 'demos.access.superVisible',
            },
          },
          {
            name: 'AccessAdminVisibleDemo',
            path: '/demos/access/admin-visible',
            component: () => import('~/domains/admin/pages/demos/access/admin-visible.vue'),
            meta: {
              authority: ['admin'],
              icon: 'mdi:button-cursor',
              title: 'demos.access.adminVisible',
            },
          },
          {
            name: 'AccessUserVisibleDemo',
            path: '/demos/access/user-visible',
            component: () => import('~/domains/admin/pages/demos/access/user-visible.vue'),
            meta: {
              authority: ['user'],
              icon: 'mdi:button-cursor',
              title: 'demos.access.userVisible',
            },
          },
        ],
      },
      // 功能
      {
        meta: {
          icon: 'mdi:feature-highlight',
          title: 'demos.features.title',
        },
        name: 'FeaturesDemos',
        path: '/demos/features',
        children: [
          {
            name: 'LoginExpiredDemo',
            path: '/demos/features/login-expired',
            component: () =>
              import('~/domains/admin/pages/demos/features/login-expired.vue'),
            meta: {
              icon: 'mdi:encryption-expiration',
              title: 'demos.features.loginExpired',
            },
          },
          {
            name: 'IconsDemo',
            path: '/demos/features/icons',
            component: () => import('~/domains/admin/pages/demos/features/icons.vue'),
            meta: {
              icon: 'lucide:annoyed',
              title: 'demos.features.icons',
            },
          },
          {
            name: 'WatermarkDemo',
            path: '/demos/features/watermark',
            component: () =>
              import('~/domains/admin/pages/demos/features/watermark.vue'),
            meta: {
              icon: 'lucide:tags',
              title: 'demos.features.watermark',
            },
          },
          {
            name: 'FeatureTabsDemo',
            path: '/demos/features/tabs',
            component: () => import('~/domains/admin/pages/demos/features/tabs.vue'),
            meta: {
              icon: 'lucide:app-window',
              title: 'demos.features.tabs',
            },
          },
          {
            name: 'FeatureTabDetailDemo',
            path: '/demos/features/tabs/detail/:id',
            component: () =>
              import('~/domains/admin/pages/demos/features/tabs/detail/[id].vue'),
            meta: {
              activePath: '/demos/features/tabs',
              hideInMenu: true,
              maxNumOfOpenTab: 3,
              title: 'demos.features.tabDetail',
            },
          },
          {
            name: 'HideChildrenInMenuParentDemo',
            path: '/demos/features/hide-menu-children',
            meta: {
              hideChildrenInMenu: true,
              icon: 'ic:round-menu',
              title: 'demos.features.hideChildrenInMenu',
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
                  title: 'demos.features.hideChildrenInMenu',
                },
              },
              {
                name: 'HideChildrenInMenuChildrenDemo',
                path: '/demos/features/hide-menu-children/children',
                component: () =>
                  import(
                    '~/domains/admin/pages/demos/features/hide-menu-children/children.vue',
                  ),
                meta: {
                  activePath: '/demos/features/hide-menu-children',
                  title: 'demos.features.hideChildrenInMenu',
                },
              },
            ],
          },
          {
            name: 'FullScreenDemo',
            path: '/demos/features/full-screen',
            component: () =>
              import('~/domains/admin/pages/demos/features/full-screen.vue'),
            meta: {
              icon: 'lucide:fullscreen',
              title: 'demos.features.fullScreen',
            },
          },
          {
            name: 'FileDownloadDemo',
            path: '/demos/features/file-download',
            component: () =>
              import('~/domains/admin/pages/demos/features/file-download.vue'),
            meta: {
              icon: 'lucide:hard-drive-download',
              title: 'demos.features.fileDownload',
            },
          },
          {
            name: 'ClipboardDemo',
            path: '/demos/features/clipboard',
            component: () =>
              import('~/domains/admin/pages/demos/features/clipboard.vue'),
            meta: {
              icon: 'lucide:copy',
              title: 'demos.features.clipboard',
            },
          },
          {
            name: 'MenuQueryDemo',
            path: '/demos/menu-query',
            component: () =>
              import('~/domains/admin/pages/demos/features/menu-query.vue'),
            meta: {
              icon: 'lucide:curly-braces',
              query: {
                id: 1,
              },
              title: 'demos.features.menuWithQuery',
            },
          },
          {
            name: 'NewWindowDemo',
            path: '/demos/new-window',
            component: () =>
              import('~/domains/admin/pages/demos/features/new-window.vue'),
            meta: {
              icon: 'lucide:app-window',
              openInNewWindow: true,
              title: 'demos.features.openInNewWindow',
            },
          },
          {
            name: 'VueQueryDemo',
            path: '/demos/features/vue-query',
            component: () =>
              import('~/domains/admin/pages/demos/features/vue-query.vue'),
            meta: {
              icon: 'lucide:git-pull-request-arrow',
              title: 'Tanstack Query',
            },
          },
          {
            name: 'RequestParamsSerializerDemo',
            path: '/demos/features/request-params-serializer',
            component: () =>
              import(
                '~/domains/admin/pages/demos/features/request-params-serializer.vue',
              ),
            meta: {
              icon: 'lucide:git-pull-request-arrow',
              title: 'demos.features.requestParamsSerializer',
            },
          },
          {
            name: 'BigIntDemo',
            path: '/demos/features/json-bigint',
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
        path: '/demos/breadcrumb',
        meta: {
          icon: 'lucide:navigation',
          title: 'demos.breadcrumb.navigation',
        },
        children: [
          {
            name: 'BreadcrumbLateralDemo',
            path: '/demos/breadcrumb/lateral',
            component: () => import('~/domains/admin/pages/demos/breadcrumb/lateral.vue'),
            meta: {
              icon: 'lucide:navigation',
              title: 'demos.breadcrumb.lateral',
            },
          },
          {
            name: 'BreadcrumbLateralDetailDemo',
            path: '/demos/breadcrumb/lateral-detail',
            component: () =>
              import('~/domains/admin/pages/demos/breadcrumb/lateral-detail.vue'),
            meta: {
              activePath: '/demos/breadcrumb/lateral',
              hideInMenu: true,
              title: 'demos.breadcrumb.lateralDetail',
            },
          },
          {
            name: 'BreadcrumbLevelDemo',
            path: '/demos/breadcrumb/level',
            meta: {
              icon: 'lucide:navigation',
              title: 'demos.breadcrumb.level',
            },
            children: [
              {
                name: 'BreadcrumbLevelDetailDemo',
                path: '/demos/breadcrumb/level/detail',
                component: () =>
                  import('~/domains/admin/pages/demos/breadcrumb/level/detail.vue'),
                meta: {
                  title: 'demos.breadcrumb.levelDetail',
                },
              },
            ],
          },
        ],
      },
      {
        meta: {
          icon: 'mdi:lightbulb-error-outline',
          title: 'demos.fallback.title',
        },
        name: 'FallbackDemos',
        path: '/demos/fallback',
        children: [
          {
            name: 'Fallback403Demo',
            path: '/demos/fallback/403',
            component: () => import('~/domains/admin/pages/demos/fallback/403.vue'),
            meta: {
              icon: 'mdi:do-not-disturb-alt',
              title: '403',
            },
          },
          {
            name: 'Fallback404Demo',
            path: '/demos/fallback/404',
            component: () => import('~/domains/admin/pages/demos/fallback/404.vue'),
            meta: {
              icon: 'mdi:table-off',
              title: '404',
            },
          },
          {
            name: 'Fallback500Demo',
            path: '/demos/fallback/500',
            component: () =>
              import('~/domains/admin/pages/demos/fallback/500.vue'),
            meta: {
              icon: 'mdi:server-network-off',
              title: '500',
            },
          },
          {
            name: 'FallbackOfflineDemo',
            path: '/demos/fallback/offline',
            component: () => import('~/domains/admin/pages/demos/fallback/offline.vue'),
            meta: {
              icon: 'mdi:offline',
              title: 'ui.fallback.offline',
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
          title: 'demos.badge.title',
        },
        name: 'BadgeDemos',
        path: '/demos/badge',
        children: [
          {
            name: 'BadgeDotDemo',
            component: () => import('~/domains/admin/pages/demos/badge/dot.vue'),
            path: '/demos/badge/dot',
            meta: {
              badgeType: 'dot',
              icon: 'lucide:square-dot',
              title: 'demos.badge.dot',
            },
          },
          {
            name: 'BadgeTextDemo',
            component: () => import('~/domains/admin/pages/demos/badge/text.vue'),
            path: '/demos/badge/text',
            meta: {
              badge: '10',
              icon: 'lucide:square-dot',
              title: 'demos.badge.text',
            },
          },
          {
            name: 'BadgeColorDemo',
            component: () => import('~/domains/admin/pages/demos/badge/color.vue'),
            path: '/demos/badge/color',
            meta: {
              badge: 'Hot',
              badgeVariants: 'destructive',
              icon: 'lucide:square-dot',
              title: 'demos.badge.color',
            },
          },
        ],
      },
      // 菜单激活图标
      {
        meta: {
          activeIcon: 'fluent-emoji:radioactive',
          icon: 'bi:radioactive',
          title: 'demos.activeIcon.title',
        },
        name: 'ActiveIconDemos',
        path: '/demos/active-icon',
        children: [
          {
            name: 'ActiveIconDemo',
            component: () => import('~/domains/admin/pages/demos/active-icon/children.vue'),
            path: '/demos/active-icon/children',
            meta: {
              activeIcon: 'fluent-emoji:radioactive',
              icon: 'bi:radioactive',
              title: 'demos.activeIcon.children',
            },
          },
        ],
      },
      // 外部链接
      {
        meta: {
          icon: 'ic:round-settings-input-composite',
          title: 'demos.outside.title',
        },
        name: 'OutsideDemos',
        path: '/demos/outside',
        children: [
          {
            name: 'IframeDemos',
            path: '/demos/outside/iframe',
            meta: {
              icon: 'mdi:newspaper-variant-outline',
              title: 'demos.outside.embedded',
            },
            children: [
              {
                name: 'VueDocumentDemo',
                path: '/demos/outside/iframe/vue-document',
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
                path: '/demos/outside/iframe/tailwindcss',
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
            path: '/demos/outside/external-link',
            meta: {
              icon: 'mdi:newspaper-variant-multiple-outline',
              title: 'demos.outside.externalLink',
            },
            children: [
              {
                name: 'ViteDemo',
                path: '/demos/outside/external-link/vite',
                component: () => import('~/layouts/blank.vue'),
                meta: {
                  icon: 'logos:vitejs',
                  link: 'https://vitejs.dev/',
                  title: 'Vite',
                },
              },
              {
                name: 'VueUseDemo',
                path: '/demos/outside/external-link/vue-use',
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
          title: 'demos.nested.title',
        },
        name: 'NestedDemos',
        path: '/demos/nested',
        children: [
          {
            name: 'Menu1Demo',
            path: '/demos/nested/menu1',
            component: () => import('~/domains/admin/pages/demos/nested/menu1.vue'),
            meta: {
              icon: 'ic:round-menu',
              keepAlive: true,
              title: 'demos.nested.menu1',
            },
          },
          {
            name: 'Menu2Demo',
            path: '/demos/nested/menu2',
            meta: {
              icon: 'ic:round-menu',
              keepAlive: true,
              title: 'demos.nested.menu2',
            },
            children: [
              {
                name: 'Menu21Demo',
                path: '/demos/nested/menu2/menu2-1',
                component: () => import('~/domains/admin/pages/demos/nested/menu2/menu2-1.vue'),
                meta: {
                  icon: 'ic:round-menu',
                  keepAlive: true,
                  title: 'demos.nested.menu2_1',
                },
              },
            ],
          },
          {
            name: 'Menu3Demo',
            path: '/demos/nested/menu3',
            meta: {
              icon: 'ic:round-menu',
              title: 'demos.nested.menu3',
            },
            children: [
              {
                name: 'Menu31Demo',
                path: '/demos/nested/menu3/menu3-1',
                component: () => import('~/domains/admin/pages/demos/nested/menu3/menu3-1.vue'),
                meta: {
                  icon: 'ic:round-menu',
                  keepAlive: true,
                  title: 'demos.nested.menu3_1',
                },
              },
              {
                name: 'Menu32Demo',
                path: '/demos/nested/menu3/menu3-2',
                meta: {
                  icon: 'ic:round-menu',
                  title: 'demos.nested.menu3_2',
                },
                children: [
                  {
                    name: 'Menu321Demo',
                    path: '/demos/nested/menu3/menu3-2/menu3-2-1',
                    component: () =>
                      import('~/domains/admin/pages/demos/nested/menu3/menu3-2/menu3-2-1.vue'),
                    meta: {
                      icon: 'ic:round-menu',
                      keepAlive: true,
                      title: 'demos.nested.menu3_2_1',
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
