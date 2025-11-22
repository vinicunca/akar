<script lang="ts" setup>
type VariableDef = {
  cssVariable: string;
  description: string;
};

interface CssVariablesTableProps {
  data: Array<VariableDef>;
}
const props = defineProps<CssVariablesTableProps>();
</script>

<template>
  <ProseH3>CSS Variables</ProseH3>

  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh>
          Variable
        </ProseTh>
        <ProseTh>
          Description
        </ProseTh>
      </ProseTr>
    </ProseThead>

    <ProseTbody>
      <ProseTr
        v-for="(prop, index) in props.data"
        :key="`${prop.cssVariable}-${index}`"
      >
        <ProseTd>
          <ProseCode class="akar:(color-primary-600 bg-primary/10 whitespace-nowrap)">
            {{ prop.cssVariable }}
          </ProseCode>
        </ProseTd>

        <ProseTd class="akar:align-middle">
          <MDC
            v-if="prop.description"
            :value="prop.description"
            :cache-key="`${prop.cssVariable}-description`"
          />
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
