<script setup lang="ts">
import theme from '#build/pohon/toaster';
import { computed, ref, useAppConfig, useToast } from '#imports';
import { AToastAction, AToastDescription, AToastProvider, AToastRoot, AToastTitle, AToastViewport } from 'akar';

const positions = Object.keys(theme.variants.position);

const { toasts, add, update, remove } = useToast();
const appConfig = useAppConfig();

const count = ref(1);
const last = computed(() => toasts.value[toasts.value.length - 1]);

function templates(id: number) {
  return [{
    title: 'Toast',
    description: `This is the toast ${id}`,
  }, {
    title: `Toast ${id}`,
  }, {
    description: `This is the toast ${id}`,
  }, {
    title: 'Toast',
    description: `This is the toast ${id}`,
    icon: 'i-lucide:rocket',
    actions: [{
      label: 'Action 1',
      color: 'neutral' as const,
      onClick() {
        console.log(`Toast ${id} action 1 clicked`);
      },
    }, {
      label: 'Action 2',
      color: 'neutral' as const,
      variant: 'outline' as const,
      onClick() {
        console.log(`Toast ${id} action 2 clicked`);
      },
    }],
  }, {
    title: `Toast ${id}`,
    icon: 'i-lucide:rocket',
  }, {
    description: `This is the toast ${id}`,
    icon: 'i-lucide:rocket',
  }, {
    title: 'Toast',
    description: `This is the toast ${id}`,
    avatar: {
      src: 'https://github.com/praburangki.png',
    },
  }, {
    title: 'Toast',
    description: `This is the toast ${id}`,
    avatar: {
      src: 'https://github.com/praburangki.png',
    },
    actions: [{
      label: 'Action',
      onClick() {
        console.log(`Toast ${id} action clicked`);
      },
    }],
  }, {
    title: `Toast ${id}`,
    icon: 'i-lucide:rocket',
    orientation: 'horizontal' as const,
    actions: [{
      label: 'Action 1',
      color: 'neutral' as const,
      onClick() {
        console.log(`Toast ${id} action 1 clicked`);
      },
    }, {
      label: 'Action 2',
      color: 'neutral' as const,
      variant: 'outline' as const,
      onClick() {
        console.log(`Toast ${id} action 2 clicked`);
      },
    }],
  }, {
    description: `This is the toast ${id}`,
    icon: 'i-lucide:rocket',
    orientation: 'horizontal' as const,
    actions: [{
      label: 'Action',
      variant: 'outline' as const,
      onClick() {
        console.log(`Toast ${id} action clicked`);
      },
    }],
  }];
}

function addToast() {
  const id = count.value++;

  const template = templates(id)[Math.floor(Math.random() * templates(id).length)];

  add({
    id,
    ...template,
    onClick(toast) {
      console.log(`Toast ${toast.id} clicked`);
    },
  });
}

function updateToast() {
  if (!last.value) {
    return;
  }

  update(last.value.id, {
    title: 'Toast updated',
    description: `This is the updated toast ${count.value++}`,
  });
}

function removeToast() {
  if (!last.value) {
    return;
  }

  remove(last.value.id);
}

const open = ref(false);
const eventDateRef = ref(new Date());
const timerRef = ref(0);

function oneWeekAway() {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}

function handleClick() {
  open.value = false;
  window.clearTimeout(timerRef.value);
  timerRef.value = window.setTimeout(() => {
    eventDateRef.value = oneWeekAway();
    open.value = true;
  }, 100);
}
</script>

<template>
  <BaseNavbar>
    <PSwitch
      v-model="appConfig.toaster.disableSwipe"
      label="Disable swipe"
    />
    <PCheckbox
      v-model="appConfig.toaster.expand"
      label="Expand"
    />
    <PSelect
      v-model="appConfig.toaster.position"
      :items="positions"
      placeholder="Position"
    />
    <PInput
      v-model="appConfig.toaster.duration"
      label="Duration"
      type="number"
    />
    <PInput
      v-model="appConfig.toaster.max"
      label="Max"
      type="number"
    />
  </BaseNavbar>

  <AToastProvider>
    <button
      class="text-sm color-text font-500 px-2.5 py-1.5 rounded-md bg-background inline-flex gap-1.5 ring ring-ring-accented ring-inset transition-colors-280 items-center focus:outline-none active:bg-background-elevated hover:bg-background-elevated focus-visible:(ring-2 ring-ring-inverted)"
      @click="handleClick"
    >
      Add to calendar
    </button>

    <AToastRoot
      v-model:open="open"
      class="p-[15px] border rounded-lg bg-background gap-x-[15px] grid grid-cols-[auto_max-content] shadow-sm [grid-template-areas:_'title_action'_'description_action'] items-center data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)] data-[state=open]:(animate-in animate-duration-280 slide-in-from-bottom)"
    >
      <AToastTitle class="text-slate12 text-sm font-medium mb-[5px] [grid-area:_title]">
        Scheduled: Catch up
      </AToastTitle>
      <AToastDescription as-child>
        <time
          class="text-slate11 text-xs leading-[1.3] m-0 [grid-area:_description]"
          :dateTime="eventDateRef.toISOString()"
        >
          {{ prettyDate(eventDateRef) }}
        </time>
      </AToastDescription>
      <AToastAction
        class="[grid-area:_action]"
        as-child
        alt-text="Goto schedule to undo"
      >
        <button class="bg-green2 text-green11 shadow-green7 hover:shadow-green8 focus:shadow-green8 text-xs leading-[25px] font-medium px-[10px] rounded-md inline-flex h-[25px] shadow-[inset_0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px] hover:shadow-[inset_0_0_0_1px]">
          Undo
        </button>
      </AToastAction>
    </AToastRoot>
    <AToastViewport class="m-0 p-[var(--viewport-padding)] outline-none list-none flex flex-col gap-[10px] max-w-[100vw] w-[390px] [--viewport-padding:_25px] bottom-0 right-0 fixed z-[2147483647]" />
  </AToastProvider>

  <div class="flex gap-2 items-center">
    <PButton
      label="Add new"
      color="neutral"
      variant="outline"
      @click="addToast"
    />
    <PButton
      label="Update last"
      color="neutral"
      variant="outline"
      @click="updateToast"
    />
    <PButton
      label="Remove last"
      color="neutral"
      variant="outline"
      @click="removeToast"
    />
  </div>
</template>
