import type { DOMWrapper, VueWrapper } from '@vue/test-utils';
import type { Mock, MockInstance } from 'vitest';
import { findByText, fireEvent, render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent, nextTick } from 'vue';
import { ADialogClose, ADialogContent, ADialogOverlay, ADialogRoot, ADialogTitle, ADialogTrigger } from '.';

const OPEN_TEXT = 'Open';
const CLOSE_TEXT = 'Close';
const TITLE_TEXT = 'Title';

const NoLabelDialogTest = defineComponent({
  components: { ADialogRoot, ADialogTrigger, ADialogOverlay, ADialogContent, ADialogClose },
  template: `<ADialogRoot>
  <ADialogTrigger>${OPEN_TEXT}</ADialogTrigger>
  <ADialogOverlay />
  <ADialogContent>
    <ADialogClose>${CLOSE_TEXT}</ADialogClose>
  </ADialogContent>
</ADialogRoot>`,
});

const UndefinedDescribedByDialog = defineComponent({
  components: { ADialogRoot, ADialogTrigger, ADialogOverlay, ADialogContent, ADialogClose, ADialogTitle },
  template: `<ADialogRoot>
  <ADialogTrigger>${OPEN_TEXT}</ADialogTrigger>
  <ADialogOverlay />
  <ADialogContent :aria-describedby="undefined">
    <ADialogTitle>${TITLE_TEXT}</ADialogTitle>
    <ADialogClose>${CLOSE_TEXT}</ADialogClose>
  </ADialogContent>
</ADialogRoot>`,
});

function renderAndClickDialogTrigger(Dialog: any) {
  fireEvent.click(render(Dialog).getByText(OPEN_TEXT));
}

const DialogTest = defineComponent({
  components: { ADialogRoot, ADialogTrigger, ADialogOverlay, ADialogContent, ADialogClose, ADialogTitle },
  template: `<ADialogRoot >
  <ADialogTrigger>${OPEN_TEXT}</ADialogTrigger>
  <ADialogOverlay />
  <ADialogContent>
    <ADialogTitle>${TITLE_TEXT}</ADialogTitle>
    <ADialogClose>${CLOSE_TEXT}</ADialogClose>
  </ADialogContent>
</ADialogRoot>`,
});

describe('given a default Dialog', () => {
  let wrapper: VueWrapper<InstanceType<typeof DialogTest>>;
  let trigger: DOMWrapper<HTMLElement>;
  let closeButton: HTMLElement;
  let consoleWarnMock: MockInstance;
  let consoleWarnMockFunction: Mock;

  beforeEach(() => {
    document.body.innerHTML = '';
    wrapper = mount(DialogTest, { attachTo: document.body });
    trigger = wrapper.find('button');
    consoleWarnMockFunction = vi.fn();
    consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(consoleWarnMockFunction);
  });

  afterEach(() => {
    consoleWarnMock.mockRestore();
    consoleWarnMockFunction.mockClear();
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(document.body)).toHaveNoViolations();

    // open modal
    wrapper.find('button').element.click();
    await nextTick();
    expect(await axe(document.body)).toHaveNoViolations();
  });

  describe('after clicking the trigger', () => {
    beforeEach(async () => {
      fireEvent.click(trigger.element);
      closeButton = await findByText(document.body, CLOSE_TEXT);
    });

    describe('when no description has been provided', () => {
      it('should warn to the console', () => {
        expect(consoleWarnMockFunction).toHaveBeenCalledTimes(1);
      });
    });

    describe('when no title has been provided', () => {
      beforeEach(() => {
        document.body.innerHTML = '';
      });
      it('should warn to the console', () => {
        renderAndClickDialogTrigger(NoLabelDialogTest);
        expect(consoleWarnMockFunction).toHaveBeenCalledTimes(1);
      });
    });

    describe('when aria-describedby is set to undefined', () => {
      beforeEach(() => {
        document.body.innerHTML = '';
      });
      it('should not warn to the console', () => {
        consoleWarnMockFunction.mockClear();

        renderAndClickDialogTrigger(UndefinedDescribedByDialog);
        expect(consoleWarnMockFunction).not.toHaveBeenCalled();
      });
    });

    it('should open the content', () => {
      expect(document.body.innerHTML).toContain(closeButton.innerHTML);
    });

    it('should focus the close button', () => {
      expect(closeButton).toBe(document.activeElement);
    });

    describe('when pressing escape', () => {
      beforeEach(() => {
        fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      });

      it('should close the content', () => {
        expect(document.body.innerHTML).not.toContain(closeButton.innerHTML);
      });

      it('should focus trigger', async () => {
        expect(document.activeElement).toBe(trigger.element);
      });
    });
  });
});
