<script lang="ts" setup>
import type { ComponentMeta } from 'vue-component-meta';
import { computed, useComponentName } from '#imports';

const props = defineProps<{
  metaEvents: ComponentMeta['events'];
}>();

const { slug, parentSlug } = useComponentName(props);

const propsKey = computed(() => `props-${parentSlug}-${slug}`);
</script>

<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh>
          Event
        </ProseTh>
        <ProseTh>
          Type
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr
        v-for="event in props.metaEvents"
        :key="event.name"
      >
        <ProseTd>
          <ProseCode class="akar:(color-primary-600 bg-primary/10)">
            {{ event.name }}
          </ProseCode>
        </ProseTd>
        <ProseTd>
          <DocsHighlightInlineType
            v-if="event.type"
            :type="event.type"
          />

          <MDC
            v-if="event.description"
            :value="event.description"
            class="color-text-toned mt-1"
            :cache-key="`${propsKey}-${event.name}-description`"
          />
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
