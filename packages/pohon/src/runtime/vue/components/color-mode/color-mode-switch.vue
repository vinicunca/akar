<script lang="ts">
import type { PSwitchProps } from '../../../types';

export interface ColorModeSwitchProps extends Omit<PSwitchProps, 'checkedIcon' | 'uncheckedIcon' | 'modelValue'> {
}
</script>

<script setup lang="ts">
import { useAppConfig, useColorMode } from '#imports';
import { useForwardProps } from 'akar';
import { computed } from 'vue';
import PSwitch from '../../../components/switch.vue';
import { useLocale } from '../../../composables/use-locale';

defineOptions({ inheritAttrs: false });

const props = defineProps<ColorModeSwitchProps>();

const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();

const switchProps = useForwardProps(props);

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
  <PSwitch
    v-model="isDark"
    :checked-icon="appConfig.pohon.icons.dark"
    :unchecked-icon="appConfig.pohon.icons.light"
    v-bind="{
      ...switchProps,
      'aria-label': isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark'),
      ...$attrs,
    }"
  />
</template>
