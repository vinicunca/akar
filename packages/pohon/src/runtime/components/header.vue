<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  PButtonProps,
  PDialogProps,
  PDrawerProps,
  PSlideoverProps,
} from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/header';

type Header = ComponentConfig<typeof theme, AppConfig, 'header'>;

type HeaderMode = 'dialog' | 'slideover' | 'drawer';
type HeaderMenu<T> = T extends 'dialog' ? PDialogProps : T extends 'slideover' ? PSlideoverProps : T extends 'drawer' ? PDrawerProps : never;

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
   * @defaultValue 'dialog'
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
  toggle?: boolean | Partial<PButtonProps>;
  /**
   * The side to render the toggle button on.
   * @defaultValue 'right'
   */
  toggleSide?: 'left' | 'right';
  class?: any;
  pohon?: Header['slots'];
}

export interface PHeaderSlots {
  title: (props?: object) => any;
  left: (props?: object) => any;
  default: (props?: object) => any;
  right: (props?: object) => any;
  toggle: (props: { open: boolean; toggle: () => void; pohon: Header['pohon'] }) => any;
  top: (props?: object) => any;
  bottom: (props?: object) => any;
  body: (props?: object) => any;
  content: (props: { close?: () => void }) => any;
}
</script>

<script setup lang="ts" generic="T extends HeaderMode">
import { useAppConfig, useRoute } from '#imports';
import { createReusableTemplate } from '@vueuse/core';
import { APrimitive } from 'akar';
import { defu } from 'defu';
import { computed, toRef, watch } from 'vue';
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
    mode: 'dialog' as never,
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

const [DefineLeftTemplate, ReuseLeftTemplate] = createReusableTemplate();
const [DefineRightTemplate, ReuseRightTemplate] = createReusableTemplate();
const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();

const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || 'Pohon').trim();
});

watch(() => route.fullPath, () => {
  open.value = false;
});

const pohon = computed(() =>
  uv({ extend: uv(theme), ...(appConfig.pohon?.header || {}) })(),
);

const MenuComponent = computed(() => ({
  slideover: PSlideover,
  dialog: PDialog,
  drawer: PDrawer,
})[props.mode as HeaderMode]);

const menuProps = toRef(() =>
  defu(
    props.menu,
    {
      content: {
        onOpenAutoFocus: (event: Event) => event.preventDefault(),
      },
    },
    props.mode === 'dialog' ? { fullscreen: true } : {},
  ) as HeaderMenu<T>,
);

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
        v-bind="(typeof toggle === 'object' ? toggle as Partial<PButtonProps> : {})"
        :class="pohon.toggle({ class: props.pohon?.toggle, toggleSide })"
        data-pohon="header-toggle"
        @click="toggleOpen"
      />
    </slot>
  </DefineToggleTemplate>

  <DefineLeftTemplate>
    <div
      :class="pohon.left({ class: props.pohon?.left })"
      data-pohon="header-left"
    >
      <ReuseToggleTemplate v-if="toggleSide === 'left'" />

      <slot name="left">
        <PLink
          :to="to"
          :aria-label="ariaLabel"
          :class="pohon.title({ class: props.pohon?.title })"
          data-pohon="header-title"
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
      :class="pohon.right({ class: props.pohon?.right })"
      data-pohon="header-right"
    >
      <slot name="right" />

      <ReuseToggleTemplate v-if="toggleSide === 'right'" />
    </div>
  </DefineRightTemplate>

  <APrimitive
    :as="as"
    v-bind="$attrs"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    data-pohon="header-root"
  >
    <slot name="top" />

    <PContainer
      :class="pohon.container({ class: props.pohon?.container })"
      data-pohon="header-container"
    >
      <ReuseLeftTemplate />

      <div
        :class="pohon.center({ class: props.pohon?.center })"
        data-pohon="header-center"
      >
        <slot />
      </div>

      <ReuseRightTemplate />
    </PContainer>

    <slot name="bottom" />
  </APrimitive>

  <MenuComponent
    v-model:open="open"
    :title="t('header.title')"
    :description="t('header.description')"
    v-bind="menuProps"
    :pohon="{
      overlay: pohon.overlay({ class: props.pohon?.overlay }),
      content: pohon.content({ class: props.pohon?.content }),
    }"
  >
    <template #content="contentData">
      <slot
        name="content"
        v-bind="contentData"
      >
        <div
          v-if="mode !== 'drawer'"
          :class="pohon.header({ class: props.pohon?.header })"
          data-pohon="header-header"
        >
          <ReuseLeftTemplate />

          <ReuseRightTemplate />
        </div>

        <div
          :class="pohon.body({ class: props.pohon?.body })"
          data-pohon="header-body"
        >
          <slot name="body" />
        </div>
      </slot>
    </template>
  </MenuComponent>
</template>
