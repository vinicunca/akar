<script lang="ts">
import type { PSelectMenuItem, PSelectMenuProps } from '../../types';

export interface PColorModeSelectProps extends Omit<
  PSelectMenuProps<Array<PSelectMenuItem>>,
'icon' | 'items' | 'modelValue'
> {
}
</script>

<script setup lang="ts">
import { useAppConfig, useColorMode } from '#imports';
import { useForwardProps } from 'akar';
import { computed } from 'vue';
import { useLocale } from '../../composables/use-locale';
import PSelectMenu from '../select-menu.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PColorModeSelectProps>(),
  {
    searchInput: false,
  },
);

const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();

const selectMenuProps = useForwardProps(props);

const items = computed(() => [
  { label: t('colorMode.system'), value: 'system', icon: appConfig.pohon.icons.system },
  { label: t('colorMode.light'), value: 'light', icon: appConfig.pohon.icons.light },
  { label: t('colorMode.dark'), value: 'dark', icon: appConfig.pohon.icons.dark },
]);

const preference = computed({
  get() {
    return items.value.find((option) => option.value === colorMode.preference) || items.value[0]!;
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
      :icon="preference?.icon"
      v-bind="{ ...(selectMenuProps as any), ...$attrs }"
      :items="items"
    />

    <template #fallback>
      <PSelectMenu
        :icon="items[0]?.icon"
        v-bind="{ ...(selectMenuProps as any), ...$attrs }"
        :model-value="items[0]"
        :items="items"
        disabled
      />
    </template>
  </ClientOnly>
</template>
