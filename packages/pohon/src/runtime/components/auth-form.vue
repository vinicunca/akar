<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type {
  PButtonProps,
  PCheckboxProps,
  PFormFieldProps,
  PFormProps,
  PIconProps,
  PInputProps,
  PLinkPropsKeys,
  PPinInputProps,
  PSelectMenuProps,
  PSeparatorProps,
} from '../types';
import type { FormSchema, FormSubmitEvent, InferInput } from '../types/form';
import type { FormHTMLAttributes } from '../types/html';
import type { NonUnion } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/auth-form';

type AuthForm = ComponentConfig<typeof theme, AppConfig, 'authForm'>;

export type PAuthFormCheckboxField = Omit<PFormFieldProps, 'name'> & PCheckboxProps & {
  name: string;
  type: 'checkbox';
};

export type PAuthFormSelectField = Omit<PFormFieldProps, 'name'> & PSelectMenuProps & {
  name: string;
  type: 'select';
};

export type PAuthFormOtpField = Omit<PFormFieldProps, 'name'> & Omit<PPinInputProps, 'type' | 'otp'> & {
  name: string;
  type: 'otp';
  /**
   * @deprecated Bind props directly in the field object.
   * The optional props for the `otp` type.
   * `{ otp: true }`{lang="ts-type"}
   */
  otp?: boolean | PPinInputProps;
};

export type PAuthFormInputFieldType = Required<PInputProps>['type'];

export type PAuthFormInputField<T extends PAuthFormInputFieldType & NonUnion<T> = 'text'> = Omit<PFormFieldProps, 'name'> & Omit<PInputProps, 'type'> & {
  name: string;
  type: T;
};

export type PAuthFormField = PAuthFormCheckboxField | PAuthFormSelectField | PAuthFormOtpField | PAuthFormInputField<PAuthFormInputFieldType>;

export interface PAuthFormProps<T extends FormSchema = FormSchema<object>, F extends PAuthFormField = PAuthFormField> extends /** @vue-ignore */ FormHTMLAttributes {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon displayed above the title.
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  title?: string;
  description?: string;
  fields?: Array<F>;
  /**
   * Display a list of Button under the description.
   * `{ color: 'neutral', variant: 'subtle', block: true }`{lang="ts-type"}
   */
  providers?: Array<PButtonProps>;
  /**
   * The text displayed in the separator.
   * @defaultValue 'or'
   */
  separator?: string | PSeparatorProps;
  /**
   * Display a submit button at the bottom of the form.
   * `{ label: 'Continue', block: true }`{lang="ts-type"}
   */
  submit?: Omit<PButtonProps, PLinkPropsKeys>;
  schema?: T;
  validate?: PFormProps<T>['validate'];
  validateOn?: PFormProps<T>['validateOn'];
  validateOnInputDelay?: PFormProps<T>['validateOnInputDelay'];
  disabled?: PFormProps<T>['disabled'];
  loading?: PButtonProps['loading'];
  loadingAuto?: PFormProps<T>['loadingAuto'];
  class?: any;
  onSubmit?: PFormProps<T>['onSubmit'];
  pohon?: AuthForm['slots'];
}

export type PAuthFormEmits<T extends object> = {
  submit: [payload: FormSubmitEvent<T>];
};

type DynamicFieldSlots<T, F, SlotProps = { field: F; state: T }> = Record<`${keyof T extends string ? keyof T : never}-field` | (string & {}), (props: SlotProps) => Array<VNode>>;

type DynamicFormFieldSlots<T> = Record<`${keyof T extends string ? keyof T : never}-${'label' | 'description' | 'hint' | 'help' | 'error'}` | (string & {}), (props?: {}) => Array<VNode>>;

export type PAuthFormSlots<T extends object = object, F extends PAuthFormField = PAuthFormField> = {
  header?: (props?: {}) => Array<VNode>;
  leading?: (props: { pohon: AuthForm['pohon'] }) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  providers?: (props?: {}) => Array<VNode>;
  separator?: (props?: {}) => Array<VNode>;
  validation?: (props?: {}) => Array<VNode>;
  submit?: (props: { loading: boolean }) => Array<VNode>;
  footer?: (props?: {}) => Array<VNode>;
} & DynamicFieldSlots<T, F> & DynamicFormFieldSlots<T>;

</script>

<script setup lang="ts" generic="T extends FormSchema, F extends PAuthFormField">
import { isObjectType } from '@vinicunca/perkakas';
import { APrimitive } from 'akar';
import { computed, reactive, ref, useTemplateRef } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { omit, pick } from '../utils';
import { uv } from '../utils/uv';
import PButton from './button.vue';
import PCheckbox from './checkbox.vue';
import PFormField from './form-field.vue';
import PForm from './form.vue';
import PIcon from './icon.vue';
import PInput from './input.vue';
import PPInput from './pin-input.vue';
import PSelectMenu from './select-menu.vue';
import PSeparator from './separator.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PAuthFormProps<T, F>>(),
  {
    separator: 'or',
  },
);

defineEmits<PAuthFormEmits<typeof state>>();

const slots = defineSlots<PAuthFormSlots<typeof state, F>>();

type FormStateType = InferInput<T>;

type TypedAuthFormField = PAuthFormField & {
  name: keyof FormStateType;
  defaultValue?: FormStateType[keyof FormStateType];
};

const state = reactive<FormStateType>((props.fields as Array<TypedAuthFormField> || []).reduce<FormStateType>((acc, field) => {
  if (field.name) {
    acc[field.name] = field.defaultValue;
  }
  return acc;
}, {} as FormStateType));

const { t } = useLocale();
const appConfig = useAppConfig() as AuthForm['AppConfig'];
const pohonProp = useComponentPohon('authForm', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.authForm || {}) })());

const formRef = useTemplateRef('formRef');
const passwordVisibility = ref(false);
const passwordRef = useTemplateRef('passwordRef');

function pickFieldProps(field: F) {
  const fields = ['name', 'errorPattern', 'help', 'error', 'hint', 'size', 'required', 'eagerValidation', 'validateOnInputDelay'] as Array<keyof F>;

  // Prevent binding `label` and `description` on Checkbox's FormField
  if (field.type === 'checkbox') {
    return pick(field, fields);
  }

  return pick(field, [...fields, 'label', 'description']);
}

function omitFieldProps(field: F) {
  const fields = ['errorPattern', 'help', 'error', 'hint', 'size', 'required', 'eagerValidation', 'validateOnInputDelay'] as Array<keyof F>;

  // Prevent binding `type` on other fields than Input
  if (field.type === 'checkbox' || field.type === 'select' || field.type === 'otp') {
    // Prevent binding `label` and `description` on Checkbox's FormField
    if (field.type === 'checkbox') {
      return omit(field, [...fields, 'type']);
    }

    return omit(field, [...fields, 'type', 'label', 'description']);
  }

  return omit(field, [...fields, 'label', 'description']);
}

defineExpose({
  formRef,
  state,
});
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      v-if="(icon || !!slots.leading) || (title || !!slots.title) || (description || !!slots.description) || !!slots.header"
      data-slot="header"
      :class="pohon.header({ class: pohonProp?.header })"
    >
      <slot name="header">
        <div
          v-if="icon || !!slots.leading"
          data-slot="leading"
          :class="pohon.leading({ class: pohonProp?.leading })"
        >
          <slot
            name="leading"
            :pohon="pohon"
          >
            <PIcon
              v-if="icon"
              :name="icon"
              data-slot="leadingIcon"
              :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon })"
            />
          </slot>
        </div>

        <div
          v-if="title || !!slots.title"
          data-slot="title"
          :class="pohon.title({ class: pohonProp?.title })"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <div
          v-if="description || !!slots.description"
          data-slot="description"
          :class="pohon.description({ class: pohonProp?.description })"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>

    <div
      data-slot="body"
      :class="pohon.body({ class: pohonProp?.body })"
    >
      <div
        v-if="providers?.length || !!slots.providers"
        data-slot="providers"
        :class="pohon.providers({ class: pohonProp?.providers })"
      >
        <slot name="providers">
          <PButton
            v-for="(provider, index) in providers"
            :key="index"
            block
            color="neutral"
            variant="subtle"
            v-bind="provider"
          />
        </slot>
      </div>

      <slot name="separator">
        <PSeparator
          v-if="providers?.length && fields?.length"
          v-bind="isObjectType(separator) ? separator : { label: separator }"
          data-slot="separator"
          :class="pohon.separator({ class: pohonProp?.separator })"
        />
      </slot>

      <PForm
        v-if="fields?.length"
        ref="formRef"
        :state="state"
        :schema="schema"
        :validate="validate"
        :validate-on="validateOn"
        :disabled="disabled"
        :loading-auto="loadingAuto"
        data-slot="form"
        :class="pohon.form({ class: pohonProp?.form })"
        v-bind="$attrs"
        @submit="onSubmit"
      >
        <PFormField
          v-for="field in fields"
          :key="field.name"
          v-bind="pickFieldProps(field)"
        >
          <slot
            :name="`${field.name}-field`"
            v-bind="{ state, field }"
          >
            <PCheckbox
              v-if="field.type === 'checkbox'"
              v-model="state[field.name]"
              data-slot="checkbox"
              :class="pohon.checkbox({ class: pohonProp?.checkbox })"
              v-bind="(omitFieldProps(field))"
            />
            <PSelectMenu
              v-else-if="field.type === 'select'"
              v-model="state[field.name]"
              data-slot="select"
              :class="pohon.select({ class: pohonProp?.select })"
              v-bind="(omitFieldProps(field) as PAuthFormSelectField)"
            />
            <PPInput
              v-else-if="field.type === 'otp'"
              :id="field.name"
              v-model="state[field.name]"
              data-slot="otp"
              :class="pohon.otp({ class: pohonProp?.otp })"
              v-bind="(Object.assign({}, omitFieldProps(field), isObjectType((field as PAuthFormOtpField).otp) ? (field as PAuthFormOtpField).otp : {}) as any)"
              otp
            />
            <PInput
              v-else-if="field.type === 'password'"
              ref="passwordRef"
              v-model="state[field.name]"
              data-slot="password"
              :class="pohon.password({ class: pohonProp?.password })"
              v-bind="(omitFieldProps(field) as PAuthFormInputField<'password'>)"
              :type="passwordVisibility ? 'text' : 'password'"
            >
              <template #trailing>
                <PButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="passwordVisibility ? appConfig.pohon.icons.eyeOff : appConfig.pohon.icons.eye"
                  :aria-label="passwordVisibility ? t('authForm.hidePassword') : t('authForm.showPassword')"
                  :aria-pressed="passwordVisibility"
                  :aria-controls="passwordRef?.[0]?.inputRef?.id"
                  @click="passwordVisibility = !passwordVisibility"
                />
              </template>
            </PInput>
            <PInput
              v-else
              v-model="state[field.name]"
              data-slot="input"
              :class="pohon.input({ class: pohonProp?.input })"
              v-bind="(omitFieldProps(field) as PAuthFormInputField)"
            />
          </slot>

          <template
            v-if="!!slots[`${field.name}-label`]"
            #label
          >
            <slot :name="`${field.name}-label`" />
          </template>
          <template
            v-if="!!slots[`${field.name}-description`]"
            #description
          >
            <slot :name="`${field.name}-description`" />
          </template>
          <template
            v-if="!!slots[`${field.name}-hint`]"
            #hint
          >
            <slot :name="`${field.name}-hint`" />
          </template>
          <template
            v-if="!!slots[`${field.name}-help`]"
            #help
          >
            <slot :name="`${field.name}-help`" />
          </template>
          <template
            v-if="!!slots[`${field.name}-error`]"
            #error
          >
            <slot :name="`${field.name}-error`" />
          </template>
        </PFormField>

        <slot
          v-if="!!slots.validation"
          name="validation"
        />

        <slot
          name="submit"
          :loading="loading"
        >
          <PButton
            type="submit"
            :label="t('authForm.submit')"
            block
            :loading="loading"
            :loading-auto="loadingAuto"
            v-bind="submit"
          />
        </slot>
      </PForm>
    </div>

    <div
      v-if="!!slots.footer"
      data-slot="footer"
      :class="pohon.footer({ class: pohonProp?.footer })"
    >
      <slot name="footer" />
    </div>
  </APrimitive>
</template>
