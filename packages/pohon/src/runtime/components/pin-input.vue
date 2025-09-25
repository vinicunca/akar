<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  APinInputRootEmits,
  APinInputRootProps,
  APrimitiveProps,
} from 'akar';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/pin-input';

type PinInput = ComponentConfig<typeof theme, AppConfig, 'pinInput'>;

type PinInputType = 'text' | 'number';
type PinInputValue<Type extends PinInputType> = [Type] extends ['number'] ? Array<number> : Array<string>;

export interface PPinInputProps<T extends PinInputType = 'text'> extends Pick<APinInputRootProps<T>, 'defaultValue' | 'disabled' | 'id' | 'mask' | 'modelValue' | 'name' | 'otp' | 'placeholder' | 'required' | 'type'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /**
   * @defaultValue 'primary'
   */
  color?: PinInput['variants']['color'];
  /**
   * @defaultValue 'outline'
   */
  variant?: PinInput['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: PinInput['variants']['size'];
  /**
   * The number of input fields.
   * @defaultValue 5
   */
  length?: number | string;
  autofocus?: boolean;
  autofocusDelay?: number;
  highlight?: boolean;
  class?: any;
  pohon?: PinInput['slots'];
}

export type PPinInputEmits<T extends PinInputType = 'text'> = APinInputRootEmits<T> & {
  change: [event: Event];
  blur: [event: Event];
};

</script>

<script setup lang="ts" generic="T extends PinInputType">
import type { ComponentPublicInstance } from 'vue';
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import {
  APinInputInput,
  APinInputRoot,
  useForwardPropsEmits,
} from 'akar';
import { computed, onMounted, ref } from 'vue';
import { useFormField } from '../composables/use-form-field';
import { looseToNumber } from '../utils';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PPinInputProps<T>>(),
  {
    type: 'text' as never,
    length: 5,
    autofocusDelay: 0,
  },
);
const emits = defineEmits<PPinInputEmits<T>>();

const appConfig = useAppConfig() as PinInput['AppConfig'];

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'disabled',
    'id',
    'mask',
    'name',
    'otp',
    'required',
    'type',
  ),
  emits,
);

const {
  emitFormInput,
  emitFormFocus,
  emitFormChange,
  emitFormBlur,
  size,
  color,
  id,
  name,
  highlight,
  disabled,
  ariaAttrs,
} = useFormField<PPinInputProps>(props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.pinInput || {}),
  })({
    color: color.value,
    variant: props.variant,
    size: size.value,
    highlight: highlight.value,
  }),
);

const inputsRef = ref<Array<ComponentPublicInstance>>([]);

const completed = ref(false);
function onComplete(value: Array<string> | Array<number>) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);
  emitFormChange();
}

function onBlur(event: FocusEvent) {
  if (!event.relatedTarget || completed.value) {
    emits('blur', event);
    emitFormBlur();
  }
}

function autoFocus() {
  if (props.autofocus) {
    inputsRef.value[0]?.$el?.focus();
  }
}

onMounted(() => {
  setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});

defineExpose({
  inputsRef,
});
</script>

<template>
  <APinInputRoot
    v-bind="{ ...rootProps, ...ariaAttrs }"
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :model-value="(modelValue as PinInputValue<T>)"
    :default-value="defaultValue"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    @update:model-value="emitFormInput()"
    @complete="onComplete"
  >
    <APinInputInput
      v-for="(ids, index) in looseToNumber(props.length)"
      :key="ids"
      :ref="el => (inputsRef[index] = el as ComponentPublicInstance)"
      :index="index"
      :class="pohon.base({ class: props.pohon?.base })"
      :disabled="disabled"
      @blur="onBlur"
      @focus="emitFormFocus"
    />
  </APinInputRoot>
</template>
