<script lang="ts" setup>
import type { ComponentMeta } from 'vue-component-meta';
import { computed, fetchComponentMeta, useComponentName } from '#imports';

const props = withDefaults(
  defineProps<{
    slug?: string;
    ignore?: Array<string>;
    prose?: boolean;
  }>(),
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

const { componentName, slug } = useComponentName(props);

const propsKey = computed(() => `props-pohon-${slug}`);

const metadata = await fetchComponentMeta(componentName);

const metaProps = computed<ComponentMeta['props']>(() => {
  if (!metadata.meta?.props?.length) {
    return [];
  }

  return metadata.meta.props
    .filter((prop) => {
      return !props.ignore?.includes(prop.name);
    })
    .map((prop) => {
      if (prop.default) {
        prop.default = prop.default.replace(' as never', '').replace(/^"(.*)"$/, '\'$1\'');
      }

      // @ts-expect-error - Type is not correct
      prop.type = !prop.type.startsWith('boolean') && prop.schema?.kind === 'enum' && Object.keys(prop.schema.schema)?.length
      // @ts-expect-error - Type is not correct
        ? Object.values(prop.schema.schema).map((schema) => schema?.type ? schema.type : schema).join(' | ')
        : prop.type;

      return prop;
    })
    .sort((a, b) => {
      if (a.name === 'as') {
        return -1;
      }

      if (b.name === 'as') {
        return 1;
      }

      if (a.name === 'pohon') {
        return 1;
      }

      if (b.name === 'pohon') {
        return -1;
      }

      return 0;
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
        v-for="(prop, index) in metaProps"
        :key="`${prop.name}-${index}`"
      >
        <ProseTd>
          <ProseCode class="akar:(color-$akar-primary bg-$akar-primary/10)">
            {{ prop.name }}{{ prop.required ? '*' : '' }}
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
            :cache-key="`${propsKey}-${prop.name}-description`"
          />

          <DocsPropsSchema
            v-if="prop.schema"
            :name="propsKey"
            :prop="prop"
            :ignore="props.ignore"
          />
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>
