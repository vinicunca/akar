import * as vue from 'vue';
// Inspired from https://github.com/tailwindlabs/headlessui/issues/2913
// as the alternative, and a fallback for Vue version < 3.5
import { injectConfigProviderContext } from '@/ConfigProvider/ConfigProvider.vue';

let count = 0;
/**
 * The `useId` function generates a unique identifier using a provided deterministic ID or a default
 * one prefixed with "akar-", or the provided one via `useId` props from `<ConfigProvider>`.
 * @param [deterministicId] - The `useId` function you provided takes an
 * optional parameter `deterministicId`, which can be a string, null, or undefined. If
 * `deterministicId` is provided, the function will return it. Otherwise, it will generate an id using
 * the `useId` function obtained
 */
export function useId(deterministicId?: string | null | undefined, prefix = 'akar') {
  if (deterministicId) {
    return deterministicId;
  }

  let id: string;
  if ('useId' in vue) {
    id = vue.useId?.();
  } else {
    const configProviderContext = injectConfigProviderContext({ useId: undefined });
    id = configProviderContext.useId?.() ?? `${++count}`;
  }

  return prefix ? `${prefix}-${id}` : id;
}
