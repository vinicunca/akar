import { defineAppConfig } from '#imports';

// @unocss-include

/**
 * This is a workaround since app.config is not capable to get the options from a module,
 * so we need to hardcode it.
 */
const BRANDS = ['primary', 'secondary', 'success', 'info', 'warning', 'error'];

export default defineAppConfig({
  toaster: {
    position: 'bottom-right' as const,
    expand: true,
    duration: 5000,
  },
  theme: {
    radius: 0.25,
    blackAsPrimary: false,
  },
  pohon: {
    colors: {
      primary: 'purple',
    },

    header: {
      slots: {
        root: 'bg-background/75 backdrop-blur border-b border-border h-$pohon-header-height sticky top-0 z-50',
        container: 'flex items-center justify-between gap-3 h-full',
        left: 'lg:flex-1 flex items-center gap-1.5',
        center: 'hidden lg:flex',
        right: 'flex items-center justify-end lg:flex-1 gap-1.5',
        title: 'shrink-0 font-bold text-xl color-text-highlighted flex items-end gap-1.5',
        toggle: 'lg:hidden',
        content: 'lg:hidden',
        overlay: 'lg:hidden',
        header: 'px-4 sm:px-6 h-$pohon-header-height shrink-0 flex items-center justify-between gap-3',
        body: 'p-4 sm:p-6 overflow-y-auto',
      },
      variants: {
        toggleSide: {
          left: {
            toggle: '-ms-1.5',
          },
          right: {
            toggle: '-me-1.5',
          },
        },
      },
    },

    container: {
      base: 'w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8',
    },

    navigationMenu: {
      slots: {
        root: 'relative flex gap-1.5 [&>div]:min-w-0',
        list: 'isolate min-w-0',
        label: 'w-full flex items-center gap-1.5 font-semibold text-xs/5 color-text-highlighted px-2.5 py-1.5',
        item: 'min-w-0',
        link: 'group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:(-z-1 rounded-md) focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
        linkLeadingIcon: 'shrink-0 size-5',
        linkLeadingAvatar: 'shrink-0',
        linkLeadingAvatarSize: '2xs',
        linkTrailing: 'group ms-auto inline-flex gap-1.5 items-center',
        linkTrailingBadge: 'shrink-0',
        linkTrailingBadgeSize: 'sm',
        linkTrailingIcon: 'size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200',
        linkLabel: 'truncate',
        linkLabelExternalIcon: 'inline-block size-3 align-top color-text-dimmed',
        childList: 'isolate',
        childLabel: 'text-xs color-text-highlighted',
        childItem: '',
        childLink: 'group relative size-full flex items-start text-start text-sm before:(absolute -z-1 rounded-md) focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
        childLinkWrapper: 'min-w-0',
        childLinkIcon: 'size-5 shrink-0',
        childLinkLabel: 'truncate',
        childLinkLabelExternalIcon: 'inline-block size-3 align-top color-text-dimmed',
        childLinkDescription: 'text-muted',
        separator: 'px-2 h-px bg-border',
        viewportWrapper: 'absolute top-full left-0 flex w-full',
        viewport: 'relative overflow-hidden bg-default shadow-lg rounded-md ring ring-default h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-[1]',
        content: '',
        indicator: 'absolute data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=hidden]:opacity-0 bottom-0 z-[2] w-(--reka-navigation-menu-indicator-size) translate-x-(--reka-navigation-menu-indicator-position) flex h-2.5 items-end justify-center overflow-hidden transition-[translate,width] duration-200',
        arrow: 'relative top-[50%] size-2.5 rotate-45 border border-border bg-default z-[1] rounded-xs',
      },

      variants: {
        color: {
          ...Object.fromEntries(
            BRANDS.map((color) => [
              color,
              {
                link: `focus-visible:before:ring-${color}`,
                childLink: `focus-visible:before:ring-${color}`,
              },
            ]),
          ),
          neutral: {
            link: 'focus-visible:before:ring-ring-inverted',
            childLink: 'focus-visible:before:ring-ring-inverted',
          },
        },
        orientation: {
          horizontal: {
            root: 'items-center justify-between',
            list: 'flex items-center',
            item: 'py-2',
            link: 'px-2.5 py-1.5 before:inset-x-px before:inset-y-0',
            childList: 'grid p-2',
            childLink: 'px-3 py-2 gap-2 before:(inset-x-px inset-y-0)',
            childLinkLabel: 'font-medium',
            content: 'absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto',
          },
          vertical: {
            root: 'flex-col',
            link: 'flex-row px-2.5 py-1.5 before:(inset-y-px inset-x-0)',
            childLabel: 'px-1.5 py-0.5',
            childLink: 'p-1.5 gap-1.5 before:(inset-y-px inset-x-0)',
          },
        },
        contentOrientation: {
          horizontal: {
            viewportWrapper: 'justify-center',
            content: 'data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]',
          },
          vertical: {
            viewport: 'sm:w-$akar-navigation-menu-viewport-width left-$akar-navigation-menu-viewport-left',
          },
        },
        active: {
          true: {
            childLink: 'before:bg-background-elevated color-text-highlighted',
            childLinkIcon: 'color-text',
          },
          false: {
            link: 'color-text-muted',
            linkLeadingIcon: 'color-text-dimmed',
            childLink: 'hover:before:bg-background-elevated/50 color-text hover:color-text-highlighted transition-colors before:transition-colors',
            childLinkIcon: 'color-text-dimmed group-hover:color-text transition-colors',
          },
        },
        disabled: {
          true: {
            link: 'cursor-not-allowed opacity-75',
          },
        },
      },

      compoundVariants: [
        {
          orientation: 'horizontal',
          contentOrientation: 'horizontal',
          class: {
            childList: 'grid-cols-2 gap-2',
          },
        },
        {
          orientation: 'horizontal',
          contentOrientation: 'vertical',
          class: {
            childList: 'gap-1',
            content: 'w-60',
          },
        },
        {
          orientation: 'vertical',
          collapsed: false,
          class: {
            childList: 'ms-5 border-s border-border',
            childItem: 'ps-1.5 -ms-px',
            content: 'data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden',
          },
        },
        {
          orientation: 'vertical',
          collapsed: true,
          class: {
            link: 'px-1.5',
            content: 'shadow-sm rounded-sm min-h-6 p-1',
          },
        },
        {
          orientation: 'horizontal',
          highlight: true,
          class: {
            link: 'after:(absolute -bottom-2 inset-x-2.5 block h-px rounded-full transition-colors)',
          },
        },
        {
          orientation: 'vertical',
          highlight: true,
          level: true,
          class: {
            link: 'after:(absolute -start-1.5 inset-y-0.5 block w-px rounded-full transition-colors)',
          },
        },
        {
          disabled: false,
          active: false,
          variant: 'pill',
          class: {
            link: 'hover:color-text-highlighted hover:before:bg-background-elevated/50 transition-colors before:transition-colors',
            linkLeadingIcon: 'group-hover:color-text transition-colors',
          },
        },
        {
          disabled: false,
          active: false,
          variant: 'pill',
          orientation: 'horizontal',
          class: {
            link: 'data-[state=open]:color-text-highlighted',
            linkLeadingIcon: 'group-data-[state=open]:color-text',
          },
        },
        {
          disabled: false,
          variant: 'pill',
          highlight: true,
          orientation: 'horizontal',
          class: {
            link: 'data-[state=open]:before:bg-background-elevated/50',
          },
        },
        {
          disabled: false,
          variant: 'pill',
          highlight: false,
          active: false,
          orientation: 'horizontal',
          class: {
            link: 'data-[state=open]:before:bg-background-elevated/50',
          },
        },
        ...BRANDS.map((color: string) => ({
          color,
          variant: 'pill',
          active: true,
          class: {
            link: `color-${color}`,
            linkLeadingIcon: `color-${color} group-data-[state=open]:color-${color}`,
          },
        })),
        {
          color: 'neutral',
          variant: 'pill',
          active: true,
          class: {
            link: 'color-text-highlighted',
            linkLeadingIcon: 'color-text-highlighted group-data-[state=open]:color-text-highlighted',
          },
        },
        {
          variant: 'pill',
          active: true,
          highlight: false,
          class: {
            link: 'before:bg-background-elevated',
          },
        },
        {
          variant: 'pill',
          active: true,
          highlight: true,
          disabled: false,
          class: {
            link: 'hover:before:bg-background-elevated/50 before:transition-colors',
          },
        },
        {
          disabled: false,
          active: false,
          variant: 'link',
          class: {
            link: 'hover:color-text-highlighted transition-colors',
            linkLeadingIcon: 'group-hover:color-text transition-colors',
          },
        },
        {
          disabled: false,
          active: false,
          variant: 'link',
          orientation: 'horizontal',
          class: {
            link: 'data-[state=open]:color-text-highlighted',
            linkLeadingIcon: 'group-data-[state=open]:color-text',
          },
        },
        ...BRANDS.map((color: string) => ({
          color,
          variant: 'link',
          active: true,
          class: {
            link: `color-${color}`,
            linkLeadingIcon: `color-${color} group-data-[state=open]:color-${color}`,
          },
        })),
        {
          color: 'neutral',
          variant: 'link',
          active: true,
          class: {
            link: 'color-text-highlighted',
            linkLeadingIcon: 'color-text-highlighted group-data-[state=open]:color-text-highlighted',
          },
        },
        ...BRANDS.map((highlightColor: string) => ({
          highlightColor,
          highlight: true,
          level: true,
          active: true,
          class: {
            link: `after:bg-${highlightColor}`,
          },
        })),
        {
          highlightColor: 'neutral',
          highlight: true,
          level: true,
          active: true,
          class: {
            link: 'after:bg-background-inverted',
          },
        },
      ],
    },

    main: {
      base: 'min-h-[calc(100vh-var(--pohon-header-height))]',
    },

    breadcrumb: {
      slots: {
        root: 'relative min-w-0',
        list: 'flex items-center gap-1.5',
        item: 'flex min-w-0',
        link: 'group relative flex items-center gap-1.5 text-sm min-w-0 focus-visible:outline-primary',
        linkLeadingIcon: 'shrink-0 size-5',
        linkLeadingAvatar: 'shrink-0',
        linkLeadingAvatarSize: '2xs',
        linkLabel: 'truncate',
        separator: 'flex',
        separatorIcon: 'shrink-0 size-5 color-text-muted',
      },
      variants: {
        active: {
          true: {
            link: 'color-primary font-semibold',
          },
          false: {
            link: 'color-text-muted font-medium',
          },
        },
        disabled: {
          true: {
            link: 'cursor-not-allowed opacity-75',
          },
        },
      },
      compoundVariants: [
        {
          disabled: false,
          active: false,
          to: true,
          class: {
            link: 'hover:color-text transition-colors',
          },
        },
      ],
    },

    link: {
      base: 'focus-visible:outline-primary',
      variants: {
        active: {
          true: 'color-primary',
          false: 'color-text-muted',
        },
        disabled: {
          true: 'cursor-not-allowed opacity-75',
        },
      },
      compoundVariants: [
        {
          active: false,
          disabled: false,
          class: 'hover:color-text transition-colors',
        },
      ],
    },

    separator: {
      slots: {
        root: 'flex items-center align-middle text-center',
        container: 'font-medium color-text flex',
        icon: 'shrink-0 size-5',
        avatar: 'shrink-0',
        avatarSize: '2xs',
        label: 'text-sm',
      },
      variants: {
        color: {
          ...Object.fromEntries(BRANDS.map((color: string) => [color, { border: `border-${color}` }])),
          neutral: { border: 'border-border' },
        },
        orientation: {
          horizontal: {
            root: 'w-full flex-row',
            border: 'w-full',
            container: 'mx-3 whitespace-nowrap',
          },
          vertical: {
            root: 'h-full flex-col',
            border: 'h-full',
            container: 'my-2',
          },
        },
        type: {
          solid: {
            border: 'border-solid',
          },
          dashed: {
            border: 'border-dashed',
          },
          dotted: {
            border: 'border-dotted',
          },
        },
      },
      compoundVariants: [
        {
          orientation: 'horizontal',
          size: 'xs',
          class: { border: 'border-t' },
        },
        {
          orientation: 'horizontal',
          size: 'sm',
          class: { border: 'border-t-[2px]' },
        },
        {
          orientation: 'horizontal',
          size: 'md',
          class: { border: 'border-t-[3px]' },
        },
        {
          orientation: 'horizontal',
          size: 'lg',
          class: { border: 'border-t-[4px]' },
        },
        {
          orientation: 'horizontal',
          size: 'xl',
          class: { border: 'border-t-[5px]' },
        },
        {
          orientation: 'vertical',
          size: 'xs',
          class: { border: 'border-s' },
        },
        {
          orientation: 'vertical',
          size: 'sm',
          class: { border: 'border-s-[2px]' },
        },
        {
          orientation: 'vertical',
          size: 'md',
          class: { border: 'border-s-[3px]' },
        },
        {
          orientation: 'vertical',
          size: 'lg',
          class: { border: 'border-s-[4px]' },
        },
        {
          orientation: 'vertical',
          size: 'xl',
          class: { border: 'border-s-[5px]' },
        },
      ],
    },

    prose: {
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
      p: {
        base: 'my-5 leading-7 text-pretty',
      },
      li: {
        base: 'my-1.5 ps-1.5 leading-7 [&>ul]:my-0',
      },
      ol: {
        base: 'list-decimal ps-6 my-5 marker:color-text-muted',
      },
      ul: {
        base: 'list-disc ps-6 my-5 marker:color-border-accented',
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
      pre: {
        slots: {
          root: 'relative my-5 group',
          header: 'flex items-center gap-1.5 border border-border-muted bg-background border-b-0 relative rounded-t-md px-4 py-3',
          filename: 'color-text text-sm/6',
          icon: 'size-4 shrink-0',
          copy: 'absolute top-[11px] right-[11px] lg:opacity-0 lg:group-hover:opacity-100 transition',
          base: 'group font-mono text-sm/6 border border-border-muted bg-background-muted rounded-md px-4 py-3 whitespace-pre-wrap break-words overflow-x-auto focus:outline-none',
        },
        variants: {
          filename: {
            true: {
              root: '[&>pre]:rounded-t-none [&>pre]:my-0 my-5',
            },
          },
        },
      },
    },

    contentToc: {
      slots: {
        root: 'sticky top-$pohon-header-height z-10 bg-background/75 lg:bg-[initial] backdrop-blur -mx-4 px-4 sm:px-6 sm:-mx-6 overflow-y-auto max-h-[calc(100vh-var(--pohon-header-height))]',
        container: 'pt-4 sm:pt-6 pb-2.5 sm:pb-4.5 lg:py-8 border-b border-dashed border-border lg:border-0 flex flex-col',
        top: '',
        bottom: 'hidden lg:flex lg:flex-col gap-6',
        trigger: 'group text-sm font-semibold flex-1 flex items-center gap-1.5 py-1.5 -mt-1.5 focus-visible:outline-primary',
        title: 'truncate',
        trailing: 'ms-auto inline-flex gap-1.5 items-center',
        trailingIcon: 'size-5 transform transition-transform duration-200 shrink-0 group-data-[state=open]:rotate-180 lg:hidden',
        content: 'data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden focus:outline-none',
        list: 'min-w-0',
        listWithChildren: 'ms-3',
        item: 'min-w-0',
        itemWithChildren: '',
        link: 'group relative text-sm flex items-center focus-visible:outline-primary py-1',
        linkText: 'truncate',
        indicator: 'absolute ms-2.5 transition-property-[translate,height] duration-200 h-$indicator-size translate-y-$indicator-position w-px rounded-full',
      },
      variants: {
        highlightColor: {
          ...Object.fromEntries(BRANDS.map((color: string) => [color, {
            indicator: `bg-${color}`,
          }])),
          neutral: {
            indicator: 'bg-background-inverted',
          },
        },
        active: {
          false: {
            link: ['color-text-muted hover:color-text transition-colors'],
          },
        },
        highlight: {
          true: {
            list: 'ms-2.5 ps-4 border-s border-border',
            item: '-ms-px',
          },
        },
        body: {
          true: {
            bottom: 'mt-6',
          },
        },
      },
      compoundVariants: [
        ...BRANDS.map((color: string) => ({
          color,
          active: true,
          class: {
            link: `color-${color}`,
            linkLeadingIcon: `color-${color}`,
          },
        })),
        {
          color: 'neutral',
          active: true,
          class: {
            link: 'color-text-highlighted',
            linkLeadingIcon: 'color-text-highlighted',
          },
        },
      ],
    },
  },
});
