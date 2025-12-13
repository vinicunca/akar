<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useAccessStore } from '~~/layers/dashboard/app/stores/access.store';

const props = defineProps<{
  collapsed?: boolean;
}>();

const accessStore = useAccessStore();

const activeNav = ref<Array<string>>([]);

const modelNav = computed({
  get: () => {
    return activeNav.value;
  },
  set: (value: Array<string>) => {
    activeNav.value = value;
  },
});
</script>

<template>
  {{ activeNav }}

  <PNavigationMenu
    v-model="modelNav"
    :collapsed="props.collapsed"
    :items="accessStore.accessMenus"
    orientation="vertical"
  />
</template>
