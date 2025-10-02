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

const { data: metadata } = await useAsyncData(
  props.name,
  () => queryCollection('metadata')
    .where('stem', '=', `metadata/${props.name}`)
    .first(),
);
</script>

<template>
  <template v-if="metadata?.props?.length">
    <ProseH4>Props</ProseH4>
    <DocsPropsTable
      :data="metadata.props"
      :name="`props-${props.name}`"
    />
  </template>

  <template v-if="metadata?.emits?.length">
    <ProseH4>Emits</ProseH4>
    <DocsEmitsTable
      :data="metadata.emits"
      :name="`emits-${props.name}`"
    />
  </template>

  <template v-if="metadata?.slots?.length">
    <ProseH4>Slots</ProseH4>
    <DocsSlotsTable
      :data="metadata.slots"
      :name="`slots-${props.name}`"
    />
  </template>

  <!-- <template v-if="metadata?.exposed?.length">
    <ProseH4>Exposed</ProseH4>

    <Docs
      :data="metadata.exposed"
      :name="props.name"
    />
  </template> -->
</template>
