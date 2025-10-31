<script setup lang="ts">
import { useFetch } from '#app';
import { refDebounced } from '@vueuse/core';
import { computed, ref } from 'vue';

const searchTerm = ref('');
const searchTermDebounced = refDebounced(searchTerm, 200);

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  params: { q: searchTermDebounced },
  transform: (data: Array<{ id: number; name: string; email: string }>) => {
    return data?.map((user) => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || [];
  },
  lazy: true,
});

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value || [],
  ignoreFilter: true,
}]);
</script>

<template>
  <PCommandPalette
    v-model:search-term="searchTerm"
    :loading="status === 'pending'"
    :groups="groups"
    class="flex-1 h-80"
  />
</template>
