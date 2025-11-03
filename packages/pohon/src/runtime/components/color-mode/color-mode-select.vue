<script lang="ts">
import type { PSelectMenuProps } from 'pohon-ui';

export interface PColorModeSelectProps extends /** @vue-ignore */ Pick<
  PSelectMenuProps<any>,
'color' | 'variant' | 'size' | 'trailingIcon' | 'selectedIcon' | 'content' | 'arrow' | 'portal' | 'disabled' | 'pohon'
> {
}
</script>

<script setup lang="ts">
import { useAppConfig, useColorMode } from '#imports';
import { computed } from 'vue';
import { useLocale } from '../../composables/use-locale';
import PSelectMenu from '../select-menu.vue';

defineOptions({ inheritAttrs: false });

defineProps<PColorModeSelectProps>();

const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();

const items = computed(() => [
  { label: t('colorMode.system'), value: 'system', icon: appConfig.pohon.icons.system },
  { label: t('colorMode.light'), value: 'light', icon: appConfig.pohon.icons.light },
  { label: t('colorMode.dark'), value: 'dark', icon: appConfig.pohon.icons.dark },
]);

const preference = computed({
  get() {
    return items.value.find((option) => option.value === colorMode.preference) || items.value[0];
  },
  set(option) {
    colorMode.preference = option!.value;
  },
});
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <PSelectMenu
      v-model="preference"
      :search-input="false"
      :icon="preference?.icon"
      v-bind="$attrs"
      :items="items"
    />

    <template #fallback>
      <PSelectMenu
        :search-input="false"
        :icon="items[0]?.icon"
        v-bind="$attrs"
        :model-value="items[0]"
        :items="items"
        disabled
      />
    </template>
  </ClientOnly>
</template>
