<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PButtonProps, PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import type { DashboardContext } from '../utils/dashboard';
import theme from '#build/pohon/dashboard-navbar';

type DashboardNavbar = ComponentConfig<typeof theme, AppConfig, 'dashboardNavbar'>;

export interface PDashboardNavbarProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon displayed next to the title.
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  title?: string;
  /**
   * Customize the toggle button to open the sidebar.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @defaultValue true
   */
  toggle?: boolean | Partial<PButtonProps>;
  /**
   * The side to render the toggle button on.
   * @defaultValue 'left'
   */
  toggleSide?: 'left' | 'right';
  class?: any;
  pohon?: DashboardNavbar['slots'];
}

type DashboardNavbarSlotsProps = Omit<DashboardContext, 'storage' | 'storageKey' | 'persistent' | 'unit'>;

export interface PDashboardNavbarSlots {
  title: (props?: object) => any;
  leading: (props: DashboardNavbarSlotsProps) => any;
  trailing: (props: DashboardNavbarSlotsProps) => any;
  left: (props: DashboardNavbarSlotsProps) => any;
  default: (props: DashboardNavbarSlotsProps) => any;
  right: (props: DashboardNavbarSlotsProps) => any;
  toggle: (props: DashboardNavbarSlotsProps) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { createReusableTemplate } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useDashboard } from '../utils/dashboard';
import { uv } from '../utils/uv';
import PDashboardSidebarToggle from './dashboard-sidebar-toggle.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PDashboardNavbarProps>(),
  {
    toggle: true,
    toggleSide: 'left',
  },
);
const slots = defineSlots<PDashboardNavbarSlots>();

const appConfig = useAppConfig() as DashboardNavbar['AppConfig'];
const dashboardContext = useDashboard({});

const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardNavbar || {}),
  })(),
);
</script>

<template>
  <DefineToggleTemplate>
    <slot
      name="toggle"
      v-bind="dashboardContext"
    >
      <PDashboardSidebarToggle
        v-if="toggle"
        v-bind="(typeof toggle === 'object' ? toggle as Partial<PButtonProps> : {})"
        :side="toggleSide"
        :class="pohon.toggle({ class: props.pohon?.toggle, toggleSide })"
      />
    </slot>
  </DefineToggleTemplate>

  <APrimitive
    :as="as"
    v-bind="$attrs"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <div :class="pohon.left({ class: props.pohon?.left })">
      <ReuseToggleTemplate v-if="toggleSide === 'left'" />

      <slot
        name="left"
        v-bind="dashboardContext"
      >
        <slot
          name="leading"
          v-bind="dashboardContext"
        >
          <PIcon
            v-if="icon"
            :name="icon"
            :class="pohon.icon({ class: props.pohon?.icon })"
          />
        </slot>

        <h1 :class="pohon.title({ class: props.pohon?.title })">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>

        <slot
          name="trailing"
          v-bind="dashboardContext"
        />
      </slot>
    </div>

    <div
      v-if="!!slots.default"
      :class="pohon.center({ class: props.pohon?.center })"
    >
      <slot v-bind="dashboardContext" />
    </div>

    <div :class="pohon.right({ class: props.pohon?.right })">
      <slot
        name="right"
        v-bind="dashboardContext"
      />

      <ReuseToggleTemplate v-if="toggleSide === 'right'" />
    </div>
  </APrimitive>
</template>
