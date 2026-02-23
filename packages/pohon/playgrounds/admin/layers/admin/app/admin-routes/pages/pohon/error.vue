<script setup lang="ts">
const error = {
  statusCode: 404,
  statusMessage: 'Page not found',
  message: 'The page you are looking for does not exist.',
};
</script>

<template>
  <BaseNavbar />

  <PError :error="error" />
</template>
