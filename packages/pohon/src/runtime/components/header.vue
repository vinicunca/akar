<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type {
  PButtonProps,
  PDialogProps,
  PDrawerProps,
  PLinkPropsKeys,
  PSlideoverProps,
} from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/header';

type Header = ComponentConfig<typeof theme, AppConfig, 'header'>;

type HeaderMode = 'modal' | 'slideover' | 'drawer';
type HeaderMenu<T> = T extends 'modal' ? PDialogProps : T extends 'slideover' ? PSlideoverProps : T extends 'drawer' ? PDrawerProps : never;

export interface PHeaderProps<T extends HeaderMode = HeaderMode> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'header'
   */
  as?: any;
  title?: string;
  to?: string;
  /**
   * The mode of the header menu.
   * @defaultValue 'modal'
   */
  mode?: T;
  /**
   * The props for the header menu component.
   */
  menu?: HeaderMenu<T>;
  /**
   * Customize the toggle button to open the header menu displayed when the `content` slot is used.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  toggle?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The side to render the toggle button on.
   * @defaultValue 'right'
   */
  toggleSide?: 'left' | 'right';
  /**
   * Automatically close when route changes.
   * @defaultValue true
   */
  autoClose?: boolean;
  class?: any;
  pohon?: Header['slots'];
}

export interface PHeaderSlots {
  title?: (props?: {}) => Array<VNode>;
  left?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
  right?: (props?: {}) => Array<VNode>;
  toggle?: (props: { open: boolean; toggle: () => void; pohon: Header['pohon'] }) => Array<VNode>;
  top?: (props?: {}) => Array<VNode>;
  bottom?: (props?: {}) => Array<VNode>;
  body?: (props?: {}) => Array<VNode>;
  content?: (props: { close?: () => void }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends HeaderMode">
import { isObjectType } from '@vinicunca/perkakas';
import { createReusableTemplate } from '@vueuse/core';
import { APrimitive } from 'akar';
import { defu } from 'defu';
import { computed, toRef, watch } from 'vue';
import { useAppConfig, useRoute } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { getSlotChildrenText } from '../utils';
import { uv } from '../utils/uv';
import PButton from './button.vue';
import PContainer from './container.vue';
import PDialog from './dialog.vue';
import PDrawer from './drawer.vue';
import PLink from './link.vue';
import PSlideover from './slideover.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PHeaderProps<T>>(),
  {
    as: 'header',
    mode: 'modal' as never,
    autoClose: true,
    toggle: true,
    toggleSide: 'right',
    to: '/',
    title: 'Pohon',
  },
);
const slots = defineSlots<PHeaderSlots>();

const open = defineModel<boolean>('open', { default: false });

const route = useRoute();
const { t } = useLocale();
const appConfig = useAppConfig() as Header['AppConfig'];
const pohonProp = useComponentPohon('header', props);

const [DefineLeftTemplate, ReuseLeftTemplate] = createReusableTemplate();
const [DefineRightTemplate, ReuseRightTemplate] = createReusableTemplate();
const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();

const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || 'Pohon').trim();
});

watch(() => route.fullPath, () => {
  if (!props.autoClose) {
    return;
  }

  open.value = false;
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.header || {}) })());

const Menu = computed(() => ({
  slideover: PSlideover,
  modal: PDialog,
  drawer: PDrawer,
})[props.mode as HeaderMode]);

const menuProps = toRef(() => defu(props.menu, {}, props.mode === 'modal' ? { fullscreen: true, transition: false } : {}) as HeaderMenu<T>);

function toggleOpen() {
  open.value = !open.value;
}
</script>

<template>
  <DefineToggleTemplate>
    <slot
      name="toggle"
      :open="open"
      :toggle="toggleOpen"
      :pohon="pohon"
    >
      <PButton
        v-if="toggle"
        color="neutral"
        variant="ghost"
        :aria-label="open ? t('header.close') : t('header.open')"
        :icon="open ? appConfig.pohon.icons.close : appConfig.pohon.icons.menu"
        v-bind="(isObjectType(toggle) ? toggle : {})"
        data-slot="toggle"
        :class="pohon.toggle({ class: pohonProp?.toggle, toggleSide })"
        @click="toggleOpen"
      />
    </slot>
  </DefineToggleTemplate>

  <DefineLeftTemplate>
    <div
      data-slot="left"
      :class="pohon.left({ class: pohonProp?.left })"
    >
      <ReuseToggleTemplate v-if="toggleSide === 'left'" />

      <slot name="left">
        <PLink
          :to="to"
          :aria-label="ariaLabel"
          data-slot="title"
          :class="pohon.title({ class: pohonProp?.title })"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </PLink>
      </slot>
    </div>
  </DefineLeftTemplate>

  <DefineRightTemplate>
    <div
      data-slot="right"
      :class="pohon.right({ class: pohonProp?.right })"
    >
      <slot name="right" />

      <ReuseToggleTemplate v-if="toggleSide === 'right'" />
    </div>
  </DefineRightTemplate>

  <APrimitive
    :as="as"
    v-bind="$attrs"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <slot name="top" />

    <PContainer
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <ReuseLeftTemplate />

      <div
        data-slot="center"
        :class="pohon.center({ class: pohonProp?.center })"
      >
        <slot />
      </div>

      <ReuseRightTemplate />
    </PContainer>

    <slot name="bottom" />
  </APrimitive>

  <Menu
    v-model:open="open"
    :title="t('header.title')"
    :description="t('header.description')"
    v-bind="menuProps"
    :pohon="{
      overlay: pohon.overlay({ class: pohonProp?.overlay }),
      content: pohon.content({ class: pohonProp?.content }),
    }"
  >
    <template #content="contentData">
      <slot
        name="content"
        v-bind="contentData"
      >
        <div
          v-if="mode !== 'drawer'"
          data-slot="header"
          :class="pohon.header({ class: pohonProp?.header })"
        >
          <ReuseLeftTemplate />

          <ReuseRightTemplate />
        </div>

        <div
          data-slot="body"
          :class="pohon.body({ class: pohonProp?.body })"
        >
          <slot name="body" />
        </div>
      </slot>
    </template>
  </Menu>
</template>
