<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { APrimitiveProps } from 'akar';
import type { IconProps, PChipProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/avatar';

type Avatar = ComponentConfig<typeof theme, AppConfig, 'avatar'>;

export interface PAvatarProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: APrimitiveProps['as'];
  src?: string;
  alt?: string;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
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
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive, APrimitiveSlot } from 'akar';
import { computed, ref, watch } from 'vue';
import { useAvatarGroup } from '../composables/use-avatar-group';
import { uv } from '../utils/uv';
import PChip from './chip.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PAvatarProps>(),
  { as: 'span' },
);

const fallback = computed(() =>
  props.text || (props.alt || '')
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .substring(0, 2),
);

const appConfig = useAppConfig() as Avatar['AppConfig'];
const { size } = useAvatarGroup(props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.avatar || {}),
  })({
    size: size.value,
  }),
);

const sizePx = computed(() => ({
  '3xs': 16,
  '2xs': 20,
  'xs': 24,
  'sm': 28,
  'md': 32,
  'lg': 36,
  'xl': 40,
  '2xl': 44,
  '3xl': 48,
})[props.size || 'md']);

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
    :as="as"
    v-bind="props.chip ? (typeof props.chip === 'object' ? { inset: true, ...props.chip } : { inset: true }) : {}"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    :style="props.style"
  >
    <img
      v-if="src && !error"
      :src="src"
      :alt="alt"
      :width="sizePx"
      :height="sizePx"
      v-bind="$attrs"
      :class="pohon.image({ class: props.pohon?.image })"
      @error="onError"
    >

    <APrimitiveSlot
      v-else
      v-bind="$attrs"
    >
      <slot>
        <PIcon
          v-if="icon"
          :name="icon"
          :class="pohon.icon({ class: props.pohon?.icon })"
        />
        <span
          v-else
          :class="pohon.fallback({ class: props.pohon?.fallback })"
        >{{ fallback || '&nbsp;' }}</span>
      </slot>
    </APrimitiveSlot>
  </component>
</template>
