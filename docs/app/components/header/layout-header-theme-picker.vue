<script lang="ts" setup>
import { useAppConfig } from '#app';
import { PPopover } from '#components';
import { useColorMode } from '#imports';
import { omit } from '@vinicunca/perkakas';
import { theme } from 'unocss/preset-wind4';
import { computed } from 'vue';
import LayoutHeaderThemePickerButton from './layout-header-theme-picker-button.vue';

const appConfig = useAppConfig();
const colorMode = useColorMode();

const neutralColors = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'dark', 'light'];

const colorsToOmit = ['inherit', 'current', 'transparent', 'black', 'white', ...neutralColors];
const primaryColors = Object.keys(omit(theme.colors, colorsToOmit as any));
const primary = computed({
  get() {
    return appConfig.pohon.colors.primary;
  },
  set(option) {
    appConfig.pohon.colors.primary = option;
    window.localStorage.setItem('pohon-ui-primary', appConfig.pohon.colors.primary);
    setBlackAsPrimary(false);
  },
});

function setBlackAsPrimary(value: boolean) {
  appConfig.theme.blackAsPrimary = value;
  window.localStorage.setItem('pohon-ui-black-as-primary', String(value));
}

const radiuses = [0, 0.125, 0.25, 0.375, 0.5];
const radius = computed({
  get() {
    return appConfig.theme.radius;
  },
  set(option) {
    appConfig.theme.radius = option;
    window.localStorage.setItem('nuxt-ui-radius', String(appConfig.theme.radius));
  },
});

const modes = [
  { label: 'light', icon: appConfig.pohon.icons.light },
  { label: 'dark', icon: appConfig.pohon.icons.dark },
  { label: 'system', icon: appConfig.pohon.icons.system },
];
const mode = computed({
  get() {
    return colorMode.value;
  },
  set(option) {
    colorMode.preference = option;
  },
});
</script>

<template>
  <PPopover
    :pohon="{
      content: 'w-72 px-6 py-4 flex flex-col gap-4',
    }"
  >
    <template #default="{ open }">
      <PButton
        icon="i-lucide:swatch-book"
        color="neutral"
        :variant="open ? 'soft' : 'ghost'"
        square
        aria-label="Color picker"
        :pohon="{ leadingIcon: 'text-primary' }"
      />
    </template>

    <template #content>
      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          Primary
        </legend>

        <div class="gap-1 grid grid-cols-3 -mx-2">
          <LayoutHeaderThemePickerButton
            label="Black"
            :selected="appConfig.theme.blackAsPrimary"
            @click="setBlackAsPrimary(true)"
          >
            <template #leading>
              <span class="rounded-full bg-black h-2 w-2 inline-block dark:bg-white" />
            </template>
          </LayoutHeaderThemePickerButton>

          <LayoutHeaderThemePickerButton
            v-for="color in primaryColors"
            :key="color"
            :label="color"
            :chip="color"
            :selected="!appConfig.theme.blackAsPrimary && primary === color"
            @click="primary = color"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          Radius
        </legend>

        <div class="gap-1 grid grid-cols-5 -mx-2">
          <LayoutHeaderThemePickerButton
            v-for="r in radiuses"
            :key="r"
            :label="String(r)"
            class="justify-center akar:px-0"
            :selected="radius === r"
            @click="radius = r"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          Theme
        </legend>

        <div class="gap-1 grid grid-cols-3 -mx-2">
          <LayoutHeaderThemePickerButton
            v-for="m in modes"
            :key="m.label"
            v-bind="m"
            :selected="colorMode.preference === m.label"
            @click="mode = m.label"
          />
        </div>
      </fieldset>
    </template>
  </PPopover>
</template>
