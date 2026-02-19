import type * as theme from '#build/pohon';
import type { ClassValue } from 'unocss-variants';
import type { ComputedRef } from 'vue';
import type { UvConfig } from '../types/uv';
import { createContext } from 'akar';
import defu from 'defu';
import { computed } from 'vue';
import { getProp } from '../utils';

type PohonConfig = UvConfig<typeof theme>;
type ExtractPohonSlots<C> = C extends { slots?: infer S } ? NonNullable<S> : never;
type PohonConfigSlots<T extends keyof PohonConfig>
  = 'slots' extends keyof NonNullable<PohonConfig[T]>
    ? ExtractPohonSlots<NonNullable<PohonConfig[T]>>
    : { base?: ClassValue };

type ThemeSlotOverrides<T> = T extends { slots: infer S extends Record<string, any> }
  ? { [K in keyof S]?: ClassValue }
  : { [K in keyof T]?: T[K] extends Record<string, any> ? ThemeSlotOverrides<T[K]> : ClassValue };

export type ThemePohon = {
  [K in keyof typeof theme]?: ThemeSlotOverrides<(typeof theme)[K]>
};

export interface ThemeRootContext {
  pohon: ComputedRef<ThemePohon>;
}

const [
  injectThemeContext,
  provideThemeContext,
] = createContext<ThemeRootContext>('PTheme', 'RootContext');

export { provideThemeContext };

interface ComponentPohonProps<T extends keyof PohonConfig> {
  pohon?: PohonConfigSlots<T>;
}

export function useComponentPohon<T extends keyof PohonConfig>(name: T, props: ComponentPohonProps<T>): ComputedRef<PohonConfigSlots<T>>;
export function useComponentPohon(name: string, props: { pohon?: any }): ComputedRef<any>;
export function useComponentPohon(name: string, props: { pohon?: any }): ComputedRef<any> {
  const { pohon } = injectThemeContext({ pohon: computed(() => ({})) });

  return computed(() => {
    const themeOverrides = (getProp({ object: pohon.value, path: name as string }) || {});

    return defu(props.pohon ?? {}, themeOverrides);
  });
}
