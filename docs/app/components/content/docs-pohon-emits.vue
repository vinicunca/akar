<script lang="ts" setup>
import { computed, fetchComponentMeta, useComponentName } from '#imports';

const props = defineProps<{
  prose?: boolean;
}>();

const { componentName, slug } = useComponentName(props);

const propsKey = computed(() => `slots-pohon-${slug}`);

const metadata = await fetchComponentMeta(componentName);
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
        v-for="event in (metadata?.meta?.events || [])"
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
