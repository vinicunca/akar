<script setup lang="ts">
const items = [
  {
    label: 'Home',
    to: '/',
  },
  {
    slot: 'dropdown' as const,
    icon: 'i-lucide:ellipsis',
    children: [
      {
        label: 'Documentation',
      },
      {
        label: 'Themes',
      },
      {
        label: 'GitHub',
      },
    ],
  },
  {
    label: 'Components',
    disabled: true,
  },
  {
    label: 'Breadcrumb',
    to: '/components/breadcrumb',
  },
];
</script>

<template>
  <BaseNavbar />

  <PBreadcrumb :items="items">
    <template #dropdown="{ item }">
      <PDropdownMenu :items="item.children">
        <PButton
          :icon="item.icon"
          color="neutral"
          variant="link"
          class="p-0.5"
        />
      </PDropdownMenu>
    </template>
  </PBreadcrumb>
</template>
