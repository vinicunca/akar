<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
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
  toggle?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
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
  title?: (props?: {}) => Array<VNode>;
  leading?: (props: DashboardNavbarSlotsProps & { pohon: DashboardNavbar['pohon'] }) => Array<VNode>;
  trailing?: (props: DashboardNavbarSlotsProps & { pohon: DashboardNavbar['pohon'] }) => Array<VNode>;
  left?: (props: DashboardNavbarSlotsProps) => Array<VNode>;
  default?: (props: DashboardNavbarSlotsProps) => Array<VNode>;
  right?: (props: DashboardNavbarSlotsProps) => Array<VNode>;
  toggle?: (props: DashboardNavbarSlotsProps & { pohon: DashboardNavbar['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { isObjectType } from '@vinicunca/perkakas';
import { createReusableTemplate } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useDashboard } from '../utils/dashboard';
import { uv } from '../utils/uv';
import PDashboardSidebarToggle from './dashboard-sidebar-toggle.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PDashboardNavbarProps>(), {
  toggle: true,
  toggleSide: 'left',
});
const slots = defineSlots<PDashboardNavbarSlots>();

const appConfig = useAppConfig() as DashboardNavbar['AppConfig'];
const pohonProp = useComponentPohon('dashboardNavbar', props);
const dashboardContext = useDashboard({});

const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.dashboardNavbar || {}) })());
</script>

<template>
  <DefineToggleTemplate>
    <slot
      name="toggle"
      v-bind="{ ...dashboardContext, pohon }"
    >
      <PDashboardSidebarToggle
        v-if="toggle"
        v-bind="(isObjectType(toggle) ? toggle : {})"
        :side="toggleSide"
        data-slot="toggle"
        :class="pohon.toggle({ class: pohonProp?.toggle, toggleSide })"
      />
    </slot>
  </DefineToggleTemplate>

  <APrimitive
    :as="as"
    v-bind="$attrs"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      data-slot="left"
      :class="pohon.left({ class: pohonProp?.left })"
    >
      <ReuseToggleTemplate v-if="toggleSide === 'left'" />

      <slot
        name="left"
        v-bind="dashboardContext"
      >
        <slot
          name="leading"
          v-bind="{ ...dashboardContext, pohon }"
        >
          <PIcon
            v-if="icon"
            :name="icon"
            data-slot="icon"
            :class="pohon.icon({ class: pohonProp?.icon })"
          />
        </slot>

        <h1
          data-slot="title"
          :class="pohon.title({ class: pohonProp?.title })"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </h1>

        <slot
          name="trailing"
          v-bind="{ ...dashboardContext, pohon }"
        />
      </slot>
    </div>

    <div
      v-if="!!slots.default"
      data-slot="center"
      :class="pohon.center({ class: pohonProp?.center })"
    >
      <slot v-bind="dashboardContext" />
    </div>

    <div
      data-slot="right"
      :class="pohon.right({ class: pohonProp?.right })"
    >
      <slot
        name="right"
        v-bind="dashboardContext"
      />

      <ReuseToggleTemplate v-if="toggleSide === 'right'" />
    </div>
  </APrimitive>
</template>
