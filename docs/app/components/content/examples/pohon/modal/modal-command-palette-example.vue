<script setup lang="ts">
import { useFetch } from '#app';
import { computed, ref } from 'vue';

const searchTerm = ref('');

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'command-palette-users',
  params: { q: searchTerm },
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
  <PDialog>
    <PButton
      label="Search users..."
      color="neutral"
      variant="subtle"
      icon="i-lucide-search"
    />

    <template #content>
      <PCommandPalette
        v-model:search-term="searchTerm"
        :loading="status === 'pending'"
        :groups="groups"
        placeholder="Search users..."
        class="h-80"
      />
    </template>
  </PDialog>
</template>
