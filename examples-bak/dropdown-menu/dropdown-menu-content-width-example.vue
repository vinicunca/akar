<script setup lang="ts">
import type { DropdownMenuItem } from 'pohon-ui'

const items: DropdownMenuItem[][] = [
  [
    {
      label: 'View',
      icon: 'i-lucide-eye'
    },
    {
      label: 'Copy',
      icon: 'i-lucide-copy'
    },
    {
      label: 'Edit',
      icon: 'i-lucide-pencil'
    }
  ],
  [
    {
      label: 'Delete',
      color: 'error',
      icon: 'i-lucide-trash'
    }
  ]
]
</script>

<template>
  <UDropdownMenu :items="items" :pohon="{ content: 'w-(--akar-dropdown-menu-trigger-width)' }">
    <UButton
      label="Open"
      class="w-46"
      color="neutral"
      variant="outline"
      block
      trailing-icon="i-lucide-chevron-down"
    />
  </UDropdownMenu>
</template>
