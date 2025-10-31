<script setup lang="ts">
import type { PAvatarProps } from 'pohon-ui';
import { useFetch } from '#app';

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'typicode-users',
  transform: (data: Array<{ id: number; name: string }>) => {
    return data?.map((user) => ({
      label: user.name,
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
    :loading="status === 'pending'"
    icon="i-lucide-user"
    placeholder="Select user"
    class="w-48"
  >
    <template #leading="{ modelValue, pohon }">
      <PAvatar
        v-if="modelValue"
        v-bind="modelValue.avatar"
        :size="(pohon.leadingAvatarSize() as PAvatarProps['size'])"
        :class="pohon.leadingAvatar()"
      />
    </template>
  </PSelectMenu>
</template>
