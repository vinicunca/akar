<script setup lang="ts">
import type { PAvatarProps } from 'pohon-ui';
import { PAvatar } from '#components';
import { computed } from 'vue';

interface Props {
  /**
   * Whether to collapse the text
   */
  collapsed?: boolean;
  /**
   * Logo fit
   */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /**
   * Logo redirect URL
   */
  href?: string;
  /**
   * Logo size
   */
  logoSize?: PAvatarProps['size'];
  /**
   * Logo icon
   */
  src?: string;
  /**
   * Dark theme logo icon (optional, if not set, use src)
   */
  srcDark?: string;
  /**
   * Logo text
   */
  text: string;
  /**
   * Logo theme
   */
  theme?: string;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    collapsed: false,
    href: '#',
    logoSize: 'md',
    src: '',
    srcDark: '',
    theme: 'light',
    fit: 'cover',
  },
);

/**
 * Select the appropriate logo icon based on the theme
 */
const logoSrc = computed(() => {
  // If it is a dark theme and srcDark is provided, use the dark theme logo
  if (props.theme === 'dark' && props.srcDark) {
    return props.srcDark;
  }
  // Otherwise use the default src
  return props.src;
});
</script>

<template>
  <div
    :class="theme"
    class="text-lg flex h-full items-center"
  >
    <a
      :class="$attrs.class"
      :href="href"
      class="text-lg leading-normal px-3 flex gap-2 h-full transition-all duration-500 items-center overflow-hidden"
    >
      <PAvatar
        v-if="logoSrc"
        :alt="text"
        :src="logoSrc"
        :size="logoSize"
        :fit="fit"
        class="rounded-none bg-transparent relative"
      />

      <template v-if="!collapsed">
        <slot name="text">
          <span class="text-foreground font-semibold text-nowrap truncate">
            {{ text }}
          </span>
        </slot>
      </template>
    </a>
  </div>
</template>
