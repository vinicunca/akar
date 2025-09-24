import type { StandardSchemaV1 } from '@standard-schema/spec';
import type { Struct as SuperstructSchema } from 'superstruct';
import type { ComputedRef, DeepReadonly, Ref } from 'vue';
import type { GetObjectField } from './utils';

export interface Form<S extends FormSchema> {
  validate: <T extends boolean>(opts?: { name?: keyof FormData<S, false> | Array<keyof FormData<S, false>>; silent?: boolean; nested?: boolean; transform?: T }) => Promise<FormData<S, T> | false>;
  clear: (path?: keyof FormData<S, false> | string | RegExp) => void;
  errors: Ref<Array<FormError>>;
  setErrors: (errs: Array<FormError>, name?: keyof FormData<S, false> | string | RegExp) => void;
  getErrors: (name?: keyof FormData<S, false> | string | RegExp) => Array<FormError>;
  submit: () => Promise<void>;
  disabled: ComputedRef<boolean>;
  dirty: ComputedRef<boolean>;
  loading: Ref<boolean>;

  dirtyFields: ReadonlySet<DeepReadonly<keyof FormData<S, false>>>;
  touchedFields: ReadonlySet<DeepReadonly<keyof FormData<S, false>>>;
  blurredFields: ReadonlySet<DeepReadonly<keyof FormData<S, false>>>;
}

export type FormSchema<I extends object = object, O extends object = I>
  = | SuperstructSchema<any, any>
    | StandardSchemaV1<I, O>;

// Define a utility type to infer the input type based on the schema type
export type InferInput<Schema> = Schema extends StandardSchemaV1 ? StandardSchemaV1.InferInput<Schema>
  : Schema extends SuperstructSchema<infer I, any> ? I
    : Schema extends StandardSchemaV1 ? StandardSchemaV1.InferInput<Schema>
      : never;

// Define a utility type to infer the output type based on the schema type
export type InferOutput<Schema> = Schema extends StandardSchemaV1 ? StandardSchemaV1.InferOutput<Schema>
  : Schema extends SuperstructSchema<infer O, any> ? O
    : never;

export type FormData<S extends FormSchema, T extends boolean = true> = T extends true ? InferOutput<S> : InferInput<S>;

export type FormInputEvents = 'input' | 'blur' | 'change' | 'focus';

export interface FormError<P extends string = string> {
  name?: P;
  message: string;
}

export interface FormErrorWithId extends FormError {
  id?: string;
}

export type FormSubmitEvent<T> = SubmitEvent & { data: T };

export interface FormValidationError {
  errors: Array<FormErrorWithId>;
  children?: Array<FormErrorWithId>;
}

export type FormErrorEvent = SubmitEvent & FormValidationError;

export interface FormChildAttachEvent<S extends FormSchema> {
  type: 'attach';
  formId: string | number;
  validate: Form<any>['validate'];
  name?: string;
  api: Form<S>;
}

export interface FormChildDetachEvent {
  type: 'detach';
  formId: string | number;
}

export interface FormInputEvent<T extends object> {
  type: FormInputEvents;
  name: keyof T;
  eager?: boolean;
}

export type FormEvent<T extends object>
  = | FormInputEvent<T>
    | FormChildAttachEvent<any>
    | FormChildDetachEvent;

export interface FormInjectedOptions {
  disabled?: boolean;
  validateOnInputDelay?: number;
}

export interface FormFieldInjectedOptions<T> {
  name?: string;
  size?: GetObjectField<T, 'size'>;
  error?: string | boolean;
  eagerValidation?: boolean;
  validateOnInputDelay?: number;
  errorPattern?: RegExp;
  hint?: string;
  description?: string;
  help?: string;
  ariaId: string;
}

export interface ValidateReturnSchema<T> {
  result: T;
  errors: Array<FormError> | null;
}

export class FormValidationException extends Error {
  formId: string | number;
  errors: Array<FormErrorWithId>;

  constructor(formId: string | number, errors: Array<FormErrorWithId>) {
    super('Form validation exception');
    this.formId = formId;
    this.errors = errors;
    Object.setPrototypeOf(this, FormValidationException.prototype);
  }
}
