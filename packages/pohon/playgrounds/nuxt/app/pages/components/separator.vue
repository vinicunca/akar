<template>
  <BaseNavbar />

  <div class="flex flex-col gap-4 min-h-0">
    <div>
      <p class="text-highlighted font-semibold">
        Nuxt UI
      </p>
      <p>An open-source UI component library.</p>
    </div>

    <PSeparator
      icon="i-simple-icons-nuxtdotjs"
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
