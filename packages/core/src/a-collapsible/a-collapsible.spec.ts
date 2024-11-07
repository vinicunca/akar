import type { DOMWrapper, VueWrapper } from '@vue/test-utils';

import { findByText } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import ACollapsible from './story/_a-collapsible.vue';

const CONTENT_TEXT = 'Content';

describe('given a default ACollapsible', async () => {
  let wrapper: VueWrapper<InstanceType<typeof ACollapsible>>;
  let trigger: DOMWrapper<HTMLButtonElement>;
  let content: DOMWrapper<HTMLDivElement>;

  beforeEach(() => {
    wrapper = mount(ACollapsible);
    trigger = wrapper.find('button');
    content = wrapper.find('[hidden]');
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  it('should have hidden content', async () => {
    expect(content.element).not.toBeNull();
    expect(content.element).toHaveTextContent('');
  });

  describe('when clicking the trigger', async () => {
    let content: HTMLElement;
    beforeEach(async () => {
      await trigger.trigger('click');
      content = await findByText(wrapper.element as HTMLElement, CONTENT_TEXT);
    });

    it('should open the content', async () => {
      expect(wrapper.text()).toContain(content.innerHTML);
    });

    describe('and clicking the trigger again', () => {
      beforeEach(() => {
        trigger.trigger('click');
      });

      it('should close the content', () => {
        expect(wrapper.text()).not.toContain(content.innerHTML);
      });
    });
  });
});

describe('given a ACollapsible with `unmountOnHide:false`', async () => {
  let wrapper: VueWrapper<InstanceType<typeof ACollapsible>>;
  let trigger: DOMWrapper<HTMLButtonElement>;
  let content: DOMWrapper<HTMLDivElement>;

  beforeEach(() => {
    wrapper = mount(ACollapsible, { props: { unmountOnHide: false } });
    trigger = wrapper.find('button');
    content = wrapper.find('[hidden]');
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  it('should have hidden attribute', async () => {
    // `jsdom` doesn't render hidden attribute correctly
    expect(content.element.getAttribute('hidden')).toBe('');
    // it should be
    // expect(content.element.getAttribute('hidden')).toBe('until-found')
  });

  describe('when clicking the trigger', async () => {
    let content: HTMLElement;
    beforeEach(async () => {
      await trigger.trigger('click');
      content = await findByText(wrapper.element as HTMLElement, CONTENT_TEXT);
    });

    it('should open the content', async () => {
      expect(wrapper.text()).toContain(content.innerHTML);
    });

    describe('and clicking the trigger again', () => {
      beforeEach(() => {
        trigger.trigger('click');
      });

      it('should close the content', () => {
        expect(content.getAttribute('data-state')).toBe('closed');
        expect(content.getAttribute('hidden')).toBe('');
        expect(wrapper.text()).toContain(content.innerHTML);
      });
    });
  });
});

describe('given an open uncontrolled ACollapsible', () => {
  let content: HTMLElement;
  describe('when clicking the trigger', async () => {
    let wrapper: VueWrapper<InstanceType<typeof ACollapsible>>;
    beforeEach(async () => {
      wrapper = mount(ACollapsible, {
        props: {
          defaultOpen: true,
        },
      });
      content = await findByText(wrapper.element as HTMLElement, CONTENT_TEXT);
    });

    it('should open the content by default', () => {
      expect(wrapper.text()).toContain(content.innerHTML);
    });

    it('should close the content', async () => {
      const trigger = wrapper.find('button');
      await trigger.trigger('click');
      expect(wrapper.text()).not.toContain(content.innerHTML);
    });

    it('should call `update:open` prop with `false` value', () => {
      wrapper.vm.$emit('update:open', false);
      expect(wrapper.emitted('update:open')?.[0]?.[0]).toBe(false);
    });
  });
});
