<script setup lang="ts">
import { useAppConfig } from '#app';

const appConfig = useAppConfig();
</script>

<template>
  <div>
    <PFormField
      label="toaster.duration"
      size="sm"
      :pohon="{
        wrapper: 'bg-elevated/50 rounded-l-sm flex border-r border-border-accented',
        label: 'color-text-muted px-2 py-1.5',
        container: 'mt-0',
      }"
      class="ring-accented rounded-sm inline-flex ring"
    >
      <PInput
        v-model="appConfig.toaster.duration"
        color="neutral"
        variant="soft"
        :pohon="{ base: 'rounded-sm rounded-l-none min-w-12' }"
      />
    </PFormField>
  </div>
</template>
