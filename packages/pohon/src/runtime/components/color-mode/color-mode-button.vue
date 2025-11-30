<script lang="ts">
import type { PButtonProps, PLinkPropsKeys } from '../../types';

export interface PColorModeButtonProps extends Omit<PButtonProps, PLinkPropsKeys | 'color' | 'variant'> {
  /**
   * @defaultValue 'neutral'
   */
  color?: PButtonProps['color'];
  /**
   * @defaultValue 'ghost'
   */
  variant?: PButtonProps['variant'];
}
</script>

<script setup lang="ts">
import { useAppConfig, useColorMode } from '#imports';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { computed } from 'vue';
import { useLocale } from '../../composables/use-locale';
import PButton from '../button.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PColorModeButtonProps>(),
  {
    color: 'neutral',
    variant: 'ghost',
  },
);

defineSlots<{
  fallback: (props?: object) => any;
}>();

const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();

const buttonProps = useForwardProps(reactiveOmit(props, 'icon'));

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(_isDark: boolean) {
    colorMode.preference = _isDark ? 'dark' : 'light';
  },
});
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <PButton
      v-bind="{
        ...buttonProps,
        'icon': props.icon || (isDark ? appConfig.pohon.icons.dark : appConfig.pohon.icons.light),
        'aria-label': isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark'),
      }"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <slot name="fallback">
        <div class="size-8" />
      </slot>
    </template>
  </ClientOnly>
</template>
