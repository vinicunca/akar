<script setup lang="ts">
import { PTabs } from '#components';
import { onMounted, ref, useFrameworks, watch } from '#imports';

const { framework, frameworks } = useFrameworks();

const tabValue = ref<string | undefined>(undefined);

onMounted(() => {
  tabValue.value = framework.value;
});

watch(framework, () => {
  tabValue.value = framework.value;
});
</script>

<template>
  <PTabs
    v-model="tabValue"
    :items="frameworks"
    :content="false"
    color="neutral"
    :pohon="{
      indicator: 'akar:bg-background',
      trigger: 'px-1 akar:data-[state=active]:color-text-highlighted w-full',
    }"
    size="xs"
    @update:model-value="(framework = $event as string)"
  />
</template>
