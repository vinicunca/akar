<script lang="ts" setup>
import type { ComponentMeta } from 'vue-component-meta';
import * as theme from '#build/pohon';
import { computed, fetchComponentMeta, useComponentName } from '#imports';
import { isString, toCamelCase } from '@vinicunca/perkakas';

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

const camelName = toCamelCase(slug);
const componentTheme = ((props.prose ? theme.prose : theme) as any)[camelName];

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
      } else {
        const tag = prop.tags?.find((tag) => tag.name === 'defaultValue')?.text;
        if (tag) {
          prop.default = tag;
        } else if (componentTheme?.defaultVariants?.[prop.name]) {
          prop.default = isString(componentTheme?.defaultVariants?.[prop.name])
            ? `'${componentTheme?.defaultVariants?.[prop.name]}'`
            : componentTheme?.defaultVariants?.[prop.name];
        }
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
  <DocsPropsTable :meta-props="metaProps" />
</template>
