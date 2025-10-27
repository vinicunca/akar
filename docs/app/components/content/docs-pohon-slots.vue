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
          Slot
        </ProseTh>
        <ProseTh>
          Type
        </ProseTh>
      </ProseTr>
    </ProseThead>

    <ProseTbody>
      <ProseTr
        v-for="slot in (metadata?.meta?.slots || [])"
        :key="slot.name"
      >
        <ProseTd>
          <ProseCode class="akar:(color-primary-600 bg-primary/10)">
            {{ slot.name }}
          </ProseCode>
        </ProseTd>

        <ProseTd>
          <DocsHighlightInlineType
            v-if="slot.type"
            :type="slot.type"
          />

          <MDC
            v-if="slot.description"
            :value="slot.description"
            class="color-text-toned mt-1"
            :cache-key="`${propsKey}-${slot.name}-description`"
          />
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
