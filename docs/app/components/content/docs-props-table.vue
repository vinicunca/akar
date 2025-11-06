<script lang="ts" setup>
import type { ComponentMeta } from 'vue-component-meta';
import { computed, useComponentName } from '#imports';
import DocsPropsLinks from './docs-props-links.vue';

const props = withDefaults(
  defineProps<{
    ignore?: Array<string>;
    metaProps: ComponentMeta['props'];
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
      'enterKeyHint',
      'form',
      'formaction',
      'formenctype',
      'formmethod',
      'formnovalidate',
      'formtarget',
    ],
  },
);

const { slug, parentSlug } = useComponentName(props);

const propsKey = computed(() => `props-${parentSlug}-${slug}`);
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
        v-for="(prop, index) in props.metaProps"
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

          <DocsPropsLinks
            v-if="prop.tags?.length"
            :prop="prop"
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
