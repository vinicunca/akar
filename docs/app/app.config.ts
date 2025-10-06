import { defineAppConfig } from '#imports';
import { breadcrumbTheme } from './themes/breadcrumb.theme';
import { collapsibleTheme } from './themes/collapsible.theme';
import { BRANDS } from './themes/constant';
import { containerTheme } from './themes/container.theme';
import { contentTocTheme } from './themes/content-toc.theme';
import { headerTheme } from './themes/header.theme';
import { linkTheme } from './themes/link.theme';
import { mainTheme } from './themes/main.theme';
import { navigationMenuTheme } from './themes/navigation-menu.theme';
import { separatorTheme } from './themes/separator.theme';

// @unocss-include
export default defineAppConfig({
  theme: {
    blackAsPrimary: false,
    radius: 0.25,
  },
  toaster: {
    duration: 5000,
    expand: true,
    position: 'bottom-right' as const,
  },

  pohon: {
    colors: {
      primary: 'purple',
    },

    breadcrumb: breadcrumbTheme,
    collapsible: collapsibleTheme,
    container: containerTheme,
    contentToc: contentTocTheme,
    header: headerTheme,
    link: linkTheme,
    main: mainTheme,
    navigationMenu: navigationMenuTheme,
    separator: separatorTheme,

    prose: {
      a: {
        base: 'text-primary border-b border-transparent hover:border-primary font-medium focus-visible:outline-primary [&>code]:border-dashed hover:[&>code]:border-primary hover:[&>code]:text-primary transition-colors [&>code]:transition-colors',
      },
      callout: {
        slots: {
          base: 'group relative block px-4 py-3 rounded-md text-sm/6 my-5 last:mb-0 [&_code]:text-xs/5 [&_code]:bg-background [&_pre]:bg-background [&>div]:my-2.5 [&_ul]:my-2.5 [&_ol]:my-2.5 [&>*]:last:!mb-0 [&_ul]:ps-4.5 [&_ol]:ps-4.5 [&_li]:my-0 transition-colors',
          externalIcon: 'size-4 align-top absolute right-2 top-2 pointer-events-none transition-colors',
          icon: 'size-4 shrink-0 align-sub me-1.5 transition-colors',
        },
        variants: {
          color: {
            ...Object.fromEntries(BRANDS.map((color) => [
              color,
              {
                base: `border border-${color}/25 bg-${color}/10 color-${color}-600 dark:color-${color}-300 [&_a]:color-${color} [&_a]:hover:border-${color} [&_code]:color-${color}-600 dark:[&_code]:color-${color}-300 [&_code]:border-${color}/25 [&_a]:hover:[&>code]:border-${color} [&_a]:hover:[&>code]:color-${color} [&>ul]:marker:color-${color}/50`,
                icon: `color-${color}`,
                externalIcon: `color-${color}-600 dark:color-${color}-300`,
              },
            ])),
          },
        },
      },
      code: {
        base: 'px-1.5 py-0.5 text-sm font-mono font-medium rounded-md inline-block',
        variants: {
          color: {
            ...Object.fromEntries(BRANDS.map((color: string) => [
              color,
              `border border-${color}/25 bg-${color}/10 color-${color}`,
            ])),
            neutral: 'border border-border-muted color-text-highlighted bg-background-muted',
          },
        },
      },
      collapsible: {
        slots: {
          content: '*:first:mt-2.5 *:last:mb-0 *:my-1.5',
          root: 'my-5',
          trigger: 'group relative rounded-xs inline-flex items-center gap-1.5 color-text-muted hover:color-text text-sm focus-visible:ring-2 focus-visible:ring-primary focus:outline-none transition-colors',
          triggerIcon: 'size-4 shrink-0 group-data-[state=open]:rotate-180 transition-transform-200',
          triggerLabel: 'truncate',
        },
      },
      h1: {
        base: 'text-4xl colortext-highlighted font-bold mb-8 scroll-mt-[calc(45px+var(--pohon-header-height))] lg:scroll-mt-$pohon-header-height',
        link: 'inline-flex items-center gap-2',
      },
      h2: {
        slots: {
          base: 'relative text-2xl color-text-highlighted font-bold mt-12 mb-6 scroll-mt-[calc(48px+45px+var(--pohon-header-height))] lg:scroll-mt-[calc(48px+var(--pohon-header-height))] [&>a:focus-visible]:outline-primary [&>a>code]:border-dashed hover:[&>a>code]:border-primary hover:[&>a>code]:color-primary [&>a>code]:text-xl/7 [&>a>code]:font-bold [&>a>code]:transition-colors',
          leading: 'absolute -ms-8 top-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 bg-background-elevated hover:color-primary rounded-md hidden lg:flex color-text-muted transition',
          leadingIcon: 'size-4 shrink-0',
          link: 'group lg:ps-2 lg:-ms-2',
        },
      },
      h3: {
        slots: {
          base: 'relative text-xl color-text-highlighted font-bold mt-8 mb-3 scroll-mt-[calc(32px+45px+var(--pohon-header-height))] lg:scroll-mt-[calc(32px+var(--pohon-header-height))] [&>a:focus-visible]:outline-primary [&>a>code]:border-dashed hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary [&>a>code]:text-lg/6 [&>a>code]:font-bold [&>a>code]:transition-colors',
          leading: 'absolute -ms-8 top-0.5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 bg-background-elevated hover:text-primary rounded-md hidden lg:flex color-text-muted transition',
          leadingIcon: 'size-4 shrink-0',
          link: 'group lg:(ps-2 -ms-2)',
        },
      },
      h4: {
        slots: {
          base: 'text-lg color-text-highlighted font-bold mt-6 mb-2 scroll-mt-[calc(24px+45px+var(--pohon-header-height))] lg:scroll-mt-[calc(24px+var(--pohon-header-height))] [&>a:focus-visible]:outline-primary',
          link: '',
        },
      },
      li: {
        base: 'my-1.5 ps-1.5 leading-7 [&>ul]:my-0',
      },
      ol: {
        base: 'list-decimal ps-6 my-5 marker:color-text-muted',
      },
      p: {
        base: 'my-5 leading-7 text-pretty',
      },
      pre: {
        slots: {
          base: 'group font-mono text-sm/6 border border-border-muted bg-background-muted rounded-md px-4 py-3 whitespace-pre-wrap break-words overflow-x-auto focus:outline-none',
          copy: 'absolute top-[11px] right-[11px] lg:opacity-0 lg:group-hover:opacity-100 transition',
          filename: 'color-text text-sm/6',
          header: 'flex items-center gap-1.5 border border-border-muted bg-background border-b-0 relative rounded-t-md px-4 py-3',
          icon: 'size-4 shrink-0',
          root: 'relative my-5 group',
        },
        variants: {
          filename: {
            true: {
              root: '[&>pre]:rounded-t-none [&>pre]:my-0 my-5',
            },
          },
        },
      },
      table: {
        slots: {
          base: 'w-full border-separate border-spacing-0 rounded-md',
          root: 'relative my-5 overflow-x-auto',
        },
      },
      td: {
        base: 'py-3 px-4 text-sm text-left align-top border-e border-b first:border-s border-border-muted [&_code]:text-xs/5 [&_p]:my-0 [&_p]:leading-6 [&_ul]:my-0 [&_ol]:my-0 [&_ul]:ps-4.5 [&_ol]:ps-4.5 [&_li]:leading-6 [&_li]:my-0.5',
      },
      th: {
        base: 'py-3 px-4 font-semibold text-sm text-left border-e border-b first:border-s border-t border-border-muted',
      },
      thead: {
        base: 'bg-background-muted',
      },
      tr: {
        base: '[&:first-child>th:first-child]:rounded-tl-md [&:first-child>th:last-child]:rounded-tr-md [&:last-child>td:first-child]:rounded-bl-md [&:last-child>td:last-child]:rounded-br-md',
      },
      ul: {
        base: 'list-disc ps-6 my-5 marker:color-border-accented',
      },
    },
  },
});
