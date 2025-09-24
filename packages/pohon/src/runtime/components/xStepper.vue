<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { StepperRootProps, StepperRootEmits } from 'akar'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/stepper'
import type { IconProps } from '../types'
import type { DynamicSlots } from '../types/utils'
import type { ComponentConfig } from '../types/uv'

type Stepper = ComponentConfig<typeof theme, AppConfig, 'stepper'>

export interface StepperItem {
  slot?: string
  value?: string | number
  title?: string
  description?: string
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name']
  content?: string
  disabled?: boolean
  class?: any
  pohon?: Pick<Stepper['slots'], 'item' | 'container' | 'trigger' | 'indicator' | 'icon' | 'separator' | 'wrapper' | 'title' | 'description'>
  [key: string]: any
}

export interface StepperProps<T extends StepperItem = StepperItem> extends Pick<StepperRootProps, 'linear'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  items: T[]
  /**
   * @defaultValue 'md'
   */
  size?: Stepper['variants']['size']
  /**
   * @defaultValue 'primary'
   */
  color?: Stepper['variants']['color']
  /**
   * The orientation of the stepper.
   * @defaultValue 'horizontal'
   */
  orientation?: Stepper['variants']['orientation']
  /**
   * The value of the step that should be active when initially rendered. Use when you do not need to control the state of the steps.
   */
  defaultValue?: string | number
  disabled?: boolean
  class?: any
  pohon?: Stepper['slots']
}

export type StepperEmits<T extends StepperItem = StepperItem> = Omit<StepperRootEmits, 'update:modelValue'> & {
  next: [value: T]
  prev: [value: T]
}

type SlotProps<T extends StepperItem> = (props: { item: T }) => any

export type StepperSlots<T extends StepperItem = StepperItem> = {
  indicator: SlotProps<T>
  title: SlotProps<T>
  description: SlotProps<T>
  content: SlotProps<T>
} & DynamicSlots<T>

</script>

<script setup lang="ts" generic="T extends StepperItem">
import { computed } from 'vue'
import { StepperRoot, StepperItem, StepperTrigger, StepperIndicator, StepperSeparator, StepperTitle, StepperDescription, useForwardProps } from 'akar'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { uv } from '../utils/uv'
import PIcon from './icon.vue'

const props = withDefaults(defineProps<StepperProps<T>>(), {
  orientation: 'horizontal',
  linear: true
})
const emits = defineEmits<StepperEmits<T>>()
const slots = defineSlots<StepperSlots<T>>()

const modelValue = defineModel<string | number>()

const appConfig = useAppConfig() as Stepper['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'as', 'orientation', 'linear'))

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.stepper || {}) })({
  orientation: props.orientation,
  size: props.size,
  color: props.color
}))

const currentStepIndex = computed({
  get() {
    const value = modelValue.value ?? props.defaultValue

    return ((typeof value === 'string')
      ? props.items.findIndex(item => item.value === value)
      : value) ?? 0
  },
  set(value: number) {
    modelValue.value = props.items?.[value]?.value ?? value
  }
})

const currentStep = computed(() => props.items?.[currentStepIndex.value])
const hasNext = computed(() => currentStepIndex.value < props.items?.length - 1)
const hasPrev = computed(() => currentStepIndex.value > 0)

defineExpose({
  next() {
    if (hasNext.value) {
      currentStepIndex.value += 1
      emits('next', currentStep.value as T)
    }
  },
  prev() {
    if (hasPrev.value) {
      currentStepIndex.value -= 1
      emits('prev', currentStep.value as T)
    }
  },
  hasNext,
  hasPrev
})
</script>

<template>
  <StepperRoot v-bind="rootProps" v-model="currentStepIndex" :class="pohon.root({ class: [props.pohon?.root, props.class] })">
    <div :class="pohon.header({ class: props.pohon?.header })">
      <StepperItem
        v-for="(item, count) in items"
        :key="item.value ?? count"
        :step="count"
        :disabled="item.disabled || props.disabled"
        :class="pohon.item({ class: [props.pohon?.item, item.ui?.item, item.class] })"
      >
        <div :class="pohon.container({ class: [props.pohon?.container, item.ui?.container] })">
          <StepperTrigger :class="pohon.trigger({ class: [props.pohon?.trigger, item.ui?.trigger] })">
            <StepperIndicator :class="pohon.indicator({ class: [props.pohon?.indicator, item.ui?.indicator] })">
              <slot name="indicator" :item="item">
                <PIcon v-if="item.icon" :name="item.icon" :class="pohon.icon({ class: [props.pohon?.icon, item.ui?.icon] })" />
                <template v-else>
                  {{ count + 1 }}
                </template>
              </slot>
            </StepperIndicator>
          </StepperTrigger>

          <StepperSeparator
            v-if="count < items.length - 1"
            :class="pohon.separator({ class: [props.pohon?.separator, item.ui?.separator] })"
          />
        </div>

        <div :class="pohon.wrapper({ class: [props.pohon?.wrapper, item.ui?.wrapper] })">
          <StepperTitle as="div" :class="pohon.title({ class: [props.pohon?.title, item.ui?.title] })">
            <slot name="title" :item="item">
              {{ item.title }}
            </slot>
          </StepperTitle>
          <StepperDescription as="div" :class="pohon.description({ class: [props.pohon?.description, item.ui?.description] })">
            <slot name="description" :item="item">
              {{ item.description }}
            </slot>
          </StepperDescription>
        </div>
      </StepperItem>
    </div>

    <div v-if="currentStep?.content || !!slots.content || currentStep?.slot" :class="pohon.content({ class: props.pohon?.content })">
      <slot
        :name="((currentStep?.slot || 'content') as keyof StepperSlots<T>)"
        :item="(currentStep as Extract<T, { slot: string }>)"
      >
        {{ currentStep?.content }}
      </slot>
    </div>
  </StepperRoot>
</template>
