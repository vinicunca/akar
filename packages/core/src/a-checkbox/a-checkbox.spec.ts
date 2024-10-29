import type { DOMWrapper, VueWrapper } from '@vue/test-utils';

import { mount } from '@vue/test-utils';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { handleSubmit } from '~~/test';

import ACheckbox from './story/_a-checkbox.vue';
import ACheckboxGroup from './story/_a-checkbox-group.vue';

globalThis.ResizeObserver = class ResizeObserver {
  cb: any;
  constructor(cb: any) {
    this.cb = cb;
  }

  disconnect() {}

  observe() {
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }]);
  }

  unobserve() {}
};

describe('given a default ACheckbox', () => {
  it('should pass axe accessibility tests', async () => {
    const wrapper = mount(ACheckbox, { attachTo: document.body });
    expect(await axe(wrapper.element, {
      rules: {
        'label': { enabled: false },
        'nested-interactive': { enabled: false },
      },
    })).toHaveNoViolations();
  });

  it('should render checkbox', () => {
    const wrapper = mount(ACheckbox);
    expect(wrapper.element).toBeTruthy();
  });

  describe('when clicking the checkbox', async () => {
    let wrapper: VueWrapper<InstanceType<typeof ACheckbox>>;
    let checkbox: DOMWrapper<HTMLButtonElement>;

    beforeEach(async () => {
      wrapper = mount(ACheckbox);
      checkbox = wrapper.find('button');
      checkbox.trigger('click');
    });

    it('should render a visible indicator', async () => {
      const span = wrapper.find('span');
      expect(span.exists()).toBe(true);
    });

    describe('when clicking the checkbox again', async () => {
      beforeEach(async () => {
        await checkbox.trigger('click');
      });
      it('should remove the indicator', async () => {
        expect(wrapper.find('span').exists()).toBe(false);
      });
    });
  });
});

describe('given ACheckboxGroup', () => {
  it('should pass axe accessibility tests', async () => {
    const wrapper = mount(ACheckboxGroup, { attachTo: document.body });
    expect(await axe(wrapper.element, {
      rules: {
        label: { enabled: false },
      },
    })).toHaveNoViolations();
  });

  it('should render checkbox', () => {
    const wrapper = mount(ACheckboxGroup);
    expect(wrapper.element).toBeTruthy();
  });

  describe('when clicking the checkbox', async () => {
    let wrapper: VueWrapper<InstanceType<typeof ACheckboxGroup>>;
    let checkboxes: Array<DOMWrapper<HTMLButtonElement>>;

    beforeEach(async () => {
      wrapper = mount(ACheckboxGroup);
      checkboxes = wrapper.findAll('button');
      checkboxes[0].trigger('click');
    });

    it('should render a visible indicator', async () => {
      const span = wrapper.find('span');
      expect(span.exists()).toBe(true);
    });

    describe('when clicking the checkbox again', async () => {
      beforeEach(async () => {
        await checkboxes[0].trigger('click');
      });
      it('should remove the indicator', async () => {
        expect(wrapper.find('span').exists()).toBe(false);
      });
    });

    describe('when clicking another checkbox', async () => {
      beforeEach(async () => {
        await checkboxes[1].trigger('click');
      });

      it('should render 2 checkboxes', async () => {
        expect(checkboxes[0].attributes('data-state')).toBe('checked');
        expect(checkboxes[1].attributes('data-state')).toBe('checked');
        expect(checkboxes[2].attributes('data-state')).toBe('unchecked');
      });
    });
  });
});

describe('given a disabled ACheckbox', () => {
  const wrapper = mount(ACheckbox, { props: { disabled: true } });

  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element, {
      rules: {
        'label': { enabled: false },
        'nested-interactive': { enabled: false },
      },
    })).toHaveNoViolations();
  });

  describe('when clicking the checkbox', async () => {
    const checkbox = wrapper.find('button');
    await checkbox.trigger('click');
    it('should not render a indicator', async () => {
      expect(wrapper.find('span').exists()).toBeFalsy();
    });
  });
});

describe('given a disabled ACheckboxGroup', () => {
  const wrapper = mount(ACheckboxGroup, { props: { disabled: true } });

  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element, {
      rules: {
        label: { enabled: false },
      },
    })).toHaveNoViolations();
  });

  describe('when clicking the checkboxGroup', async () => {
    const checkboxes = wrapper.findAll('button');
    await checkboxes[0].trigger('click');

    it('should not render a indicator', async () => {
      expect(wrapper.find('span').exists()).toBeFalsy();
    });
  });
});

describe('given value as "indeterminate"', async () => {
  const wrapper = mount(ACheckbox, { props: { modelValue: 'indeterminate' } });

  it('should have [data-state] of "indeterminate"', () => {
    expect(wrapper.find('button').attributes('data-state')).toBe('indeterminate');
    expect(wrapper.find('span').attributes('data-state')).toBe('indeterminate');
  });

  it('should still be clickable', async () => {
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('button').attributes('data-state')).toBe('checked');
  });
});

describe('given checkbox in a form', async () => {
  const wrapper = mount({
    props: ['handleSubmit'],
    components: { ACheckbox },
    template: '<form @submit="handleSubmit"><ACheckbox value="true" /></form>',
  }, {
    props: { handleSubmit },
  });

  it('should have hidden input field', async () => {
    expect(wrapper.find('[type="checkbox"]').exists()).toBe(true);
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
      expect(handleSubmit.mock.results[1].value).toStrictEqual({ });
    });
  });

  afterAll(() => {
    handleSubmit.mockReset();
  });
});

describe('given checkboxGroup in a form', async () => {
  const wrapper = mount({
    props: ['handleSubmit'],
    components: { ACheckboxGroup },
    template: '<form @submit="handleSubmit"><ACheckboxGroup name="test" /></form>',
  }, {
    props: { handleSubmit },
  });

  let checkboxes: Array<DOMWrapper<HTMLButtonElement>>;
  let form: DOMWrapper<HTMLFormElement>;

  beforeEach(async () => {
    handleSubmit.mockClear();
    checkboxes = wrapper.findAll('button');
    form = wrapper.find('form');

    if (checkboxes[0].attributes('data-state') === 'unchecked') {
      await checkboxes[0].trigger('click');
    }
  });

  it('should have hidden input field', async () => {
    expect(wrapper.find('input[data-hidden]').exists()).toBe(true);
  });

  describe('after clicking submit button', () => {
    it('should trigger submit once', async () => {
      await form.trigger('submit');

      // Work around as the `handleSubmit.mock.results[0].value` is returning undefined
      const event = handleSubmit.mock.calls[0][0];
      const formData = new FormData(event.target);
      const submittedData = Object.fromEntries(formData as any);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(submittedData).toStrictEqual({ '[test][0][name]': 'jack' });
    });
  });

  describe('after uncheck and click submit button again', () => {
    beforeEach(async () => {
      await checkboxes[0].trigger('click');
      await form.trigger('submit');
    });

    it('should trigger submit once', () => {
      // Work around as the `handleSubmit.mock.results[0].value` is returning undefined
      const event = handleSubmit.mock.calls[0][0];
      const formData = new FormData(event.target);
      const submittedData = Object.fromEntries(formData as any);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(submittedData).toStrictEqual({ });
    });
  });
});
