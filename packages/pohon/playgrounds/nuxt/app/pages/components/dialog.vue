<script setup lang="ts">
import { useOverlay } from '#imports';
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
  ADialogClose,
  ADialogContent,
  ADialogDescription,
  ADialogOverlay,
  ADialogPortal,
  ADialogRoot,
  ADialogTitle,
  ADialogTrigger,
} from 'akar';
import { defineAsyncComponent, ref } from 'vue';

const LazyDialogExample = defineAsyncComponent(() => import('../../components/dialog-example.vue'));

const open = ref(false);
const count = ref(0);
const overlay = useOverlay();

const modal = overlay.create(LazyDialogExample, {
  props: {
    count: count.value,
  },
});

function openModal() {
  count.value++;

  modal.open({ count: count.value });
}

function handleAction() {
  // eslint-disable-next-line no-alert
  alert('clicked action button!');
}
</script>

<template>
  <BaseNavbar />

  <div class="flex flex-col gap-2 min-h-0">
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

    <ADialogRoot>
      <ADialogTrigger
        class="text-sm color-primary font-500 px-2.5 py-1.5 rounded-md inline-flex gap-1.5 ring ring-primary/50 ring-inset shadow-md transition-colors-280 items-center focus:outline-none active:bg-primary/10 hover:bg-primary/10 focus-visible:(ring-2 ring-primary)"
      >
        Open dialog
      </ADialogTrigger>

      <ADialogPortal>
        <ADialogOverlay class="bg-background-elevated/75 inset-0 fixed data-[state=closed]:(animate-out fade-out-0) data-[state=open]:(animate-in fade-in-0)" />
        <ADialogContent
          class="rounded-lg bg-background grid grid-rows-[min-content_1fr_min-content] max-h-[calc(100dvh-2rem)] max-w-lg w-[calc(100vw-2rem)] ring ring-ring shadow-lg left-1/2 top-1/2 fixed overflow-hidden divide-divide divide-y focus:outline-none sm:max-h-[calc(100dvh-4rem)] -translate-x-1/2 -translate-y-1/2 data-[state=closed]:(animate-out fade-out-0 zoom-out-95) data-[state=open]:(animate-in fade-in-0 zoom-in-95)"
        >
          <ADialogTitle class="color-text-highlighted font-semibold p-4 flex gap-1.5 min-h-16 items-center sm:px-6">
            Edit profile
          </ADialogTitle>
          <ADialogDescription class="text-sm color-text-muted mt-1 p-4 flex-1 overflow-y-auto sm:p-6">
            Make changes to your profile here. Click save when you're done.
          </ADialogDescription>

          <div class="p-4 flex gap-1.5 gap-4 items-center justify-end sm:px-6">
            <ADialogClose as-child>
              <button
                class="text-sm color-text font-500 px-2.5 py-1.5 rounded-md bg-background-elevated inline-flex gap-1.5 shadow-md transition-colors-280 items-center focus:outline-none active:bg-background-accented/75 focus-visible:bg-background-accented/75 hover:bg-background-accented/75"
              >
                Save changes
              </button>
            </ADialogClose>
          </div>
          <ADialogClose
            class="text-grass11 hover:bg-green4 focus:shadow-green7 appearance-none rounded-full inline-flex h-[25px] w-[25px] items-center right-[10px] top-[10px] justify-center absolute focus:outline-none focus:shadow-[0_0_0_2px]"
            aria-label="Close"
          >
            <i class="i-lucide:x" />
          </ADialogClose>
        </ADialogContent>
      </ADialogPortal>
    </ADialogRoot>

    <PDialog title="First modal">
      <PButton
        color="neutral"
        variant="outline"
        label="Open with nested"
      />

      <template #footer>
        <PDialog title="Second modal">
          <PButton label="Open second" />
        </PDialog>
      </template>
    </PDialog>

    <PDialog
      v-model:open="open"
      title="Modal with v-model"
      description="This can be useful to control the state of the modal yourself."
    />

    <PButton
      label="Open with v-model"
      color="neutral"
      variant="subtle"
      @click="open = true"
    />

    <PDialog
      title="Modal without overlay"
      description="This modal has `overlay: false` prop."
      :overlay="false"
    >
      <PButton
        label="Open without overlay"
        color="neutral"
        variant="outline"
      />
    </PDialog>

    <PDialog
      title="Modal without modal & overlay"
      description="This modal has `modal: false` and `overlay: false` to interact with outside content."
      :overlay="false"
      :modal="false"
    >
      <PButton
        label="Open without modal"
        color="neutral"
        variant="subtle"
      />
    </PDialog>

    <PDialog
      title="Modal without portal"
      description="This modal has `portal: false` prop."
      :portal="false"
    >
      <PButton
        label="Open without portal"
        color="neutral"
        variant="subtle"
      />
    </PDialog>

    <PDialog
      title="Modal fullscreen"
      description="This modal has `fullscreen: true` prop."
      fullscreen
    >
      <PButton
        label="Open fullscreen"
        color="neutral"
        variant="outline"
      />
    </PDialog>

    <PDialog
      title="Modal prevent close"
      description="This modal has `dismissible: false` prop so it won't close when clicking outside."
      :dismissible="false"
      :modal="false"
      :overlay="false"
    >
      <PButton
        label="Open unclosable"
        color="neutral"
        variant="subtle"
      />
    </PDialog>

    <PDialog
      title="Modal without close button"
      description="This modal has `close: false` prop."
      :close="false"
    >
      <PButton
        label="Open without close button"
        color="neutral"
        variant="outline"
      />
    </PDialog>

    <PDialog
      title="Modal with custom close button"
      description="The `close` prop inherits from the Button props."
      :close="{ color: 'primary', variant: 'solid', size: 'xs' }"
      :pohon="{ close: 'top-3.5 rounded-full' }"
    >
      <PButton
        label="Open with custom close button"
        color="neutral"
        variant="subtle"
      />
    </PDialog>

    <PButton
      label="Open programmatically"
      color="neutral"
      variant="outline"
      @click="openModal"
    />

    <PDialog title="First modal">
      <PButton
        color="neutral"
        variant="outline"
        label="Close with scoped slot close"
      />

      <template #footer="{ close }">
        <PButton
          label="Close with scoped slot close"
          @click="close"
        />
      </template>
    </PDialog>

    <PDialog
      title="Modal scrollable"
      description="This modal has `scrollable: true` prop. Content scrolls within the overlay, preventing accidental closes on scrollbar clicks."
      scrollable
    >
      <PButton
        color="neutral"
        variant="subtle"
        label="Open scrollable"
      />

      <template #body>
        <BasePlaceholder class="h-[300vh] w-full" />
      </template>

      <template #footer>
        <PButton
          label="Submit"
          color="primary"
        />
        <PButton
          label="Cancel"
          color="neutral"
          variant="ghost"
        />
      </template>
    </PDialog>
  </div>
</template>
