<script lang="ts" setup>
import { fetchComponentMeta, useRoute } from '#imports';
import { toCamelCase, toSentenceCase } from '@vinicunca/perkakas';

const props = withDefaults(
  defineProps<{
    prose?: boolean;
  }>(),
  {},
);

const route = useRoute();

const camelName = toCamelCase(route.path.split('/').pop() ?? '');
const upperName = toSentenceCase(camelName);
const componentName = props.prose ? `Prose${upperName}` : `P${upperName}`;

// const meta = await fetchComponentMeta(componentName);
const meta = await fetchComponentMeta('AAccordionRoot');
const meta2 = await fetchComponentMeta('PAccordion');
console.log('🚀 ~ meta:', meta);
console.log('🚀 ~ meta2:', meta2);
</script>

<template>
  <div>
    doc component props

    {{ componentName }}
  </div>
</template>
