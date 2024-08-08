<script lang="ts">
import type { Ref } from 'vue';

import type { Direction, ScrollBodyOption } from '~~/shared/types';

import { createContext } from '~~/shared';

interface ConfigProviderContextValue {
  dir?: Ref<Direction>;
  nonce?: Ref<string | undefined>;
  scrollBody?: Ref<boolean | ScrollBodyOption>;
  useId?: () => string;
}

export const [injectConfigProviderContext, provideConfigProviderContext]
  = createContext<ConfigProviderContextValue>('ConfigProvider');

export interface ConfigProviderProps {
  /**
   * The global reading direction of your application. This will be inherited by all primitives.
   * @defaultValue 'ltr'
   */
  dir?: Direction;
  /**
   * The global `nonce` value of your application. This will be inherited by the related primitives.
   * @typedef string
   */
  nonce?: string;
  /**
   * The global scroll body behavior of your application. This will be inherited by the related primitives.
   * @typedef boolean | ScrollBodyOption
   */
  scrollBody?: boolean | ScrollBodyOption;
  /**
   * The global `useId` injection as a workaround for preventing hydration issue.
   */
  useId?: () => string;
}
</script>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  dir: 'ltr',
  nonce: undefined,
  scrollBody: true,
  useId: undefined,
});

const { dir, nonce, scrollBody } = toRefs(props);

provideConfigProviderContext({
  dir,
  nonce,
  scrollBody,
  useId: props.useId,
});
</script>

<template>
  <slot />
</template>
