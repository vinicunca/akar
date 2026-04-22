<script lang="ts">
import type { NuxtError } from '#app';
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PButtonProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/error';

type Error = ComponentConfig<typeof theme, AppConfig, 'error'>;

export interface PErrorProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'main'
   */
  as?: any;
  error?: Partial<NuxtError & { message: string }>;
  /**
   * The URL to redirect to when the error is cleared.
   * @defaultValue '/'
   */
  redirect?: string;
  /**
   * Display a button to clear the error in the links slot.
   * `{ size: 'lg', color: 'primary', variant: 'solid', label: 'Back to home' }`{lang="ts-type"}
   * @defaultValue true
   */
  clear?: boolean | PButtonProps;
  class?: any;
  pohon?: Error['slots'];
}

export interface PErrorSlots {
  default?: (props?: {}) => Array<VNode>;
  statusCode?: (props?: {}) => Array<VNode>;
  statusMessage?: (props?: {}) => Array<VNode>;
  message?: (props?: {}) => Array<VNode>;
  links?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { clearError, useAppConfig } from '#imports';
import { isObjectType } from '@vinicunca/perkakas';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PButton from './button.vue';

const props = withDefaults(defineProps<PErrorProps>(), {
  as: 'main',
  redirect: '/',
  clear: true,
});
const slots = defineSlots<PErrorSlots>();

const { t } = useLocale();
const appConfig = useAppConfig() as Error['AppConfig'];
const pohonProp = useComponentPohon('error', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.error || {}) })());

function handleError() {
  clearError({ redirect: props.redirect });
}
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <p
      v-if="!!props.error?.statusCode || !!props.error?.status || !!slots.statusCode"
      data-slot="statusCode"
      :class="pohon.statusCode({ class: pohonProp?.statusCode })"
    >
      <slot name="statusCode">
        {{ props.error?.statusCode || props.error?.status }}
      </slot>
    </p>
    <h1
      v-if="!!props.error?.statusMessage || !!props.error?.statusText || !!slots.statusMessage"
      data-slot="statusMessage"
      :class="pohon.statusMessage({ class: pohonProp?.statusMessage })"
    >
      <slot name="statusMessage">
        {{ props.error?.statusMessage || props.error?.statusText }}
      </slot>
    </h1>
    <p
      v-if="(props.error?.message && props.error.message !== (props.error.statusMessage || props.error.statusText)) || !!slots.message"
      data-slot="message"
      :class="pohon.message({ class: pohonProp?.message })"
    >
      <slot name="message">
        {{ props.error?.message }}
      </slot>
    </p>
    <div
      v-if="!!clear || !!slots.links"
      data-slot="links"
      :class="pohon.links({ class: pohonProp?.links })"
    >
      <slot name="links">
        <PButton
          v-if="clear"
          size="lg"
          color="primary"
          variant="solid"
          :label="t('error.clear')"
          v-bind="(isObjectType(clear) ? clear : {})"
          @click="handleError"
        />
      </slot>
    </div>
  </APrimitive>
</template>
