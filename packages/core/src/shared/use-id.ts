import * as vue from 'vue';
import { injectAConfigProviderContext } from '~~/a-config-provider/a-config-provider.vue';

let count = 0;
/**
 * The `useId` function generates a unique identifier using a provided deterministic ID or a default
 * one prefixed with "akar-", or the provided one via `useId` props from `<ConfigProvider>`.
 * @param [deterministicId] - The `useId` function you provided takes an
 * optional parameter `deterministicId`, which can be a string, null, or undefined. If
 * `deterministicId` is provided, the function will return it. Otherwise, it will generate an id using
 * the `useId` function obtained
 */
export function useId(deterministicId?: null | string | undefined, prefix = 'akar') {
  if (deterministicId) {
    return deterministicId;
  }

  const configProviderContext = injectAConfigProviderContext({ useId: undefined });

  if (vue.useId) {
    return `${prefix}-${vue.useId()}`;
  } else if (configProviderContext.useId) {
    return `${prefix}-${configProviderContext.useId()}`;
  }

  return `${prefix}-${++count}`;
}
