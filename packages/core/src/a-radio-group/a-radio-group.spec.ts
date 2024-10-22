import type { DOMWrapper, VueWrapper } from '@vue/test-utils';

import { fireEvent } from '@testing-library/vue';
import { KEY_CODES, sleep } from '@vinicunca/perkakas';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { handleSubmit } from '~~/test';

import ARadio from './story/_a-radio.vue';
import ARadioGroup from './story/_a-radio-group.vue';

describe('given a default ARadioGroup', () => {
  let wrapper: VueWrapper<InstanceType<typeof ARadioGroup>>;
  let radios: Array<DOMWrapper<HTMLElement>>;

  beforeEach(() => {
    document.body.innerHTML = '';
    wrapper = mount(ARadioGroup, { attachTo: document.body });
    radios = wrapper.findAll('[role=radio]');
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  it('should have default selected', () => {
    expect(radios[0].attributes('data-state')).toBe('checked');
  });

  it('should render icons', () => {
    expect(radios[0].find('span').exists()).toBeTruthy();
  });

  describe('on keyboard navigation', () => {
    beforeEach(async () => {
      radios[0].element.focus();
      await fireEvent.keyDown(document.activeElement!, { key: KEY_CODES.ARROW_DOWN });
      await sleep(0);
    });

    it('should emit `select` event', async () => {
      const radiosComponent = wrapper.findAllComponents('button') as Array<VueWrapper>;
      expect(radiosComponent[2].emitted('select')?.[0]?.[0]).toBeTruthy();
    });

    it('should skip disabled item', () => {
      expect(radios[1].attributes('data-state')).toBe('unchecked');
      expect(radios[2].element).toBe(document.activeElement);
    });

    it('should select next item on keydown', async () => {
      expect(radios[0].attributes('data-state')).toBe('unchecked');
      expect(radios[2].attributes('data-state')).toBe('checked');
      expect(radios[2].element).toBe(document.activeElement);
    });

    describe('on arrow up', () => {
      it('should select the first item again', async () => {
        await fireEvent.keyDown(document.activeElement!, { key: KEY_CODES.ARROW_UP });
        await sleep(0);
        expect(radios[0].attributes('data-state')).toBe('checked');
        expect(radios[2].attributes('data-state')).toBe('unchecked');
      });
    });
  });
});

describe('given disabled ARadioGroup', () => {
  let wrapper: VueWrapper<InstanceType<typeof ARadioGroup>>;
  let radios: Array<DOMWrapper<HTMLElement>>;

  beforeEach(() => {
    document.body.innerHTML = '';
    wrapper = mount(ARadioGroup, { attachTo: document.body, props: { disabled: true } });
    radios = wrapper.findAll('[role=radio]');
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  it('should have default selected', () => {
    expect(radios[0].attributes('data-state')).toBe('checked');
  });

  it.each([[0, 'checked'], [1, 'unchecked'], [2, 'unchecked']])('should not select any item', async (input, output) => {
    await radios[input].trigger('click');
    expect(radios[input].attributes('data-state')).toBe(output);
  });

  it.each([[0], [1], [2]])('should have disabled attribute on item', async (input) => {
    expect(radios[input].attributes('disabled')).toBe('');
    expect(radios[input].attributes('data-disabled')).toBe('');
  });
});

describe('given radio in a form', async () => {
  const wrapper = mount({
    props: ['handleSubmit'],
    components: { ARadio },
    template: '<form @submit="handleSubmit"><ARadio /></form>',
  }, {
    props: { handleSubmit },
  });

  it('should have hidden input field', async () => {
    expect(wrapper.find('[type="radio"]').exists()).toBe(true);
  });

  describe('after clicking submit button', () => {
    beforeEach(async () => {
      await wrapper.find('button').trigger('click');
      await wrapper.find('form').trigger('submit');
    });

    it('should trigger submit once', () => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit.mock.results[0].value).toStrictEqual({ test: 'true' });
    });
  });

  describe('after uncheck and click submit button again', () => {
    beforeEach(async () => {
      await wrapper.find('button').trigger('click');
      await wrapper.find('form').trigger('submit');
    });

    it('should trigger submit once', () => {
      expect(handleSubmit).toHaveBeenCalledTimes(2);
      expect(handleSubmit.mock.results[1].value).toStrictEqual({ test: 'true' });
    });
  });
});
