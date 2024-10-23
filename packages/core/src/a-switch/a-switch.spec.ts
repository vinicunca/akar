import { fireEvent, render, screen } from '@testing-library/vue';
import { KEY_CODES } from '@vinicunca/perkakas';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { handleSubmit } from '~~/test';

import ASwitch from './_a-switch.vue';

describe('test switch functionalities', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should pass axe accessibility tests', async () => {
    const wrapper = mount(ASwitch);
    expect(await axe(wrapper.element, {
      rules: {
        label: { enabled: false },
      },
    })).toHaveNoViolations();
  });

  it('thumb can render', async () => {
    render(ASwitch);
    screen.getByTestId('thumb');
  });

  it('clicking thumb will toggle value', async () => {
    const { container } = render(ASwitch);
    const root = container.querySelector('button')!;
    screen.getByText('unchecked');

    await fireEvent.click(root);
    screen.getByText('checked');

    await fireEvent.click(root);
    screen.getByText('unchecked');
  });

  it('keydown enter root will toggle value', async () => {
    const { container } = render(ASwitch);
    const button = container.querySelector('button')!;
    screen.getByText('unchecked');

    await fireEvent.keyDown(button, { key: KEY_CODES.ENTER });
    screen.getByText('checked');

    await fireEvent.keyDown(button, { key: KEY_CODES.ENTER });
    screen.getByText('unchecked');
  });
});

describe('given switch in a form', async () => {
  const wrapper = mount({
    props: ['handleSubmit'],
    components: { ASwitch },
    template: '<form @submit="handleSubmit"><ASwitch /></form>',
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
});
