<script lang="ts">
import type { PButtonProps } from 'pohon';

export interface PColorModeButtonProps extends /** @vue-ignore */ Pick<PButtonProps, 'as' | 'size' | 'disabled' | 'pohon'> {
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
import { computed } from 'vue';
import { useLocale } from '../../composables/use-locale';
import PButton from '../button.vue';

defineOptions({ inheritAttrs: false });

withDefaults(
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
      :icon="isDark ? appConfig.pohon.icons.dark : appConfig.pohon.icons.light"
      :color="color"
      :variant="variant"
      :aria-label="isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark')"
      v-bind="$attrs"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <slot name="fallback">
        <div class="size-8" />
      </slot>
    </template>
  </ClientOnly>
</template>
