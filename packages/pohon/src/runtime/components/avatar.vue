<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PChipProps, PIconProps } from '../types';
import type { ImgHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/avatar';

type Avatar = ComponentConfig<typeof theme, AppConfig, 'avatar'>;

export interface PAvatarProps extends /** @vue-ignore */ Omit<ImgHTMLAttributes, 'src' | 'alt'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: any | { root?: any; img?: any };
  src?: string;
  alt?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  text?: string;
  /**
   * @defaultValue 'md'
   */
  size?: Avatar['variants']['size'];
  chip?: boolean | PChipProps;
  class?: any;
  style?: any;
  pohon?: Avatar['slots'];
}

export interface PAvatarSlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import ImageComponent from '#build/pohon-image-component';
import { useAppConfig } from '#imports';
import { isFunction, isString } from '@vinicunca/perkakas';
import { APrimitive, APrimitiveSlot } from 'akar';
import { defu } from 'defu';
import { computed, ref, watch } from 'vue';
import { useAvatarGroup } from '../composables/use-avatar-group';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PChip from './chip.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<PAvatarProps>();

const as = computed(() => {
  if (isString(props.as) || isFunction(props.as?.render)) {
    return { root: props.as };
  }

  return defu(props.as, { root: 'span' });
});

const fallback = computed(() => props.text || (props.alt || '').split(' ').map((word) => word.charAt(0)).join('').substring(0, 2));

const appConfig = useAppConfig() as Avatar['AppConfig'];
const pohonProp = useComponentPohon('avatar', props);
const { size } = useAvatarGroup(props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.avatar || {}) })({
  size: size.value,
}));

const rootClass = computed(() => pohon.value.root({ class: [pohonProp.value?.root, props.class] }));

const sizePx = computed(() => {
  const sizeClass = rootClass.value.split(' ').find((c) => /^size-\d+$/.test(c));
  if (sizeClass) {
    const num = Number.parseFloat(sizeClass.split('-')[1] ?? '');
    if (!Number.isNaN(num)) {
      return num * 4;
    }
  }

  return null;
});

const error = ref(false);

watch(() => props.src, () => {
  if (error.value) {
    error.value = false;
  }
});

function onError() {
  error.value = true;
}
</script>

<template>
  <component
    :is="props.chip ? PChip : APrimitive"
    :as="as.root"
    v-bind="props.chip ? (typeof props.chip === 'object' ? { inset: true, ...props.chip } : { inset: true }) : {}"
    data-slot="root"
    :class="rootClass"
    :style="props.style"
  >
    <component
      :is="as.img || ImageComponent"
      v-if="src && !error"
      :src="src"
      :alt="alt"
      :width="sizePx"
      :height="sizePx"
      v-bind="$attrs"
      data-slot="image"
      :class="pohon.image({ class: pohonProp?.image })"
      @error="onError"
    />

    <APrimitiveSlot
      v-else
      v-bind="$attrs"
    >
      <slot>
        <PIcon
          v-if="icon"
          :name="icon"
          data-slot="icon"
          :class="pohon.icon({ class: pohonProp?.icon })"
        />
        <span
          v-else
          data-slot="fallback"
          :class="pohon.fallback({ class: pohonProp?.fallback })"
        >{{ fallback || '&nbsp;' }}</span>
      </slot>
    </APrimitiveSlot>
  </component>
</template>
