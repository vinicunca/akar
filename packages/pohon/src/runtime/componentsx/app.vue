<script lang="ts">
import type { ConfigProviderProps, TooltipProviderProps } from 'akar';
import type { VNode } from 'vue';
import type { ToasterProps } from '../types';
import type { Locale, Messages } from '../types/locale';

export interface AppProps<T extends Messages = Messages> extends Omit<ConfigProviderProps, 'useId' | 'locale'> {
  tooltip?: TooltipProviderProps;
  toaster?: ToasterProps | null;
  locale?: Locale<T>;
  portal?: boolean | string | HTMLElement;
}

export interface AppSlots {
  default?: (props?: {}) => Array<VNode>;
}

export default {
  name: 'App',
};
</script>

<script setup lang="ts" generic="T extends Messages">
import { reactivePick } from '@vueuse/core';
import { ConfigProvider, TooltipProvider, useForwardProps } from 'akar';
import { provide, toRef, useId } from 'vue';
import { localeContextInjectionKey } from '../composables/use-locale';
import { portalTargetInjectionKey } from '../composables/usePortal';
import UOverlayProvider from './OverlayProvider.vue';
import UToaster from './Toaster.vue';

const props = withDefaults(defineProps<AppProps<T>>(), {
  portal: 'body',
});

defineSlots<AppSlots>();

const configProviderProps = useForwardProps(reactivePick(props, 'scrollBody'));
const tooltipProps = toRef(() => props.tooltip);
const toasterProps = toRef(() => props.toaster);

const locale = toRef(() => props.locale);
provide(localeContextInjectionKey, locale);

const portal = toRef(() => props.portal);
provide(portalTargetInjectionKey, portal);
</script>

<template>
  <ConfigProvider
    :use-id="() => (useId() as string)"
    :dir="props.dir || locale?.dir"
    :locale="locale?.code"
    v-bind="configProviderProps"
  >
    <TooltipProvider v-bind="tooltipProps">
      <UToaster
        v-if="toaster !== null"
        v-bind="toasterProps"
      >
        <slot />
      </UToaster>
      <slot v-else />

      <UOverlayProvider />
    </TooltipProvider>
  </ConfigProvider>
</template>
