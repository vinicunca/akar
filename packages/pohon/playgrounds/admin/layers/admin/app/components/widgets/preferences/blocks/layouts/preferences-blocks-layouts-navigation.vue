<script lang="ts" setup>
import PreferencesBlocksSwitch from '../preferences-blocks-switch.vue';

const props = defineProps<{
  disabledNavigationSplit?: boolean;
  disabled?: boolean;
}>();

const navigationIsSplit = defineModel<boolean>('navigationIsSplit');
const navigationIsAccordion = defineModel<boolean>('navigationIsAccordion');
</script>

<template>
  <div class="gap-1 grid">
    <PreferencesBlocksSwitch
      v-model="navigationIsSplit"
      :disabled="props.disabledNavigationSplit || props.disabled"
      :tip="$t('preferences.navigationMenu.splitTip')"
    >
      {{ $t('preferences.navigationMenu.split') }}
    </PreferencesBlocksSwitch>

    <PreferencesBlocksSwitch
      v-model="navigationIsAccordion"
      :disabled="props.disabled"
    >
      {{ $t('preferences.navigationMenu.accordion') }}
    </PreferencesBlocksSwitch>
  </div>
</template>
