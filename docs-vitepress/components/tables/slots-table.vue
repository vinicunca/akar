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

type PropDef = {
  name?: string;
  required?: boolean;
  type: string;
  typeSimple: string;
  description?: string;
};

interface SlotsTableProps {
  data: Array<PropDef>;
}

defineProps<SlotsTableProps>();
</script>

<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh class="w-1/3">
          <span>Slots (default)</span>
        </ProseTh>
        <ProseTh>
          <span>Payload</span>
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr
        v-for="(prop, index) in data"
        :key="`${prop.name}-${index}`"
      >
        <ProseTd>
          <div class="flex gap-1 h-full items-start">
            <ProseCodeInline>
              {{ prop.name }}
            </ProseCodeInline>
          </div>
        </ProseTd>
        <ProseTd>
          <ProseCodeInline variant="secondary">
            {{ prop.type }}
          </ProseCodeInline>
          <div
            class="text-sm color-muted-foreground mt-2 flex flex-col gap-2 [&_p]:mb-2 [&_p]:mt-0"
            v-html="prop.description"
          />
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
