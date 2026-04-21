<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { StepperRootEmits, StepperRootProps } from 'akar';
import type { VNode } from 'vue';
import type { PIconProps } from '../types';
import type { DynamicSlots, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/stepper';

type Stepper = ComponentConfig<typeof theme, AppConfig, 'stepper'>;

export interface StepperItem {
  slot?: string;
  value?: string | number;
  title?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  content?: string;
  disabled?: boolean;
  class?: any;
  pohon?: Pick<Stepper['slots'], 'item' | 'container' | 'trigger' | 'indicator' | 'icon' | 'separator' | 'wrapper' | 'title' | 'description'>;
  [key: string]: any;
}

export interface StepperProps<T extends StepperItem = StepperItem> extends Pick<StepperRootProps, 'linear'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  items: Array<T>;
  /**
   * @defaultValue 'md'
   */
  size?: Stepper['variants']['size'];
  /**
   * @defaultValue 'primary'
   */
  color?: Stepper['variants']['color'];
  /**
   * The orientation of the stepper.
   * @defaultValue 'horizontal'
   */
  orientation?: Stepper['variants']['orientation'];
  /**
   * The key used to get the value from the item.
   * @defaultValue 'value'
   */
  valueKey?: GetItemKeys<T>;
  /**
   * The value of the step that should be active when initially rendered. Use when you do not need to control the state of the steps.
   */
  defaultValue?: string | number;
  disabled?: boolean;
  class?: any;
  pohon?: Stepper['slots'];
}

export type StepperEmits<T extends StepperItem = StepperItem> = Omit<StepperRootEmits, 'update:modelValue'> & {
  next: [value: T];
  prev: [value: T];
};

type SlotProps<T extends StepperItem> = (props: { item: T }) => Array<VNode>;

export type StepperSlots<T extends StepperItem = StepperItem> = {
  indicator?: (props: { item: T; pohon: Stepper['pohon'] }) => Array<VNode>;
  wrapper?: SlotProps<T>;
  title?: SlotProps<T>;
  description?: SlotProps<T>;
  content?: SlotProps<T>;
} & DynamicSlots<T, 'wrapper' | 'title' | 'description', { item: T }>;

</script>

<script setup lang="ts" generic="T extends StepperItem">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { StepperDescription, StepperIndicator, StepperItem, StepperRoot, StepperSeparator, StepperTitle, StepperTrigger, useForwardProps } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { get } from '../utils';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';

const props = withDefaults(defineProps<StepperProps<T>>(), {
  orientation: 'horizontal',
  linear: true,
  valueKey: 'value',
});
const emits = defineEmits<StepperEmits<T>>();
const slots = defineSlots<StepperSlots<T>>();

const modelValue = defineModel<string | number>();

const appConfig = useAppConfig() as Stepper['AppConfig'];
const pohonProp = useComponentPohon('stepper', props);

const rootProps = useForwardProps(reactivePick(props, 'as', 'linear'));

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.stepper || {}) })({
  orientation: props.orientation,
  size: props.size,
  color: props.color,
}));

const currentStepIndex = computed({
  get() {
    const value = modelValue.value ?? props.defaultValue;

    return ((typeof value === 'string')
      ? props.items.findIndex((item) => get(item, props.valueKey as string) === value)
      : value) ?? 0;
  },
  set(value: number) {
    modelValue.value = get(props.items?.[value], props.valueKey as string) ?? value;
  },
});

const currentStep = computed(() => props.items?.[currentStepIndex.value]);
const hasNext = computed(() => currentStepIndex.value < props.items?.length - 1);
const hasPrev = computed(() => currentStepIndex.value > 0);

defineExpose({
  next() {
    if (hasNext.value) {
      currentStepIndex.value += 1;
      emits('next', currentStep.value as T);
    }
  },
  prev() {
    if (hasPrev.value) {
      currentStepIndex.value -= 1;
      emits('prev', currentStep.value as T);
    }
  },
  hasNext,
  hasPrev,
});
</script>

<template>
  <StepperRoot
    v-bind="rootProps"
    v-model="currentStepIndex"
    :orientation="orientation"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      data-slot="header"
      :class="pohon.header({ class: pohonProp?.header })"
    >
      <StepperItem
        v-for="(item, count) in items"
        :key="count"
        :step="count"
        :disabled="item.disabled || props.disabled"
        data-slot="item"
        :class="pohon.item({ class: [pohonProp?.item, item.pohon?.item, item.class] })"
      >
        <div
          data-slot="container"
          :class="pohon.container({ class: [pohonProp?.container, item.pohon?.container] })"
        >
          <StepperTrigger
            data-slot="trigger"
            :class="pohon.trigger({ class: [pohonProp?.trigger, item.pohon?.trigger] })"
          >
            <StepperIndicator
              data-slot="indicator"
              :class="pohon.indicator({ class: [pohonProp?.indicator, item.pohon?.indicator] })"
            >
              <slot
                name="indicator"
                :item="item"
                :pohon="pohon"
              >
                <PIcon
                  v-if="item.icon"
                  :name="item.icon"
                  data-slot="icon"
                  :class="pohon.icon({ class: [pohonProp?.icon, item.pohon?.icon] })"
                />
                <template v-else>
                  {{ count + 1 }}
                </template>
              </slot>
            </StepperIndicator>
          </StepperTrigger>

          <StepperSeparator
            v-if="count < items.length - 1"
            data-slot="separator"
            :class="pohon.separator({ class: [pohonProp?.separator, item.pohon?.separator] })"
          />
        </div>

        <div
          data-slot="wrapper"
          :class="pohon.wrapper({ class: [pohonProp?.wrapper, item.pohon?.wrapper] })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-wrapper` : 'wrapper') as keyof StepperSlots<T>)"
            :item="(item as Extract<T, { slot: string; }>)"
          >
            <StepperTitle
              v-if="item.title || !!slots[(item.slot ? `${item.slot}-title` : 'title') as keyof StepperSlots<T>]"
              as="div"
              data-slot="title"
              :class="pohon.title({ class: [pohonProp?.title, item.pohon?.title] })"
            >
              <slot
                :name="((item.slot ? `${item.slot}-title` : 'title') as keyof StepperSlots<T>)"
                :item="(item as Extract<T, { slot: string; }>)"
              >
                {{ item.title }}
              </slot>
            </StepperTitle>
            <StepperDescription
              v-if="item.description || !!slots[(item.slot ? `${item.slot}-description` : 'description') as keyof StepperSlots<T>]"
              as="div"
              data-slot="description"
              :class="pohon.description({ class: [pohonProp?.description, item.pohon?.description] })"
            >
              <slot
                :name="((item.slot ? `${item.slot}-description` : 'description') as keyof StepperSlots<T>)"
                :item="(item as Extract<T, { slot: string; }>)"
              >
                {{ item.description }}
              </slot>
            </StepperDescription>
          </slot>
        </div>
      </StepperItem>
    </div>

    <div
      v-if="currentStep?.content || !!slots.content || (currentStep?.slot && !!slots[currentStep.slot as keyof StepperSlots<T>])"
      data-slot="content"
      :class="pohon.content({ class: pohonProp?.content })"
    >
      <slot
        :name="((currentStep?.slot || 'content') as keyof StepperSlots<T>)"
        :item="(currentStep as Extract<T, { slot: string }>)"
      >
        {{ currentStep?.content }}
      </slot>
    </div>
  </StepperRoot>
</template>
