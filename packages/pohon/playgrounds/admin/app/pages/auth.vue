<script lang="ts" setup>
import { definePageMeta } from '#imports';
import { LOGIN_PATH, ROUTE_AUTH_NAME } from '~/domains/core/core.constants';

definePageMeta({
  redirect: LOGIN_PATH,
  name: ROUTE_AUTH_NAME,
});
</script>

<template>
  <NuxtPage />
</template>
