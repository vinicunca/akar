<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ADateFieldRootEmits, ADateFieldRootProps, ADateRangeFieldRootEmits, ADateRangeFieldRootProps, DateValue, SegmentPart } from 'akar';
import type { ComponentPublicInstance } from 'vue';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps, PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/input-date';

type InputDate = ComponentConfig<typeof theme, AppConfig, 'inputDate'>;

type _ADateFieldRootProps = Omit<ADateFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale'>;
type A_RangeDateFieldRootProps = Omit<ADateRangeFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale'>;

type InputDateDefaultValue<R extends boolean = false> = R extends true ? ADateRangeFieldRootProps['defaultValue'] : ADateFieldRootProps['defaultValue'];
type InputDateModelValue<R extends boolean = false> = (R extends true ? ADateRangeFieldRootProps['modelValue'] : ADateFieldRootProps['modelValue']) | undefined;

export interface PInputDateProps<R extends boolean = false> extends UseComponentIconsProps, _ADateFieldRootProps, A_RangeDateFieldRootProps {
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
  autofocus?: boolean;
  autofocusDelay?: number;
  /**
   * The icon to use as a range separator.
   * @defaultValue appConfig.pohon.icons.minus
   * @IconifyIcon
   */
  separatorIcon?: PIconProps['name'];
  /** Whether or not a range of dates can be selecteu */
  range?: R & boolean;
  defaultValue?: InputDateDefaultValue<R>;
  modelValue?: InputDateModelValue<R>;
  class?: any;
  pohon?: InputDate['slots'];
}

export interface PInputDateEmits<R extends boolean> extends Omit<ADateFieldRootEmits & ADateRangeFieldRootEmits, 'update:modelValue'> {
  'update:modelValue': [date: InputDateModelValue<R>];
  'change': [event: Event];
  'blur': [event: FocusEvent];
  'focus': [event: FocusEvent];
}

export interface PInputDateSlots {
  leading: (props: { pohon: InputDate['pohon'] }) => any;
  default: (props: { pohon: InputDate['pohon'] }) => any;
  trailing: (props: { pohon: InputDate['pohon'] }) => any;
  separator: (props: { pohon: InputDate['pohon'] }) => any;
}
</script>

<script setup lang="ts" generic="R extends boolean">
import { useAppConfig } from '#imports';
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'akar';
import { ADateRangeField as ARangeDateField, ADateField as ASingleDateField } from 'akar/namespaced';
import { computed, onMounted, ref } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFieldGroup } from '../composables/use-field-group';
import { useFormField } from '../composables/use-form-field';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';

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
  size: formGroupSize,
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
  segments?: Array<{
    part: SegmentPart;
    value: string;
  }>;
  type?: 'start' | 'end';
}>();

const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.inputDate || {}),
  })({
    color: color.value,
    variant: props.variant,
    size: inputSize.value,
    highlight: highlight.value,
    loading: props.loading,
    leading: isLeading.value || !!props.avatar || !!slots.leading,
    trailing: isTrailing.value || !!slots.trailing,
    fieldGroup: orientation.value,
  }),
);

const inputsRef = ref<Array<ComponentPublicInstance>>([]);

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

const ADateField = computed(() => props.range ? ARangeDateField : ASingleDateField);

defineExpose({
  inputsRef,
});
</script>

<template>
  <DefineSegmentsTemplate v-slot="{ segments, type }">
    <ADateField.Input
      v-for="(segment, index) in segments"
      :key="`${segment.part}-${index}`"
      :ref="el => (inputsRef[index] = el as ComponentPublicInstance)"
      :type="type"
      :part="segment.part"
      data-pohon="input-date-segment"
      :class="pohon.segment({ class: pohonProp?.segment })"
      :data-segment="segment.part"
    >
      {{ segment.value.trim() }}
    </ADateField.Input>
  </DefineSegmentsTemplate>

  <ADateField.Root
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :id="id"
    v-slot="{ segments }"
    :model-value="(modelValue as DateValue)"
    :default-value="(defaultValue as DateValue)"
    :name="name"
    :disabled="disabled"
    data-pohon="input-date-base"
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
          data-pohon="input-date-separator-icon"
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
      data-pohon="input-date-leading"
      :class="pohon.leading({ class: pohonProp?.leading })"
    >
      <slot
        name="leading"
        :pohon="pohon"
      >
        <PIcon
          v-if="isLeading && leadingIconName"
          :name="leadingIconName"
          data-pohon="input-date-leading-icon"
          :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon })"
        />
        <PAvatar
          v-else-if="!!avatar"
          :size="((pohonProp?.leadingAvatarSize || pohon.leadingAvatarSize()) as PAvatarProps['size'])"
          v-bind="avatar"
          data-pohon="input-date-leading-avatar"
          :class="pohon.leadingAvatar({ class: pohonProp?.leadingAvatar })"
        />
      </slot>
    </span>

    <span
      v-if="isTrailing || !!slots.trailing"
      data-pohon="input-date-trailing"
      :class="pohon.trailing({ class: pohonProp?.trailing })"
    >
      <slot
        name="trailing"
        :pohon="pohon"
      >
        <PIcon
          v-if="trailingIconName"
          :name="trailingIconName"
          data-pohon="input-date-trailing-icon"
          :class="pohon.trailingIcon({ class: pohonProp?.trailingIcon })"
        />
      </slot>
    </span>
  </ADateField.Root>
</template>
