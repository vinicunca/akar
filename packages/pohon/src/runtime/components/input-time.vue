<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ATimeFieldRootEmits, ATimeFieldRootProps } from 'akar';
import type { ComponentPublicInstance } from 'vue';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/input-time';

type InputTime = ComponentConfig<typeof theme, AppConfig, 'inputTime'>;

export interface PInputTimeProps extends Omit<ATimeFieldRootProps, 'as' | 'asChild' | 'locale' | 'dir'>, UseComponentIconsProps {
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
  autofocus?: boolean;
  autofocusDelay?: number;
  class?: any;
  pohon?: InputTime['slots'];
}

export interface PInputTimeEmits extends ATimeFieldRootEmits {
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}

export interface PInputTimeSlots {
  leading: (props: { pohon: InputTime['pohon'] }) => any;
  default: (props: { pohon: InputTime['pohon'] }) => any;
  trailing: (props: { pohon: InputTime['pohon'] }) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactiveOmit } from '@vueuse/core';
import { ATimeFieldInput, ATimeFieldRoot, useForwardPropsEmits } from 'akar';
import { computed, onMounted, ref } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useFieldGroup } from '../composables/use-field-group';
import { useFormField } from '../composables/use-form-field';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';

const props = withDefaults(
  defineProps<PInputTimeProps>(),
  {
    autofocusDelay: 0,
  },
);
const emits = defineEmits<PInputTimeEmits>();
const slots = defineSlots<PInputTimeSlots>();

const appConfig = useAppConfig() as InputTime['AppConfig'];

const rootProps = useForwardPropsEmits(
  reactiveOmit(
    props,
    'id',
    'name',
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
  id,
  color,
  size: formGroupSize,
  name,
  highlight,
  disabled,
  ariaAttrs,
} = useFormField<PInputTimeProps>(props);
const { orientation, size: fieldGroupSize } = useFieldGroup<PInputTimeProps>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);

const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.inputTime || {}),
  })({
    color: color.value,
    variant: props.variant,
    size: inputSize.value,
    loading: props.loading,
    highlight: highlight.value,
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

defineExpose({
  inputsRef,
});
</script>

<template>
  <ATimeFieldRoot
    v-bind="{ ...rootProps, ...ariaAttrs }"
    :id="id"
    v-slot="{ segments }"
    :name="name"
    :disabled="disabled"
    :class="pohon.base({ class: [props.pohon?.base, props.class] })"
    data-pohon="input-time-root"
    @update:model-value="onUpdate"
    @blur="onBlur"
    @focus="onFocus"
  >
    <ATimeFieldInput
      v-for="(segment, index) in segments"
      :key="`${segment.part}-${index}`"
      :ref="el => (inputsRef[index] = el as ComponentPublicInstance)"
      :part="segment.part"
      data-pohon="input-time-segment"
      :class="pohon.segment({ class: props.pohon?.segment })"
    >
      {{ segment.value.trim() }}
    </ATimeFieldInput>

    <slot :pohon="pohon" />

    <span
      v-if="isLeading || !!avatar || !!slots.leading"
      data-pohon="input-time-leading"
      :class="pohon.leading({ class: props.pohon?.leading })"
    >
      <slot
        name="leading"
        :pohon="pohon"
      >
        <PIcon
          v-if="isLeading && leadingIconName"
          :name="leadingIconName"
          data-pohon="input-time-leading-icon"
          :class="pohon.leadingIcon({ class: props.pohon?.leadingIcon })"
        />
        <PAvatar
          v-else-if="!!avatar"
          :size="((props.pohon?.leadingAvatarSize || pohon.leadingAvatarSize()) as PAvatarProps['size'])"
          v-bind="avatar"
          data-pohon="input-time-leading-avatar"
          :class="pohon.leadingAvatar({ class: props.pohon?.leadingAvatar })"
        />
      </slot>
    </span>

    <span
      v-if="isTrailing || !!slots.trailing"
      data-pohon="input-time-trailing"
      :class="pohon.trailing({ class: props.pohon?.trailing })"
    >
      <slot
        name="trailing"
        :pohon="pohon"
      >
        <PIcon
          v-if="trailingIconName"
          :name="trailingIconName"
          data-pohon="input-time-trailing-icon"
          :class="pohon.trailingIcon({ class: props.pohon?.trailingIcon })"
        />
      </slot>
    </span>
  </ATimeFieldRoot>
</template>
