import type { FormInputEvents } from '../../src/module';
import type { PCheckboxProps, PCheckboxSlots } from '../../src/runtime/components/checkbox.vue';
import theme from '#build/pohon/checkbox';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Checkbox from '../../src/runtime/components/checkbox.vue';
import ComponentRender from '../component-render';
import { renderForm } from '../utils/form';

describe('checkbox', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const variants = Object.keys(theme.variants.variant) as any;
  const indicators = Object.keys(theme.variants.indicator) as any;

  it.each([
    // Props
    ['with modelValue', { props: { modelValue: true } }],
    ['with defaultValue', { props: { defaultValue: true } }],
    ['with id', { props: { id: 'id' } }],
    ['with name', { props: { name: 'name' } }],
    ['with value', { props: { value: 'value' } }],
    ['with disabled', { props: { disabled: true } }],
    ['with icon', { props: { icon: 'i-lucide-heart' } }],
    ['with indeterminate', { props: { defaultValue: 'indeterminate' } }],
    ['with indeterminateIcon', { props: { defaultValue: 'indeterminate', indeterminateIcon: 'i-lucide-trash' } }],
    ['with label', { props: { label: 'Label' } }],
    ['with required', { props: { label: 'Label', required: true } }],
    ['with description', { props: { label: 'Label', description: 'Description' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size, defaultValue: '1' } }]),
    ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { variant, defaultValue: '1' } }]),
    ...variants.map((variant: string) => [`with neutral variant ${variant}`, { props: { variant, color: 'neutral', defaultValue: '1' } }]),
    ...indicators.map((indicator: string) => [`with indicator ${indicator}`, { props: { indicator, defaultValue: '1' } }]),
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'inline-flex' } }],
    ['with ui', { props: { pohon: { wrapper: 'ms-4' } } }],
    // Slots
    ['with label slot', { slots: { label: () => 'Label slot' } }],
    ['with description slot', { slots: { label: () => 'Description slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PCheckboxProps; slots?: Partial<PCheckboxSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Checkbox);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: {
        label: 'Test checkbox',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  describe('emits', () => {
    it('update:modelValue event', async () => {
      const wrapper = mount(Checkbox);
      const input = wrapper.findComponent({ name: 'CheckboxRoot' });
      await input.vm.$emit('update:modelValue', true);
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[true]] });
    });

    it('change event', async () => {
      const wrapper = mount(Checkbox);
      const input = wrapper.findComponent({ name: 'CheckboxRoot' });
      await input.vm.$emit('update:modelValue', false);
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
            if (!state.value) {
              return [{ name: 'value', message: 'Error message' }];
            }
            return [];
          },
        },
        slotTemplate: `
        <PFormField name="value">
          <PCheckbox v-model="state.value" />
        </PFormField>
        `,
      });
      const input = wrapper.findComponent({ name: 'CheckboxRoot' });
      return {
        wrapper,
        input,
      };
    }

    it('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change']);
      await input.vm.$emit('update:modelValue', false);
      await flushPromises();

      expect(wrapper.text()).toContain('Error message');

      await input.vm.$emit('update:modelValue', true);
      await flushPromises();
      expect(wrapper.text()).not.toContain('Error message');
    });

    it('validate on input works', async () => {
      const { input, wrapper } = await createForm(['input']);
      await input.vm.$emit('update:modelValue', false);
      await flushPromises();

      expect(wrapper.text()).toContain('Error message');

      await input.vm.$emit('update:modelValue', true);
      await flushPromises();
      expect(wrapper.text()).not.toContain('Error message');
    });
  });
});
