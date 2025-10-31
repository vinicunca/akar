<script lang="ts" setup>
import type { PTimelineItem } from 'pohon-ui';
import { useTimeAgo } from '@vueuse/core';

const items = [{
  username: 'J-Michalek',
  date: '2025-05-24T14:58:55Z',
  action: 'opened this',
  avatar: {
    src: 'https://github.com/J-Michalek.png',
  },
}, {
  username: 'J-Michalek',
  date: '2025-05-26T19:30:14+02:00',
  action: 'marked this pull request as ready for review',
  icon: 'i-lucide-check-circle',
}, {
  username: 'praburangki',
  date: '2025-05-27T11:01:20Z',
  action: 'commented on this',
  description: 'I\'ve made a few changes, let me know what you think! Basically I updated the design, removed unnecessary divs, used Avatar component for the indicator since it supports icon already.',
  avatar: {
    src: 'https://github.com/praburangki.png',
  },
}, {
  username: 'J-Michalek',
  date: '2025-05-27T11:01:20Z',
  action: 'commented on this',
  description: 'Looks great! Good job on cleaning it up.',
  avatar: {
    src: 'https://github.com/J-Michalek.png',
  },
}, {
  username: 'praburangki',
  date: '2025-05-27T11:01:20Z',
  action: 'merged this',
  icon: 'i-lucide-git-merge',
}] satisfies Array<PTimelineItem>;
</script>

<template>
  <PTimeline
    :items="items"
    size="xs"
    :pohon="{
      date: 'float-end ms-1',
      description: 'px-3 py-2 ring ring-default mt-2 rounded-md text-default',
    }"
    class="w-96"
  >
    <template #title="{ item }">
      <span>{{ item.username }}</span>
      <span class="color-text-muted font-normal">&nbsp;{{ item.action }}</span>
    </template>

    <template #date="{ item }">
      {{ useTimeAgo(new Date(item.date)) }}
    </template>
  </PTimeline>
</template>
