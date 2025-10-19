<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  AStepperRootEmits,
  AStepperRootProps,
} from 'akar';
import type { PIconProps } from '../types';
import type { DynamicSlots } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/stepper';

type Stepper = ComponentConfig<typeof theme, AppConfig, 'stepper'>;

export interface PStepperItem {
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

export interface PStepperProps<T extends PStepperItem = PStepperItem> extends Pick<AStepperRootProps, 'linear'> {
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
   * The value of the step that should be active when initially rendered. Use when you do not need to control the state of the steps.
   */
  defaultValue?: string | number;
  disabled?: boolean;
  class?: any;
  pohon?: Stepper['slots'];
}

export type PStepperEmits<T extends PStepperItem = PStepperItem> = Omit<AStepperRootEmits, 'update:modelValue'> & {
  next: [value: T];
  prev: [value: T];
};

type SlotProps<T extends PStepperItem> = (props: { item: T }) => any;

export type PStepperSlots<T extends PStepperItem = PStepperItem> = {
  indicator: (props: { item: T; pohon: Stepper['pohon'] }) => any;
  title: SlotProps<T>;
  description: SlotProps<T>;
  content: SlotProps<T>;
} & DynamicSlots<T>;

</script>

<script setup lang="ts" generic="T extends PStepperItem">
import { useAppConfig } from '#imports';
import { isString } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import {
  AStepperDescription,
  AStepperIndicator,
  AStepperItem,
  AStepperRoot,
  AStepperSeparator,
  AStepperTitle,
  AStepperTrigger,
  useForwardProps,
} from 'akar';
import { computed } from 'vue';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';

const props = withDefaults(
  defineProps<PStepperProps<T>>(),
  {
    orientation: 'horizontal',
    linear: true,
  },
);
const emits = defineEmits<PStepperEmits<T>>();
const slots = defineSlots<PStepperSlots<T>>();

const modelValue = defineModel<string | number>();

const appConfig = useAppConfig() as Stepper['AppConfig'];

const rootProps = useForwardProps(reactivePick(props, 'as', 'orientation', 'linear'));

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.stepper || {}),
  })({
    orientation: props.orientation,
    size: props.size,
    color: props.color,
  }),
);

const currentStepIndex = computed({
  get() {
    const value = modelValue.value ?? props.defaultValue;

    return ((isString(value))
      ? props.items.findIndex((item) => item.value === value)
      : value) ?? 0;
  },
  set(value: number) {
    modelValue.value = props.items?.[value]?.value ?? value;
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
  <AStepperRoot
    v-bind="rootProps"
    v-model="currentStepIndex"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <div :class="pohon.header({ class: props.pohon?.header })">
      <AStepperItem
        v-for="(item, count) in items"
        :key="item.value ?? count"
        :step="count"
        :disabled="item.disabled || props.disabled"
        :class="pohon.item({ class: [props.pohon?.item, item.pohon?.item, item.class] })"
      >
        <div :class="pohon.container({ class: [props.pohon?.container, item.pohon?.container] })">
          <AStepperTrigger :class="pohon.trigger({ class: [props.pohon?.trigger, item.pohon?.trigger] })">
            <AStepperIndicator :class="pohon.indicator({ class: [props.pohon?.indicator, item.pohon?.indicator] })">
              <slot
                name="indicator"
                :item="item"
                :pohon="pohon"
              >
                <PIcon
                  v-if="item.icon"
                  :name="item.icon"
                  :class="pohon.icon({ class: [props.pohon?.icon, item.pohon?.icon] })"
                />
                <template v-else>
                  {{ count + 1 }}
                </template>
              </slot>
            </AStepperIndicator>
          </AStepperTrigger>

          <AStepperSeparator
            v-if="count < items.length - 1"
            :class="pohon.separator({ class: [props.pohon?.separator, item.pohon?.separator] })"
          />
        </div>

        <div :class="pohon.wrapper({ class: [props.pohon?.wrapper, item.pohon?.wrapper] })">
          <AStepperTitle
            as="div"
            :class="pohon.title({ class: [props.pohon?.title, item.pohon?.title] })"
          >
            <slot
              name="title"
              :item="item"
            >
              {{ item.title }}
            </slot>
          </AStepperTitle>
          <AStepperDescription
            as="div"
            :class="pohon.description({ class: [props.pohon?.description, item.pohon?.description] })"
          >
            <slot
              name="description"
              :item="item"
            >
              {{ item.description }}
            </slot>
          </AStepperDescription>
        </div>
      </AStepperItem>
    </div>

    <div
      v-if="currentStep?.content || !!slots.content || currentStep?.slot"
      :class="pohon.content({ class: props.pohon?.content })"
    >
      <slot
        :name="((currentStep?.slot || 'content') as keyof PStepperSlots<T>)"
        :item="(currentStep as Extract<T, { slot: string }>)"
      >
        {{ currentStep?.content }}
      </slot>
    </div>
  </AStepperRoot>
</template>
