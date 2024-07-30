import { type Mock, type MockInstance, afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { ADialogClose, ADialogContent, ADialogOverlay, ADialogRoot, ADialogTitle, ADialogTrigger } from '.'
import { findByText, fireEvent, render } from '@testing-library/vue'

const OPEN_TEXT = 'Open'
const CLOSE_TEXT = 'Close'
const TITLE_TEXT = 'Title'

const NoLabelADialogTest = defineComponent({
  components: { ADialogRoot, ADialogTrigger, ADialogOverlay, ADialogContent, ADialogClose },
  template: `<ADialogRoot>
  <ADialogTrigger>${OPEN_TEXT}</ADialogTrigger>
  <ADialogOverlay />
  <ADialogContent>
    <ADialogClose>${CLOSE_TEXT}</ADialogClose>
  </ADialogContent>
</ADialogRoot>`,
})

const UndefinedDescribedByADialog = defineComponent({
  components: { ADialogRoot, ADialogTrigger, ADialogOverlay, ADialogContent, ADialogClose, ADialogTitle },
  template: `<ADialogRoot>
  <ADialogTrigger>${OPEN_TEXT}</ADialogTrigger>
  <ADialogOverlay />
  <ADialogContent :aria-describedby="undefined">
    <ADialogTitle>${TITLE_TEXT}</ADialogTitle>
    <ADialogClose>${CLOSE_TEXT}</ADialogClose>
  </ADialogContent>
</ADialogRoot>`,
})

function renderAndClickADialogTrigger(ADialog: any) {
  fireEvent.click(render(ADialog).getByText(OPEN_TEXT))
}

const ADialogTest = defineComponent({
  components: { ADialogRoot, ADialogTrigger, ADialogOverlay, ADialogContent, ADialogClose, ADialogTitle },
  template: `<ADialogRoot >
  <ADialogTrigger>${OPEN_TEXT}</ADialogTrigger>
  <ADialogOverlay />
  <ADialogContent>
    <ADialogTitle>${TITLE_TEXT}</ADialogTitle>
    <ADialogClose>${CLOSE_TEXT}</ADialogClose>
  </ADialogContent>
</ADialogRoot>`,
})

describe('given a default ADialog', () => {
  let wrapper: VueWrapper<InstanceType<typeof ADialogTest>>
  let trigger: DOMWrapper<HTMLElement>
  let closeButton: HTMLElement
  let consoleWarnMock: MockInstance
  let consoleWarnMockFunction: Mock

  beforeEach(() => {
    document.body.innerHTML = ''
    wrapper = mount(ADialogTest, { attachTo: document.body })
    trigger = wrapper.find('button')
    consoleWarnMockFunction = vi.fn()
    consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(consoleWarnMockFunction)
  })

  afterEach(() => {
    consoleWarnMock.mockRestore()
    consoleWarnMockFunction.mockClear
  })

  it('should pass axe accessibility tests', async () => {
    expect(await axe(document.body)).toHaveNoViolations()

    // open modal
    wrapper.find('button').element.click()
    await nextTick()
    expect(await axe(document.body)).toHaveNoViolations()
  })

  describe('after clicking the trigger', () => {
    beforeEach(async () => {
      fireEvent.click(trigger.element)
      closeButton = await findByText(document.body, CLOSE_TEXT)
    })

    describe('when no description has been provided', () => {
      it('should warn to the console', () => {
        expect(consoleWarnMockFunction).toHaveBeenCalledTimes(1)
      })
    })

    describe('when no title has been provided', () => {
      beforeEach(() => {
        document.body.innerHTML = ''
      })
      it('should warn to the console', () => {
        renderAndClickADialogTrigger(NoLabelADialogTest)
        expect(consoleWarnMockFunction).toHaveBeenCalledTimes(1)
      })
    })

    describe('when aria-describedby is set to undefined', () => {
      beforeEach(() => {
        document.body.innerHTML = ''
      })
      it('should not warn to the console', () => {
        consoleWarnMockFunction.mockClear()

        renderAndClickADialogTrigger(UndefinedDescribedByADialog)
        expect(consoleWarnMockFunction).not.toHaveBeenCalled()
      })
    })

    it('should open the content', () => {
      expect(document.body.innerHTML).toContain(closeButton.innerHTML)
    })

    it('should focus the close button', () => {
      expect(closeButton).toBe(document.activeElement)
    })

    describe('when pressing escape', () => {
      beforeEach(() => {
        fireEvent.keyDown(document.activeElement!, { key: 'Escape' })
      })

      it('should close the content', () => {
        expect(document.body.innerHTML).not.toContain(closeButton.innerHTML)
      })

      it('should focus trigger', async () => {
        expect(document.activeElement).toBe(trigger.element)
      })
    })
  })
})
