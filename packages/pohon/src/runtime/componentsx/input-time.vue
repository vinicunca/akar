<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { SegmentPart, TimeFieldRootEmits, TimeFieldRootProps, TimeRangeFieldRootEmits, TimeRangeFieldRootProps, TimeValue } from 'akar';
import type { ComponentPublicInstance, VNode } from 'vue';
import type { UseComponentIconsProps } from '../composables/useComponentIcons';
import type { AAvatarProps, PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/input-time';

type InputTime = ComponentConfig<typeof theme, AppConfig, 'inputTime'>;

type InputTimeDefaultValue<R extends boolean = false> = R extends true
  ? TimeRangeFieldRootProps['defaultValue']
  : TimeFieldRootProps['defaultValue'];

type InputTimeModelValue<R extends boolean = false> = (R extends true
  ? TimeRangeFieldRootProps['modelValue']
  : TimeFieldRootProps['modelValue']) | undefined;

type _TimeFieldRootProps = Omit<TimeFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale'>;
type _TimeRangeFieldRootProps = Omit<TimeRangeFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale'>;

export interface InputTimeProps<R extends boolean = false> extends UseComponentIconsProps, _TimeFieldRootProps, _TimeRangeFieldRootProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * @defaultValue 'primary'
   */
  color?: InputTime['variants']['color'];
  /**
   * @defaultValue 'outline'
   */
  variant?: InputTime['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: InputTime['variants']['size'];
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  /** Keep the mobile text size on all breakpoints. */
  fixed?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  /**
   * The icon to use as a range separator.
   * @defaultValue appConfig.pohon.icons.minus
   * @IconifyIcon
   */
  separatorIcon?: PIconProps['name'];
  /**
   * Enable time range selection.
   * @defaultValue false
   */
  range?: R & boolean;
  /** The value of the input when initially rendered. Use when you do not need to control the state of the input. */
  defaultValue?: InputTimeDefaultValue<R>;
  /** The controlled value of the input. Can be bind as `v-model`. */
  modelValue?: InputTimeModelValue<R>;
  class?: any;
  pohon?: InputTime['slots'];
}

export interface InputTimeEmits<R extends boolean = false> extends Omit<TimeFieldRootEmits & TimeRangeFieldRootEmits, 'update:modelValue'> {
  'update:modelValue': [value: InputTimeModelValue<R>];
  'change': [event: Event];
  'blur': [event: FocusEvent];
  'focus': [event: FocusEvent];
}

export interface InputTimeSlots {
  leading?: (props: { pohon: InputTime['pohon'] }) => Array<VNode>;
  default?: (props: { pohon: InputTime['pohon'] }) => Array<VNode>;
  trailing?: (props: { pohon: InputTime['pohon'] }) => Array<VNode>;
  separator?: (props: { pohon: InputTime['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="R extends boolean">
import { useAppConfig } from '#imports';
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import { TimeRangeFieldInput, TimeRangeFieldRoot, useForwardPropsEmits } from 'akar';
import { TimeField as SingleTimeField } from 'akar/namespaced';
import { computed, onMounted, ref } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useComponentIcons } from '../composables/useComponentIcons';
import { useFieldGroup } from '../composables/useFieldGroup';
import { useFormField } from '../composables/useFormField';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<InputTimeProps<R>>(), {
  autofocusDelay: 0,
});
const emits = defineEmits<InputTimeEmits<R>>();
const slots = defineSlots<InputTimeSlots>();

const appConfig = useAppConfig() as InputTime['AppConfig'];
const pohonProp = useComponentPohon('inputTime', props);

const rootProps = useForwardPropsEmits(reactiveOmit(props, 'id', 'name', 'range', 'modelValue', 'defaultValue', 'color', 'variant', 'size', 'highlight', 'fixed', 'disabled', 'autofocus', 'autofocusDelay', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'separatorIcon', 'class', 'pohon'), emits);

const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color, size: formFieldSize, name, highlight, disabled, ariaAttrs } = useFormField<InputTimeProps<R>>(props);
const { orientation, size: fieldGroupSize } = useFieldGroup<InputTimeProps<R>>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);

const inputSize = computed(() => fieldGroupSize.value || formFieldSize.value);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.inputTime || {}) })({
  color: color.value,
  variant: props.variant,
  size: inputSize.value,
  loading: props.loading,
  highlight: highlight.value,
  fixed: props.fixed,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value,
}));

const [DefineSegmentsTemplate, ReuseSegmentsTemplate] = createReusableTemplate<{
  segments?: Array<{ part: SegmentPart; value: string }>;
  type?: 'start' | 'end';
}>();

const inputsRef = ref<Array<ComponentPublicInstance>>([]);

// FIXME: Move to namespaced when exported in `akar`
const RangeTimeField = { Root: TimeRangeFieldRoot, Input: TimeRangeFieldInput };

const TimeField = computed(() => props.range ? RangeTimeField : SingleTimeField);

function setInputRef(index: number, el: Element | ComponentPublicInstance | null) {
  // @ts-expect-error - ComponentPublicInstance type mismatch in Nuxt module augmentation
  inputsRef.value[index] = el;
}

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);

  emitFormChange();
  emitFormInput();
}

function onBlur(event: FocusEvent) {
  emitFormBlur();
  emits('blur', event);
}

function onFocus(event: FocusEvent) {
  emitFormFocus();
  emits('focus', event);
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
  <DefineSegmentsTemplate v-slot="{ segments, type }">
    <TimeField.Input
      v-for="(segment, index) in segments"
      :key="`${segment.part}-${index}`"
      :ref="el => setInputRef(index, el)"
      :type="type"
      :part="segment.part"
      data-slot="segment"
      :class="pohon.segment({ class: pohonProp?.segment })"
      :data-segment="segment.part"
    >
      {{ segment.value.trim() }}
    </TimeField.Input>
  </DefineSegmentsTemplate>

  <TimeField.Root
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :id="id"
    v-slot="{ segments }"
    :name="name"
    :disabled="disabled"
    :model-value="(modelValue as TimeValue)"
    :default-value="(defaultValue as TimeValue)"
    data-slot="base"
    :class="pohon.base({ class: [pohonProp?.base, props.class] })"
    @update:model-value="onUpdate"
    @blur="onBlur"
    @focus="onFocus"
  >
    <template v-if="Array.isArray(segments)">
      <ReuseSegmentsTemplate :segments="segments" />
    </template>
    <template v-else>
      <ReuseSegmentsTemplate
        :segments="segments.start"
        type="start"
      />
      <slot
        name="separator"
        :pohon="pohon"
      >
        <PIcon
          :name="separatorIcon || appConfig.pohon.icons.minus"
          data-slot="separatorIcon"
          :class="pohon.separatorIcon({ class: pohonProp?.separatorIcon })"
        />
      </slot>
      <ReuseSegmentsTemplate
        :segments="segments.end"
        type="end"
      />
    </template>

    <slot :pohon="pohon" />

    <span
      v-if="isLeading || !!avatar || !!slots.leading"
      data-slot="leading"
      :class="pohon.leading({ class: pohonProp?.leading })"
    >
      <slot
        name="leading"
        :pohon="pohon"
      >
        <PIcon
          v-if="isLeading && leadingIconName"
          :name="leadingIconName"
          data-slot="leadingIcon"
          :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon })"
        />
        <PAvatar
          v-else-if="!!avatar"
          :size="((pohonProp?.leadingAvatarSize || pohon.leadingAvatarSize()) as AAvatarProps['size'])"
          v-bind="avatar"
          data-slot="leadingAvatar"
          :class="pohon.leadingAvatar({ class: pohonProp?.leadingAvatar })"
        />
      </slot>
    </span>

    <span
      v-if="isTrailing || !!slots.trailing"
      data-slot="trailing"
      :class="pohon.trailing({ class: pohonProp?.trailing })"
    >
      <slot
        name="trailing"
        :pohon="pohon"
      >
        <PIcon
          v-if="trailingIconName"
          :name="trailingIconName"
          data-slot="trailingIcon"
          :class="pohon.trailingIcon({ class: pohonProp?.trailingIcon })"
        />
      </slot>
    </span>
  </TimeField.Root>
</template>
