<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { SliderRootProps } from 'akar';
import type { PTooltipProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/slider';

type Slider = ComponentConfig<typeof theme, AppConfig, 'slider'>;

export interface SliderProps extends Pick<SliderRootProps, 'name' | 'disabled' | 'inverted' | 'min' | 'max' | 'step' | 'minStepsBetweenThumbs'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
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
  orientation?: SliderRootProps['orientation'];
  /**
   * Display a tooltip around the slider thumbs with the current value.
   * `{ disableClosingTrigger: true }`{lang="ts-type"}
   * @defaultValue false
   */
  tooltip?: boolean | PTooltipProps;
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
import { useFormField } from '../composables/use-form-field';
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

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'orientation', 'min', 'max', 'step', 'minStepsBetweenThumbs', 'inverted'), emits);

const { id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField<SliderProps>(props);

const defaultSliderValue = computed(() => {
  if (isNumber(props.defaultValue)) {
    return [props.defaultValue];
  }
  return props.defaultValue;
});

const sliderValue = computed({
  get() {
    if (isNumber(modelValue.value)) {
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
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    :default-value="defaultSliderValue"
    @update:model-value="emitFormInput()"
    @value-commit="onChange"
  >
    <SliderTrack :class="pohon.track({ class: props.pohon?.track })">
      <SliderRange :class="pohon.range({ class: props.pohon?.range })" />
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
        <SliderThumb :class="pohon.thumb({ class: props.pohon?.thumb })" />
      </UTooltip>
      <SliderThumb
        v-else
        :class="pohon.thumb({ class: props.pohon?.thumb })"
      />
    </template>
  </SliderRoot>
</template>
