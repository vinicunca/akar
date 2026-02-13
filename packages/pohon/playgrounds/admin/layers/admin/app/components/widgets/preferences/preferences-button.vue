<script lang="ts" setup>
import { capitalize } from '@vinicunca/perkakas';
import { preferencesManager } from '~~/layers/admin/app/preferences';
import PreferencesPanel from './preferences-panel.vue';

defineOptions({
  name: 'AdminLayoutPreferencesButton',
});

const preferences = preferencesManager.getPreferences();

const {
  diffPreference,
} = useAdminPreferences();

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
    :title="$t('preferences.title')"
    :description="$t('preferences.subtitle')"
    :close="{
      color: 'error',
      variant: 'outline',
    }"
  >
    <PButton
      class="mr-2"
      icon="i-lucide:settings"
      color="neutral"
      variant="ghost"
    />

    <template #actions>
      <PChip
        color="success"
        inset
        class="end-16 top-4 akar:absolute"
        :show="Boolean(diffPreference)"
      >
        <PButtonIcon
          color="neutral"
          :disabled="!Boolean(diffPreference)"
          variant="ghost"
          :tooltip="{
            text: $t('preferences.resetTip'),
          }"
          icon="i-lucide:rotate-cw"
          @click="preferencesManager.resetPreferences()"
        />
      </PChip>
    </template>

    <template #body>
      <PreferencesPanel
        v-bind="{ ...attrs }"
        v-on="listeners"
      />
    </template>
  </PSlideover>
</template>
