<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const statuses = ['online', 'away', 'busy', 'offline'];
const status = ref(statuses[0]);

const color = computed(() => status.value ? { online: 'success', away: 'warning', busy: 'error', offline: 'neutral' }[status.value] as any : 'online');

const show = computed(() => status.value !== 'offline');

// Note: This is for demonstration purposes only. Don't do this at home.
onMounted(() => {
  setInterval(() => {
    if (status.value) {
      status.value = statuses[(statuses.indexOf(status.value) + 1) % statuses.length];
    }
  }, 1000);
});
</script>

<template>
  <PChip
    :color="color"
    :show="show"
    inset
  >
    <PAvatar src="https://github.com/praburangki.png" />
  </PChip>
</template>
