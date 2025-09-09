import type { DefaultTheme } from 'vitepress';

export const coreSidebarItems: DefaultTheme.SidebarItem = {
  text: 'Core',
  icon: 'ph:tree-view',
  items: [
    {
      text: 'Overview',
      icon: 'lucide:rocket',
      items: [
        { text: 'Introduction', link: '/core/overview/introduction' },
        { text: 'Getting Started', link: '/core/overview/getting-started' },
        { text: 'Installation', link: '/core/overview/installation' },
        { text: 'Accessibility', link: '/core/overview/accessibility' },
        { text: 'Releases', link: '/core/overview/releases' },
      ],
    },
    {
      text: 'Guides',
      icon: 'lucide:book-open',
      items: [
        { text: 'Styling', link: '/core/guides/styling' },
        { text: 'Animation/Transition', link: '/core/guides/animation' },
        { text: 'Composition', link: '/core/guides/composition' },
        { text: 'Controlled State', link: '/core/guides/controlled-state' },
        {
          text: 'Server side rendering',
          link: '/core/guides/server-side-rendering',
        },
        { text: 'Namespaced', link: '/core/guides/namespaced-components' },
        { text: 'Dates', link: '/core/guides/dates' },
        { text: 'Internationalization (RTL)', link: '/core/guides/i18n' },
        {
          text: 'Inject Context',
          link: '/core/guides/inject-context',
        },
        {
          text: 'Virtualization',
          link: '/core/guides/virtualization',
        },
        {
          text: 'Migration',
          link: '/core/guides/migration',
        },
      ],
    },
    {
      text: 'Components',
      icon: 'lucide:box',
      items: [
        {
          text: 'General',
          items: [
            { text: 'Accordion', link: '/core/components/a-accordion' },
            { text: 'Alert Dialog', link: '/core/components/a-alert-dialog' },
            { text: 'Aspect Ratio', link: '/core/components/a-aspect-ratio' },
            { text: 'Avatar', link: '/core/components/a-avatar' },
            { text: 'Collapsible', link: '/core/components/a-collapsible' },
            { text: 'Context Menu', link: '/core/components/a-context-menu' },
            { text: 'Dialog', link: '/core/components/a-dialog' },
            { text: 'Dropdown Menu', link: '/core/components/a-dropdown-menu' },
            { text: 'Hover Card', link: '/core/components/a-hover-card' },
            { text: 'Menubar', link: '/core/components/a-menubar' },
            {
              text: 'Navigation Menu',
              link: '/core/components/a-navigation-menu',
            },
            { text: 'Pagination', link: '/core/components/a-pagination' },
            { text: 'Popover', link: '/core/components/a-popover' },
            { text: 'Progress', link: '/core/components/a-progress' },
            { text: 'Scroll Area', link: '/core/components/a-scroll-area' },
            { text: 'Separator', link: '/core/components/a-separator' },
            { text: 'Splitter', link: '/core/components/a-splitter' },
            {
              text: 'Stepper',
              link: '/core/components/a-stepper',
            },
            { text: 'Tabs', link: '/core/components/a-tabs' },
            { text: 'Toast', link: '/core/components/a-toast' },
            { text: 'Toolbar', link: '/core/components/a-toolbar' },
            { text: 'Tooltip', link: '/core/components/a-tooltip' },
            {
              text: 'Tree',
              link: '/core/components/a-tree',
            },
          ],
        },
        {
          text: 'Form',
          items: [
            { text: 'Checkbox', link: '/core/components/a-checkbox' },
            { text: 'Combobox', link: '/core/components/a-combobox' },
            { text: 'Editable', link: '/core/components/a-editable' },
            { text: 'Listbox', link: '/core/components/a-listbox' },
            { text: 'Number Field', link: '/core/components/a-number-field' },
            { text: 'Label', link: '/core/components/a-label' },
            { text: 'Pin Input', link: '/core/components/a-pin-input' },
            { text: 'Radio Group', link: '/core/components/a-radio-group' },
            { text: 'Select', link: '/core/components/a-select' },
            { text: 'Slider', link: '/core/components/a-slider' },
            { text: 'Switch', link: '/core/components/a-switch' },
            { text: 'Tags Input', link: '/core/components/a-tags-input' },
            { text: 'Toggle', link: '/core/components/a-toggle' },
            { text: 'Toggle Group', link: '/core/components/a-toggle-group' },
          ],
        },
        {
          text: 'Dates',
          items: [
            {
              text: 'Calendar',
              link: '/core/components/a-calendar',
            },
            {
              text: 'Date Field',
              link: '/core/components/a-date-field',
            },
            {
              text: 'Date Picker',
              link: '/core/components/a-date-picker',
            },
            {
              text: 'Date Range Field',
              link: '/core/components/a-date-range-field',
            },
            {
              text: 'Date Range Picker',
              link: '/core/components/a-date-range-picker',
            },
            {
              text: 'Range Calendar',
              link: '/core/components/a-range-calendar',
            },
            {
              text: 'Time Field',
              link: '/core/components/a-time-field',
            },
          ],
        },
      ],
    },
    {
      text: 'Utilities',
      icon: 'lucide:wrench',
      items: [
        {
          text: 'Component',
          items: [
            { text: 'Config Provider', link: '/core/utilities/config-provider' },
            { text: 'Focus Scope', link: '/core/utilities/focus-scope' },
            { text: 'Presence', link: '/core/utilities/presence' },
            { text: 'Primitive', link: '/core/utilities/primitive' },
            { text: 'Roving Focus', link: '/core/utilities/roving-focus' },
            { text: 'Slot', link: '/core/utilities/slot' },
            { text: 'Visually Hidden', link: '/core/utilities/visually-hidden' },
          ],
        },
        {
          text: 'Composable',
          items: [
            { text: 'useId', link: '/core/utilities/use-id' },
            {
              text: 'useDateFormatter',
              link: '/core/utilities/use-date-formatter',
            },
            {
              text: 'useEmitAsProps',
              link: '/core/utilities/use-emit-as-props',
            },
            { text: 'useFilter', link: '/core/utilities/use-filter' },
            {
              text: 'useForwardExpose',
              link: '/core/utilities/use-forward-expose',
            },
            {
              text: 'useForwardProps',
              link: '/core/utilities/use-forward-props',
            },
            {
              text: 'useForwardPropsEmits',
              link: '/core/utilities/use-forward-props-emits',
            },
          ],
        },
      ],
    },
  ],
};

export const pohonSidebarItems: DefaultTheme.SidebarItem = {
  text: 'Pohon',
  icon: 'icomoon-free:tree',
  items: [
    {
      text: 'Overview',
      icon: 'lucide:rocket',
      items: [
        { text: 'Introduction', link: '/pohon/overview/introduction' },
        { text: 'Getting Started', link: '/pohon/overview/getting-started' },
        { text: 'Installation', link: '/pohon/overview/installation' },
        { text: 'Accessibility', link: '/pohon/overview/accessibility' },
        { text: 'Releases', link: '/pohon/overview/releases' },
      ],
    },
    {
      text: 'Components',
      icon: 'lucide:box',
      items: [
        {
          text: 'General',
          items: [
            { text: 'Accordion', link: '/pohon/components/a-accordion' },
            { text: 'Alert Dialog', link: '/pohon/components/a-alert-dialog' },
            { text: 'Aspect Ratio', link: '/pohon/components/a-aspect-ratio' },
            { text: 'Avatar', link: '/pohon/components/a-avatar' },
            { text: 'Collapsible', link: '/pohon/components/a-collapsible' },
            { text: 'Context Menu', link: '/pohon/components/a-context-menu' },
            { text: 'Dialog', link: '/pohon/components/a-dialog' },
            { text: 'Dropdown Menu', link: '/pohon/components/a-dropdown-menu' },
            { text: 'Hover Card', link: '/pohon/components/a-hover-card' },
            { text: 'Menubar', link: '/pohon/components/a-menubar' },
            {
              text: 'Navigation Menu',
              link: '/pohon/components/a-navigation-menu',
            },
            { text: 'Pagination', link: '/pohon/components/a-pagination' },
            { text: 'Popover', link: '/pohon/components/a-popover' },
            { text: 'Progress', link: '/pohon/components/a-progress' },
            { text: 'Scroll Area', link: '/pohon/components/a-scroll-area' },
            { text: 'Separator', link: '/pohon/components/a-separator' },
            { text: 'Splitter', link: '/pohon/components/a-splitter' },
            {
              text: 'Stepper',
              link: '/pohon/components/a-stepper',
            },
            { text: 'Tabs', link: '/pohon/components/a-tabs' },
            { text: 'Toast', link: '/pohon/components/a-toast' },
            { text: 'Toolbar', link: '/pohon/components/a-toolbar' },
            { text: 'Tooltip', link: '/pohon/components/a-tooltip' },
            {
              text: 'Tree',
              link: '/pohon/components/a-tree',
            },
          ],
        },
        {
          text: 'Form',
          items: [
            { text: 'Checkbox', link: '/pohon/components/a-checkbox' },
            { text: 'Combobox', link: '/pohon/components/a-combobox' },
            { text: 'Editable', link: '/pohon/components/a-editable' },
            { text: 'Listbox', link: '/pohon/components/a-listbox' },
            { text: 'Number Field', link: '/pohon/components/a-number-field' },
            { text: 'Label', link: '/pohon/components/a-label' },
            { text: 'Pin Input', link: '/pohon/components/a-pin-input' },
            { text: 'Radio Group', link: '/pohon/components/a-radio-group' },
            { text: 'Select', link: '/pohon/components/a-select' },
            { text: 'Slider', link: '/pohon/components/a-slider' },
            { text: 'Switch', link: '/pohon/components/a-switch' },
            { text: 'Tags Input', link: '/pohon/components/a-tags-input' },
            { text: 'Toggle', link: '/pohon/components/a-toggle' },
            { text: 'Toggle Group', link: '/pohon/components/a-toggle-group' },
          ],
        },
        {
          text: 'Dates',
          items: [
            {
              text: 'Calendar',
              link: '/pohon/components/a-calendar',
            },
            {
              text: 'Date Field',
              link: '/pohon/components/a-date-field',
            },
            {
              text: 'Date Picker',
              link: '/pohon/components/a-date-picker',
            },
            {
              text: 'Date Range Field',
              link: '/pohon/components/a-date-range-field',
            },
            {
              text: 'Date Range Picker',
              link: '/pohon/components/a-date-range-picker',
            },
            {
              text: 'Range Calendar',
              link: '/pohon/components/a-range-calendar',
            },
            {
              text: 'Time Field',
              link: '/pohon/components/a-time-field',
            },
          ],
        },
      ],
    },
  ],
};
