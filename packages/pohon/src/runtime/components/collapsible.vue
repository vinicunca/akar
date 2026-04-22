<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ACollapsibleRootEmits, ACollapsibleRootProps } from 'akar';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/collapsible';

type Collapsible = ComponentConfig<typeof theme, AppConfig, 'collapsible'>;

export interface PCollapsibleProps extends Pick<ACollapsibleRootProps, 'defaultOpen' | 'open' | 'disabled' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  pohon?: Collapsible['slots'];
}

export interface PCollapsibleEmits extends ACollapsibleRootEmits {}

export interface PCollapsibleSlots {
  default?: (props: { open: boolean }) => Array<VNode>;
  content?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import {
  ACollapsibleContent,
  ACollapsibleRoot,
  ACollapsibleTrigger,
  useForwardPropsEmits,
} from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PCollapsibleProps>(),
  {
    unmountOnHide: true,
  },
);
const emits = defineEmits<PCollapsibleEmits>();
const slots = defineSlots<PCollapsibleSlots>();

const appConfig = useAppConfig() as Collapsible['AppConfig'];
const pohonProp = useComponentPohon('collapsible', props);

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'as', 'defaultOpen', 'open', 'disabled', 'unmountOnHide'),
  emits,
);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.collapsible || {}) })());
</script>

<template>
  <ACollapsibleRoot
    v-slot="{ open }"
    v-bind="rootProps"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <ACollapsibleTrigger
      v-if="!!slots.default"
      as-child
    >
      <slot :open="open" />
    </ACollapsibleTrigger>

    <ACollapsibleContent
      data-slot="content"
      :class="pohon.content({ class: pohonProp?.content })"
    >
      <slot name="content" />
    </ACollapsibleContent>
  </ACollapsibleRoot>
</template>
