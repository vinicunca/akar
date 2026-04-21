<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { SliderRootProps } from 'akar';
import type { TooltipProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/slider';

type Slider = ComponentConfig<typeof theme, AppConfig, 'slider'>;

export interface SliderProps extends Pick<SliderRootProps, 'name' | 'disabled' | 'inverted' | 'min' | 'max' | 'step' | 'minStepsBetweenThumbs'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * @defaultValue 'md'
   */
  size?: Slider['variants']['size'];
  /**
   * @defaultValue 'primary'
   */
  color?: Slider['variants']['color'];
  /**
   * The orientation of the slider.
   * @defaultValue 'horizontal'
   */
  orientation?: Slider['variants']['orientation'];
  /**
   * Display a tooltip around the slider thumbs with the current value.
   * `{ disableClosingTrigger: true }`{lang="ts-type"}
   * @defaultValue false
   */
  tooltip?: boolean | TooltipProps;
  /** The value of the slider when initially rendered. Use when you do not need to control the state of the slider. */
  defaultValue?: number | Array<number>;
  class?: any;
  pohon?: Slider['slots'];
}

export interface SliderEmits {
  change: [event: Event];
}
</script>

<script setup lang="ts" generic="T extends number | number[]">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFormField } from '../composables/useFormField';
import { uv } from '../utils/uv';
import UTooltip from './Tooltip.vue';

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal',
});
const emits = defineEmits<SliderEmits>();

const modelValue = defineModel<T>();

const appConfig = useAppConfig() as Slider['AppConfig'];
const pohonProp = useComponentPohon('slider', props);

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'orientation', 'min', 'max', 'step', 'minStepsBetweenThumbs', 'inverted'), emits);

const { id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField<SliderProps>(props);

const defaultSliderValue = computed(() => {
  if (typeof props.defaultValue === 'number') {
    return [props.defaultValue];
  }
  return props.defaultValue;
});

const sliderValue = computed({
  get() {
    if (typeof modelValue.value === 'number') {
      return [modelValue.value];
    }
    return (modelValue.value as Array<number>) ?? defaultSliderValue.value;
  },
  set(value) {
    modelValue.value = (value?.length !== 1 ? value : value[0]) as T;
  },
});

const thumbs = computed(() => sliderValue.value?.length ?? 1);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.slider || {}) })({
  disabled: disabled.value,
  size: size.value,
  color: color.value,
  orientation: props.orientation,
}));

function onChange(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);
  emitFormChange();
}
</script>

<template>
  <SliderRoot
    v-bind="{ ...rootProps, ...ariaAttrs }"
    :id="id"
    v-model="sliderValue"
    :name="name"
    :disabled="disabled"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    :default-value="defaultSliderValue"
    @update:model-value="emitFormInput()"
    @value-commit="onChange"
  >
    <SliderTrack
      data-slot="track"
      :class="pohon.track({ class: pohonProp?.track })"
    >
      <SliderRange
        data-slot="range"
        :class="pohon.range({ class: pohonProp?.range })"
      />
    </SliderTrack>

    <template
      v-for="thumb in thumbs"
      :key="thumb"
    >
      <UTooltip
        v-if="!!tooltip"
        :text="thumbs > 1 ? String(sliderValue?.[thumb - 1]) : String(sliderValue)"
        disable-closing-trigger
        v-bind="(typeof tooltip === 'object' ? tooltip : {})"
      >
        <SliderThumb
          data-slot="thumb"
          :class="pohon.thumb({ class: pohonProp?.thumb })"
          :aria-label="thumbs === 1 ? 'Thumb' : `Thumb ${thumb} of ${thumbs}`"
        />
      </UTooltip>
      <SliderThumb
        v-else
        data-slot="thumb"
        :class="pohon.thumb({ class: pohonProp?.thumb })"
        :aria-label="thumbs === 1 ? 'Thumb' : `Thumb ${thumb} of ${thumbs}`"
      />
    </template>
  </SliderRoot>
</template>
