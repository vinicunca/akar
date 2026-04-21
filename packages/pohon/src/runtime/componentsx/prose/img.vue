<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/img';

type ProseImg = ComponentConfig<typeof theme, AppConfig, 'img', 'pohon.prose'>;

export interface ProseImgProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  class?: any;
  /**
   * Zoom image on click
   * @defaultValue true
   */
  zoom?: boolean;
  pohon?: ProseImg['slots'];
}
</script>

<script setup lang="ts">
import ImageComponent from '#build/pohon-image-component';
import { useAppConfig, useRuntimeConfig } from '#imports';
import { createReusableTemplate, useEventListener } from '@vueuse/core';
import { AnimatePresence, Motion } from 'motion-v';
import { DialogPortal, DialogRoot, DialogTrigger } from 'akar';
import { computed, ref, useId } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { resolveBaseURL } from '../../utils';
import { uv } from '../../utils/uv';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ProseImgProps>(), {
  zoom: true,
});

const appConfig = useAppConfig() as ProseImg['AppConfig'];
const pohonProp = useComponentPohon('prose.img', props);

const [DefineImageTemplate, ReuseImageTemplate] = createReusableTemplate();
const [DefineZoomedImageTemplate, ReuseZoomedImageTemplate] = createReusableTemplate();

const open = ref(false);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.img || {}) })({
  zoom: props.zoom,
  open: open.value,
  width: !!props.width,
}));

const refinedSrc = computed(() => resolveBaseURL(props.src, useRuntimeConfig().app.baseURL));

const layoutId = computed(() => `${refinedSrc.value}::${useId()}`);

if (props.zoom) {
  useEventListener(window, 'scroll', () => {
    open.value = false;
  });
}
</script>

<template>
  <DefineImageTemplate>
    <component
      :is="ImageComponent"
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      v-bind="$attrs"
      :class="pohon.base({ class: [pohonProp?.base, props.class] })"
    />
  </DefineImageTemplate>

  <DefineZoomedImageTemplate>
    <component
      :is="ImageComponent"
      :src="refinedSrc"
      :alt="alt"
      v-bind="$attrs"
      :class="pohon.zoomedImage({ class: [pohonProp?.zoomedImage] })"
    />
  </DefineZoomedImageTemplate>

  <DialogRoot
    v-if="zoom"
    v-slot="{ close }"
    v-model:open="open"
    :modal="false"
  >
    <DialogTrigger as-child>
      <Motion
        :layout-id="layoutId"
        as-child
        :transition="{ type: 'spring', bounce: 0.15, duration: 0.5, ease: 'easeInOut' }"
      >
        <ReuseImageTemplate />
      </Motion>
    </DialogTrigger>

    <DialogPortal>
      <AnimatePresence>
        <Motion
          v-if="open"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :class="pohon.overlay({ class: [pohonProp?.overlay] })"
        />

        <div
          v-if="open"
          :class="pohon.content({ class: [pohonProp?.content] })"
          @click="close"
        >
          <Motion
            as-child
            :layout-id="layoutId"
            :transition="{ type: 'spring', bounce: 0.15, duration: 0.5, ease: 'easeInOut' }"
          >
            <ReuseZoomedImageTemplate />
          </Motion>
        </div>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>

  <ReuseImageTemplate v-else />
</template>
