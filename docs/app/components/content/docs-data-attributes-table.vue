<script lang="ts" setup>
import { DocsHighlightInlineType } from '#components';

type AttributeDef = {
  attribute: string;
  values: string | Array<string>;
};

interface DataAttributesTableProps {
  data: Array<AttributeDef>;
}
const props = defineProps<DataAttributesTableProps>();
</script>

<template>
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
        v-for="(prop, index) in props.data"
        :key="`${prop.attribute}-${index}`"
      >
        <ProseTd>
          <ProseCode>
            {{ prop.attribute }}
          </ProseCode>
        </ProseTd>

        <ProseTd class="uno-layer-vinicunca:align-middle">
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
