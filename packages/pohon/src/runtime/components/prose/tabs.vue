<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/tabs';

type ProseTabs = ComponentConfig<typeof theme, AppConfig, 'tabs', 'pohon.prose'>;

export interface ProseTabsProps {
  /**
   * The default tab to select.
   * @example '1'
   */
  defaultValue?: string;
  /**
   * Sync the selected tab with a local storage key.
   */
  sync?: string;
  /**
   * The hash to scroll to when the tab is selected.
   */
  hash?: string;
  class?: any;
}

export interface ProseTabsSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig, useState } from '#imports';
import { computed, onBeforeUpdate, onMounted, ref, watch } from 'vue';
import { transformPohon } from '../../utils';
import { uv } from '../../utils/uv';
import PTabs from '../tabs.vue';

const props = withDefaults(
  defineProps<ProseTabsProps>(),
  {
    defaultValue: '0',
  },
);
const slots = defineSlots<ProseTabsSlots>();

const model = defineModel<string>();

const appConfig = useAppConfig() as ProseTabs['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.tabs || {}) }));

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

onMounted(() => {
  if (props.sync) {
    const syncKey = `tabs-${props.sync}`;
    const syncValue = useState<string>(syncKey, () => localStorage.getItem(syncKey) as string);

    watch(syncValue, () => {
      if (!syncValue.value) {
        return;
      }

      model.value = syncValue.value;
    }, { immediate: true });

    watch(model, () => {
      if (!model.value) {
        return;
      }

      syncValue.value = model.value;
      localStorage.setItem(syncKey, model.value);
    });
  }
});

async function onUpdateModelValue() {
  if (props.hash) {
    const hash = props.hash.startsWith('#') ? props.hash : `#${props.hash}`;
    setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView();
    }, 200);
  }
}

onBeforeUpdate(() => rerenderCount.value++);
</script>

<template>
  <PTabs
    v-model="model"
    color="primary"
    variant="link"
    :items="items"
    :class="props.class"
    :unmount-on-hide="false"
    :pohon="transformPohon(pohon())"
    @update:model-value="onUpdateModelValue"
  >
    <template #content="{ item }">
      <component :is="item.component" />
    </template>
  </PTabs>
</template>
