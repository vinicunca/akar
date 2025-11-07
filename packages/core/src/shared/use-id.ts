import * as vue from 'vue';
import { injectAConfigProviderContext } from '../config-provider/config-provider.vue';

// Inspired from https://github.com/tailwindlabs/headlessui/issues/2913
// as the alternative, and a fallback for Vue version < 3.5

let count = 0;
/**
 * The `useId` function generates a unique identifier using a provided deterministic ID or a default
 * one prefixed with "akar-", or the provided one via `useId` props from `<AConfigProvider>`.
 * @param [deterministicId] - The `useId` function you provided takes an
 * optional parameter `deterministicId`, which can be a string, null, or undefined. If
 * `deterministicId` is provided, the function will return it. Otherwise, it will generate an id using
 * the `useId` function obtained
 */
export function useId(deterministicId?: null | string | undefined, prefix = 'akar') {
  if (deterministicId) {
    return deterministicId;
  }

  if (Object.hasOwn(vue, 'useId')) {
    return `${prefix}-${vue.useId?.()}`;
  }

  const configProviderContext = injectAConfigProviderContext({ useId: undefined });

  if (configProviderContext.useId) {
    return `${prefix}-${configProviderContext.useId()}`;
  }

  return `${prefix}-${++count}`;
}
