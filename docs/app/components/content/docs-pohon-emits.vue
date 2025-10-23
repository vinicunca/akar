<script lang="ts" setup>
import { DocsEmitsTable } from '#components';
import { fetchComponentMeta, useComponentName } from '#imports';

const props = defineProps<{
  prose?: boolean;
}>();

const { componentName, slug } = useComponentName(props);

const metadata = await fetchComponentMeta(componentName);
</script>

<template>
  <DocsEmitsTable
    v-if="metadata.meta?.events?.length"
    :data="metadata.meta.events"
    :name="`emits-p-${slug}`"
  />
</template>
