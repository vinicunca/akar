<script lang="ts">
import type { PButtonProps } from '../../../types';

export interface ColorModeButtonProps extends Omit<PButtonProps, 'color' | 'variant'> {
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
import PButton from '../../../components/button.vue';
import { useLocale } from '../../../composables/use-locale';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<ColorModeButtonProps>(),
  {
    color: 'neutral',
    variant: 'ghost',
  },
);

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
  <PButton
    v-bind="{
      ...buttonProps,
      'icon': props.icon || (isDark ? appConfig.pohon.icons.dark : appConfig.pohon.icons.light),
      'aria-label': isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark'),
      ...$attrs,
    }"
    @click="isDark = !isDark"
  />
</template>
