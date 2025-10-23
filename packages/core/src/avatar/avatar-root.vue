<script lang="ts">
import type { Ref } from 'vue';
import type { APrimitiveProps } from '~~/primitive';
import type { ImageLoadingStatus } from './utils';
import { createContext, useForwardExpose } from '~~/shared';

export interface AAvatarRootProps extends APrimitiveProps {}

export type AvatarRootContext = {
  imageLoadingStatus: Ref<ImageLoadingStatus>;
};

export const [
  injectAAvatarRootContext,
  provideAvatarRootContext,
] = createContext<AvatarRootContext>('AAvatarRoot');
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { APrimitive } from '~~/primitive';

withDefaults(
  defineProps<AAvatarRootProps>(),
  {
    as: 'span',
  },
);

useForwardExpose();

provideAvatarRootContext({
  imageLoadingStatus: ref<ImageLoadingStatus>('idle'),
});
</script>

<template>
  <APrimitive
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </APrimitive>
</template>
