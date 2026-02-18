<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PButtonProps, PIconProps, PLinkProps, PLinkPropsKeys } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/banner';

type Banner = ComponentConfig<typeof theme, AppConfig, 'banner'>;

export interface PBannerProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * A unique id saved to local storage to remember if the banner has been dismissed.
   * Change this value to show the banner again.
   * @defaultValue '1'
   */
  id?: string;
  /**
   * The icon displayed next to the title.
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  title?: string;
  /**
   * Display a list of actions next to the title.
   * `{ color: 'neutral', size: 'xs' }`{lang="ts-type"}
   */
  actions?: Array<PButtonProps>;
  to?: PLinkProps['to'];
  target?: PLinkProps['target'];
  /**
   * @defaultValue 'primary'
   */
  color?: Banner['variants']['color'];
  /**
   * Display a close button to dismiss the banner.
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @emits `close`
   * @defaultValue false
   */
  close?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  closeIcon?: PIconProps['name'];
  class?: any;
  pohon?: Banner['slots'];
}

export interface PBannerSlots {
  leading: (props: { pohon: Banner['pohon'] }) => any;
  title: (props?: object) => any;
  actions: (props?: object) => any;
  close: (props: { pohon: Banner['pohon'] }) => any;
}

export interface PBannerEmits {
  close: [];
}
</script>

<script setup lang="ts">
import { useAppConfig, useHead } from '#imports';
import { APrimitive } from 'akar';
import { computed, watch } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PButton from './button.vue';
import PContainer from './container.vue';
import PIcon from './icon.vue';
import PLink from './link.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<PBannerProps>();
const emits = defineEmits<PBannerEmits>();
const slots = defineSlots<PBannerSlots>();
const { t } = useLocale();
const appConfig = useAppConfig() as Banner['AppConfig'];
const pohonProp = useComponentPohon('banner', props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.banner || {}),
  })({
    color: props.color,
    to: !!props.to,
  }),
);

const id = computed(() => `banner-${props.id || '1'}`);

watch(id, (newId) => {
  if (typeof document === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  const isClosed = localStorage.getItem(newId) === 'true';
  const htmlElement = document.querySelector('html');

  htmlElement?.classList.toggle('hide-banner', isClosed);
});

useHead({
  script: [{
    key: 'prehydrate-template-banner',
    innerHTML: `
            if (localStorage.getItem(${JSON.stringify(id.value)}) === 'true') {
              document.querySelector('html').classList.add('hide-banner')
            }`.replace(/\s+/g, ' '),
    type: 'text/javascript',
  }],
});

function onClose() {
  localStorage.setItem(id.value, 'true');
  document.querySelector('html')?.classList.add('hide-banner');
  emits('close');
}
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="banner-root"
  >
    <PLink
      v-if="to"
      :aria-label="title"
      v-bind="{ to, target, ...$attrs }"
      class="focus:outline-none"
      tabindex="-1"
      raw
    >
      <span
        class="inset-0 absolute"
        aria-hidden="true"
      />
    </PLink>

    <PContainer
      :class="pohon.container({ class: pohonProp?.container })"
      data-pohon="banner-container"
    >
      <div
        :class="pohon.left({ class: pohonProp?.left })"
        data-pohon="banner-left"
      />

      <div
        :class="pohon.center({ class: pohonProp?.center })"
        data-pohon="banner-center"
      >
        <slot
          name="leading"
          :pohon="pohon"
        >
          <PIcon
            v-if="icon"
            :name="icon"
            :class="pohon.icon({ class: pohonProp?.icon })"
            data-pohon="banner-icon"
          />
        </slot>

        <div
          v-if="title || !!slots.title"
          :class="pohon.title({ class: pohonProp?.title })"
          data-pohon="banner-title"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <div
          v-if="actions?.length || !!slots.actions"
          :class="pohon.actions({ class: pohonProp?.actions })"
          data-pohon="banner-actions"
        >
          <slot name="actions">
            <PButton
              v-for="(action, index) in actions"
              :key="index"
              color="neutral"
              size="xs"
              v-bind="action"
            />
          </slot>
        </div>
      </div>

      <div
        :class="pohon.right({ class: pohonProp?.right })"
        data-pohon="banner-right"
      >
        <slot
          name="close"
          :pohon="pohon"
        >
          <PButton
            v-if="close"
            :icon="closeIcon || appConfig.pohon.icons.close"
            size="md"
            color="neutral"
            variant="ghost"
            :aria-label="t('banner.close')"
            v-bind="(typeof close === 'object' ? close : {})"
            :class="pohon.close({ class: pohonProp?.close })"
            data-pohon="banner-close"
            @click="onClose"
          />
        </slot>
      </div>
    </PContainer>
  </APrimitive>
</template>

<style scoped>
.hide-banner [data-pohon='banner-root'] {
  display: none;
}
</style>
