<script lang="ts" setup>
import { DocsHighlightInlineType } from '#components';
import { computed } from 'vue';

const props = defineProps<{
  keys: string;
}>();

const DATA_ATTRIBUTES = {
  state: {
    attribute: '[data-state]',
    values: ['open', 'closed'],
  },
  disabled: {
    attribute: '[data-disabled]',
    values: 'Present when disabled',
  },
  orientation: {
    attribute: '[data-orientation]',
    values: ['horizontal', 'vertical'],
  },
  motion: {
    attribute: '[data-motion]',
    values: ['from-start', 'from-end', 'to-start', 'to-end'],
  },
  active: {
    attribute: '[data-active]',
    values: 'Present when active',
  },
  visible: {
    attribute: '[data-visible]',
    values: ['visible', 'hidden'],
  },
};

const propData = computed(() => {
  return props.keys
    .split(',')
    .map((key) => DATA_ATTRIBUTES[key.trim() as keyof typeof DATA_ATTRIBUTES]);
});
</script>

<template>
  <ProseH4>Data Attributes</ProseH4>

  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh>
          Attribute
        </ProseTh>
        <ProseTh>
          Value
        </ProseTh>
      </ProseTr>
    </ProseThead>

    <ProseTbody>
      <ProseTr
        v-for="(prop, index) in propData"
        :key="`${prop.attribute}-${index}`"
      >
        <ProseTd>
          <ProseCode class="akar:(color-primary-600 bg-primary/10)">
            {{ prop.attribute }}
          </ProseCode>
        </ProseTd>

        <ProseTd class="akar:align-middle">
          <DocsHighlightInlineType
            v-if="Array.isArray(prop.values)"
            :type="prop.values.join(' | ')"
          />

          <span v-else>
            {{ prop.values }}
          </span>
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
