<script setup lang="ts">
import type { VNode } from 'vue';
import { useVModel } from '@vueuse/core';
import {
  ATabsContent,
  ATabsList,
  ATabsRoot,
  ATabsTrigger,
} from 'akar';
import { computed, ref, useSlots, watch } from 'vue';

defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{
  modelValue: 'css' | 'unocss';
  type?: 'demo' | 'example';

}>();
const emits = defineEmits<{
  'update:modelValue': [payload: 'css' | 'unocss'];
}>();
const cssFramework = useVModel(props, 'modelValue', emits);

const slots = useSlots();

const tabs = computed(
  () => {
    const currentFramework = slots.default?.().find((slot) => slot.props?.key?.toString().includes(cssFramework.value));
    const childSlots = (currentFramework?.children as Array<VNode>).sort((a, b) => a?.props?.name?.localeCompare(b?.props?.name));
    return childSlots?.map((slot, index) => {
      return {
        label: slot.props?.name || `${index}`,
        component: slot,
      };
    }) || [];
  },
);

const open = ref(false);

const codeScrollWrapper = ref<HTMLElement | undefined>();
const currentTab = ref('index.vue');

watch(open, () => {
  if (!open.value) {
    codeScrollWrapper.value!.scrollTo({
      top: 0,
    });
  }
});
</script>

<template>
  <ATabsRoot
    v-model="currentTab"
    class="border border-[hsl(0_0%_15%)] rounded-xl bg-[hsl(141_17%_5%)] overflow-hidden"
    :unmount-on-hide="false"
    @update:model-value="open = true"
  >
    <div class="pr-2 border-b-2 border-[hsl(0_0%_15%)] bg-[hsl(141_17%_5%)] flex">
      <div class="text-[13px] flex w-full items-center justify-between">
        <ATabsList class="flex">
          <ATabsTrigger
            v-for="(tab, index) in tabs"
            :key="index"
            :value="tab.label"
            tabindex="-1"
            class="border-box text-white/70 px-4 py-2.5 data-[state=active]:text-white data-[state=active]:font-medium data-[state=active]:shadow-[0_1px_0_#10b981]"
          >
            {{ tab.label }}
          </ATabsTrigger>
        </ATabsList>
      </div>
    </div>
    <div
      ref="codeScrollWrapper"
      :key="cssFramework"
      class="max-h-[50vh] overflow-auto"
    >
      <ATabsContent
        v-for="tab in tabs"
        :key="tab.label"
        :value="tab.label"
        as-child
      >
        <div class="text-base relative">
          <component
            :is="tab.component"
            class="border-0 !mb-0"
          />
        </div>
      </ATabsContent>
    </div>
  </ATabsRoot>
</template>
