<script lang="ts" setup>
import { DocsSlotsTable } from '#components';
import { fetchComponentMeta, useComponentName } from '#imports';

const props = defineProps<{
  prose?: boolean;
}>();

const { componentName, slug } = useComponentName(props);

const metadata = await fetchComponentMeta(componentName);
</script>

<template>
  <DocsSlotsTable
    v-if="metadata.meta?.slots?.length"
    :data="metadata.meta.slots"
    :name="`slots-p-${slug}`"
  />
</template>
