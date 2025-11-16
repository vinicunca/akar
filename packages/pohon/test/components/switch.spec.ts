import type { FormInputEvents } from '../../src/module';
import type { PSwitchProps, PSwitchSlots } from '../../src/runtime/components/switch.vue';
import theme from '#build/pohon/switch';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PSwitch from '../../src/runtime/components/switch.vue';
import ComponentRender from '../component-render';
import { renderForm } from '../utils/form';

describe('switch', () => {
  const sizes = Object.keys(theme.variants.size) as any;

  it.each([
    // Props
    ['with modelValue', { props: { modelValue: true } }],
    ['with defaultValue', { props: { defaultValue: true } }],
    ['with id', { props: { id: 'id' } }],
    ['with name', { props: { name: 'name' } }],
    ['with value', { props: { value: 'value' } }],
    ['with disabled', { props: { disabled: true } }],
    ['with checkedIcon', { props: { checkedIcon: 'i-lucide-check', defaultValue: true } }],
    ['with uncheckedIcon', { props: { uncheckedIcon: 'i-lucide-x' } }],
    ['with loading', { props: { loading: true } }],
    ['with loadingIcon', { props: { loading: true, loadingIcon: 'i-lucide-loader' } }],
    ['with label', { props: { label: 'Label' } }],
    ['with required', { props: { label: 'Label', required: true } }],
    ['with description', { props: { label: 'Label', description: 'Description' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with color neutral', { props: { color: 'neutral', defaultValue: true } }],
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'inline-flex' } }],
    ['with ui', { props: { pohon: { wrapper: 'ms-4' } } }],
    // Slots
    ['with label slot', { slots: { label: () => 'Label slot' } }],
    ['with description slot', { slots: { label: () => 'Description slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PSwitchProps; slots?: Partial<PSwitchSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PSwitch);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PSwitch, {
      props: {
        modelValue: true,
        required: true,
        label: 'Label',
        description: 'Description',
      },
    });
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  describe('emits', () => {
    it('update:modelValue event', async () => {
      const wrapper = mount(PSwitch);
      const input = wrapper.findComponent({ name: 'SwitchRoot' });
      await input.vm.$emit('update:modelValue', true);
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[true]] });
    });

    it('change event', async () => {
      const wrapper = mount(PSwitch);
      const input = wrapper.findComponent({ name: 'SwitchRoot' });
      await input.vm.$emit('update:modelValue', true);
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
          <PSwitch v-model="state.value" />
        </PFormField>
        `,
      });
      const input = wrapper.findComponent({ name: 'SwitchRoot' });
      return {
        wrapper,
        input,
      };
    }

    it('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change']);
      await input.setValue(false);
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
