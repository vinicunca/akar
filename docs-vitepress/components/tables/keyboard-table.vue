<script setup lang="ts">
import {
  ProseTable,
  ProseTbody,
  ProseTd,
  ProseTh,
  ProseThead,
  ProseTr,
} from '../prose';

type KeyboardDef = {
  keys: Array<string>;
  description: string;
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
        <ProseTh class="">
          <span>Key</span>
        </ProseTh>
        <ProseTh class="">
          <span>Description</span>
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr
        v-for="(prop, index) in props.data"
        :key="`${prop}-${index}`"
      >
        <ProseTd>
          <div class="flex gap-1 items-center">
            <kbd
              v-for="(key, propIndex) in prop.keys"
              :key="`${key}-${propIndex}`"
            >
              {{ key }}
            </kbd>
          </div>
        </ProseTd>
        <ProseTd class="">
          <div class="flex gap-1 items-center">
            <span v-html="prop.description" />
          </div>
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
