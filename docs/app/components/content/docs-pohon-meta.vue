<script lang="ts" setup>
import { fetchComponentMeta } from '#imports';

const props = withDefaults(
  defineProps<{
    prose?: boolean;
    name: string;
  }>(),
  {},
);

const metadata = await fetchComponentMeta('PAccordion');
</script>

<template>
  <template v-if="metadata.meta?.props?.length">
    <ProseH4>Props</ProseH4>
    <DocsPropsTable
      :data="metadata.meta.props"
      :name="`props-${props.name}`"
    />
  </template>

  <template v-if="metadata.meta?.events?.length">
    <ProseH4>Emits</ProseH4>
    <DocsEmitsTable
      :data="metadata.meta.events"
      :name="`emits-${props.name}`"
    />
  </template>

  <template v-if="metadata.meta?.slots?.length">
    <ProseH4>Slots</ProseH4>
    <DocsSlotsTable
      :data="metadata.meta.slots"
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
