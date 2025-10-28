<script lang="ts" setup>
import { fetchComponentMeta, useComponentName } from '#imports';

const props = defineProps<{
  prose?: boolean;
}>();

const { componentName } = useComponentName(props);

const metadata = await fetchComponentMeta(componentName);
</script>

<template>
  <DocsEmitsTable :meta-events="metadata?.meta?.events ?? []" />
</template>
