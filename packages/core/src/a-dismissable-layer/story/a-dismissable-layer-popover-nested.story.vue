<script setup lang="ts">
import ADummyPopover from './_a-dummy-popover.vue';

function handleAlert() {
  // eslint-disable-next-line no-alert
  alert('Alert');
}
</script>

<template>
  <Story
    group="utilities"
    title="ADismissableLayer/PopoverNested"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Dialog (fully modal example)">
      <div class="h-[300vh]">
        <ul class="ml-4 list-disc">
          <li>
            ✅ dismissing a `Popover` by pressing escape should only dismiss
            that given `Popover`, not its parents
          </li>
          <li>
            ✅ interacting outside the blue `Popover` should only dismiss itself
            and not its parents
          </li>
          <li>
            ✅ interacting outside the red `Popover` should dismiss itself and
            the black one
          </li>
          <li>✅ unless the click wasn't outside the black one</li>
          <li>
            ✅ when the blue `Popover` is open, there should be{' '}
            <span class="font-semibold">NO</span> text cursor above the red or
            black inputs
          </li>
          <li>
            ✅ when the red `Popover` is open, there should be a text cursor
            above the black input but not the one on the page behind
          </li>
        </ul>

        <div class="mt-12 flex flex-col gap-4">
          <ADummyPopover disable-outside-pointer-events>
            <ADummyPopover
              color="tomato"
              open-label="Open red"
              close-label="Close red"
            >
              <ADummyPopover
                color="royalblue"
                open-label="Open blue"
                close-label="Close blue"
                disable-outside-pointer-events
              />
            </ADummyPopover>
          </ADummyPopover>

          <input
            type="text"
            value="some input"
          >
          <button @click="handleAlert">
            Alert me
          </button>
        </div>
      </div>
    </Variant>
  </Story>
</template>
