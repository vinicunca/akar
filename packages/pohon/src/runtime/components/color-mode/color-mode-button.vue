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
import { useComponentPohon } from '../../composables/use-component-pohon';
import { useLocale } from '../../composables/use-locale';
import PButton from '../button.vue';
import PIcon from '../icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PColorModeButtonProps>(),
  {
    color: 'neutral',
    variant: 'ghost',
  },
);

const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();
const pohonProp = useComponentPohon('colorModeButton', props);

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
      'aria-label': isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark'),
      ...$attrs,
    }"
    @click="isDark = !isDark"
  >
    <template #leading="{ pohon }">
      <PIcon
        :class="pohon.leadingIcon({ class: [pohonProp?.leadingIcon, 'hidden dark:inline-block'] })"
        :name="appConfig.pohon.icons.dark"
      />

      <PIcon
        :class="pohon.leadingIcon({ class: [pohonProp?.leadingIcon, 'dark:hidden'] })"
        :name="appConfig.pohon.icons.light"
      />
    </template>
  </PButton>
</template>
