<script lang="ts">
import type { Direction, ScrollBodyOption } from '~~/shared/types';

import { createContext } from '~~/shared';

interface AConfigProviderContextValue {
  dir?: Ref<Direction>;
  locale?: Ref<string>;
  nonce?: Ref<string | undefined>;
  scrollBody?: Ref<boolean | ScrollBodyOption>;
  useId?: () => string | undefined;
}

export const [
  injectAConfigProviderContext,
  provideAConfigProviderContext,
] = createContext<AConfigProviderContextValue>('AConfigProvider');

export interface AConfigProviderProps {
  /**
   * The global reading direction of your application. This will be inherited by all primitives.
   * @defaultValue 'ltr'
   */
  dir?: Direction;
  /**
   * The global locale of your application. This will be inherited by all primitives.
   * @defaultValue 'en'
   */
  locale?: string;
  /**
   * The global `nonce` value of your application. This will be inherited by the related primitives.
   */
  nonce?: string;
  /**
   * The global scroll body behavior of your application. This will be inherited by the related primitives.
   */
  scrollBody?: boolean | ScrollBodyOption;
}
</script>

<script lang="ts" setup>
import { type Ref, toRefs, useId } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<AConfigProviderProps>(),
  {
    dir: 'ltr',
    locale: 'en',
    scrollBody: true,
    nonce: undefined,
  },
);

const { dir, locale, scrollBody, nonce } = toRefs(props);

provideAConfigProviderContext({
  dir,
  locale,
  scrollBody,
  nonce,
  useId,
});
</script>

<template>
  <slot />
</template>
