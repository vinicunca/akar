<script lang="ts">
import type { AConfigProviderProps, ATooltipProviderProps } from 'akar';
import type { PToasterProps } from '../types';
import type { PLocale, PMessages } from '../types/locale';

export interface PAppProps<T extends PMessages = PMessages> extends Omit<AConfigProviderProps, 'useId' | 'dir' | 'locale'> {
  tooltip?: ATooltipProviderProps;
  toaster?: PToasterProps | null;
  locale?: PLocale<T>;
  portal?: string | HTMLElement;
}

export interface PAppSlots {
  default: (props?: object) => any;
}

export default {
  name: 'PApp',
};
</script>

<script setup lang="ts" generic="T extends PMessages">
import { reactivePick } from '@vueuse/core';
import { AConfigProvider, ATooltipProvider, useForwardProps } from 'akar';
import { provide, toRef, useId } from 'vue';
import { localeContextInjectionKey } from '../composables/use-locale';
import { portalTargetInjectionKey } from '../composables/use-portal';
import POverlayProvider from './overlay-provider.vue';
import PToaster from './toaster.vue';

const props = withDefaults(
  defineProps<PAppProps<T>>(),
  {
    portal: 'body',
  },
);

defineSlots<PAppSlots>();

const configProviderProps = useForwardProps(reactivePick(props, 'scrollBody'));
const tooltipProps = toRef(() => props.tooltip);
const toasterProps = toRef(() => props.toaster);

const locale = toRef(() => props.locale);
provide(localeContextInjectionKey, locale);

const portal = toRef(() => props.portal);
provide(portalTargetInjectionKey, portal);
</script>

<template>
  <AConfigProvider
    :use-id="() => useId()"
    :dir="locale?.dir"
    :locale="locale?.code"
    v-bind="configProviderProps"
  >
    <ATooltipProvider v-bind="tooltipProps">
      <PToaster
        v-if="toaster !== null"
        v-bind="toasterProps"
      >
        <slot />
      </PToaster>
      <slot v-else />

      <POverlayProvider />
    </ATooltipProvider>
  </AConfigProvider>
</template>
