<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { ProgressRootProps, ProgressRootEmits } from 'akar'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/progress'
import type { ComponentConfig } from '../types/uv'

type Progress = ComponentConfig<typeof theme, AppConfig, 'progress'>

export interface ProgressProps extends Pick<ProgressRootProps, 'getValueLabel' | 'getValueText' | 'modelValue'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /** The maximum progress value. */
  max?: number | Array<any>
  /** Display the current progress value. */
  status?: boolean
  /** Whether the progress is visually inverted. */
  inverted?: boolean
  /**
   * @defaultValue 'md'
   */
  size?: Progress['variants']['size']
  /**
   * @defaultValue 'primary'
   */
  color?: Progress['variants']['color']
  /**
   * The orientation of the progress bar.
   * @defaultValue 'horizontal'
   */
  orientation?: Progress['variants']['orientation']
  /**
   * The animation of the progress bar.
   * @defaultValue 'carousel'
   */
  animation?: Progress['variants']['animation']
  class?: any
  pohon?: Progress['slots']
}

export interface ProgressEmits extends ProgressRootEmits {}

export type ProgressSlots = {
  status(props: { percent?: number }): any
} & {
  [key: string]: (props: { step: number }) => any
}

</script>

<script setup lang="ts">
import { computed } from 'vue'
import { APrimitive, ProgressRoot, ProgressIndicator, useForwardPropsEmits } from 'akar'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/use-locale'
import { uv } from '../utils/uv'

const props = withDefaults(defineProps<ProgressProps>(), {
  inverted: false,
  modelValue: null,
  orientation: 'horizontal'
})
const emits = defineEmits<ProgressEmits>()
const slots = defineSlots<ProgressSlots>()

const { dir } = useLocale()
const appConfig = useAppConfig() as Progress['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'getValueLabel', 'getValueText', 'modelValue'), emits)

const isIndeterminate = computed(() => rootProps.value.modelValue === null)
const hasSteps = computed(() => Array.isArray(props.max))

const realMax = computed(() => {
  if (isIndeterminate.value || !props.max) {
    return undefined
  }

  if (Array.isArray(props.max)) {
    return props.max.length - 1
  }

  return Number(props.max)
})

const percent = computed(() => {
  if (isIndeterminate.value) {
    return undefined
  }

  switch (true) {
    case rootProps.value.modelValue! < 0: return 0
    case rootProps.value.modelValue! > (realMax.value ?? 100): return 100
    default: return Math.round((rootProps.value.modelValue! / (realMax.value ?? 100)) * 100)
  }
})

const indicatorStyle = computed(() => {
  if (percent.value === undefined) {
    return
  }

  if (props.orientation === 'vertical') {
    return {
      transform: `translateY(${props.inverted ? '' : '-'}${100 - percent.value}%)`
    }
  } else {
    if (dir.value === 'rtl') {
      return {
        transform: `translateX(${props.inverted ? '-' : ''}${100 - percent.value}%)`
      }
    } else {
      return {
        transform: `translateX(${props.inverted ? '' : '-'}${100 - percent.value}%)`
      }
    }
  }
})

const statusStyle = computed(() => {
  const value = `${Math.max(percent.value ?? 0, 0)}%`
  return props.orientation === 'vertical' ? { height: value } : { width: value }
})

function isActive(index: number) {
  return index === Number(props.modelValue)
}

function isFirst(index: number) {
  return index === 0
}

function isLast(index: number) {
  return index === realMax.value
}

function stepVariant(index: number | string) {
  index = Number(index)

  if (isActive(index) && !isFirst(index)) {
    return 'active'
  }

  if (isFirst(index) && isActive(index)) {
    return 'first'
  }

  if (isLast(index) && isActive(index)) {
    return 'last'
  }

  return 'other'
}

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.progress || {}) })({
  animation: props.animation,
  size: props.size,
  color: props.color,
  orientation: props.orientation,
  inverted: props.inverted
}))
</script>

<template>
  <APrimitive :as="as" :class="pohon.root({ class: [props.pohon?.root, props.class] })">
    <div v-if="!isIndeterminate && (status || !!slots.status)" :class="pohon.status({ class: props.pohon?.status })" :style="statusStyle">
      <slot name="status" :percent="percent">
        {{ percent }}%
      </slot>
    </div>

    <ProgressRoot v-bind="rootProps" :max="realMax" :class="pohon.base({ class: props.pohon?.base })" style="transform: translateZ(0)">
      <ProgressIndicator :class="pohon.indicator({ class: props.pohon?.indicator })" :style="indicatorStyle" />
    </ProgressRoot>

    <div v-if="hasSteps" :class="pohon.steps({ class: props.pohon?.steps })">
      <div v-for="(step, index) in max" :key="index" :class="pohon.step({ class: props.pohon?.step, step: stepVariant(index) })">
        <slot :name="`step-${index}`" :step="step">
          {{ step }}
        </slot>
      </div>
    </div>
  </APrimitive>
</template>
