<script setup lang="ts">
import {
  ProseCodeInline,
  ProseTable,
  ProseTbody,
  ProseTd,
  ProseTh,
  ProseThead,
  ProseTr,
} from '../prose';

type KeyboardDef = {
  cssVariable: string;
  description: Array<string>;
};

interface DataAttributesTableProps {
  data: Array<KeyboardDef>;
}
const props = defineProps<DataAttributesTableProps>();
</script>

<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh class="w-[45%]">
          <span>CSS Variable</span>
        </ProseTh>
        <ProseTh class="w-[55%]">
          <span>Description</span>
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr
        v-for="(prop, index) in props.data"
        :key="`${prop.cssVariable}-${index}`"
      >
        <ProseTd>
          <ProseCodeInline class="text-[13px] py-1 !whitespace-normal">
            {{ prop.cssVariable }}
          </ProseCodeInline>
        </ProseTd>
        <ProseTd class="">
          <div class="flex gap-1 items-center">
            <span
              size="2"
              class="leading-5"
              v-html="prop.description"
            />
          </div>
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
