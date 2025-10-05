<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
 
import type {
  IconProps,
  PButtonProps,
  PFormFieldProps,
  PFormProps,
  PPinInputProps,
  PSeparatorProps,
} from '../types';
import type { FormSchema, FormSubmitEvent, InferInput } from '../types/form';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/auth-form';

type AuthForm = ComponentConfig<typeof theme, AppConfig, 'authForm'>;

type AuthFormField = PFormFieldProps & {
  name: string;
  type?: 'checkbox' | 'select' | 'password' | 'text' | 'otp' | 'email';
  defaultValue?: any;
  /*
   * The optional props for the `otp` type.
   * `{ otp: true }`{lang="ts-type"}
   */
  otp?: PPinInputProps;
};

export interface PAuthFormProps<T extends FormSchema = FormSchema<object>, F extends AuthFormField = AuthFormField> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon displayed above the title.
   * @IconifyIcon
   */
  icon?: IconProps['name'];
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
  submit?: PButtonProps;
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

type DynamicFieldSlots<T, F, SlotProps = { field: F; state: T }> = Record<string, (props: SlotProps) => any> & Record<`${keyof T extends string ? keyof T : never}-field`, (props: SlotProps) => any>;

type DynamicFormFieldSlots<T> = Record<string, (props?: object) => any> & Record<`${keyof T extends string ? keyof T : never}-${'label' | 'description' | 'hint' | 'help' | 'error'}`, (props?: object) => any>;

export type PAuthFormSlots<T extends object = object, F extends AuthFormField = AuthFormField> = {
  header: (props?: object) => any;
  leading: (props?: object) => any;
  title: (props?: object) => any;
  description: (props?: object) => any;
  providers: (props?: object) => any;
  validation: (props?: object) => any;
  submit: (props: { loading: boolean }) => any;
  footer: (props?: object) => any;
} & DynamicFieldSlots<T, F> & DynamicFormFieldSlots<T>;
</script>

<script setup lang="ts" generic="T extends FormSchema, F extends AuthFormField">
import { useAppConfig } from '#imports';
import { omit } from '@vinicunca/perkakas';
import { APrimitive } from 'akar';
import { computed, reactive, ref, useTemplateRef } from 'vue';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PButton from './button.vue';
import PCheckbox from './checkbox.vue';
import PFormField from './form-field.vue';
import PForm from './form.vue';
import PIcon from './icon.vue';
import PInput from './input.vue';
import PPinInput from './pin-input.vue';
import PSelectMenu from './select-menu.vue';
import PSeparator from './separator.vue';

const props = withDefaults(
  defineProps<PAuthFormProps<T, F>>(),
  {
    separator: 'or',
  },
);

defineEmits<PAuthFormEmits<typeof state>>();

const slots = defineSlots<PAuthFormSlots<typeof state, F>>();

type FormStateType = InferInput<T>;

type TypedAuthFormField = AuthFormField & {
  name: keyof FormStateType;
  defaultValue?: FormStateType[keyof FormStateType];
};

const state = reactive<FormStateType>(
  (props.fields as Array<TypedAuthFormField> || [])
    .reduce<FormStateType>((acc, field) => {
      if (field.name) {
        acc[field.name] = field.defaultValue;
      }
      return acc;
    }, {} as FormStateType),
);

const { t } = useLocale();
const appConfig = useAppConfig() as AuthForm['AppConfig'];

const formRef = useTemplateRef('formRef');
const passwordVisibility = ref(false);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.authForm || {}) })());

defineExpose({
  formRef,
  state,
});
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <div
      v-if="(icon || !!slots.icon) || (title || !!slots.title) || (description || !!slots.description) || !!slots.header"
      :class="pohon.header({ class: props.pohon?.header })"
    >
      <slot name="header">
        <div
          v-if="icon || !!slots.leading"
          :class="pohon.leading({ class: props.pohon?.leading })"
        >
          <slot name="leading">
            <PIcon
              v-if="icon"
              :name="icon"
              :class="pohon.leadingIcon({ class: props.pohon?.leadingIcon })"
            />
          </slot>
        </div>

        <div
          v-if="title || !!slots.title"
          :class="pohon.title({ class: props.pohon?.title })"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <div
          v-if="description || !!slots.description"
          :class="pohon.description({ class: props.pohon?.description })"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>

    <div :class="pohon.body({ class: props.pohon?.body })">
      <div
        v-if="providers?.length || !!slots.providers"
        :class="pohon.providers({ class: props.pohon?.providers })"
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

      <PSeparator
        v-if="providers?.length && fields?.length"
        v-bind="typeof separator === 'object' ? separator : { label: separator }"
        :class="pohon.separator({ class: props.pohon?.separator })"
      />

      <PForm
        v-if="fields?.length"
        ref="formRef"
        :state="state"
        :schema="schema"
        :validate="validate"
        :validate-on="validateOn"
        :class="pohon.form({ class: props.pohon?.form })"
        :disabled="disabled"
        :loading-auto="loadingAuto"
        @submit="onSubmit"
      >
        <PFormField
          v-for="field in fields"
          :key="field.name"
          :label="field.type === 'checkbox' ? '' : field.label ?? ''"
          :description="field.description"
          :help="field.help"
          :hint="field.hint"
          :name="field.name"
          :size="field.size"
          :required="field.required"
          :error="field.error"
        >
          <slot
            :name="`${field.name}-field`"
            v-bind="{ state, field }"
          >
            <PCheckbox
              v-if="field.type === 'checkbox'"
              v-model="state[field.name]"
              :class="pohon.checkbox({ class: props.pohon?.checkbox })"
              v-bind="omit(field, ['description', 'help', 'hint', 'size'])"
            />
            <PSelectMenu
              v-else-if="field.type === 'select'"
              v-model="state[field.name]"
              :class="pohon.select({ class: props.pohon?.select })"
              v-bind="omit(field, ['description', 'help', 'hint', 'size'])"
            />
            <PInput
              v-else-if="field.type === 'password'"
              v-model="state[field.name]"
              :class="pohon.password({ class: props.pohon?.password })"
              :type="passwordVisibility ? 'text' : 'password'"
              v-bind="omit(field, ['label', 'description', 'help', 'hint', 'size', 'type', 'required', 'defaultValue'])"
              :pohon="{ root: 'w-full' }"
            >
              <template #trailing>
                <PButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="passwordVisibility ? appConfig.pohon.icons.eyeOff : appConfig.pohon.icons.eye"
                  :aria-label="passwordVisibility ? t('authForm.hidePassword') : t('authForm.showPassword')"
                  :aria-pressed="passwordVisibility"
                  aria-controls="password"
                  @click="passwordVisibility = !passwordVisibility"
                />
              </template>
            </PInput>
            <PPinInput
              v-else-if="field.type === 'otp'"
              :id="field.name"
              v-model="state[field.name]"
              :class="pohon.otp({ class: props.pohon?.otp })"
              otp
              v-bind="field.otp"
            />
            <PInput
              v-else
              v-model="state[field.name]"
              :class="pohon.input({ class: props.pohon?.input })"
              v-bind="omit(field, ['label', 'description', 'help', 'hint', 'size', 'required', 'defaultValue'])"
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
      :class="pohon.footer({ class: props.pohon?.footer })"
    >
      <slot name="footer" />
    </div>
  </APrimitive>
</template>
