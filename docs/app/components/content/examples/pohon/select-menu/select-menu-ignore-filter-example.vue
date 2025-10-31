<script setup lang="ts">
import type { PAvatarProps } from 'pohon-ui';
import { useFetch } from '#app';
import { refDebounced } from '@vueuse/core';
import { ref } from 'vue';

const searchTerm = ref('');
const searchTermDebounced = refDebounced(searchTerm, 200);

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  params: { q: searchTermDebounced },
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
    v-model:search-term="searchTerm"
    :items="users"
    :loading="status === 'pending'"
    ignore-filter
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
