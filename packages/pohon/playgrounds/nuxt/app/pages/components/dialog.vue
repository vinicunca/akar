<script setup lang="ts">
import { useOverlay } from '#imports';
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
</script>

<template>
  <BaseNavbar />

  <div class="flex flex-col gap-2 min-h-0">
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
      title="Modal without transition"
      description="This modal has `transition: false` prop."
      :transition="false"
    >
      <PButton
        label="Open without transition"
        color="neutral"
        variant="outline"
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
  </div>
</template>
