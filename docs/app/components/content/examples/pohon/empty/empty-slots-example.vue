<script setup lang="ts">
import type { UserProps } from 'pohon-ui';

const members: Array<UserProps> = [
  {
    name: 'Daniel Roe',
    description: 'danielroe',
    to: 'https://github.com/danielroe',
    target: '_blank',
    avatar: {
      src: 'https://github.com/danielroe.png',
      alt: 'danielroe',
    },
  },
  {
    name: 'Pooya Parsa',
    description: 'pi0',
    to: 'https://github.com/pi0',
    target: '_blank',
    avatar: {
      src: 'https://github.com/pi0.png',
      alt: 'pi0',
    },
  },
  {
    name: 'Sébastien Chopin',
    description: 'atinux',
    to: 'https://github.com/atinux',
    target: '_blank',
    avatar: {
      src: 'https://github.com/atinux.png',
      alt: 'atinux',
    },
  },
  {
    name: 'praburangki',
    description: 'praburangki',
    to: 'https://github.com/praburangki',
    target: '_blank',
    avatar: {
      src: 'https://github.com/praburangki.png',
      alt: 'praburangki',
    },
  },
];
</script>

<template>
  <PEmpty
    title="No team members"
    description="Invite your team to collaborate on this project."
    variant="naked"
    :actions="[{
      label: 'Invite members',
      icon: 'i-lucide-user-plus',
      color: 'neutral',
    }]"
  >
    <template #leading>
      <PAvatarGroup size="xl">
        <PAvatar
          src="https://github.com/nuxt.png"
          alt="Nuxt"
        />
        <PAvatar
          src="https://github.com/unjs.png"
          alt="Unjs"
        />
      </PAvatarGroup>
    </template>

    <template #footer>
      <PSeparator class="my-4" />

      <div class="gap-4 grid grid-cols-2">
        <UPageCard
          v-for="(member, index) in members"
          :key="index"
          :to="member.to"
          :pohon="{ container: 'sm:p-4' }"
        >
          <UUser
            :avatar="member.avatar"
            :name="member.name"
            :description="member.description"
            :pohon="{ name: 'truncate' }"
          />
        </UPageCard>
      </div>
    </template>
  </PEmpty>
</template>
