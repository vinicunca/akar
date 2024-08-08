type DataOrientation = 'horizontal' | 'vertical';
type Direction = 'ltr' | 'rtl';
/**
 * @deprecated Use `AccordionType` instead
 */
type Type = 'multiple' | 'single';
type SingleOrMultipleType = 'multiple' | 'single';

interface SingleOrMultipleProps<ValidValue = Array<string> | string, ExplicitType = SingleOrMultipleType> {
  /**
   * The default active value of the item(s).
   *
   * Use when you do not need to control the state of the item(s).
   */
  defaultValue?: ValidValue;

  /**
   * The controlled value of the active item(s).
   *
   * Use this when you need to control the state of the items. Can be binded with `v-model`
   */
  modelValue?: ValidValue;

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

}

interface ScrollBodyOption {
  margin?: boolean | number;
  padding?: boolean | number;
};

type AcceptableValue = boolean | number | Record<string, any> | string;
type ArrayOrWrapped<T> = T extends Array<any> ? T : Array<T>;
 type StringOrNumber = number | string;

export type { AcceptableValue, ArrayOrWrapped, DataOrientation, Direction, ScrollBodyOption, SingleOrMultipleProps, SingleOrMultipleType, StringOrNumber, Type };
