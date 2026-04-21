<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PinInputRootEmits, PinInputRootProps } from 'akar';
import type { ComponentPublicInstance } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/pin-input';

type PinInput = ComponentConfig<typeof theme, AppConfig, 'pinInput'>;

type PinInputType = 'text' | 'number';
type PinInputValue<Type extends PinInputType> = [Type] extends ['number'] ? Array<number> : Array<string>;

export interface PinInputProps<T extends PinInputType = 'text'> extends Pick<PinInputRootProps<T>, 'defaultValue' | 'disabled' | 'id' | 'mask' | 'modelValue' | 'name' | 'otp' | 'placeholder' | 'required' | 'type'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
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
  /** Keep the mobile text size on all breakpoints. */
  fixed?: boolean;
  class?: any;
  pohon?: PinInput['slots'];
}

export type PinInputEmits<T extends PinInputType = 'text'> = PinInputRootEmits<T> & {
  change: [event: Event];
  blur: [event: Event];
};

</script>

<script setup lang="ts" generic="T extends PinInputType">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { PinInputInput, PinInputRoot, useForwardPropsEmits } from 'akar';
import { computed, onMounted, ref } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFormField } from '../composables/useFormField';
import { looseToNumber } from '../utils';
import { uv } from '../utils/uv';

const props = withDefaults(defineProps<PinInputProps<T>>(), {
  type: 'text' as never,
  length: 5,
  autofocusDelay: 0,
});
const emits = defineEmits<PinInputEmits<T>>();

const appConfig = useAppConfig() as PinInput['AppConfig'];
const pohonProp = useComponentPohon('pinInput', props);

const rootProps = useForwardPropsEmits(reactivePick(props, 'disabled', 'id', 'mask', 'name', 'otp', 'required', 'type'), emits);

const { emitFormInput, emitFormFocus, emitFormChange, emitFormBlur, size, color, id, name, highlight, disabled, ariaAttrs } = useFormField<PinInputProps>(props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pinInput || {}) })({
  color: color.value,
  variant: props.variant,
  size: size.value,
  highlight: highlight.value,
  fixed: props.fixed,
}));

const inputsRef = ref<Array<ComponentPublicInstance>>([]);

function setInputRef(index: number, el: Element | ComponentPublicInstance | null) {
  // @ts-expect-error - ComponentPublicInstance type mismatch in Nuxt module augmentation
  inputsRef.value[index] = el;
}

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
  <PinInputRoot
    v-bind="{ ...rootProps, ...ariaAttrs }"
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :model-value="(modelValue as PinInputValue<T>)"
    :default-value="(defaultValue as PinInputValue<T>)"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    @update:model-value="emitFormInput()"
    @complete="onComplete"
  >
    <PinInputInput
      v-for="(ids, index) in looseToNumber(props.length)"
      :key="ids"
      :ref="el => setInputRef(index as number, el)"
      :index="(index as number)"
      data-slot="base"
      :class="pohon.base({ class: pohonProp?.base })"
      :disabled="disabled"
      @blur="onBlur"
      @focus="emitFormFocus"
    />
  </PinInputRoot>
</template>
