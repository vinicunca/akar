<script setup lang="ts">
import { Icon } from '@iconify/vue';
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
  default?: string | boolean;
  type: string;
  typeSimple: string;
  description?: string;
};

interface PropsTableProps {
  data: Array<PropDef>;
}

defineProps<PropsTableProps>();
</script>

<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh class="w-1/6">
          <span>Prop</span>
        </ProseTh>
        <ProseTh class="w-1/6">
          <span>Default</span>
        </ProseTh>
        <ProseTh class="w-2/3">
          <span>Type</span>
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
              {{ prop.name }}{{ prop.required ? "*" : null }}
            </ProseCodeInline>
          </div>
        </ProseTd>

        <ProseTd>
          <div
            v-if="prop.default"
            class="flex gap-1 h-full items-start"
          >
            <ProseCodeInline variant="secondary">
              {{ prop.default }}
            </ProseCodeInline>
          </div>
          <template v-else>
            <div
              as="{AccessibleIcon}"
              label="No default value"
            >
              <Icon icon="radix-icons:divider-horizontal" />
            </div>
          </template>
        </ProseTd>

        <ProseTd>
          <div class="flex flex-col">
            <ProseCodeInline
              variant="secondary"
              class="w-max"
            >
              {{ prop.typeSimple ? prop.typeSimple : prop.type }}
            </ProseCodeInline>
            <div
              class="text-sm color-muted-foreground mt-2 flex flex-col gap-2 [&_p]:mb-0 [&_p]:mt-0"
              v-html="prop.description"
            />
          </div>
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
