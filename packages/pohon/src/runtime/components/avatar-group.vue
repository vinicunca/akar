<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
 
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/avatar-group';

type AvatarGroup = ComponentConfig<typeof theme, AppConfig, 'avatarGroup'>;

export interface PAvatarGroupProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * @defaultValue 'md'
   */
  size?: AvatarGroup['variants']['size'];
  /**
   * The maximum number of avatars to display.
   */
  max?: number | string;
  class?: any;
  pohon?: AvatarGroup['slots'];
}

export interface PAvatarGroupSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { isString, isSymbol } from '@vinicunca/perkakas';
import { APrimitive } from 'akar';
import { computed, provide } from 'vue';
import { avatarGroupInjectionKey } from '../composables/use-avatar-group';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';

const props = defineProps<PAvatarGroupProps>();
const slots = defineSlots<PAvatarGroupSlots>();

const appConfig = useAppConfig() as AvatarGroup['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.avatarGroup || {}),
  })({
    size: props.size,
  }),
);

const max = computed(() => isString(props.max) ? Number.parseInt(props.max, 10) : props.max);

const children = computed(() => {
  let children = slots.default?.();
  if (children?.length) {
    children = children.flatMap((child: any) => {
      if (isSymbol(child.type)) {
        // `v-if="false"` or commented node
        if (isString(child.children)) {
          return undefined;
        }

        return child.children;
      }

      return child;
    }).filter(Boolean);
  }

  return children || [];
});

const visibleAvatars = computed(() => {
  if (!children.value.length) {
    return [];
  }

  if (!max.value || max.value <= 0) {
    return [...children.value].reverse();
  }

  return [...children.value].slice(0, max.value).reverse();
});

const hiddenCount = computed(() => {
  if (!children.value.length) {
    return 0;
  }

  return children.value.length - visibleAvatars.value.length;
});

provide(
  avatarGroupInjectionKey,
  computed(() => ({
    size: props.size,
  })),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <PAvatar
      v-if="hiddenCount > 0"
      :text="`+${hiddenCount}`"
      :class="pohon.base({ class: props.pohon?.base })"
    />

    <component
      :is="avatar"
      v-for="(avatar, count) in visibleAvatars"
      :key="count"
      :class="pohon.base({ class: props.pohon?.base })"
    />
  </APrimitive>
</template>
