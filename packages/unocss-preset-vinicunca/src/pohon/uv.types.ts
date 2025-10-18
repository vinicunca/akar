import type { ClassValue, UvCompoundVariants, UvDefaultVariants, UvVariants } from 'unocss-variants';

export type UvConfig<T extends Record<string, any>> = {
  [P in keyof T]?: {
    [K in keyof T[P]as K extends 'base' | 'slots' | 'variants' | 'defaultVariants' ? K : never]?: K extends 'base' ? ClassValue
      : K extends 'slots' ? {
        [S in keyof T[P]['slots']]?: ClassValue
      }
        : K extends 'variants' ? UvVariants<T[P]['slots'], ClassValue, WidenVariantsValues<T[P]['variants']>>
          : K extends 'defaultVariants' ? UvDefaultVariants<WidenVariantsValues<T[P]['variants']>, T[P]['slots'], object, undefined>
            : never
  }
} & {
  [P in keyof T]?: {
    compoundVariants?: UvCompoundVariants<WidenVariantsValues<T[P]['variants']>, T[P]['slots'], ClassValue, object, undefined>;
  }
};

type WidenVariantsValues<V extends Record<string, any> | undefined>
  = V extends Record<string, any> ? V & {
    [K in keyof V]: V[K] extends Record<string, any>
      ? V[K] & Record<string & {}, any>
      : V[K]
  } : V;
