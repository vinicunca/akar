import type { ComputedRef, MaybeRefOrGetter } from 'vue';
import { computed, toValue } from 'vue';
import { useAppConfig } from '#imports';
import { getProp } from '../utils';

/**
 * Resolve variant values that are consumed in template logic (e.g. `<component :is="...">`).
 *
 * `uv()`'s `defaultVariants` only apply when computing classes — they don't affect
 * template conditionals that read the prop directly. This mirrors uv's priority:
 * `props[key]` > `app.config.ts` `defaultVariants[key]` > `theme.defaultVariants[key]`.
 *
 * @example
 * const { variant } = useResolvedVariants('radioGroup', props, theme, ['variant'])
 *
 * // For nested prop paths, override with a getter:
 * const { position } = useResolvedVariants('select', props, theme, ['position'], {
 *   position: () => props.content?.position
 * })
 *
 * Related: #6360
 */
export function useResolvedVariants<K extends string>(
  name: string,
  props: Record<string, any>,
  theme: Record<string, any>,
  keys: Array<K>,
  overrides?: Partial<Record<K, MaybeRefOrGetter<any>>>,
): { [P in K]: ComputedRef<any> } {
  const appConfig = useAppConfig();
  const result = {} as { [P in K]: ComputedRef<any> };

  for (const key of keys) {
    result[key] = computed(() => {
      const value = overrides?.[key] !== undefined ? toValue(overrides[key]!) : getProp(props, key);
      return value ?? ((appConfig as any).pohon?.[name] as any)?.defaultVariants?.[key] ?? theme.defaultVariants?.[key];
    });
  }

  return result;
}
