<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'akar';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/collapsible';

type Collapsible = ComponentConfig<typeof theme, AppConfig, 'collapsible'>;

export interface CollapsibleProps extends Pick<CollapsibleRootProps, 'defaultOpen' | 'open' | 'disabled' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  pohon?: Collapsible['slots'];
}

export interface CollapsibleEmits extends CollapsibleRootEmits {}

export interface CollapsibleSlots {
  default?: (props: { open: boolean }) => Array<VNode>;
  content?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, useForwardPropsEmits } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = withDefaults(defineProps<CollapsibleProps>(), {
  unmountOnHide: true,
});
const emits = defineEmits<CollapsibleEmits>();
const slots = defineSlots<CollapsibleSlots>();

const appConfig = useAppConfig() as Collapsible['AppConfig'];
const pohonProp = useComponentPohon('collapsible', props);

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultOpen', 'open', 'disabled', 'unmountOnHide'), emits);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.collapsible || {}) })());
</script>

<template>
  <CollapsibleRoot
    v-slot="{ open }"
    v-bind="rootProps"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <CollapsibleTrigger
      v-if="!!slots.default"
      as-child
    >
      <slot :open="open" />
    </CollapsibleTrigger>

    <CollapsibleContent
      data-slot="content"
      :class="pohon.content({ class: pohonProp?.content })"
    >
      <slot name="content" />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
