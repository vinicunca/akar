<script setup lang="ts">
import type { PTabsItem } from 'pohon-ui';
import { useRoute, useRouter } from '#app';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const items: Array<PTabsItem> = [
  {
    label: 'Account',
    value: 'account',
  },
  {
    label: 'Password',
    value: 'password',
  },
];

const active = computed({
  get() {
    return (route.query.tab as string) || 'account';
  },
  set(tab) {
    // Hash is specified here to prevent the page from scrolling to the top
    router.push({
      path: '/docs/components/tabs',
      query: { tab },
      hash: '#control-active-item',
    });
  },
});
</script>

<template>
  <PTabs
    v-model="active"
    :content="false"
    :items="items"
    class="w-full"
  />
</template>
