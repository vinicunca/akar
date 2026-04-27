<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  ADateFieldRootEmits,
  ADateFieldRootProps,
  ADateRangeFieldRootEmits,
  ADateRangeFieldRootProps,
  DateValue,
  SegmentPart,
} from 'akar';
import type { ComponentPublicInstance, VNode } from 'vue';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps, PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/input-date';

type InputDate = ComponentConfig<typeof theme, AppConfig, 'inputDate'>;

type _DateFieldRootProps = Omit<ADateFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale'>;
type _RangeDateFieldRootProps = Omit<ADateRangeFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale'>;

type InputDateDefaultValue<R extends boolean = false> = R extends true ? ADateRangeFieldRootProps['defaultValue'] : ADateFieldRootProps['defaultValue'];
type InputDateModelValue<R extends boolean = false> = (R extends true ? ADateRangeFieldRootProps['modelValue'] : ADateFieldRootProps['modelValue']) | undefined;

export interface PInputDateProps<R extends boolean = false> extends UseComponentIconsProps, _DateFieldRootProps, _RangeDateFieldRootProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * @defaultValue 'primary'
   */
  color?: InputDate['variants']['color'];
  /**
   * @defaultValue 'solid'
   */
  variant?: InputDate['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: InputDate['variants']['size'];
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
  /** Whether or not a range of dates can be selected */
  range?: R & boolean;
  defaultValue?: InputDateDefaultValue<R>;
  modelValue?: InputDateModelValue<R>;
  class?: any;
  pohon?: InputDate['slots'];
}

export interface PInputDateEmits<R extends boolean = false> extends Omit<ADateFieldRootEmits & ADateRangeFieldRootEmits, 'update:modelValue'> {
  'update:modelValue': [value: InputDateModelValue<R>];
  'change': [event: Event];
  'blur': [event: FocusEvent];
  'focus': [event: FocusEvent];
}

export interface PInputDateSlots {
  leading?: (props: { pohon: InputDate['pohon'] }) => Array<VNode>;
  default?: (props: { pohon: InputDate['pohon'] }) => Array<VNode>;
  trailing?: (props: { pohon: InputDate['pohon'] }) => Array<VNode>;
  separator?: (props: { pohon: InputDate['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="R extends boolean">
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'akar';
import {
  ADateField,
  ADateRangeField,
} from 'akar/namespaced';
import { computed, onMounted, ref } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentIcons } from '../composables/use-component-icons';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFieldGroup } from '../composables/use-field-group';
import { useFormField } from '../composables/use-form-field';
import { uv } from '../utils/uv';
import PAvatar from './Avatar.vue';
import PIcon from './Icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PInputDateProps<R>>(),
  {
    autofocusDelay: 0,
  },
);
const emits = defineEmits<PInputDateEmits<R>>();
const slots = defineSlots<PInputDateSlots>();

const appConfig = useAppConfig() as InputDate['AppConfig'];
const pohonProp = useComponentPohon('inputDate', props);

const rootProps = useForwardPropsEmits(
  reactiveOmit(
    props,
    'id',
    'name',
    'range',
    'modelValue',
    'defaultValue',
    'color',
    'variant',
    'size',
    'highlight',
    'fixed',
    'disabled',
    'autofocus',
    'autofocusDelay',
    'icon',
    'avatar',
    'leading',
    'leadingIcon',
    'trailing',
    'trailingIcon',
    'loading',
    'loadingIcon',
    'separatorIcon',
    'class',
    'pohon',
  ),
  emits,
);
const {
  emitFormBlur,
  emitFormFocus,
  emitFormChange,
  emitFormInput,
  size: formFieldSize,
  color,
  id,
  name,
  highlight,
  disabled,
  ariaAttrs,
} = useFormField<PInputDateProps<R>>(props);
const { orientation, size: fieldGroupSize } = useFieldGroup<PInputDateProps<R>>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);

const [DefineSegmentsTemplate, ReuseSegmentsTemplate] = createReusableTemplate<{
  segments?: Array<{ part: SegmentPart; value: string }>;
  type?: 'start' | 'end';
}>();

const inputSize = computed(() => fieldGroupSize.value || formFieldSize.value);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.inputDate || {}) })({
  color: color.value,
  variant: props.variant,
  size: inputSize.value,
  highlight: highlight.value,
  fixed: props.fixed,
  loading: props.loading,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value,
}));

const inputsRef = ref<Array<ComponentPublicInstance>>([]);

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

const DateField = computed(() => props.range ? ADateRangeField : ADateField);

defineExpose({
  inputsRef,
});
</script>

<template>
  <DefineSegmentsTemplate v-slot="{ segments, type }">
    <DateField.Input
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
    </DateField.Input>
  </DefineSegmentsTemplate>

  <DateField.Root
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :id="id"
    v-slot="{ segments }"
    :model-value="(modelValue as DateValue)"
    :default-value="(defaultValue as DateValue)"
    :name="name"
    :disabled="disabled"
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
          :size="((pohonProp?.leadingAvatarSize || pohon.leadingAvatarSize()) as PAvatarProps['size'])"
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
  </DateField.Root>
</template>
