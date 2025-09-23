import type { ClassValue, UvCompoundVariants, UvDefaultVariants, UvVariants } from 'unocss-variants';
/**
 * Defines the AppConfig object based on the unocss-variants configuration.
 */
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

/**
 * Utility type to flatten intersection types for better IDE hover information.
 * @template T The type to flatten.
 */
type Id<T> = {} & { [P in keyof T]: T[P] };

type ComponentVariants<T extends { variants?: Record<string, Record<string, any>> }> = {
  [K in keyof T['variants']]: keyof T['variants'][K]
};

type ComponentSlots<T extends { slots?: Record<string, any> }> = Id<{
  [K in keyof T['slots']]?: ClassValue
}>;

type GetComponentAppConfig<A, U extends string, K extends string>
  = A extends Record<U, Record<K, any>> ? A[U][K] : object;

type ComponentAppConfig<
  T,
  A extends Record<string, any>,
  K extends string,
  U extends string = 'pohon' | 'pohon.prose',
> = A & (
  U extends 'pohon.prose'
    ? { pohon?: { prose?: { [k in K]?: Partial<T> } } }
    : { [key in Exclude<U, 'pohon.prose'>]?: { [k in K]?: Partial<T> } }
);

/**
 * Defines the configuration shape expected for a component.
 * @template T The component's theme imported from `#build/pohon/*`.
 * @template A The base AppConfig type from `@nuxt/schema`.
 * @template K The key identifying the component (e.g., 'badge').
 * @template U The top-level key in AppConfig ('pohon').
 */
export interface ComponentConfig<
  T extends Record<string, any>,
  A extends Record<string, any>,
  K extends string,
  U extends 'pohon' | 'pohon.prose' = 'pohon',
> {
  AppConfig: ComponentAppConfig<T, A, K, U>;
  variants: ComponentVariants<T & GetComponentAppConfig<A, U, K>>;
  slots: ComponentSlots<T>;
}
