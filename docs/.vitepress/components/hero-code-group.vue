<script setup lang="ts">
import type { VNode } from 'vue';
import { Icon } from '@iconify/vue';
import { useVModel } from '@vueuse/core';
import {
  ASelectContent,
  ASelectItem,
  ASelectItemIndicator,
  ASelectItemText,
  ASelectPortal,
  ASelectRoot,
  ASelectTrigger,
  ASelectValue,
  ASelectViewport,
  ATabsContent,
  ATabsList,
  ATabsRoot,
  ATabsTrigger,
} from 'akar';
import { capitalize, computed, ref, useSlots, watch } from 'vue';

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
const slotsFramework = computed(() => slots.default?.().map((slot) => slot.props?.key?.toString()?.replace('_', '')) ?? []);

const cssFrameworkOptions = computed(() => [
  { label: 'UnoCSS', value: 'unocss', icon: 'logos:unocss' },
  { label: 'CSS', value: 'css', icon: 'devicon:css3' },
].filter((i) => slotsFramework.value.includes(i.value)));

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
        <div v-if="type === 'demo'">
          <ASelectRoot
            v-model="cssFramework"
            @update:model-value="currentTab = 'index.vue'"
          >
            <ASelectTrigger
              class="text-xs text-white px-2 py-1.5 rounded flex w-32 items-center justify-between hover:bg-code disabled:opacity-50"
              aria-label="Select CSS framework"
            >
              <div class="inline-flex gap-2 items-center">
                <Icon
                  :icon="cssFrameworkOptions.find(opt => opt.value === cssFramework)?.icon ?? ''"
                  class="text-base"
                />

                <ASelectValue>
                  {{ cssFrameworkOptions.find(opt => opt.value === cssFramework)?.label }}
                </ASelectValue>
              </div>

              <Icon
                icon="lucide:chevron-down"
                class="h-3.5 w-3.5"
              />
            </ASelectTrigger>

            <ASelectPortal>
              <ASelectContent class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade will-change-[opacity,transform] border border-stone-700 rounded-md bg-code min-w-32 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-[100]">
                <ASelectViewport class="p-[5px]">
                  <ASelectItem
                    v-for="framework in cssFrameworkOptions"
                    :key="framework.label"
                    class="data-[disabled]:text-mauve8 text-xs text-white leading-none pl-[25px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:text-primary data-[state=checked]:text-primary data-[highlighted]:outline-none data-[highlighted]:bg-primary/10 data-[disabled]:pointer-events-none"
                    :value="framework.value"
                  >
                    <ASelectItemIndicator class="inline-flex w-[25px] items-center left-0 justify-center absolute">
                      <Icon icon="lucide:check" />
                    </ASelectItemIndicator>

                    <ASelectItemText>
                      {{ capitalize(framework.label ?? '') }}
                    </ASelectItemText>
                  </ASelectItem>
                </ASelectViewport>
              </ASelectContent>
            </ASelectPortal>
          </ASelectRoot>
        </div>
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
