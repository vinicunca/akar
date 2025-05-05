<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import type { ImageLoadingStatus } from './utils';
import { useForwardExpose } from '~~/shared';

export type AAvatarImageEmits = {
  /**
   * A callback providing information about the loading status of the image. <br>
   * This is useful in case you want to control more precisely what to render as the image is loading.
   */
  loadingStatusChange: [value: ImageLoadingStatus];
};
export interface AAvatarImageProps extends APrimitiveProps {
  src: string;
  referrerPolicy?: ImgHTMLAttributes['referrerpolicy'];
}
</script>

<script setup lang="ts">
import type { ImgHTMLAttributes } from 'vue';
import { toRefs, watch } from 'vue';
import { APrimitive } from '~~/primitive';
import { injectAAvatarRootContext } from './avatar-root.vue';
import { useImageLoadingStatus } from './utils';

const props = withDefaults(
  defineProps<AAvatarImageProps>(),
  { as: 'img' },
);
const emits = defineEmits<AAvatarImageEmits>();

const { src, referrerPolicy } = toRefs(props);
useForwardExpose();
const rootContext = injectAAvatarRootContext();

const imageLoadingStatus = useImageLoadingStatus({ src, referrerPolicy });

watch(
  imageLoadingStatus,
  (newValue) => {
    emits('loadingStatusChange', newValue);
    if (newValue !== 'idle') {
      rootContext.imageLoadingStatus.value = newValue;
    }
  },
  { immediate: true },
);
</script>

<template>
  <APrimitive
    v-show="imageLoadingStatus === 'loaded'"
    role="img"
    :as-child="asChild"
    :as="as"
    :src="src"
    :referrer-policy="referrerPolicy"
  >
    <slot />
  </APrimitive>
</template>
