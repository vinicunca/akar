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
  readonly: {
    attribute: '[data-readonly]',
    values: 'Present when readonly',
  },
  invalid: {
    attribute: '[data-invalid]',
    values: 'Present when invalid',
  },
  selected: {
    attribute: '[data-selected]',
    values: 'Present when selected',
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
  focused: {
    attribute: '[data-focused]',
    values: 'Present when focused',
  },
  unavailable: {
    attribute: '[data-unavailable]',
    values: 'Present when unavailable',
  },
  today: {
    attribute: '[data-today]',
    values: 'Present when today',
  },
  visible: {
    attribute: '[data-visible]',
    values: ['visible', 'hidden'],
  },
  outsideView: {
    attribute: '[data-outside-view]',
    values: 'Present when the date is outside the current month it is displayed in.',
  },
  outsideVisibleView: {
    attribute: '[data-outside-visible-view]',
    values: 'Present when the date is outside the months that are visible on the calendar.',
  },
  value: {
    attribute: '[data-value]',
    values: 'The ISO string value of the date.',
  },
  selectionStart: {
    attribute: '[data-selection-start]',
    values: 'Present when the date is the start of the selection.',
  },
  selectionEnd: {
    attribute: '[data-selection-end]',
    values: 'Present when the date is the end of the selection.',
  },
  highlighted: {
    attribute: '[data-highlighted]',
    values: 'Present when the date is highlighted by the user as they select a range.',
  },
  highlightedStart: {
    attribute: '[data-highlighted-start]',
    values: 'Present when the date is the start of the range that is highlighted by the user.',
  },
  highlightedEnd: {
    attribute: '[data-highlighted-end]',
    values: 'Present when the date is the end of the range that is highlighted by the user.',
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
