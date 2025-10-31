<script setup lang="ts">
import type { FormSubmitEvent } from 'pohon-ui';
import { useToast } from '#imports';
import { reactive, useTemplateRef } from 'vue';
import * as z from 'zod';

const schema = z.object({
  input: z.string().min(10),
  inputNumber: z.number().min(10),
  inputMenu: z.any().refine((option) => option?.value === 'option-2', {
    message: 'Select Option 2',
  }),
  inputMenuMultiple: z.any().refine((values) => !!values?.find((option: any) => option.value === 'option-2'), {
    message: 'Include Option 2',
  }),
  textarea: z.string().min(10),
  select: z.string().refine((value) => value === 'option-2', {
    message: 'Select Option 2',
  }),
  selectMultiple: z.array(z.string()).refine((values) => values.includes('option-2'), {
    message: 'Include Option 2',
  }),
  selectMenu: z.any().refine((option) => option?.value === 'option-2', {
    message: 'Select Option 2',
  }),
  selectMenuMultiple: z.any().refine((values) => !!values?.find((option: any) => option.value === 'option-2'), {
    message: 'Include Option 2',
  }),
  switch: z.boolean().refine((value) => value === true, {
    message: 'Toggle me',
  }),
  checkbox: z.boolean().refine((value) => value === true, {
    message: 'Check me',
  }),
  radioGroup: z.string().refine((value) => value === 'option-2', {
    message: 'Select Option 2',
  }),
  checkboxGroup: z.any().refine((values) => !!values?.find((option: any) => option === 'option-2'), {
    message: 'Include Option 2',
  }),
  slider: z.number().max(20, { message: 'Must be less than 20' }),
  pin: z.string().regex(/^\d$/).array().length(5),
  file: z.file().min(1).max(1024 * 1024).mime('image/png'),
});

type Schema = z.input<typeof schema>;

const state = reactive<Partial<Schema>>({});

const form = useTemplateRef('form');

const items = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
];

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' });
  console.log(event.data);
}
</script>

<template>
  <PForm
    ref="form"
    :state="state"
    :schema="schema"
    class="w-full"
    @submit="onSubmit"
  >
    <div class="gap-4 grid grid-cols-3">
      <PFormField
        label="Input"
        name="input"
      >
        <PInput
          v-model="state.input"
          placeholder="john@lennon.com"
          class="w-full"
        />
      </PFormField>

      <div class="flex flex-col gap-4">
        <PFormField name="switch">
          <PSwitch
            v-model="state.switch"
            label="Switch me"
          />
        </PFormField>

        <PFormField name="checkbox">
          <PCheckbox
            v-model="state.checkbox"
            label="Check me"
          />
        </PFormField>
      </div>

      <PFormField
        name="slider"
        label="Slider"
      >
        <PSlider v-model="state.slider" />
      </PFormField>

      <PFormField
        name="select"
        label="Select"
      >
        <PSelect
          v-model="state.select"
          :items="items"
          class="w-full"
        />
      </PFormField>

      <PFormField
        name="selectMultiple"
        label="Select (Multiple)"
      >
        <PSelect
          v-model="state.selectMultiple"
          multiple
          :items="items"
          class="w-full"
        />
      </PFormField>

      <PFormField
        name="selectMenu"
        label="Select Menu"
      >
        <PSelectMenu
          v-model="state.selectMenu"
          :items="items"
          class="w-full"
        />
      </PFormField>

      <PFormField
        name="selectMenuMultiple"
        label="Select Menu (Multiple)"
      >
        <PSelectMenu
          v-model="state.selectMenuMultiple"
          multiple
          :items="items"
          class="w-full"
        />
      </PFormField>

      <PFormField
        name="inputMenu"
        label="Input Menu"
      >
        <PInputMenu
          v-model="state.inputMenu"
          :items="items"
          class="w-full"
        />
      </PFormField>

      <PFormField
        name="inputMenuMultiple"
        label="Input Menu (Multiple)"
      >
        <PInputMenu
          v-model="state.inputMenuMultiple"
          multiple
          :items="items"
          class="w-full"
        />
      </PFormField>

      <PFormField
        name="inputNumber"
        label="Input Number"
      >
        <PInputNumber
          v-model="state.inputNumber"
          class="w-full"
        />
      </PFormField>

      <PFormField
        label="Textarea"
        name="textarea"
      >
        <PTextarea
          v-model="state.textarea"
          class="w-full"
        />
      </PFormField>
      <div class="flex gap-4">
        <PFormField name="radioGroup">
          <PRadioGroup
            v-model="state.radioGroup"
            legend="Radio group"
            :items="items"
          />
        </PFormField>
        <PFormField name="checkboxGroup">
          <PCheckboxGroup
            v-model="state.checkboxGroup"
            legend="Checkbox group"
            :items="items"
          />
        </PFormField>
      </div>
      <PFormField
        name="pin"
        label="Pin Input"
        :error-pattern="/(pin)\..*/"
      >
        <PPinInput v-model="state.pin" />
      </PFormField>

      <PFormField
        name="file"
        label="File Input"
      >
        <PFileUpload
          v-model="state.file"
          label="Drop your image here"
          description="PNG (max. 1MB)"
          class="min-h-44 w-full"
        />
      </PFormField>
    </div>

    <div class="mt-8 flex gap-2">
      <PButton type="submit">
        Submit
      </PButton>

      <PButton
        variant="outline"
        @click="form?.clear()"
      >
        Clear
      </PButton>
    </div>
  </PForm>
</template>
