<script setup lang="ts">
import type { PShortcutsConfig } from '#imports';
import { defineShortcuts } from '#imports';
import { computed, ref } from 'vue';

const logs = ref<Array<string>>([]);
const shortcutsState = ref({
  'a': {
    label: 'A',
    disabled: false,
    usingInput: false,
  },
  'shift_i': {
    label: 'Shift+I',
    disabled: false,
    usingInput: false,
  },
  'g-i': {
    label: 'G->I',
    disabled: false,
    usingInput: false,
  },
});

const shortcuts = computed(() => {
  return Object.entries(shortcutsState.value).reduce<PShortcutsConfig>((acc, [key, { label, disabled, usingInput }]) => {
    if (disabled) {
      return acc;
    }
    acc[key] = {
      handler: () => {
        logs.value.unshift(`"${label}" triggered`);
      },
      usingInput,
    };
    return acc;
  }, {});
});
defineShortcuts(shortcuts);
</script>

<template>
  <BaseNavbar />

  <div class="flex flex-col gap-4 h-full w-full items-stretch justify-stretch">
    <PCard>
      <div class="space-y-2">
        <div>
          <span>{{ shortcutsState.a.label }} shortcut</span>
          <PCheckbox
            v-model="shortcutsState.a.disabled"
            :label="`Disable ${shortcutsState.a.label}`"
          />
          <PCheckbox
            v-model="shortcutsState.a.usingInput"
            :label="`Using in inputs ${shortcutsState.a.label}`"
          />
        </div>
        <div>
          <span>{{ shortcutsState.shift_i.label }} shortcut</span>
          <PCheckbox
            v-model="shortcutsState.shift_i.disabled"
            :label="`Disable ${shortcutsState.shift_i.label}`"
          />
          <PCheckbox
            v-model="shortcutsState.shift_i.usingInput"
            :label="`Using in inputs ${shortcutsState.shift_i.label}`"
          />
        </div>
        <div>
          <span>{{ shortcutsState['g-i'].label }} shortcut</span>
          <PCheckbox
            v-model="shortcutsState['g-i'].disabled"
            :label="`Disable ${shortcutsState['g-i'].label}`"
          />
          <PCheckbox
            v-model="shortcutsState['g-i'].usingInput"
            :label="`Using in inputs ${shortcutsState['g-i'].label}`"
          />
        </div>
        <PInput placeholder="Input to focus" />
      </div>
    </PCard>

    <PCard
      :pohon="{ body: 'h-[200px] overflow-y-auto' }"
      class="flex-1"
    >
      <template #header>
        <div class="flex gap-4 items-center justify-between">
          <h3 class="font-bold">
            Logs
          </h3>
          <PButton
            icon="i-lucide:trash"
            size="sm"
            color="neutral"
            class="-my-1"
            @click="logs = []"
          />
        </div>
      </template>

      <p
        v-for="(log, index) of logs"
        :key="index"
      >
        {{ log }}
      </p>
    </PCard>
  </div>
</template>
