import type { FormInputEvents } from '../../src/module';
import type { PPinInputProps } from '../../src/runtime/components/pin-input.vue';
import theme from '#build/pohon/pin-input';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PPinInput from '../../src/runtime/components/pin-input.vue';
import ComponentRender from '../component-render';
import { renderForm } from '../utils/form';

describe('pinInput', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const variants = Object.keys(theme.variants.variant) as any;

  it.each([
    // Props
    ['with modelValue', { props: { modelValue: ['1'] } }],
    ['with defaultValue', { props: { defaultValue: ['1'] } }],
    ['with id', { props: { id: 'pin-input-id' } }],
    ['with name', { props: { name: 'pin-input-name' } }],
    ['with type', { props: { type: 'number' } }],
    ['with placeholder', { props: { placeholder: '*' } }],
    ['with length', { props: { length: 6 } }],
    ['with disabled', { props: { disabled: true } }],
    ['with required', { props: { required: true } }],
    ['with mask', { props: { mask: true } }],
    ['with otp', { props: { otp: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { variant } }]),
    ...variants.map((variant: string) => [`with primary variant ${variant} highlight`, { props: { variant, highlight: true } }]),
    ...variants.map((variant: string) => [`with neutral variant ${variant}`, { props: { variant, color: 'neutral' } }]),
    ...variants.map((variant: string) => [`with neutral variant ${variant} highlight`, { props: { variant, color: 'neutral', highlight: true } }]),
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { as: 'span' } }],
    ['with class', { props: { class: 'absolute' } }],
    ['with ui', { props: { pohon: { base: 'rounded-full' } } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PPinInputProps }) => {
    const html = await ComponentRender(nameOrHtml, options, PPinInput);
    expect(html).toMatchSnapshot();
  });

  describe('emits', () => {
    it('update:modelValue event', async () => {
      const wrapper = mount(PPinInput);
      const input = wrapper.findComponent({ name: 'PinInputRoot' });
      await input.vm.$emit('update:modelValue', ['1', '2', '3']);
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[['1', '2', '3']]] });
    });

    it('change event', async () => {
      const wrapper = mount(PPinInput);
      const input = wrapper.findComponent({ name: 'PinInputRoot' });
      await input.vm.$emit('complete', ['1', '2', '3', '4', '5']);
      await flushPromises();
      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] });
    });

    it('blur event', async () => {
      const wrapper = mount(PPinInput);
      const lastPin = wrapper.find('input[aria-label="pin input 5 of 0"]');
      lastPin.trigger('blur');
      await flushPromises();

      expect(wrapper.emitted()).toMatchObject({ blur: [[{ type: 'blur' }]] });
    });
  });

  describe('form integration', async () => {
    async function createForm(validateOn?: Array<FormInputEvents>) {
      const wrapper = await renderForm({
        props: {
          validateOn,
          validateOnInputDelay: 0,
          async validate(state: any) {
            if (state.value?.length !== 5) {
              return [{ name: 'value', message: 'Error message' }];
            }
            return [];
          },
        },
        slotTemplate: `
        <PFormField name="value">
          <PPinInput id="input" v-model="state.value" />
        </PFormField>
        `,
      });
      const input = wrapper.findComponent({ name: 'PinInputRoot' });
      return {
        wrapper,
        input,
      };
    }

    it('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change']);

      await input.vm.$emit('complete', ['1', '2', '3', '4']);
      await flushPromises();
      expect(wrapper.text()).toContain('Error message');

      await input.vm.$emit('update:modelValue', ['1', '2', '3', '4', '5']);
      await flushPromises();
      expect(wrapper.text()).not.toContain('Error message');
    });

    it('validate on blur works', async () => {
      const { input, wrapper } = await createForm(['blur']);
      const lastPin = wrapper.find('input[aria-label="pin input 5 of 5"]');

      await input.vm.$emit('update:modelValue', ['1', '2', '3', '4']);
      lastPin.trigger('blur');
      await flushPromises();
      expect(wrapper.text()).toContain('Error message');

      await input.vm.$emit('update:modelValue', ['1', '2', '3', '4', '5']);
      lastPin.trigger('blur');
      await flushPromises();
      expect(wrapper.text()).not.toContain('Error message');
    });

    it('validate on input works', async () => {
      const { input, wrapper } = await createForm(['input']);

      await input.vm.$emit('update:modelValue', ['1', '2', '3', '4']);
      await flushPromises();
      expect(wrapper.text()).toContain('Error message');

      await input.vm.$emit('update:modelValue', ['1', '2', '3', '4', '5']);
      await flushPromises();
      expect(wrapper.html()).not.toContain('Error message');
    });
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PPinInput, {
      props: {
        length: 4,
        placeholder: '*',
        required: true,
        otp: true,
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
