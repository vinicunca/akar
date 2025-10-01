<script lang="ts" setup>
import { useRoute } from '#app';
import { ContentRenderer, DocsHighlightInlineType } from '#components';
import { toKebabCase } from '@vinicunca/perkakas';

type PropDef = {
  name?: string;
  required?: boolean;
  default?: string;
  type: string;
  typeSimple: string;
  description?: string;
};

interface PropsTableProps {
  data: Array<PropDef>;
}

const props = defineProps<PropsTableProps>();

const route = useRoute();
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
            :cache-key="`${toKebabCase(route.path)}-${prop.name}-description`"
          />

          <!-- <ComponentPropsLinks v-if="prop.tags?.length" :prop="prop" />
          <ComponentPropsSchema v-if="prop.schema" :prop="prop" :ignore="ignore" /> -->
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
