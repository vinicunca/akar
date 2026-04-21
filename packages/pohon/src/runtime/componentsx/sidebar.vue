<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { DrawerProps, ModalProps, PButtonProps, PIconProps, PLinkPropsKeys, SlideoverProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/sidebar';

type Sidebar = ComponentConfig<typeof theme, AppConfig, 'sidebar'>;

type SidebarState = 'expanded' | 'collapsed';
type SidebarMode = 'modal' | 'slideover' | 'drawer';
type SidebarMenu<T> = T extends 'modal' ? ModalProps : T extends 'slideover' ? SlideoverProps : T extends 'drawer' ? DrawerProps : never;

export interface SidebarProps<T extends SidebarMode = SidebarMode> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'aside'
   */
  as?: any;
  /**
   * The visual variant of the sidebar.
   * @defaultValue 'sidebar'
   */
  variant?: Sidebar['variants']['variant'];
  /**
   * The collapse behavior of the sidebar.
   * - `offcanvas`: The sidebar slides out of view completely.
   * - `icon`: The sidebar shrinks to icon-only width.
   * - `none`: The sidebar is not collapsible.
   * @defaultValue 'offcanvas'
   */
  collapsible?: Sidebar['variants']['collapsible'];
  /**
   * The side to render the sidebar on.
   * @defaultValue 'left'
   */
  side?: Sidebar['variants']['side'];
  /**
   * The title displayed in the sidebar header.
   */
  title?: string;
  /**
   * The description displayed in the sidebar header.
   */
  description?: string;
  /**
   * Display a close button to collapse the sidebar.
   * Only renders when `collapsible` is not `none`.
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @defaultValue false
   */
  close?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  closeIcon?: PIconProps['name'];
  /**
   * Display a rail on the sidebar edge to toggle collapse.
   * Only renders when `collapsible` is not `none`.
   * @defaultValue false
   */
  rail?: boolean;
  /**
   * The mode of the sidebar menu on mobile.
   * @defaultValue 'slideover'
   */
  mode?: T;
  /**
   * The props for the sidebar menu component on mobile.
   */
  menu?: SidebarMenu<T>;
  class?: any;
  pohon?: Sidebar['slots'];
}

export interface SidebarSlots {
  header?: (props: { state: SidebarState; open: boolean; close: () => void }) => Array<VNode>;
  title?: (props: { state: SidebarState }) => Array<VNode>;
  description?: (props: { state: SidebarState }) => Array<VNode>;
  actions?: (props: { state: SidebarState }) => Array<VNode>;
  close?: (props: { pohon: Sidebar['pohon']; state: SidebarState }) => Array<VNode>;
  default?: (props: { state: SidebarState; open: boolean; close: () => void }) => Array<VNode>;
  footer?: (props: { state: SidebarState; open: boolean; close: () => void }) => Array<VNode>;
  rail?: (props: { pohon: Sidebar['pohon']; state: SidebarState }) => Array<VNode>;
  content?: (props: { close: () => void }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends SidebarMode">
import { useAppConfig } from '#imports';
import { createReusableTemplate, useMediaQuery } from '@vueuse/core';
import { Primitive } from 'akar';
import { defu } from 'defu';
import { computed, onMounted, ref, toRef, watch } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PButton from './button.vue';
import UDrawer from './Drawer.vue';
import UModal from './Modal.vue';
import USlideover from './Slideover.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<SidebarProps<T>>(), {
  as: 'aside',
  variant: 'sidebar',
  collapsible: 'offcanvas',
  side: 'left',
  close: false,
  rail: false,
  mode: 'slideover' as never,
});
const slots = defineSlots<SidebarSlots>();

const [DefineInnerTemplate, ReuseInnerTemplate] = createReusableTemplate();
const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();

const mediaQuery = useMediaQuery('(max-width: 1023px)');
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
const isMobile = computed(() => isMounted.value && mediaQuery.value);

// Viewport-aware open model: on desktop controls expanded/collapsed, on mobile controls the sheet
const modelOpen = defineModel<boolean>('open', { default: true });
const openMobile = ref(false);

// Saved desktop state so viewport transitions don't lose it
const desktopOpen = ref(modelOpen.value);

const open = computed({
  get: () => isMobile.value ? openMobile.value : modelOpen.value,
  set: (value: boolean) => {
    if (isMobile.value) {
      openMobile.value = value;
    } else {
      modelOpen.value = value;
    }
  },
});

// Handle viewport transitions and initial mobile state
watch(isMobile, (mobile) => {
  if (mobile) {
    // Save desktop state and align model to mobile (closed)
    desktopOpen.value = modelOpen.value;
    modelOpen.value = false;
  } else {
    // Restore desktop state
    modelOpen.value = desktopOpen.value;
  }
}, { immediate: true });

// Sync model changes into mobile state
watch(modelOpen, (value) => {
  if (isMobile.value) {
    openMobile.value = value;
  }
});

// Sync mobile dismissal (overlay click, swipe) back to model so toggle stays in sync
watch(openMobile, (value) => {
  if (isMobile.value) {
    modelOpen.value = value;
  }
});

const { t } = useLocale();
const appConfig = useAppConfig() as Sidebar['AppConfig'];
const pohonProp = useComponentPohon('sidebar', props);

const state = computed<SidebarState>(() => open.value ? 'expanded' : 'collapsed');

// Close button only works when collapsible is not 'none'
const canClose = computed(() => (props.close && props.collapsible !== 'none') || isMobile.value);

function closeSidebar() {
  open.value = false;
}

const hasHeader = computed(() => !!slots.header || props.title || !!slots.title || props.description || !!slots.description || !!slots.actions || canClose.value || !!slots.close);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.sidebar || {}) })({
  side: props.side,
  variant: props.variant,
  collapsible: props.collapsible,
}));

const Menu = computed(() => ({
  slideover: USlideover,
  modal: UModal,
  drawer: UDrawer,
})[props.mode as SidebarMode]);

const menuProps = toRef(() => defu(props.menu, {
  title: props.title,
  description: props.description,
  close: props.close,
  closeIcon: props.closeIcon,
}, props.mode === 'modal' ? { } : props.mode === 'slideover' ? { side: props.side, inset: props.variant === 'inset' } : {}) as SidebarMenu<T>);
</script>

<template>
  <DefineContentTemplate>
    <div
      v-if="hasHeader"
      data-slot="header"
      :class="pohon.header({ class: pohonProp?.header })"
    >
      <slot
        name="header"
        :state="state"
        :open="open"
        :close="closeSidebar"
      >
        <div
          v-if="title || !!slots.title || description || !!slots.description"
          data-slot="wrapper"
          :class="pohon.wrapper({ class: pohonProp?.wrapper })"
        >
          <p
            v-if="title || !!slots.title"
            data-slot="title"
            :class="pohon.title({ class: pohonProp?.title })"
          >
            <slot
              name="title"
              :state="state"
            >
              {{ title }}
            </slot>
          </p>

          <p
            v-if="description || !!slots.description"
            data-slot="description"
            :class="pohon.description({ class: pohonProp?.description })"
          >
            <slot
              name="description"
              :state="state"
            >
              {{ description }}
            </slot>
          </p>
        </div>

        <div
          v-if="!!slots.actions || canClose"
          data-slot="actions"
          :class="pohon.actions({ class: pohonProp?.actions })"
        >
          <slot
            name="actions"
            :state="state"
          />

          <slot
            name="close"
            :state="state"
            :pohon="pohon"
          >
            <PButton
              v-if="canClose"
              :icon="closeIcon || appConfig.pohon.icons.close"
              color="neutral"
              variant="ghost"
              :aria-label="t('sidebar.close')"
              v-bind="(typeof props.close === 'object' ? props.close : {})"
              data-slot="close"
              :class="pohon.close({ class: pohonProp?.close })"
              @click="closeSidebar"
            />
          </slot>
        </div>
      </slot>
    </div>

    <div
      data-slot="body"
      :class="pohon.body({ class: pohonProp?.body })"
    >
      <slot
        :state="state"
        :open="open"
        :close="closeSidebar"
      />
    </div>

    <div
      v-if="!!slots.footer"
      data-slot="footer"
      :class="pohon.footer({ class: pohonProp?.footer })"
    >
      <slot
        name="footer"
        :state="state"
        :open="open"
        :close="closeSidebar"
      />
    </div>
  </DefineContentTemplate>

  <DefineInnerTemplate>
    <div
      data-slot="inner"
      :class="pohon.inner({ class: pohonProp?.inner })"
    >
      <ReuseContentTemplate />
    </div>
  </DefineInnerTemplate>

  <!-- Non-collapsible: simple inline sidebar -->
  <Primitive
    v-if="collapsible === 'none'"
    :as="as"
    v-bind="$attrs"
    data-slot="root"
    :data-variant="variant"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <ReuseInnerTemplate />
  </Primitive>

  <!-- Collapsible: fixed sidebar with gap spacer + mobile menu -->
  <template v-else>
    <Primitive
      :as="as"
      v-bind="$attrs"
      data-slot="root"
      :data-state="state"
      :data-collapsible="state === 'collapsed' ? collapsible : undefined"
      :data-variant="variant"
      :data-side="side"
      :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    >
      <!-- Gap spacer: reserves layout space for the fixed sidebar -->
      <div
        data-slot="gap"
        :data-state="state"
        :class="pohon.gap({ class: pohonProp?.gap })"
      />

      <!-- Fixed container: the actual visible sidebar -->
      <div
        data-slot="container"
        :data-state="state"
        :class="pohon.container({ class: pohonProp?.container })"
      >
        <ReuseInnerTemplate />

        <slot
          v-if="rail"
          name="rail"
          :state="state"
          :pohon="pohon"
        >
          <button
            data-slot="rail"
            :data-state="state"
            :aria-label="t('sidebar.toggle')"
            :tabindex="-1"
            :class="pohon.rail({ class: pohonProp?.rail })"
            @click="open = !open"
          />
        </slot>
      </div>
    </Primitive>

    <!-- Mobile menu -->
    <Menu
      v-if="isMobile"
      v-model:open="openMobile"
      v-bind="menuProps"
    >
      <template #content="contentData">
        <slot
          name="content"
          v-bind="contentData"
          :close="closeSidebar"
        >
          <ReuseContentTemplate />
        </slot>
      </template>
    </Menu>
  </template>
</template>
