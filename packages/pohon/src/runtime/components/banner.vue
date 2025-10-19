<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PButtonProps, PIconProps, PLinkProps } from '../types';
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
  close?: boolean | Partial<PButtonProps>;
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
            if (localStorage.getItem('${id.value}') === 'true') {
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
    class="banner"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
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

    <PContainer :class="pohon.container({ class: props.pohon?.container })">
      <div :class="pohon.left({ class: props.pohon?.left })" />

      <div :class="pohon.center({ class: props.pohon?.center })">
        <slot
          name="leading"
          :pohon="pohon"
        >
          <PIcon
            v-if="icon"
            :name="icon"
            :class="pohon.icon({ class: props.pohon?.icon })"
          />
        </slot>

        <div
          v-if="title || !!slots.title"
          :class="pohon.title({ class: props.pohon?.title })"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <div
          v-if="actions?.length || !!slots.actions"
          :class="pohon.actions({ class: props.pohon?.actions })"
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

      <div :class="pohon.right({ class: props.pohon?.right })">
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
            v-bind="(typeof close === 'object' ? close as Partial<PButtonProps> : {})"
            :class="pohon.close({ class: props.pohon?.close })"
            @click="onClose"
          />
        </slot>
      </div>
    </PContainer>
  </APrimitive>
</template>

<style scoped>
.hide-banner .banner {
  display: none;
}
</style>
