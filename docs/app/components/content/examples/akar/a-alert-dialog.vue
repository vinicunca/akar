<script setup lang="ts">
import {
  AAlertDialogAction,
  AAlertDialogCancel,
  AAlertDialogContent,
  AAlertDialogDescription,
  AAlertDialogOverlay,
  AAlertDialogPortal,
  AAlertDialogRoot,
  AAlertDialogTitle,
  AAlertDialogTrigger,
} from 'akar';

function handleAction() {
  // eslint-disable-next-line no-alert
  alert('clicked action button!');
}
</script>

<template>
  <AAlertDialogRoot>
    <AAlertDialogTrigger
      class="text-sm color-primary font-500 px-2.5 py-1.5 rounded-md inline-flex gap-1.5 ring ring-primary/50 ring-inset shadow-md transition-colors-280 items-center focus:outline-none active:bg-primary/10 hover:bg-primary/10 focus-visible:(ring-2 ring-primary)"
    >
      Delete account
    </AAlertDialogTrigger>
    <AAlertDialogPortal>
      <AAlertDialogOverlay class="bg-background-elevated/75 inset-0 fixed data-[state=closed]:(animate-out fade-out-0) data-[state=open]:(animate-in fade-in-0)" />
      <AAlertDialogContent
        class="rounded-lg bg-background grid grid-rows-[min-content_1fr_min-content] max-h-[calc(100dvh-2rem)] max-w-lg w-[calc(100vw-2rem)] ring ring-ring shadow-lg left-1/2 top-1/2 fixed overflow-hidden divide-divide divide-y focus:outline-none sm:max-h-[calc(100dvh-4rem)] -translate-x-1/2 -translate-y-1/2 data-[state=closed]:(animate-out fade-out-0 zoom-out-95) data-[state=open]:(animate-in fade-in-0 zoom-in-95)"
      >
        <AAlertDialogTitle class="color-text-highlighted font-semibold p-4 flex gap-1.5 min-h-16 items-center sm:px-6">
          Are you absolutely sure?
        </AAlertDialogTitle>
        <AAlertDialogDescription class="text-sm color-text-muted mt-1 p-4 flex-1 overflow-y-auto sm:p-6">
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </AAlertDialogDescription>
        <div class="p-4 flex gap-1.5 gap-4 items-center justify-end sm:px-6">
          <AAlertDialogCancel
            class="text-sm color-text font-500 px-2.5 py-1.5 rounded-md bg-background-elevated inline-flex gap-1.5 shadow-md transition-colors-280 items-center focus:outline-none active:bg-background-accented/75 focus-visible:bg-background-accented/75 hover:bg-background-accented/75"
          >
            Cancel
          </AAlertDialogCancel>
          <AAlertDialogAction
            class="text-sm color-text-inverted font-500 px-2.5 py-1.5 rounded-md bg-error inline-flex gap-1.5 shadow-md transition-colors-280 items-center focus-visible:outline-2 focus-visible:outline-error focus-visible:outline-offset-2 active:bg-error/75 hover:bg-error/75"
            @click="handleAction"
          >
            Yes, delete account
          </AAlertDialogAction>
        </div>
      </AAlertDialogContent>
    </AAlertDialogPortal>
  </AAlertDialogRoot>
</template>
