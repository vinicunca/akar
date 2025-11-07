<script setup lang="ts">
import { useLazyFetch } from '#app';

const { data: countries, status, execute } = await useLazyFetch<Array<{
  name: string;
  code: string;
  emoji: string;
}>>('/api/countries.json', {
  immediate: false,
});

function onOpen() {
  if (!countries.value?.length) {
    execute();
  }
}
</script>

<template>
  <PSelectMenu
    :items="countries"
    :loading="status === 'pending'"
    label-key="name"
    :search-input="{ icon: 'i-lucide:search' }"
    placeholder="Select country"
    class="w-48"
    @update:open="onOpen"
  >
    <template #leading="{ modelValue, pohon }">
      <span
        v-if="modelValue"
        class="text-center size-5"
      >
        {{ modelValue?.emoji }}
      </span>
      <PIcon
        v-else
        name="i-lucide:earth"
        :class="pohon.leadingIcon()"
      />
    </template>
    <template #item-leading="{ item }">
      <span class="text-center size-5">
        {{ item.emoji }}
      </span>
    </template>
  </PSelectMenu>
</template>
