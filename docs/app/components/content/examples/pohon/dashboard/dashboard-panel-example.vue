<template>
  <PDashboardPanel resizable>
    <template #header>
      <PDashboardNavbar title="Inbox">
        <template #leading>
          <PDashboardSidebarCollapse />
        </template>
      </PDashboardNavbar>
    </template>

    <template #body>
      <CorePlaceholder class="h-full" />
    </template>
  </PDashboardPanel>
</template>
