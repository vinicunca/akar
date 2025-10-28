<script lang="ts" setup>
import { queryCollection, useAsyncData } from '#imports';

const props = withDefaults(
  defineProps<{
    prose?: boolean;
    name: string;
  }>(),
  {},
);

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
      :meta-props="(metadata.props as any)"
    />
  </template>

  <template v-if="metadata?.events?.length">
    <ProseH4>Emits</ProseH4>
    <DocsEmitsTable
      :meta-events="(metadata.events as any)"
    />
  </template>

  <template v-if="metadata?.slots?.length">
    <ProseH4>Slots</ProseH4>
    <DocsSlotsTable
      :meta-slots="(metadata.slots as any)"
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
