<script setup lang="ts">
import { useAppConfig } from '#app';

const appConfig = useAppConfig();
</script>

<template>
  <div>
    <PFormField
      label="toaster.max"
      size="sm"
      :pohon="{
        wrapper: 'bg-background-elevated/50 rounded-l-sm flex border-r border-border-accented',
        label: 'color-text-muted px-2 py-1.5',
        container: 'akar:mt-0',
      }"
      class="rounded-sm inline-flex ring ring-ring-accented"
    >
      <PInput
        v-model="appConfig.toaster.max"
        color="neutral"
        variant="soft"
        :pohon="{ base: 'rounded-sm rounded-l-none min-w-12' }"
      />
    </PFormField>
  </div>
</template>
