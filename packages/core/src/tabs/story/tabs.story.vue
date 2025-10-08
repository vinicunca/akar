<script setup lang="ts">
import { ATabsContent, ATabsIndicator, ATabsList, ATabsRoot, ATabsTrigger } from '..';
</script>

<template>
  <Story
    title="Tabs/Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ATabsRoot
        class="shadow-blackA4 flex flex-col w-[300px] shadow-[0_2px_10px]"
        default-value="tab1"
      >
        <ATabsList
          class="border-mauve6 border-b flex shrink-0 relative"
          aria-label="Manage your account"
        >
          <ATabsIndicator class="bg-violet11 rounded-full h-[2px] w-[--akar-tabs-indicator-size] translate-x-[--akar-tabs-indicator-position] transition-[width,transform] duration-300 bottom-0 left-0 absolute" />
          <ATabsTrigger
            class="text-mauve11 data-[state=active]:text-violet11 hover:text-violet11 text-[15px] leading-none px-5 outline-none rounded-tl-md bg-white flex flex-1 h-[45px] cursor-default select-none items-center justify-center focus-visible:shadow-[0_0_0_2px]"
            value="tab1"
          >
            Account
          </ATabsTrigger>
          <ATabsTrigger
            class="text-mauve11 data-[state=active]:text-violet11 hover:text-violet11 text-[15px] leading-none px-5 outline-none rounded-tr-md bg-white flex flex-1 h-[45px] cursor-default select-none items-center justify-center focus-visible:shadow-[0_0_0_2px]"
            value="tab2"
          >
            Password
          </ATabsTrigger>
        </ATabsList>
        <ATabsContent
          class="p-5 outline-none rounded-b-md bg-white grow focus:shadow-[0_0_0_2px] focus:shadow-black"
          value="tab1"
        >
          <p class="text-mauve11 text-[15px] leading-normal mb-5">
            Make changes to your account here. Click save when you're done.
          </p>
          <fieldset class="mb-[15px] flex flex-col w-full justify-start">
            <label
              class="text-violet12 text-[13px] leading-none mb-2.5 block"
              for="name"
            >
              Name
            </label>
            <input
              id="name"
              class="text-violet11 shadow-violet7 focus:shadow-violet8 text-[15px] leading-none px-2.5 outline-none rounded shrink-0 grow h-[35px] shadow-[0_0_0_1px] focus:shadow-[0_0_0_2px]"
              value="Pedro Duarte"
            >
          </fieldset>
          <fieldset class="mb-[15px] flex flex-col w-full justify-start">
            <label
              class="text-violet12 text-[13px] leading-none mb-2.5 block"
              for="username"
            >
              Username
            </label>
            <input
              id="username"
              class="text-violet11 shadow-violet7 focus:shadow-violet8 text-[15px] leading-none px-2.5 outline-none rounded shrink-0 grow h-[35px] shadow-[0_0_0_1px] focus:shadow-[0_0_0_2px]"
              value="@peduarte"
            >
          </fieldset>
          <div class="mt-5 flex justify-end">
            <button
              class="bg-green4 color-green11 hover:bg-green5 focus:shadow-green7 text-[15px] leading-none font-medium px-[15px] outline-none rounded inline-flex h-[35px] cursor-default items-center justify-center focus:shadow-[0_0_0_2px]"
            >
              Save changes
            </button>
          </div>
        </ATabsContent>
        <ATabsContent
          class="p-5 outline-none rounded-b-md bg-white grow focus:shadow-[0_0_0_2px] focus:shadow-black"
          value="tab2"
        >
          <p class="text-mauve11 text-[15px] leading-normal mb-5">
            Change your password here. After saving, you'll be logged out.
          </p>
          <fieldset class="mb-[15px] flex flex-col w-full justify-start">
            <label
              class="text-violet12 text-[13px] leading-none mb-2.5 block"
              for="currentPassword"
            >
              Current password
            </label>
            <input
              id="currentPassword"
              class="text-violet11 shadow-violet7 focus:shadow-violet8 text-[15px] leading-none px-2.5 outline-none rounded shrink-0 grow h-[35px] shadow-[0_0_0_1px] focus:shadow-[0_0_0_2px]"
              type="password"
            >
          </fieldset>
          <fieldset class="mb-[15px] flex flex-col w-full justify-start">
            <label
              class="text-violet12 text-[13px] leading-none mb-2.5 block"
              for="newPassword"
            >
              New password
            </label>
            <input
              id="newPassword"
              class="text-violet11 shadow-violet7 focus:shadow-violet8 text-[15px] leading-none px-2.5 outline-none rounded shrink-0 grow h-[35px] shadow-[0_0_0_1px] focus:shadow-[0_0_0_2px]"
              type="password"
            >
          </fieldset>
          <fieldset class="mb-[15px] flex flex-col w-full justify-start">
            <label
              class="text-violet12 text-[13px] leading-none mb-2.5 block"
              for="confirmPassword"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              class="text-violet11 shadow-violet7 focus:shadow-violet8 text-[15px] leading-none px-2.5 outline-none rounded shrink-0 grow h-[35px] shadow-[0_0_0_1px] focus:shadow-[0_0_0_2px]"
              type="password"
            >
          </fieldset>
          <div class="mt-5 flex justify-end">
            <button
              class="bg-green4 color-green11 hover:bg-green5 focus:shadow-green7 text-[15px] leading-none font-medium px-[15px] outline-none rounded inline-flex h-[35px] cursor-default items-center justify-center focus:shadow-[0_0_0_2px]"
            >
              Change password
            </button>
          </div>
        </ATabsContent>
      </ATabsRoot>
    </Variant>
  </Story>
</template>
