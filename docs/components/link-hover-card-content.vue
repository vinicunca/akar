<script setup lang="ts">
import { computed } from 'vue';

interface PropsTableProps {
  title: string;
  data: string;
}
const props = defineProps<PropsTableProps>();

const data = computed(() => JSON.parse(props.data));
</script>

<template>
  <ul class="m-0 p-0 list-none relative [&>li:not(:last-child)]:mb-2 [&>li:not(:last-child)]:border-b">
    <h5
      class="text-xs font-bold font-mono px-3 py-2 border-y border-muted-foreground/30 bg-card w-full capitalize top-0 sticky"
    >
      {{ title }}
    </h5>
    <li
      v-for="(prop, index) in data"
      :key="`${prop.name}-${index}`"
      class="px-3 border-muted"
    >
      <div class="inline-flex flex-wrap gap-2 items-center">
        <div class="color-primary text-xs font-bold font-mono">
          {{ prop.name }}
        </div>
        <code class="text-xs text-foreground px-2 py-0.5 bg-muted">
          {{ prop.typeSimple ? prop.typeSimple : prop.type }}
        </code>
        <code
          v-if="prop.default"
          class="text-xs text-foreground px-2 py-0.5 bg-muted"
        >
          default: {{ prop.default }}
        </code>
        <code
          v-if="prop.required"
          class="text-xs text-red-500 px-2 py-0.5 bg-muted"
        >
          {{ prop.required ? "required" : null }}
        </code>
      </div>

      <p
        class="text-sm text-muted-foreground my-0"
        v-html="prop.description"
      />
    </li>
  </ul>
</template>
