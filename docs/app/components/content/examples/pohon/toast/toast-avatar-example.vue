<script setup lang="ts">
import type { PAvatarProps } from 'pohon-ui';
import { useToast } from '#imports';

const props = defineProps<{
  avatar: PAvatarProps;
}>();

const toast = useToast();

function showToast() {
  toast.add({
    title: 'User invited',
    description: 'praburangki was invited to the team.',
    avatar: props.avatar,
  });
}
</script>

<template>
  <PButton
    label="Invite user"
    color="neutral"
    variant="outline"
    @click="showToast"
  />
</template>
