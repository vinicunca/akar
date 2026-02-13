<script lang="ts" setup>
import { capitalize } from '@vinicunca/perkakas';
import { AVisuallyHidden } from 'akar';
import { preferencesManager } from '~~/layers/admin/app/preferences';
import PreferencesPanel from './preferences-panel.vue';

defineOptions({
  name: 'AdminLayoutPreferencesButton',
});

const preferences = preferencesManager.getPreferences();

const attrs = computed(() => {
  const attributes: Record<string, any> = {};
  for (const [key, value] of Object.entries(preferences)) {
    for (const [subKey, subValue] of Object.entries(value)) {
      attributes[`${key}${capitalize(subKey)}`] = subValue;
    }
  }

  return attributes;
});

const listeners = computed(() => {
  const listeners: Record<string, any> = {};

  for (const [key, value] of Object.entries(preferences)) {
    if (typeof value === 'object') {
      for (const subKey of Object.keys(value)) {
        listeners[`update:${key}${capitalize(subKey)}`] = (
          val: any,
        ) => {
          preferencesManager.updatePreferences({ [key]: { [subKey]: val } });
        };
      }
    } else {
      listeners[key] = value;
    }
  }

  return listeners;
});
</script>

<template>
  <PSlideover
    title="Preferences"
    :close="{
      color: 'primary',
      variant: 'outline',
    }"
  >
    <PButton
      class="mr-2"
      icon="i-lucide:settings"
      color="neutral"
      variant="ghost"
    />

    <template #description>
      <AVisuallyHidden>
        Setup your preferences
      </AVisuallyHidden>
    </template>

    <template #body>
      <PreferencesPanel
        v-bind="{ ...attrs }"
        v-on="listeners"
      />
    </template>
  </PSlideover>
</template>
