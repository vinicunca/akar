import type { UseEventBusReturn } from '@vueuse/core';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { FormFieldProps } from '../types';
import type { FormErrorWithId, FormEvent, FormFieldInjectedOptions, FormInjectedOptions, FormInputEvents } from '../types/form';
import type { GetObjectField } from '../types/utils';
import { useDebounceFn } from '@vueuse/core';
import { computed, inject, provide } from 'vue';

interface Props<T> {
  id?: string;
  name?: string;
  size?: GetObjectField<T, 'size'>;
  color?: GetObjectField<T, 'color'>;
  highlight?: boolean;
  disabled?: boolean;
}

export const formOptionsInjectionKey: InjectionKey<ComputedRef<FormInjectedOptions>> = Symbol('pohon.form-options');
export const formBusInjectionKey: InjectionKey<UseEventBusReturn<FormEvent<any>, string>> = Symbol('pohon.form-events');
export const formStateInjectionKey: InjectionKey<ComputedRef<Record<string, any> | undefined>> = Symbol('pohon.form-state');
export const formFieldInjectionKey: InjectionKey<ComputedRef<FormFieldInjectedOptions<FormFieldProps>> | undefined> = Symbol('pohon.form-field');
export const inputIdInjectionKey: InjectionKey<Ref<string | undefined>> = Symbol('pohon.input-id');
export const formInputsInjectionKey: InjectionKey<Ref<Record<string, { id?: string; pattern?: RegExp }>>> = Symbol('pohon.form-inputs');
export const formLoadingInjectionKey: InjectionKey<Readonly<Ref<boolean>>> = Symbol('pohon.form-loading');
export const formErrorsInjectionKey: InjectionKey<Readonly<Ref<Array<FormErrorWithId>>>> = Symbol('pohon.form-errors');

export function useFormField<T>(props?: Props<T>, opts?: { bind?: boolean; deferInputValidation?: boolean }) {
  const formOptions = inject(formOptionsInjectionKey, undefined);
  const formBus = inject(formBusInjectionKey, undefined);
  const formField = inject(formFieldInjectionKey, undefined);
  const inputId = inject(inputIdInjectionKey, undefined);

  // Blocks the FormField injection to avoid duplicating events when nesting input components.
  provide(formFieldInjectionKey, undefined);

  if (formField && inputId) {
    if (opts?.bind === false) {
      // Removes for="..." attribute on label for RadioGroup and alike.
      inputId.value = undefined;
    } else if (props?.id) {
      // Updates for="..." attribute on label if props.id is provided.
      inputId.value = props?.id;
    }
  }

  function emitFormEvent(type: FormInputEvents, name?: string, eager?: boolean) {
    if (formBus && formField && name) {
      formBus.emit({ type, name, eager });
    }
  }

  function emitFormBlur() {
    emitFormEvent('blur', formField?.value.name);
  }

  function emitFormFocus() {
    emitFormEvent('focus', formField?.value.name);
  }

  function emitFormChange() {
    emitFormEvent('change', formField?.value.name);
  }

  const emitFormInput = useDebounceFn(
    () => {
      emitFormEvent('input', formField?.value.name, !opts?.deferInputValidation || formField?.value.eagerValidation);
    },
    formField?.value.validateOnInputDelay ?? formOptions?.value.validateOnInputDelay ?? 0,
  );

  return {
    id: computed(() => props?.id ?? inputId?.value),
    name: computed(() => props?.name ?? formField?.value.name),
    size: computed(() => props?.size ?? formField?.value.size),
    color: computed(() => formField?.value.error ? 'error' : props?.color),
    highlight: computed(() => formField?.value.error ? true : props?.highlight),
    disabled: computed(() => formOptions?.value.disabled || props?.disabled),
    emitFormBlur,
    emitFormInput,
    emitFormChange,
    emitFormFocus,
    ariaAttrs: computed(() => {
      if (!formField?.value) {
        return;
      }

      const descriptiveAttrs = ['error' as const, 'hint' as const, 'description' as const, 'help' as const]
        .filter((type) => formField?.value?.[type])
        .map((type) => `${formField?.value.ariaId}-${type}`) || [];

      const attrs: Record<string, any> = {
        'aria-invalid': !!formField?.value.error,
      };

      if (descriptiveAttrs.length > 0) {
        attrs['aria-describedby'] = descriptiveAttrs.join(' ');
      }

      return attrs;
    }),
  };
}
