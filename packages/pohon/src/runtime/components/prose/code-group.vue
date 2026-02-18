<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/code-group';

type ProseCodeGroup = ComponentConfig<typeof theme, AppConfig, 'codeGroup', 'pohon.prose'>;

export interface ProseCodeGroupProps {
  /**
   * The default tab to select.
   * @example '1'
   */
  defaultValue?: string;
  /**
   * Sync the selected tab with a local storage key.
   */
  sync?: string;
  class?: any;
  pohon?: ProseCodeGroup['slots'];
}

export interface ProseCodeGroupSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig, useState } from '#imports';
import {
  ATabsContent,
  ATabsIndicator,
  ATabsList,
  ATabsRoot,
  ATabsTrigger,
} from 'akar';
import { computed, onBeforeUpdate, onMounted, ref, watch } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';
import PCodeIcon from './code-icon.vue';

const props = withDefaults(defineProps<ProseCodeGroupProps>(), {
  defaultValue: '0',
});
const slots = defineSlots<ProseCodeGroupSlots>();

const model = defineModel<string>();

const appConfig = useAppConfig() as ProseCodeGroup['AppConfig'];
const pohonProp = useComponentPohon('prose.code-group', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.codeGroup || {}) })());

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
    label: slot.props?.filename || slot.props?.label || `${index}`,
    icon: slot.props?.icon,
    component: slot,
  };
}

onMounted(() => {
  if (props.sync) {
    const syncKey = `code-group-${props.sync}`;
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

onBeforeUpdate(() => rerenderCount.value++);
</script>

<template>
  <ATabsRoot
    v-model="model"
    :default-value="defaultValue"
    :unmount-on-hide="false"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <ATabsList :class="pohon.list({ class: pohonProp?.list })">
      <ATabsIndicator :class="pohon.indicator({ class: pohonProp?.indicator })" />

      <ATabsTrigger
        v-for="(item, index) of items"
        :key="index"
        :value="String(index)"
        :class="pohon.trigger({ class: pohonProp?.trigger })"
      >
        <PCodeIcon
          :icon="item.icon"
          :filename="item.label"
          :class="pohon.triggerIcon({ class: pohonProp?.triggerIcon })"
        />

        <span :class="pohon.triggerLabel({ class: pohonProp?.triggerLabel })">{{ item.label }}</span>
      </ATabsTrigger>
    </ATabsList>

    <ATabsContent
      v-for="(item, index) of items"
      :key="index"
      :value="String(index)"
      as-child
    >
      <component
        :is="item.component"
        hide-header
        tabindex="-1"
      />
    </ATabsContent>
  </ATabsRoot>
</template>
