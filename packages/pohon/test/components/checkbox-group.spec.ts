import type { FormInputEvents } from '../../src/module';
import type { PCheckboxGroupProps, PCheckboxGroupSlots } from '../../src/runtime/components/checkbox-group.vue';
import themeCheckbox from '#build/pohon/checkbox';
import theme from '#build/pohon/checkbox-group';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PCheckboxGroup from '../../src/runtime/components/checkbox-group.vue';
import ComponentRender from '../component-render';
import { renderForm } from '../utils/form';

describe('checkboxGroup', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const variants = Object.keys(theme.variants.variant) as any;
  const indicators = Object.keys(themeCheckbox.variants.indicator) as any;

  const items = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const props = { items };

  it.each([
    ['with items', { props }],
    ['with modelValue', { props: { ...props, modelValue: ['1'] } }],
    ['with defaultValue', { props: { ...props, defaultValue: ['1'] } }],
    ['with valueKey', { props: { ...props, valueKey: 'label' } }],
    ['with labelKey', { props: { ...props, labelKey: 'value' } }],
    ['with descriptionKey', { props: { ...props, descriptionKey: 'value' } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with description', { props: { items: items.map((opt, count) => ({ ...opt, description: `Description ${count}` })) } }],
    ['with required', { props: { ...props, legend: 'Legend', required: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size, defaultValue: ['1'] } }]),
    ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { ...props, variant, defaultValue: ['1'] } }]),
    ...variants.map((variant: string) => [`with neutral variant ${variant}`, { props: { ...props, variant, color: 'neutral', defaultValue: ['1'] } }]),
    ...variants.map((variant: string) => [`with horizontal variant ${variant}`, { props: { ...props, variant, orientation: 'horizontal', defaultValue: ['1'] } }]),
    ...indicators.map((indicator: string) => [`with indicator ${indicator}`, { props: { ...props, indicator, defaultValue: ['1'] } }]),
    ['with ariaLabel', { props, attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'absolute' } }],
    ['with ui', { props: { ...props, pohon: { fieldset: 'gap-x-4', label: 'text-red' } } }],
    // Slots
    ['with legend slot', { props, slots: { legend: () => 'Legend slot' } }],
    ['with label slot', { props, slots: { label: () => 'Label slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PCheckboxGroupProps; slots?: Partial<PCheckboxGroupSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PCheckboxGroup);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PCheckboxGroup, {
      props: {
        items: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
        legend: 'Legend',

      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  describe('emits', () => {
    it('update:modelValue event', async () => {
      const wrapper = mount(PCheckboxGroup, { props: { items: ['Option 1', 'Option 2'] } });
      const input = wrapper.findComponent({ name: 'CheckboxGroupRoot' });
      await input.setValue('Option 1');
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [['Option 1']] });
    });

    it('change event', async () => {
      const wrapper = mount(PCheckboxGroup, { props: { items: ['Option 1', 'Option 2'] } });
      const input = wrapper.findComponent({ name: 'CheckboxGroupRoot' });
      await input.setValue('Option 1');
      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] });
    });
  });

  describe('form integration', async () => {
    async function createForm(validateOn?: Array<FormInputEvents>) {
      const wrapper = await renderForm({
        props: {
          validateOn,
          validateOnInputDelay: 0,
          async validate(state: any) {
            if (!state.value?.includes('Option 2')) {
              return [{ name: 'value', message: 'Error message' }];
            }
            return [];
          },
        },
        slotVars: {
          items: ['Option 1', 'Option 2'],
        },
        slotTemplate: `
        <PFormField name="value" label="Checkbox group">
          <PCheckboxGroup id="input" v-model="state.value" :items="items" />
        </PFormField>
        `,
      });
      const input = wrapper.findComponent({ name: 'CheckboxGroupRoot' });
      return {
        wrapper,
        input,
      };
    }

    it('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change']);

      input.setValue(['Option 1']);
      await flushPromises();
      expect(wrapper.text()).toContain('Error message');

      input.setValue(['Option 2']);
      await flushPromises();
      expect(wrapper.text()).not.toContain('Error message');
    });

    it('validate on input works', async () => {
      const { input, wrapper } = await createForm(['input']);

      input.setValue(['Option 1']);
      await flushPromises();
      expect(wrapper.text()).toContain('Error message');

      input.setValue(['Option 2']);
      await flushPromises();
      expect(wrapper.text()).not.toContain('Error message');
    });

    it('no label for=... on FormField', async () => {
      const { wrapper } = await createForm();
      const formFieldLabel = wrapper.findAll('label').map((label) => label.attributes()).filter((label) => !label.for?.includes(':'))[0];
      expect(formFieldLabel?.for).toBeUndefined();
    });
  });
});
