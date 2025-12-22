<script lang="ts" setup>
import { PButton, PFullscreen } from '#components';
import { preferences, usePreferences } from '#layers/dashboard-preferences/lib';
import { computed, useSlots } from 'vue';
import { useRefresh } from '../composables/use-refresh';
import { useAccessStore } from '../stores/stores.access';
import {
  GlobalSearch,
  LanguageToggle,
  PreferencesButton,
  ThemeButton,
  TimezoneButton,
} from './widgets';

interface Props {
  theme?: string;
}

withDefaults(
  defineProps<Props>(),
  {
    theme: 'light',
  },
);

const emit = defineEmits<{
  clearPreferencesAndLogout: [];
}>();

const REFERENCE_VALUE = 50;

const accessStore = useAccessStore();
const { globalSearchShortcutKey, preferencesButtonPosition } = usePreferences();
const slots = useSlots();
const { refresh } = useRefresh();

const rightSlots = computed(() => {
  const list = [
    {
      index: REFERENCE_VALUE + 100,
      name: 'user-dropdown',
    },
  ];

  if (preferences.widget.enableGlobalSearch) {
    list.push({
      index: REFERENCE_VALUE,
      name: 'global-search',
    });
  }

  if (preferencesButtonPosition.value.header) {
    list.push({
      index: REFERENCE_VALUE + 10,
      name: 'preferences',
    });
  }
  if (preferences.widget.showThemeToggle) {
    list.push({
      index: REFERENCE_VALUE + 20,
      name: 'theme-toggle',
    });
  }
  if (preferences.widget.enableLanguageToggle) {
    list.push({
      index: REFERENCE_VALUE + 30,
      name: 'language-toggle',
    });
  }
  if (preferences.widget.showTimezone) {
    list.push({
      index: REFERENCE_VALUE + 40,
      name: 'timezone',
    });
  }
  if (preferences.widget.enableFullscreen) {
    list.push({
      index: REFERENCE_VALUE + 50,
      name: 'fullscreen',
    });
  }
  if (preferences.widget.enableNotification) {
    list.push({
      index: REFERENCE_VALUE + 60,
      name: 'notification',
    });
  }

  Object.keys(slots).forEach((key) => {
    const name = key.split('-');
    if (key.startsWith('header-right')) {
      list.push({ index: Number(name[2]), name: key });
    }
  });
  return list.toSorted((a, b) => a.index - b.index);
});

const leftSlots = computed(() => {
  const list: Array<{ index: number; name: string }> = [];

  if (preferences.widget.showRefresh) {
    list.push({
      index: 0,
      name: 'refresh',
    });
  }

  Object.keys(slots).forEach((key) => {
    const name = key.split('-');
    if (key.startsWith('header-left')) {
      list.push({ index: Number(name[2]), name: key });
    }
  });
  return list.toSorted((a, b) => a.index - b.index);
});

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout');
}
</script>

<template>
  <template
    v-for="slot in leftSlots.filter((item) => item.index < REFERENCE_VALUE)"
    :key="slot.name"
  >
    <slot :name="slot.name">
      <template v-if="slot.name === 'refresh'">
        <PButton
          class="my-0 mr-1 rounded-md"
          icon="i-lucide:rotate-cw"
          @click="refresh"
        />
      </template>
    </slot>
  </template>

  <div class="flex hidden items-center justify-center lg:block">
    <slot name="breadcrumb" />
  </div>

  <template
    v-for="slot in leftSlots.filter((item) => item.index > REFERENCE_VALUE)"
    :key="slot.name"
  >
    <slot :name="slot.name" />
  </template>

  <div
    :class="`menu-align-${preferences.header.menuAlign}`"
    class="flex flex-1 h-full min-w-0 items-center"
  >
    <slot name="menu" />
  </div>

  <div class="flex flex-shrink-0 h-full min-w-0 items-center">
    <template
      v-for="slot in rightSlots"
      :key="slot.name"
    >
      <slot :name="slot.name">
        <template v-if="slot.name === 'global-search'">
          <GlobalSearch
            :enable-shortcut-key="globalSearchShortcutKey"
            :menus="accessStore.accessMenus"
            class="mr-1 sm:mr-4"
          />
        </template>

        <template v-else-if="slot.name === 'preferences'">
          <PreferencesButton
            class="mr-1"
            @clear-preferences-and-logout="clearPreferencesAndLogout"
          />
        </template>

        <template v-else-if="slot.name === 'theme-toggle'">
          <ThemeButton class="mr-1 mt-[2px]" />
        </template>

        <template v-else-if="slot.name === 'language-toggle'">
          <LanguageToggle class="mr-1" />
        </template>

        <template v-else-if="slot.name === 'fullscreen'">
          <PFullscreen class="mr-1" />
        </template>

        <template v-else-if="slot.name === 'timezone'">
          <TimezoneButton class="mr-1 mt-[2px]" />
        </template>
      </slot>
    </template>
  </div>
</template>

<style lang="postcss" scoped>
.menu-align-start {
  --menu-align: start;
}

.menu-align-center {
  --menu-align: center;
}

.menu-align-end {
  --menu-align: end;
}
</style>
