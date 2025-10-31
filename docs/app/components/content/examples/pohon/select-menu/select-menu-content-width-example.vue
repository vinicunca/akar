<script setup lang="ts">
import { useFetch } from '#app';

const { data: users } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'typicode-users-email',
  transform: (data: Array<{ id: number; name: string; email: string }>) => {
    return data?.map((user) => ({
      label: user.name,
      email: user.email,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` },
    }));
  },
  lazy: true,
});
</script>

<template>
  <PSelectMenu
    :items="users"
    icon="i-lucide-user"
    placeholder="Select user"
    :pohon="{ content: 'min-w-fit' }"
    class="w-48"
  >
    <template #item-label="{ item }">
      {{ item.label }}

      <span class="color-text-muted">
        {{ item.email }}
      </span>
    </template>
  </PSelectMenu>
</template>
