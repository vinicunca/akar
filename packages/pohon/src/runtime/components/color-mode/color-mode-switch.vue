<script lang="ts">
import type { PSwitchProps } from 'pohon';

export interface PColorModeSwitchProps extends /** @vue-ignore */ Pick<PSwitchProps, 'as' | 'color' | 'size' | 'disabled' | 'pohon'> {
}
</script>

<script setup lang="ts">
import { useAppConfig, useColorMode } from '#imports';
import { computed } from 'vue';
import { useLocale } from '../../composables/use-locale';
import PSwitch from '../switch.vue';

defineOptions({ inheritAttrs: false });

defineProps<PColorModeSwitchProps>();

const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();

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
    <PSwitch
      v-model="isDark"
      :checked-icon="appConfig.pohon.icons.dark"
      :unchecked-icon="appConfig.pohon.icons.light"
      :aria-label="isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark')"
      v-bind="$attrs"
    />

    <template #fallback>
      <PSwitch
        :checked-icon="appConfig.pohon.icons.dark"
        :unchecked-icon="appConfig.pohon.icons.light"
        :aria-label="isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark')"
        v-bind="$attrs"
        disabled
      />
    </template>
  </ClientOnly>
</template>
