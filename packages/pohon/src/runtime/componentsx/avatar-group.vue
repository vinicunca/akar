<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/avatar-group';

type AvatarGroup = ComponentConfig<typeof theme, AppConfig, 'avatarGroup'>;

export interface AvatarGroupProps {
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

export interface AvatarGroupSlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed, provide } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { avatarGroupInjectionKey } from '../composables/useAvatarGroup';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';

const props = defineProps<AvatarGroupProps>();
const slots = defineSlots<AvatarGroupSlots>();

const appConfig = useAppConfig() as AvatarGroup['AppConfig'];
const pohonProp = useComponentPohon('avatarGroup', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.avatarGroup || {}) })({
  size: props.size,
}));

const max = computed(() => typeof props.max === 'string' ? Number.parseInt(props.max, 10) : props.max);

const children = computed(() => {
  let children = slots.default?.();
  if (children?.length) {
    children = children.flatMap((child: any) => {
      if (typeof child.type === 'symbol') {
        // `v-if="false"` or commented node
        if (typeof child.children === 'string') {
          return;
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

provide(avatarGroupInjectionKey, computed(() => ({
  size: props.size,
})));
</script>

<template>
  <Primitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <PAvatar
      v-if="hiddenCount > 0"
      :text="`+${hiddenCount}`"
      data-slot="base"
      :class="pohon.base({ class: pohonProp?.base })"
    />
    <component
      :is="avatar"
      v-for="(avatar, count) in visibleAvatars"
      :key="count"
      data-slot="base"
      :class="pohon.base({ class: pohonProp?.base })"
    />
  </Primitive>
</template>
