<script setup lang="ts">
import type { DropdownMenuItem } from 'pohon-ui'

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})

const items: DropdownMenuItem[] = [
  {
    label: 'Profile',
    icon: 'i-lucide-user'
  }, {
    label: 'Billing',
    icon: 'i-lucide-credit-card'
  }, {
    label: 'Settings',
    icon: 'i-lucide-cog'
  }
]
</script>

<template>
  <UDropdownMenu v-model:open="open" :items="items" :pohon="{ content: 'w-48' }">
    <UButton label="Open" color="neutral" variant="outline" icon="i-lucide-menu" />
  </UDropdownMenu>
</template>
