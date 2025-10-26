<template>
  <UDrawer :pohon="{ content: 'h-full', overlay: 'bg-inverted/30' }">
    <PButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up" />

    <template #footer>
      <UDrawer nested :pohon="{ content: 'h-full', overlay: 'bg-inverted/30' }">
        <PButton color="neutral" variant="outline" label="Open nested" />

        <template #content>
          <CorePlaceholder class="flex-1 m-4" />
        </template>
      </UDrawer>
    </template>
  </UDrawer>
</template>
