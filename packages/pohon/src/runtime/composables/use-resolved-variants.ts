import type { ComputedRef, MaybeRefOrGetter } from 'vue';
import { computed, toValue } from 'vue';
import { useAppConfig } from '#imports';
import { get } from '../utils';

/**
 * Resolve variant values consumed in template logic (mirrors Nuxt UI `useResolvedVariants`).
 * Priority: `props[key]` > `app.config.ts` `defaultVariants[key]` > `theme.defaultVariants[key]`.
 */
export function useResolvedVariants<K extends string>(
  name: string,
  props: Record<string, any>,
  theme: Record<string, any>,
  keys: K[],
  overrides?: Partial<Record<K, MaybeRefOrGetter<any>>>,
): { [P in K]: ComputedRef<any> } {
  const appConfig = useAppConfig();
  const result = {} as { [P in K]: ComputedRef<any> };

  for (const key of keys) {
    result[key] = computed(() => {
      const value = overrides?.[key] !== undefined ? toValue(overrides[key]!) : get(props, key);
      return value ?? ((appConfig as any).pohon?.[name] as any)?.defaultVariants?.[key] ?? theme.defaultVariants?.[key];
    });
  }

  return result;
}
