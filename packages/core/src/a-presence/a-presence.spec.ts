import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { defineComponent, onMounted, ref } from 'vue';

import { APresence } from '.';

const CONTENT = 'Content';

describe('given a default a-presence', () => {
  const wrapper = mount(
    defineComponent({
      components: { APresence },
      setup: () => {
        return { open: ref(false) };
      },
      template: `
      <div>
        <button @click="open = !open">
          toggle
        </button>
      </div>

      <APresence :present="open">
        <div>${CONTENT}</div>
      </APresence>
      `,
    }),
  );

  it('should not show content', () => {
    expect(wrapper.html()).not.toContain(CONTENT);
  });

  describe('after clicking trigger', () => {
    beforeEach(async () => {
      await wrapper.find('button').trigger('click');
    });

    it('should show content', () => {
      expect(wrapper.html()).toContain(CONTENT);
    });

    describe('after clicking trigger again', () => {
      it('should not show content', () => {
        expect(wrapper.html()).not.toContain(CONTENT);
      });
    });
  });
});

describe('given a forceMounted a-presence', () => {
  const wrapper = mount(
    defineComponent({
      components: { APresence },
      setup: () => {
        return { open: ref(false) };
      },
      template: `
      <section>
        <button @click="open = !open">
          toggle
        </button>
      </section>

      <APresence forceMount :present="open" v-slot="{ present }">
        <div :data-present="present">${CONTENT}</div>
      </APresence>
      `,
    }),
  );

  it('should show content', () => {
    expect(wrapper.html()).toContain(CONTENT);
    expect(wrapper.find('div').attributes('data-present')).toBe('false');
  });

  describe('after clicking trigger', () => {
    beforeEach(async () => {
      await wrapper.find('button').trigger('click');
    });

    it('should show content', () => {
      expect(wrapper.html()).toContain(CONTENT);
      expect(wrapper.find('div').attributes('data-present')).toBe('true');
    });

    describe('after clicking trigger again', () => {
      it('should always show content', () => {
        expect(wrapper.html()).toContain(CONTENT);
        expect(wrapper.find('div').attributes('data-present')).toBe('false');
      });
    });
  });
});

const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.animate[data-state=open]{
  animation: fadeIn 2s;
}
.animate[data-state=closed]{
  animation: fadeOut 2s;
}`;

describe('given a APresence with animated content', () => {
  const wrapper = mount(
    defineComponent({
      components: { APresence },
      setup: (_props) => {
        const el = ref();

        onMounted(() => {
          const css = document.createElement('style');
          css.appendChild(document.createTextNode(styles));
          el.value.appendChild(css);
        });

        return { open: ref(false), el };
      },
      template: `
    <div ref="el">
      <button @click="open = !open">
        toggle
      </button>

      <APresence :present="open">
        <div class="animate" :data-state="open ? 'open' : 'closed'">${CONTENT}</div>
      </APresence>
    </div>`,
    }),
  );

  it('should not show content', () => {
    expect(wrapper.html()).not.toContain(CONTENT);
  });

  describe('after clicking trigger', () => {
    beforeEach(async () => {
      await wrapper.find('button').trigger('click');
    });

    it('should show content', () => {
      expect(wrapper.html()).toContain(CONTENT);
    });

    describe('after clicking trigger again', () => {
      it('should not show content', () => {
        expect(wrapper.html()).not.toContain(CONTENT);
      });
    });
  });
});

describe.todo('given multiple children', () => {
  it('should throw an error', () => {
    const component = defineComponent({
      components: { APresence },
      setup: () => {
        return { open: ref(false) };
      },
      template: `
        <APresence :present="open">
          <div>${CONTENT}</div>
          <div>${CONTENT}</div>
        </APresence>
      `,
    });

    expect(() => mount(component)).toThrowError();
  });
});

describe.todo('given the component is unmounted', () => {
  // TODO: add test cases
});
