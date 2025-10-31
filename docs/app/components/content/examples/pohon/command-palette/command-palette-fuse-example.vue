<script setup lang="ts">
import { useFetch } from '#app';

const { data: users } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'command-palette-users',
  transform: (data: Array<{ id: number; name: string; email: string }>) => {
    return data?.map((user) => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || [];
  },
  lazy: true,
});
</script>

<template>
  <PCommandPalette
    :groups="[{ id: 'users', items: users || [] }]"
    :fuse="{ fuseOptions: { includeMatches: true } }"
    class="flex-1 h-80"
  />
</template>
