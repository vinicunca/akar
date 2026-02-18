<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/form-field';

type FormField = ComponentConfig<typeof theme, AppConfig, 'formField'>;

export interface PFormFieldProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /** The name of the FormField. Also used to match form errors. */
  name?: string;
  /** A regular expression to match form error names. */
  errorPattern?: RegExp;
  label?: string;
  description?: string;
  help?: string;
  error?: boolean | string;
  hint?: string;
  /**
   * @defaultValue 'md'
   */
  size?: FormField['variants']['size'];
  required?: boolean;
  /** If true, validation on input will be active immediately instead of waiting for a blur event. */
  eagerValidation?: boolean;
  /**
   * Delay in milliseconds before validating the form on input events.
   * @defaultValue `300`
   */
  validateOnInputDelay?: number;
  /**
   * The orientation of the form field.
   * @defaultValue 'vertical'
   */
  orientation?: FormField['variants']['orientation'];
  class?: any;
  pohon?: FormField['slots'];
}

export interface PFormFieldSlots {
  label: (props: { label?: string }) => any;
  hint: (props: { hint?: string }) => any;
  description: (props: { description?: string }) => any;
  help: (props: { help?: string }) => any;
  error: (props: { error?: boolean | string }) => any;
  default: (props: { error?: boolean | string }) => any;
}
</script>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { FormError, FormFieldInjectedOptions } from '../types/form';
import { useAppConfig } from '#imports';
import { isString } from '@vinicunca/perkakas';
import { ALabel, APrimitive } from 'akar';
import { computed, inject, provide, ref, useId, watch } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { formErrorsInjectionKey, formFieldInjectionKey, formInputsInjectionKey, inputIdInjectionKey } from '../composables/use-form-field';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PFormFieldProps>(),
  {
    error: undefined,
  },
);
const slots = defineSlots<PFormFieldSlots>();

const appConfig = useAppConfig() as FormField['AppConfig'];
const pohonProp = useComponentPohon('formField', props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.formField || {}),
  })({
    size: props.size,
    required: props.required,
    orientation: props.orientation,
  }),
);

const formErrors = inject<Ref<Array<FormError>> | null>(formErrorsInjectionKey, null);

const error = computed(() =>
  props.error
  || formErrors?.value?.find((error) => error.name === props.name
    || (props.errorPattern && error.name?.match(props.errorPattern)))?.message,
);

const id = ref(useId());
// Copies id's initial value to bind aria-attributes such as aria-describedby.
// This is required for the RadioGroup component which unsets the id value.
const ariaId = id.value;

const formInputs = inject(formInputsInjectionKey, undefined);
watch(
  id,
  () => {
    if (formInputs && props.name) {
      formInputs.value[props.name] = { id: id.value, pattern: props.errorPattern };
    }
  },
  { immediate: true },
);

provide(inputIdInjectionKey, id);

provide(
  formFieldInjectionKey,
  computed(() => ({
    error: error.value,
    name: props.name,
    size: props.size,
    eagerValidation: props.eagerValidation,
    validateOnInputDelay: props.validateOnInputDelay,
    errorPattern: props.errorPattern,
    hint: props.hint,
    description: props.description,
    help: props.help,
    ariaId,
  }) as FormFieldInjectedOptions<PFormFieldProps>),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="form-field-root"
    :data-orientation="orientation"
  >
    <div
      :class="pohon.wrapper({ class: pohonProp?.wrapper })"
      data-pohon="form-field-wrapper"
    >
      <div
        v-if="label || !!slots.label"
        :class="pohon.labelWrapper({ class: pohonProp?.labelWrapper })"
        data-pohon="form-field-label-wrapper"
      >
        <ALabel
          :for="id"
          :class="pohon.label({ class: pohonProp?.label })"
          data-pohon="form-field-label"
        >
          <slot
            name="label"
            :label="label"
          >
            {{ label }}
          </slot>
        </ALabel>

        <span
          v-if="hint || !!slots.hint"
          :id="`${ariaId}-hint`"
          :class="pohon.hint({ class: pohonProp?.hint })"
          data-pohon="form-field-hint"
        >
          <slot
            name="hint"
            :hint="hint"
          >
            {{ hint }}
          </slot>
        </span>
      </div>

      <p
        v-if="description || !!slots.description"
        :id="`${ariaId}-description`"
        :class="pohon.description({ class: pohonProp?.description })"
        data-pohon="form-field-description"
      >
        <slot
          name="description"
          :description="description"
        >
          {{ description }}
        </slot>
      </p>
    </div>

    <div
      :class="[(label || !!slots.label || description || !!slots.description) && pohon.container({ class: pohonProp?.container })]"
      data-pohon="form-field-container"
    >
      <slot :error="error" />

      <div
        v-if="props.error !== false && ((isString(error) && error) || !!slots.error)"
        :id="`${ariaId}-error`"
        :class="pohon.error({ class: pohonProp?.error })"
        data-pohon="form-field-error"
      >
        <slot
          name="error"
          :error="error"
        >
          {{ error }}
        </slot>
      </div>
      <div
        v-else-if="help || !!slots.help"
        :id="`${ariaId}-help`"
        :class="pohon.help({ class: pohonProp?.help })"
        data-pohon="form-field-help"
      >
        <slot
          name="help"
          :help="help"
        >
          {{ help }}
        </slot>
      </div>
    </div>
  </APrimitive>
</template>
