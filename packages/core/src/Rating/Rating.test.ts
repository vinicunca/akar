import type { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { fireEvent } from '@testing-library/vue';
import { sleep } from '@vinicunca/perkakas';
import { renderToString } from '@vue/server-renderer';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { createSSRApp, defineComponent, h, nextTick } from 'vue';
import { RatingRoot } from '..';
import Rating from './story/_Rating.vue';

function getStepOpacity(style: string | undefined) {
  return style?.match(/--akar-rating-item-step-opacity:\s*([^;]+)/)?.[1]?.trim();
}

const RatingHydrationFixture = defineComponent({
  setup() {
    return () =>
      h(Rating, {
        defaultValue: 2.5,
        step: 0.5,
        length: 3,
      });
  },
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ssr hydration', () => {
  it('does not mismatch fractional step opacity when activeElement is nullish', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Nuxt SSR has no focused element (useActiveElement → undefined). In jsdom,
    // stub the same so undefined === undefined cannot falsely mark half-steps visible.
    const activeElementDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'activeElement');
    Object.defineProperty(document, 'activeElement', {
      configurable: true,
      enumerable: true,
      get: () => undefined,
    });

    try {
      const serverApp = createSSRApp(RatingHydrationFixture);
      const container = document.createElement('div');
      container.innerHTML = await renderToString(serverApp);

      // value 2.5 with step 0.5 → steps: 0.5,1,1.5,2,2.5,3
      const serverOpacities = [...container.querySelectorAll('[role=radio]')]
        .map((el) => getStepOpacity(el.getAttribute('style') ?? undefined));
      expect(serverOpacities).toEqual(['0', '1', '0', '1', '1', '1']);

      if (activeElementDescriptor) {
        Object.defineProperty(Document.prototype, 'activeElement', activeElementDescriptor);
      }
      // Drop the instance override so the prototype getter is used again.
      delete (document as Document & { activeElement?: Element }).activeElement;

      document.body.innerHTML = '';
      document.body.append(container);

      const clientApp = createSSRApp(RatingHydrationFixture);
      clientApp.mount(container);
      await nextTick();

      const clientOpacities = [...container.querySelectorAll('[role=radio]')]
        .map((el) => getStepOpacity(el.getAttribute('style') ?? undefined));
      expect(clientOpacities).toEqual(serverOpacities);

      const warnings = warn.mock.calls.flat().join('\n');
      expect(warnings).not.toContain('Hydration attribute mismatch');
      expect(error.mock.calls.flat().join('\n')).not.toContain('Hydration completed but contains mismatches');
    } finally {
      delete (document as Document & { activeElement?: Element }).activeElement;
      if (activeElementDescriptor) {
        Object.defineProperty(Document.prototype, 'activeElement', activeElementDescriptor);
      }
    }
  });
});

describe('given a fractional step Rating', () => {
  let wrapper: VueWrapper<InstanceType<typeof Rating>>;
  let radios: Array<DOMWrapper<HTMLElement>>;

  beforeEach(() => {
    document.body.innerHTML = '';
    wrapper = mount(Rating, {
      attachTo: document.body,
      props: { defaultValue: 2.5, step: 0.5, length: 3 },
    });
    radios = wrapper.findAll('[role=radio]');
  });

  it('hides inactive half-step indicators when not focused', () => {
    const opacities = radios.map((radio) => getStepOpacity(radio.attributes('style')));
    expect(opacities).toEqual(['0', '1', '0', '1', '1', '1']);
  });
});

describe('given a default Rating', () => {
  let wrapper: VueWrapper<InstanceType<typeof Rating>>;
  let radios: Array<DOMWrapper<HTMLElement>>;

  beforeEach(() => {
    document.body.innerHTML = '';
    wrapper = mount(Rating, { attachTo: document.body, props: { defaultValue: 1, length: 3, orientation: 'vertical' } });
    radios = wrapper.findAll('[role=radio]');
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  it('should have default selected', () => {
    expect(radios[0].attributes('data-state')).toBe('active');
    expect(radios[1].attributes('data-state')).toBeUndefined();
    expect(radios[2].attributes('data-state')).toBeUndefined();
  });

  describe('on keyboard navigation', () => {
    beforeEach(async () => {
      radios[0].element.focus();
      await fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
      await sleep(0);
    });

    it('should emit `update:modelValue` on keyboard navigation', async () => {
      const root = wrapper.findComponent(RatingRoot);
      expect(root.emitted('update:modelValue')?.[0]?.[0]).toBe(2);
    });

    it('should select next item on keydown', async () => {
      expect(radios[0].attributes('data-state')).toBe('active');
      expect(radios[1].attributes('data-state')).toBe('active');
      expect(radios[1].element).toBe(document.activeElement);
    });

    describe('on arrow up', () => {
      it('should select the first item again', async () => {
        await fireEvent.keyDown(document.activeElement!, { key: 'ArrowUp' });
        await sleep(0);
        expect(radios[0].attributes('data-state')).toBe('active');
        expect(radios[2].attributes('data-state')).toBeUndefined();
      });
    });
  });
});

describe('given a hoverable Rating', () => {
  let wrapper: VueWrapper<InstanceType<typeof Rating>>;
  let root: DOMWrapper<HTMLElement>;
  let radios: Array<DOMWrapper<HTMLElement>>;

  beforeEach(() => {
    document.body.innerHTML = '';
    wrapper = mount(Rating, { attachTo: document.body, props: { defaultValue: 1, hoverable: true, length: 3 } });
    root = wrapper.find('[role=radiogroup]');
    radios = wrapper.findAll('[role=radio]');
  });

  it('should preview the hovered rating', async () => {
    await fireEvent.mouseEnter(radios[2].element);
    expect(radios[1].attributes('data-state')).toBe('active');
    expect(radios[2].attributes('data-state')).toBe('active');
  });

  it('should reset the preview to the model value on mouse leave', async () => {
    await fireEvent.mouseEnter(radios[2].element);
    await fireEvent.mouseLeave(root.element);

    expect(radios[0].attributes('data-state')).toBe('active');
    expect(radios[1].attributes('data-state')).toBeUndefined();
    expect(radios[2].attributes('data-state')).toBeUndefined();
  });
});

describe('given disabled Rating', () => {
  let wrapper: VueWrapper<InstanceType<typeof Rating>>;
  let radios: Array<DOMWrapper<HTMLElement>>;

  beforeEach(() => {
    document.body.innerHTML = '';
    wrapper = mount(Rating, { attachTo: document.body, props: { defaultValue: 1, disabled: true, length: 3 } });
    radios = wrapper.findAll('[role=radio]');
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  it('should have default selected', () => {
    expect(radios[0].attributes('data-state')).toBe('active');
  });

  it.each([[0, 'active'], [1, undefined], [2, undefined]])('should not select any item', async (input, output) => {
    await radios[input].trigger('click');
    expect(radios[input].attributes('data-state')).toBe(output);
  });

  it.each([[0], [1], [2]])('should have disabled attribute on item', async (input) => {
    expect(radios[input].attributes('disabled')).toBe('');
    expect(radios[input].attributes('data-disabled')).toBe('');
  });
});
