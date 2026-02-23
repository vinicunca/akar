<script setup lang="ts">
import { ASeparator } from 'akar';
</script>

<template>
  <BaseNavbar />

  <div class="mx-4 max-w-[300px] w-full">
    <div class="text-sm leading-5 font-semibold">
      Akar
    </div>
    <div class="text-sm leading-5 dark:text-white">
      An open-source UI component library.
    </div>
    <ASeparator
      class="my-4 border border-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
    />
    <div class="flex h-5 items-center">
      <div class="text-sm leading-5 dark:text-white">
        Blog
      </div>
      <ASeparator
        class="mx-4 border border-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
        decorative
        orientation="vertical"
      />
      <div class="text-sm leading-5 dark:text-white">
        Docs
      </div>
      <ASeparator
        class="mx-4 border border-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
        decorative
        orientation="vertical"
      />
      <div class="text-sm leading-5 dark:text-white">
        Source
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-4 min-h-0">
    <div>
      <p class="text-highlighted font-semibold">
        Pohon UI
      </p>
      <p>An open-source UI component library.</p>
    </div>

    <PSeparator
      icon="i-simple-icons:nuxtdotjs"
      type="dashed"
    />

    <div class="flex gap-4 h-24 items-center">
      <div class="text-center flex-1">
        Blog
      </div>

      <PSeparator
        :avatar="{ src: 'https://github.com/praburangki.png' }"
        decorative
        orientation="vertical"
      />

      <div class="text-center flex-1">
        Docs
      </div>

      <PSeparator
        decorative
        orientation="vertical"
      >
        <PAvatar
          size="2xs"
          src="https://github.com/sandros94.png"
        />
      </PSeparator>

      <div class="text-center flex-1">
        Source
      </div>
    </div>

    <PSeparator
      label="As simple as it gets"
      type="dotted"
      size="lg"
      color="primary"
    />
  </div>
</template>
