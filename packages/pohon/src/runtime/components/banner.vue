<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
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
   * Without an explicit id, the banner will not be persisted and will reappear on page reload.
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
  leading?: (props: { pohon: Banner['pohon'] }) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  actions?: (props?: {}) => Array<VNode>;
  close?: (props: { pohon: Banner['pohon'] }) => Array<VNode>;
}

export interface PBannerEmits {
  close: [];
}
</script>

<script setup lang="ts">
import { useAppConfig, useHead } from '#imports';
import { isObjectType } from '@vinicunca/perkakas';
import { APrimitive } from 'akar';
import { computed, onMounted, ref, useId } from 'vue';
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

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.banner || {}) })({
  color: props.color,
  to: !!props.to,
}));

const instanceId = useId();
const id = computed(() => {
  const rawId = props.id || instanceId;
  // Sanitize to only allow safe characters for CSS custom properties and selectors
  return `banner-${rawId.replace(/[^\w-]/g, '-')}`;
});
const isVisible = ref(true);
const hasPersistence = computed(() => !!props.id);

onMounted(() => {
  if (hasPersistence.value && typeof localStorage !== 'undefined') {
    const isClosed = localStorage.getItem(id.value) === 'true';
    isVisible.value = !isClosed;
  }
});

useHead(() => {
  if (!hasPersistence.value) {
    return {};
  }

  return {
    script: [{
      key: `prehydrate-banner-${id.value}`,
      innerHTML: `
        (function() {
          try {
            if (localStorage.getItem(${JSON.stringify(id.value)}) === 'true') {
              document.documentElement.style.setProperty('--${id.value}-display', 'none');
            }
          } catch (e) {}
        })();
      `.replace(/\s+/g, ' '),
      type: 'text/javascript',
      tagPosition: 'head',
    }],
    style: [{
      key: `banner-style-${id.value}`,
      innerHTML: `.banner[data-banner-id="${id.value}"] { display: var(--${id.value}-display, block); }`,
      tagPosition: 'head',
    }],
  };
});

function onClose() {
  if (hasPersistence.value) {
    localStorage.setItem(id.value, 'true');
    document.documentElement.style.setProperty(`--${id.value}-display`, 'none');
  }
  isVisible.value = false;
  emits('close');
}
</script>

<template>
  <APrimitive
    v-show="isVisible"
    :as="as"
    class="banner"
    :data-banner-id="id"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
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
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <div
        data-slot="left"
        :class="pohon.left({ class: pohonProp?.left })"
      />

      <div
        data-slot="center"
        :class="pohon.center({ class: pohonProp?.center })"
      >
        <slot
          name="leading"
          :pohon="pohon"
        >
          <PIcon
            v-if="icon"
            :name="icon"
            data-slot="icon"
            :class="pohon.icon({ class: pohonProp?.icon })"
          />
        </slot>

        <div
          v-if="title || !!slots.title"
          data-slot="title"
          :class="pohon.title({ class: pohonProp?.title })"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <div
          v-if="actions?.length || !!slots.actions"
          data-slot="actions"
          :class="pohon.actions({ class: pohonProp?.actions })"
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
        data-slot="right"
        :class="pohon.right({ class: pohonProp?.right })"
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
            v-bind="(isObjectType(close) ? close : {})"
            data-slot="close"
            :class="pohon.close({ class: pohonProp?.close })"
            @click="onClose"
          />
        </slot>
      </div>
    </PContainer>
  </APrimitive>
</template>
