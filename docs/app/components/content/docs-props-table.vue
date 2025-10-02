<script lang="ts" setup>
import type { ComponentMeta } from 'vue-component-meta';
import { DocsHighlightInlineType, DocsPropsSchema } from '#components';
import { computed } from 'vue';

interface PropsTableProps {
  ignore?: Array<string>;
  data: ComponentMeta['props'];
  name: string;
}

const props = withDefaults(
  defineProps<PropsTableProps>(),
  {
    ignore: () => [
      'activeClass',
      'inactiveClass',
      'exactActiveClass',
      'ariaCurrentValue',
      'href',
      'rel',
      'noRel',
      'prefetch',
      'prefetchOn',
      'noPrefetch',
      'prefetchedClass',
      'replace',
      'exact',
      'exactQuery',
      'exactHash',
      'external',
      'onClick',
      'viewTransition',
    ],
  },
);

const propsData = computed(() => {
  return props.data.map((prop) => {
    // @ts-expect-error - Type is not correct
    prop.type = !prop.type.startsWith('boolean') && prop.schema?.kind === 'enum' && Object.keys(prop.schema.schema)?.length
    // @ts-expect-error - Type is not correct
      ? Object.values(prop.schema.schema).map((schema) => schema?.type ? schema.type : schema).join(' | ')
      : prop.type;

    return prop;
  });
});
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
        v-for="(prop, index) in propsData"
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

          <DocsPropsSchema
            v-if="prop.schema"
            :name="props.name"
            :prop="prop"
            :ignore="props.ignore"
          />

          <!-- <ComponentPropsLinks v-if="prop.tags?.length" :prop="prop" />
          <ComponentPropsSchema v-if="prop.schema" :prop="prop" :ignore="ignore" /> -->
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
