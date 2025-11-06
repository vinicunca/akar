<script setup lang="ts">
import type { PUserProps } from 'pohon-ui';

const members: Array<PUserProps> = [
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
        <div
          v-for="(member, index) in members"
          :key="index"
          class="rounded-lg bg-background flex ring ring-ring transition relative hover:bg-background-elevated/50 has-focus-visible:(ring-2 ring-primary)"
        >
          <div class="p-4 flex flex-1 flex-col gap-x-8 gap-y-4 relative sm:p-4 lg:grid">
            <PUser
              :avatar="member.avatar"
              :name="member.name"
              :description="member.description"
              :pohon="{ name: 'truncate' }"
            />
          </div>

          <a
            :href="member.to"
            rel="noopener"
            aria-label="Card link"
            class="peer focus:outline-none"
            :target="member.target"
          ><span
            class="inset-0 absolute"
            aria-hidden="true"
          /></a>
        </div>
      </div>
    </template>
  </PEmpty>
</template>
