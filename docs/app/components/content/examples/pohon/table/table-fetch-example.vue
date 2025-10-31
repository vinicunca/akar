<script setup lang="ts">
import type { PTableColumn } from 'pohon-ui';
import { useFetch } from '#app';
import { h, resolveComponent } from 'vue';

const PAvatar = resolveComponent('PAvatar');

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: { src: string };
  company: { name: string };
};

const { data, status } = await useFetch<Array<User>>('https://jsonplaceholder.typicode.com/users', {
  key: 'table-users',
  transform: (data) => {
    return data?.map((user) => ({
      ...user,
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}`, alt: `${user.name} avatar` },
    })) || [];
  },
  lazy: true,
});

const columns: Array<PTableColumn<User>> = [{
  accessorKey: 'id',
  header: 'ID',
}, {
  accessorKey: 'name',
  header: 'Name',
  cell: ({ row }) => {
    return h('div', { class: 'flex items-center gap-3' }, [
      h(PAvatar, {
        ...row.original.avatar,
        size: 'lg',
      }),
      h('div', undefined, [
        h('p', { class: 'font-medium text-highlighted' }, row.original.name),
        h('p', { class: '' }, `@${row.original.username}`),
      ]),
    ]);
  },
}, {
  accessorKey: 'email',
  header: 'Email',
}, {
  accessorKey: 'company',
  header: 'Company',
  cell: ({ row }) => row.original.company.name,
}];
</script>

<template>
  <PTable
    :data="data"
    :columns="columns"
    :loading="status === 'pending'"
    class="flex-1 h-80"
  />
</template>
