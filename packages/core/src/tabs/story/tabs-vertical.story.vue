<script setup lang="ts">
import { ATabsContent, ATabsIndicator, ATabsList, ATabsRoot, ATabsTrigger } from '..';
</script>

<template>
  <Story
    title="Tabs/Vertical"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ATabsRoot
        class="h-[400px] flex shadow-[0_2px_10px] shadow-blackA4"
        default-value="tab1"
        orientation="vertical"
      >
        <ATabsList
          class="relative flex shrink-0 flex-col border-b border-mauve6"
          aria-label="Manage your account"
        >
          <ATabsIndicator class="absolute right-0 top-0 h-[--akar-tabs-indicator-size] w-[2px] translate-y-[--akar-tabs-indicator-position] rounded-full bg-violet11 transition-[width,transform] duration-300" />
          <ATabsTrigger
            style="writing-mode:vertical-rl;"
            class="w-[45px] flex flex-1 cursor-default select-none items-center justify-center rounded-tl-md bg-white px-5 text-[15px] text-mauve11 leading-none outline-none data-[state=active]:text-violet11 hover:text-violet11 focus-visible:shadow-[0_0_0_2px]"
            value="tab1"
          >
            Account
          </ATabsTrigger>
          <ATabsTrigger
            style="writing-mode:vertical-rl;"
            class="w-[45px] flex flex-1 cursor-default select-none items-center justify-center rounded-bl-md bg-white px-5 text-[15px] text-mauve11 leading-none outline-none data-[state=active]:text-violet11 hover:text-violet11 focus-visible:shadow-[0_0_0_2px]"
            value="tab2"
          >
            Password
          </ATabsTrigger>
        </ATabsList>
        <ATabsContent
          class="grow rounded-r-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          value="tab1"
        >
          <p class="mb-5 text-[15px] text-mauve11 leading-normal">
            Make changes to your account here. Click save when you're done.
          </p>
          <fieldset class="mb-[15px] w-full flex flex-col justify-start">
            <label
              class="mb-2.5 block text-[13px] text-violet12 leading-none"
              for="name"
            >
              Name
            </label>
            <input
              id="name"
              class="h-[35px] shrink-0 grow rounded px-2.5 text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              value="Pedro Duarte"
            >
          </fieldset>
          <fieldset class="mb-[15px] w-full flex flex-col justify-start">
            <label
              class="mb-2.5 block text-[13px] text-violet12 leading-none"
              for="username"
            >
              Username
            </label>
            <input
              id="username"
              class="h-[35px] shrink-0 grow rounded px-2.5 text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              value="@peduarte"
            >
          </fieldset>
          <div class="mt-5 flex justify-end">
            <button
              class="h-[35px] inline-flex cursor-default items-center justify-center rounded bg-green4 px-[15px] text-[15px] text-green11 font-medium leading-none outline-none hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7"
            >
              Save changes
            </button>
          </div>
        </ATabsContent>
        <ATabsContent
          class="grow rounded-r-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          value="tab2"
        >
          <p class="mb-5 text-[15px] text-mauve11 leading-normal">
            Change your password here. After saving, you'll be logged out.
          </p>
          <fieldset class="mb-[15px] w-full flex flex-col justify-start">
            <label
              class="mb-2.5 block text-[13px] text-violet12 leading-none"
              for="currentPassword"
            >
              Current password
            </label>
            <input
              id="currentPassword"
              class="h-[35px] shrink-0 grow rounded px-2.5 text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              type="password"
            >
          </fieldset>
          <fieldset class="mb-[15px] w-full flex flex-col justify-start">
            <label
              class="mb-2.5 block text-[13px] text-violet12 leading-none"
              for="newPassword"
            >
              New password
            </label>
            <input
              id="newPassword"
              class="h-[35px] shrink-0 grow rounded px-2.5 text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              type="password"
            >
          </fieldset>
          <fieldset class="mb-[15px] w-full flex flex-col justify-start">
            <label
              class="mb-2.5 block text-[13px] text-violet12 leading-none"
              for="confirmPassword"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              class="h-[35px] shrink-0 grow rounded px-2.5 text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              type="password"
            >
          </fieldset>
          <div class="mt-5 flex justify-end">
            <button
              class="h-[35px] inline-flex cursor-default items-center justify-center rounded bg-green4 px-[15px] text-[15px] text-green11 font-medium leading-none outline-none hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7"
            >
              Change password
            </button>
          </div>
        </ATabsContent>
      </ATabsRoot>
    </Variant>
  </Story>
</template>
