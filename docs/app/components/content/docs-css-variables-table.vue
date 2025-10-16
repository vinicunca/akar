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
          <ProseCode>
            {{ prop.cssVariable }}
          </ProseCode>
        </ProseTd>

        <ProseTd class="akar:align-middle">
          <span>
            {{ prop.description }}
          </span>
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
