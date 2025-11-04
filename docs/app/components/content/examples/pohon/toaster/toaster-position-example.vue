<script setup lang="ts">
import { useAppConfig } from '#app';
import theme from '#build/pohon/toaster';

const positions = Object.keys(theme.variants.position);
const appConfig = useAppConfig();
</script>

<template>
  <div>
    <PFormField
      label="toaster.position"
      size="sm"
      :pohon="{
        wrapper: 'bg-elevated/50 rounded-l-sm flex border-r border-border-accented',
        label: 'color-text-muted px-2 py-1.5',
        container: 'mt-0',
      }"
      class="ring-accented rounded-sm inline-flex ring"
    >
      <PSelectMenu
        v-model="appConfig.toaster.position"
        :items="positions"
        color="neutral"
        variant="soft"
        class="rounded-sm rounded-l-none min-w-12"
        :search-input="false"
      />
    </PFormField>
  </div>
</template>
