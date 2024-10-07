export type Direction = 'ltr' | 'rtl';
export type DataOrientation = 'horizontal' | 'vertical';

export interface ScrollBodyOption {
  margin?: boolean | number;
  padding?: boolean | number;
}

export interface FormFieldProps {
  /** The name of the field. Submitted with its owning form as part of a name/value pair. */
  name?: string;
  /** When `true`, indicates that the user must set the value before the owning form can be submitted. */
  required?: boolean;
}
