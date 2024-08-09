<script setup lang="ts">
import { ref } from 'vue';

import { AFocusScope } from '../';

const trapped1 = ref(false);
const trapped2 = ref(false);
</script>

<template>
  <Story
    group="utilities"
    title="AFocusScope/Multiple"
    :layout="{ type: 'single' }"
  >
    <div>
      <div>
        <button
          type="button"
          @click="trapped1 = true"
        >
          Trap 1
        </button>

        <AFocusScope
          v-if="trapped1"
          as-child
          :loop="trapped1"
          :trapped="trapped1"
        >
          <form
            :style="{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: 20,
              padding: 20,
              maxWidth: 500,
              border: '2px solid',
            }"
          >
            <h1>One</h1>
            <input
              type="text"
              placeholder="First name"
            >
            <input
              type="text"
              placeholder="Last name"
            >
            <input
              type="number"
              placeholder="Age"
            >
            <button
              type="button"
              @click="trapped1 = false"
            >
              Close
            </button>
          </form>
        </AFocusScope>
      </div>
      <div>
        <button
          type="button"
          @click="trapped2 = true"
        >
          Trap 2
        </button>

        <AFocusScope
          v-if="trapped2"
          as-child
          :loop="trapped2"
          :trapped="trapped2"
        >
          <form
            :style="{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: 20,
              padding: 20,
              maxWidth: 500,
              border: '2px solid',
            }"
          >
            <h1>One</h1>
            <input
              type="text"
              placeholder="First name"
            >
            <input
              type="text"
              placeholder="Last name"
            >
            <input
              type="number"
              placeholder="Age"
            >
            <button
              type="button"
              @click="trapped2 = false"
            >
              Close
            </button>
          </form>
        </AFocusScope>
      </div>
    </div>
  </Story>
</template>
