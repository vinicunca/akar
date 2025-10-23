<script lang="ts" setup>
import { DocsPropsTable } from '#components';
import { fetchComponentMeta, useComponentName } from '#imports';

const props = defineProps<{
  prose?: boolean;
}>();

const { componentName, slug } = useComponentName(props);

const metadata = await fetchComponentMeta(componentName);
</script>

<template>
  <DocsPropsTable
    v-if="metadata.meta?.props.length"
    :data="metadata.meta.props"
    :name="`props-p-${slug}`"
  />
</template>
