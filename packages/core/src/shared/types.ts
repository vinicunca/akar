// Temporary solution for InstanceType complains about generic components. Reference: https://github.com/vuejs/language-tools/issues/3206#issuecomment-2188687250
import type { DefineComponent } from 'vue';

type DataOrientation = 'horizontal' | 'vertical';
type Direction = 'ltr' | 'rtl';

type SingleOrMultipleType = 'multiple' | 'single';

interface SingleOrMultipleProps<ValidValue = AcceptableValue | Array<AcceptableValue>, ExplicitType = SingleOrMultipleType> {
  /**
   * Determines whether a "single" or "multiple" items can be pressed at a time.
   *
   * This prop will be ignored if any of `v-model` or `defaultValue` is defined, as the type will be inferred from the value.
   */
  type?: ValidValue extends string
    ? 'single'
    : ValidValue extends Array<string>
      ? 'multiple'
      : ExplicitType extends 'single'
        ? 'single'
        : ExplicitType extends 'multiple'
          ? 'multiple'
          : never;

  /**
   * The controlled value of the active item(s).
   *
   * Use this when you need to control the state of the items. Can be binded with `v-model`
   */
  modelValue?: ValidValue;

  /**
   * The default active value of the item(s).
   *
   * Use when you do not need to control the state of the item(s).
   */
  defaultValue?: ValidValue;

}

/**
 * if padding or margin is number, it will be in px
 * if padding or margin is true, it will be var(--scrollbar-width)
 * otherwise, it will be passed string
 */
interface ScrollBodyOption {
  padding?: boolean | number | string;
  margin?: boolean | number | string;
}

// Exclude `boolean` type to prevent type casting
// reference: https://vuejs.org/guide/components/props.html#boolean-casting
type AcceptableValue = number | Record<string, any> | string;
type ArrayOrWrapped<T> = T extends Array<any> ? T : Array<T>;
type StringOrNumber = number | string;

type GenericComponentInstance<T> = T extends new (...args: Array<any>) => infer R
  ? R
  : T extends (...args: Array<any>) => infer R
    ? R extends { __ctx?: infer K }
      ? Exclude<K, void> extends { expose: (...args: infer Y) => void }
        ? InstanceType<DefineComponent> & Y[0]
        : any
      : any
    : any;

interface FormFieldProps {
  /** The name of the field. Submitted with its owning form as part of a name/value pair. */
  name?: string;
  /** When `true`, indicates that the user must set the value before the owning form can be submitted. */
  required?: boolean;
}

export type {
  AcceptableValue,
  ArrayOrWrapped,
  DataOrientation,
  Direction,
  FormFieldProps,
  GenericComponentInstance,
  ScrollBodyOption,
  SingleOrMultipleProps,
  SingleOrMultipleType,
  StringOrNumber,
};
