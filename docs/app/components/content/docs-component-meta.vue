<script lang="ts" setup>
import { ContentRenderer } from '#components';
import { queryCollection, useAsyncData, useRoute } from '#imports';
import { toCamelCase, toSentenceCase } from '@vinicunca/perkakas';

const props = withDefaults(
  defineProps<{
    prose?: boolean;
    name: string;
  }>(),
  {},
);

const route = useRoute();

const camelName = toCamelCase(route.path.split('/').pop() ?? '');
const upperName = toSentenceCase(camelName);
const componentName = props.prose ? `Prose${upperName}` : `P${upperName}`;

const { data: page } = await useAsyncData(
  props.name,
  () => queryCollection('docs')
    .path(`/docs/_meta/${props.name}`)
    .first(),
);
</script>

<template>
  <ContentRenderer
    v-if="page?.body"
    :value="page"
  />
</template>
