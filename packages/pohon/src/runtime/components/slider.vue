<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { APrimitiveProps, ASliderRootProps } from 'akar';
import type { PTooltipProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/slider';

type Slider = ComponentConfig<typeof theme, AppConfig, 'slider'>;

export interface PSliderProps extends Pick<ASliderRootProps, 'name' | 'disabled' | 'inverted' | 'min' | 'max' | 'step' | 'minStepsBetweenThumbs'> {
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
  orientation?: ASliderRootProps['orientation'];
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

export interface PSliderEmits {
  change: [event: Event];
}
</script>

<script setup lang="ts" generic="T extends number | number[]">
import { useAppConfig } from '#imports';
import { isNumber } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import {
  ASliderRange,
  ASliderRoot,
  ASliderThumb,
  ASliderTrack,
  useForwardPropsEmits,
} from 'akar';
import { computed } from 'vue';
import { useFormField } from '../composables/use-form-field';
import { uv } from '../utils/uv';
import PTooltip from './tooltip.vue';

const props = withDefaults(
  defineProps<PSliderProps>(),
  {
    min: 0,
    max: 100,
    step: 1,
    orientation: 'horizontal',
  },
);
const emits = defineEmits<PSliderEmits>();

const modelValue = defineModel<T>();

const appConfig = useAppConfig() as Slider['AppConfig'];

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'as',
    'orientation',
    'min',
    'max',
    'step',
    'minStepsBetweenThumbs',
    'inverted',
  ),
  emits,
);

const {
  id,
  emitFormChange,
  emitFormInput,
  size,
  color,
  name,
  disabled,
  ariaAttrs,
} = useFormField<PSliderProps>(props);

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

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.slider || {}),
  })({
    disabled: disabled.value,
    size: size.value,
    color: color.value,
    orientation: props.orientation,
  }),
);

function onChange(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);
  emitFormChange();
}
</script>

<template>
  <ASliderRoot
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
    <ASliderTrack :class="pohon.track({ class: props.pohon?.track })">
      <ASliderRange :class="pohon.range({ class: props.pohon?.range })" />
    </ASliderTrack>

    <template
      v-for="thumb in thumbs"
      :key="thumb"
    >
      <PTooltip
        v-if="!!tooltip"
        :text="thumbs > 1 ? String(sliderValue?.[thumb - 1]) : String(sliderValue)"
        disable-closing-trigger
        v-bind="(typeof tooltip === 'object' ? tooltip : {})"
      >
        <ASliderThumb :class="pohon.thumb({ class: props.pohon?.thumb })" />
      </PTooltip>
      <ASliderThumb
        v-else
        :class="pohon.thumb({ class: props.pohon?.thumb })"
      />
    </template>
  </ASliderRoot>
</template>
