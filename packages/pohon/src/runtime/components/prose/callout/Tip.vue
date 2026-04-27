<script setup lang="ts">
import { useAppConfig } from '#imports';
import Callout from '../callout.vue';

const appConfig = useAppConfig();
</script>

<template>
  <Callout
    color="success"
    :icon="appConfig.pohon.icons.tip"
  >
    <slot mdc-unwrap="p" />
  </Callout>
</template>
