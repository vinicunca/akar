<script lang="ts" setup>
import { DocsHighlightInlineType } from '#components';

type PropDef = {
  name?: string;
  required?: boolean;
  default?: string;
  type: string;
  description?: string;
};

interface PropsTableProps {
  data: Array<PropDef>;
  name: string;
}

const props = defineProps<PropsTableProps>();
</script>

<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh>
          Prop
        </ProseTh>
        <ProseTh>
          Default
        </ProseTh>
        <ProseTh>
          Type
        </ProseTh>
      </ProseTr>
    </ProseThead>

    <ProseTbody>
      <ProseTr
        v-for="(prop, index) in props.data"
        :key="`${prop.name}-${index}`"
      >
        <ProseTd>
          <ProseCode>
            {{ prop.name }}
          </ProseCode>
        </ProseTd>

        <ProseTd>
          <DocsHighlightInlineType
            v-if="prop.default"
            :type="prop.default"
          />

          <i
            v-else
            class="i-radix-icons:divider-horizontal"
          />
        </ProseTd>

        <ProseTd>
          <DocsHighlightInlineType
            v-if="prop.type"
            :type="prop.type"
          />

          <MDC
            v-if="prop.description"
            :value="prop.description"
            class="color-text-toned mt-1"
            :cache-key="`${props.name}-${prop.name}-description`"
          />

          <!-- <ComponentPropsLinks v-if="prop.tags?.length" :prop="prop" />
          <ComponentPropsSchema v-if="prop.schema" :prop="prop" :ignore="ignore" /> -->
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
