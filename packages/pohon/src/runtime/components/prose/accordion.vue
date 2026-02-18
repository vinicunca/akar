<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PAccordionProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/accordion';

type ProseAccordion = ComponentConfig<typeof theme, AppConfig, 'accordion', 'pohon.prose'>;

export interface ProseAccordionProps {
  type?: 'single' | 'multiple';
  class?: any;
  pohon?: ProseAccordion['slots'] & PAccordionProps['pohon'];
}

export interface ProseAccordionSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed, onBeforeUpdate, ref } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { transformPohon } from '../../utils';
import { uv } from '../../utils/uv';
import PAccordion from '../accordion.vue';

const props = withDefaults(defineProps<ProseAccordionProps>(), {
  type: 'multiple',
});
const slots = defineSlots<ProseAccordionSlots>();

const appConfig = useAppConfig() as ProseAccordion['AppConfig'];
const pohonProp = useComponentPohon('prose.accordion', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.accordion || {}) }));

const rerenderCount = ref(1);

const items = computed<Array<{
  index: number;
  label: string;
  icon: string;
  component: any;
}>>(() => {
  // eslint-disable-next-line ts/no-unused-expressions
  rerenderCount.value;
  return slots.default?.()?.flatMap(transformSlot).filter(Boolean) || [];
});

function transformSlot(slot: any, index: number) {
  if (typeof slot.type === 'symbol') {
    return slot.children?.map(transformSlot);
  }

  return {
    index,
    label: slot.props?.label || `${index}`,
    description: slot.props?.description,
    icon: slot.props?.icon,
    component: slot,
  };
}

onBeforeUpdate(() => rerenderCount.value++);
</script>

<template>
  <PAccordion
    :type="type"
    :items="items"
    :unmount-on-hide="false"
    :class="props.class"
    :pohon="transformPohon(pohon(), pohonProp)"
  >
    <template #content="{ item }">
      <component :is="item.component" />
    </template>
  </PAccordion>
</template>
