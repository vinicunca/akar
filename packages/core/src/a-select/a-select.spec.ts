import type { DOMWrapper, VueWrapper } from '@vue/test-utils';

import { fireEvent } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { nextTick } from 'vue';

import { handleSubmit } from '~~/test';

import ASelect from './story/_a-select-test.vue';

beforeAll(() => {
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  globalThis.ResizeObserver = class ResizeObserver {
    disconnect() {}
    observe() {}
    unobserve() {}
  };
});

describe('given default ASelect', () => {
  let wrapper: VueWrapper<InstanceType<typeof ASelect>>;
  let valueBox: DOMWrapper<HTMLElement>;

  beforeEach(() => {
    document.body.innerHTML = '';
    wrapper = mount(ASelect, { attachTo: document.body });
    valueBox = wrapper.find('[aria-label="Customise options"]');
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  it('should show placeholder', () => {
    expect(valueBox.html()).toContain('Please select a fruit');
  });

  describe('opening the modal', () => {
    beforeEach(async () => {
      await wrapper.find('button').trigger('pointerdown', {
        button: 0,
        ctrlKey: false,
      });
      await nextTick();
    });

    it('should pass axe accessibility tests', async () => {
      // We have hidden children such as icon, thus disabling this
      expect(await axe(wrapper.element, {
        rules: {
          'aria-required-children': { enabled: false },
        },
      })).toHaveNoViolations();
    });

    it('should show the modal content', () => {
      expect(wrapper.html()).toContain('Apple');
    });

    describe('after selecting a value', () => {
      beforeEach(async () => {
        const selection = wrapper.findAll('[role=option]')[1];
        (selection.element as HTMLElement).focus();
        await selection.trigger('pointerup');
        // Needs 2 pointerup because ASelectContentImpl prevents accidental pointerup's
        await fireEvent.pointerUp(selection.element);
      });

      it('should show value correctly', () => {
        expect(valueBox.html()).toContain('Banana');
      });

      it('should close the modal', () => {
        const group = wrapper.find('[role=group]');
        expect(group.exists()).toBeFalsy();
      });

      describe('after opening the modal again', () => {
        beforeEach(async () => {
          await wrapper.find('button').trigger('pointerdown', {
            button: 0,
            ctrlKey: false,
          });
          await nextTick();
        });

        it('should focus on the selected value', () => {
          const selection = wrapper.findAll('[role=option]')[1];
          expect(selection.attributes('data-state')).toBe('checked');
        });

        it('should render the icon', () => {
          const selection = wrapper.findAll('[role=option]')[1];
          const iconElement = selection.find('i');

          expect(iconElement.exists()).toBe(true);
          expect(iconElement.classes()).toContain('i-radix-icons:check');
        });
      });
    });
  });
});

describe('given ASelect with multiple props', async () => {
  let wrapper: VueWrapper<InstanceType<typeof ASelect>>;
  let valueBox: DOMWrapper<HTMLElement>;

  beforeEach(() => {
    document.body.innerHTML = '';
    wrapper = mount(ASelect, { attachTo: document.body, props: { multiple: true } });
    valueBox = wrapper.find('[aria-label="Customise options"]');
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  describe('opening the modal', () => {
    beforeEach(async () => {
      await wrapper.find('button').trigger('pointerdown', {
        button: 0,
        ctrlKey: false,
      });
      await nextTick();
    });

    it('should pass axe accessibility tests', async () => {
      // We have hidden children such as icon, thus disabling this
      expect(await axe(wrapper.element, {
        rules: {
          'aria-required-children': { enabled: false },
        },
      })).toHaveNoViolations();
    });

    it('should show the modal content', () => {
      expect(wrapper.html()).toContain('Apple');
    });

    describe('after selecting a value', () => {
      beforeEach(async () => {
        const selection = wrapper.findAll('[role=option]')[1];
        (selection.element as HTMLElement).focus();
        await selection.trigger('pointerup');
        // Needs 2 pointerup because ASelectContentImpl prevents accidental pointerup's
        await fireEvent.pointerUp(selection.element);
      });

      it('should show value correctly', () => {
        expect(valueBox.html()).toContain('Banana');
      });

      it('should close the modal', () => {
        const group = wrapper.find('[role=group]');
        expect(group.exists()).toBeTruthy();
      });

      describe('after opening the modal again', () => {
        beforeEach(async () => {
          await wrapper.find('button').trigger('pointerdown', {
            button: 0,
            ctrlKey: false,
          });
          await nextTick();
        });

        it('should focus on the selected value', () => {
          const selection = wrapper.findAll('[role=option]')[1];
          expect(selection.attributes('data-state')).toBe('checked');
        });

        it('should render the icon', () => {
          const selection = wrapper.findAll('[role=option]')[1];
          const iconElement = selection.find('i');

          expect(iconElement.exists()).toBe(true);
          expect(iconElement.classes()).toContain('i-radix-icons:check');
        });

        describe('after selecting another value', () => {
          beforeEach(async () => {
            const selection = wrapper.findAll('[role=option]')[2];
            (selection.element as HTMLElement).focus();
            await selection.trigger('pointerup');
            // Needs 2 pointerup because ASelectContentImpl prevents accidental pointerup's
            await fireEvent.pointerUp(selection.element);
          });

          it('should show value correctly', () => {
            expect(valueBox.html()).toContain('Banana');
            expect(valueBox.html()).toContain('Blueberry');
          });

          it('should not close the modal', () => {
            const group = wrapper.find('[role=group]');
            expect(group.exists()).toBeTruthy();
          });
        });
      });
    });
  });
});

describe('given ASelect with object type', async () => {
  let wrapper: VueWrapper<InstanceType<typeof ASelect>>;
  let valueBox: DOMWrapper<HTMLElement>;

  beforeEach(() => {
    document.body.innerHTML = '';
    wrapper = mount(ASelect, { attachTo: document.body, props: { options: ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'].map((i) => ({ label: i, value: i.toLowerCase() })) } });
    valueBox = wrapper.find('[aria-label="Customise options"]');
  });

  describe('opening the modal', () => {
    beforeEach(async () => {
      await wrapper.find('button').trigger('pointerdown', {
        button: 0,
        ctrlKey: false,
      });
      await nextTick();
    });

    describe('after selecting a value', () => {
      beforeEach(async () => {
        const selection = wrapper.findAll('[role=option]')[1];
        (selection.element as HTMLElement).focus();
        await selection.trigger('pointerup');
        // Needs 2 pointerup because ASelectContentImpl prevents accidental pointerup's
        await fireEvent.pointerUp(selection.element);
      });

      it('should show value correctly', () => {
        expect(valueBox.html()).toContain('banana');
        expect(valueBox.html()).toContain('Banana');
      });

      it('should close the modal', () => {
        const group = wrapper.find('[role=group]');
        expect(group.exists()).toBeFalsy();
      });
    });
  });
});

describe('given ASelect in a form', async () => {
  const wrapper = mount({
    props: ['handleSubmit'],
    components: { ASelect },
    template: '<form @submit="handleSubmit"><ASelect value="true" /></form>',
  }, {
    props: { handleSubmit },
    attachTo: document.body,
  });

  it('should have hidden input field', async () => {
    expect(wrapper.find('select').exists()).toBe(true);
  });

  describe('after selecting option and clicking submit button', () => {
    beforeEach(async () => {
      await wrapper.find('button').trigger('pointerdown', {
        button: 0,
        ctrlKey: false,
      });
      await nextTick();
      const selection = wrapper.findAll('[role=option]')[1];
      (selection.element as HTMLElement).focus();
      await selection.trigger('pointerup');
      // Needs 2 pointerup because ASelectContentImpl prevents accidental pointerup's
      await fireEvent.pointerUp(selection.element);
      await wrapper.find('form').trigger('submit');
    });

    it('should trigger submit once', () => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit.mock.results[0].value).toStrictEqual({ test: 'Banana' });
    });
  });

  describe('after selecting other option and click submit button again', () => {
    beforeEach(async () => {
      await wrapper.find('button').trigger('pointerdown', {
        button: 0,
        ctrlKey: false,
      });
      await nextTick();
      const selection = wrapper.findAll('[role=option]')[4];
      (selection.element as HTMLElement).focus();
      await selection.trigger('pointerup');
      // Needs 2 pointerup because ASelectContentImpl prevents accidental pointerup's
      await fireEvent.pointerUp(selection.element);
      await wrapper.find('form').trigger('submit');
    });

    it('should trigger submit once', () => {
      expect(handleSubmit).toHaveBeenCalledTimes(2);
      expect(handleSubmit.mock.results[1].value).toStrictEqual({ test: 'Pineapple' });
    });
  });
});
