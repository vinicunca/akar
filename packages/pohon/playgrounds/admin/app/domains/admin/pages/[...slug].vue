<script lang="ts" setup>
import { definePageMeta } from '#imports';
import { ROUTE_NOT_FOUND_NAME } from '~/domains/core/core.constants';

definePageMeta({
  name: ROUTE_NOT_FOUND_NAME,
  title: '404',
});
</script>

<template>
  <p>{{ $route.params.slug }}</p>
</template>
