import type { EditableRootProps } from './EditableRoot.vue';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/vue';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { nextTick } from 'vue';
import { useTestKbd } from '@/shared';
import Editable from './story/_Editable.vue';

const kbd = useTestKbd();

function setup(props: {
  editableProps?: EditableRootProps;
  onSubmit?: (data: string) => void;
  emits?: { 'onUpdate:modelValue'?: (data: string) => void };
} = {}) {
  const user = userEvent.setup();
  const returned = render(Editable, { props });
  const editable = returned.getByTestId('root');
  const input = returned.getByTestId('input') as HTMLInputElement;
  const preview = returned.getByTestId('preview');
  const area = returned.getByTestId('area');
  const edit = returned.getByTestId('edit');
  const submit = returned.getByTestId('submit');
  const cancel = returned.getByTestId('cancel');
  expect(editable).toBeVisible();
  return {
    ...returned,
    user,
    root: editable,
    input,
    area,
    edit,
    submit,
    cancel,
    preview,
  };
}

it('should pass axe accessibility tests', async () => {
  const { root } = setup();
  expect(await axe(root)).toHaveNoViolations();
});

describe('editable', () => {
  it('respects a default value if provided', async () => {
    const { preview } = setup({
      editableProps: { defaultValue: 'Default Value' },
    });
    expect(preview).toHaveTextContent('Default Value');
  });

  it('respects a default value if provided - `modelValue`', async () => {
    const { preview } = setup({
      editableProps: { modelValue: 'Default Value' },
    });

    expect(preview).toHaveTextContent('Default Value');
  });

  it('sets the placeholder value if any value isn\'t set', async () => {
    const { preview } = setup({
      editableProps: { placeholder: 'Enter text...' },
    });

    expect(preview).toHaveTextContent('Enter text...');
  });

  it('changes to editable mode when clicking on the preview', async () => {
    const { preview, edit } = setup();

    userEvent.click(preview);
    expect(edit).toBeVisible();
  });

  it('changes to editable mode when clicking on the edit button', async () => {
    const { edit, input } = setup();

    await userEvent.click(edit);
    expect(input).toBeVisible();
  });

  it('changes to editable mode when double clicking on the preview', async () => {
    const { preview, input } = setup({
      editableProps: { activationMode: 'dblclick' },
    });

    await userEvent.dblClick(preview);
    expect(input).toBeVisible();
  });

  it('selects the input value when entering edit mode and selectOnFocus is true', async () => {
    const { input, edit } = setup({
      editableProps: { defaultValue: 'Default Value', selectOnFocus: true },
    });

    await userEvent.click(edit);
    await vi.waitFor(() => expect(input).toHaveFocus());
    expect(input).toHaveValue('Default Value');
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);
  });

  it('starts in edit mode if the property is set', async () => {
    const { input } = setup({
      editableProps: { startWithEditMode: true },
    });

    expect(input).toBeVisible();
  });

  it('submits the value when pressing enter', async () => {
    let submittedValue = '';
    const { input, preview, edit, rerender } = setup({
      editableProps: { modelValue: '', submitMode: 'enter' },
      onSubmit: (data) => {
        submittedValue = data;
      },
      emits: {
        'onUpdate:modelValue': (data: string) => rerender({ modelValue: data }),
      },
    });

    await userEvent.click(edit);
    await userEvent.type(input, 'New Value');
    await userEvent.keyboard(kbd.ENTER);
    expect(preview).toBeVisible();
    expect(preview).toHaveTextContent('New Value');
    expect(submittedValue).toBe('New Value');
  });

  it('submits the value on blur', async () => {
    const { input, preview, rerender } = setup({
      editableProps: { modelValue: '', submitMode: 'blur' },
      emits: {
        'onUpdate:modelValue': (data: string) => rerender({ modelValue: data, submitMode: 'blur' }),
      },
    });

    await userEvent.dblClick(preview);
    await userEvent.type(input, 'New Value');
    await userEvent.click(document.children[0]);

    expect(preview).toBeVisible();
    expect(preview).toHaveTextContent('New Value');
  });

  it('submits the value when another editable is focused', async () => {
    const { getAllByTestId } = render({
      components: { Editable },
      template: '<Editable /><Editable />',
    });

    const [firstInput] = getAllByTestId('input');
    const [firstPreview, secondPreview] = getAllByTestId('preview');

    await userEvent.click(firstPreview);
    await userEvent.type(firstInput, 'New Value');
    await userEvent.click(secondPreview);

    expect(firstPreview).toHaveTextContent('New Value');
  });

  it('submits the value when pressing enter if submitMode is both', async () => {
    const { input, preview, edit, rerender } = setup({
      editableProps: { modelValue: '', submitMode: 'both' },
      emits: {
        'onUpdate:modelValue': (data: string) => rerender({ modelValue: data }),
      },
    });

    await userEvent.click(edit);
    await userEvent.type(input, 'New Value');
    await userEvent.keyboard(kbd.ENTER);
    expect(preview).toBeVisible();
    expect(preview).toHaveTextContent('New Value');
  });

  it('submits the value on blur if submitMode is both', async () => {
    const { input, preview, rerender } = setup({
      editableProps: { modelValue: '', submitMode: 'both' },
      emits: {
        'onUpdate:modelValue': (data: string) => rerender({ modelValue: data, submitMode: 'blur' }),
      },
    });

    await userEvent.dblClick(preview);
    await userEvent.type(input, 'New Value');
    await userEvent.click(document.children[0]);

    expect(preview).toBeVisible();
    expect(preview).toHaveTextContent('New Value');
  });

  it('prevents entering edit mode when disabled', async () => {
    const { preview, edit } = setup({
      editableProps: { disabled: true },
    });

    await userEvent.click(preview);

    expect(edit).not.toBeVisible();
  });

  it('prevents editing the input value when readonly', async () => {
    const { input, edit } = setup({
      editableProps: { defaultValue: 'Default Value', readonly: true },
    });

    await userEvent.click(edit);

    expect(input).toBeVisible();

    await userEvent.type(input, 'New Value');

    expect(input).toHaveValue('Default Value');
  });

  it('uses the proper styles when autoResize is true', async () => {
    const { input, preview, edit } = setup({
      editableProps: { defaultValue: 'Default Value', autoResize: true },
    });

    expect(input).toHaveStyle({ visibility: 'hidden' });

    await userEvent.click(edit);

    expect(preview).toHaveStyle({ visibility: 'hidden' });
  });

  it('should prevent user input text more than given `maxLength`', async () => {
    const { input, edit } = setup({
      editableProps: { maxLength: 10 },
    });

    await userEvent.click(edit);

    await userEvent.type(input, 'lorem ipsum dolor sit amet');

    expect(input).toHaveValue('lorem ipsu');
  });
});

describe('beforeSubmit', () => {
  function deferred() {
    let resolve!: (value: boolean | void) => void;
    let reject!: (reason?: unknown) => void;
    const promise = new Promise<boolean | void>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }

  it('without beforeSubmit, submit still closes synchronously', async () => {
    const { input, preview, edit } = setup({
      editableProps: { submitMode: 'enter' },
    });

    await userEvent.click(edit);
    await userEvent.type(input, 'Sync');
    await userEvent.keyboard('{Enter}');
    // no await between the keypress and the assertion on purpose
    expect(preview).toBeVisible();
    expect(preview).toHaveTextContent('Sync');
  });

  it('keeps the editor open with the typed value when beforeSubmit resolves false', async () => {
    const onSubmit = vi.fn();
    const { input, preview, edit } = setup({
      editableProps: {
        submitMode: 'enter',
        beforeSubmit: () => false,
      },
      onSubmit,
    });

    await userEvent.click(edit);
    await userEvent.type(input, 'Bad');
    await userEvent.keyboard('{Enter}');

    await vi.waitFor(() => expect(input).not.toBeDisabled());
    expect(input).toBeVisible();
    expect(input.value).toBe('Bad');
    expect(preview).not.toHaveTextContent('Bad');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('keeps the editor open when beforeSubmit rejects', async () => {
    const onSubmit = vi.fn();
    const beforeSubmit = vi.fn(() => Promise.reject(new Error('nope')));
    const { input, edit } = setup({
      editableProps: { submitMode: 'enter', beforeSubmit },
      onSubmit,
    });

    await userEvent.click(edit);
    await userEvent.type(input, 'Bad');
    await userEvent.keyboard('{Enter}');

    await vi.waitFor(() => expect(beforeSubmit).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(input).not.toBeDisabled());
    expect(input).toBeVisible();
    expect(input.value).toBe('Bad');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('disables the input and sets data-submitting while beforeSubmit is pending', async () => {
    const pending = deferred();
    const onSubmit = vi.fn();
    const { input, root, preview, edit } = setup({
      editableProps: {
        submitMode: 'enter',
        beforeSubmit: () => pending.promise,
      },
      onSubmit,
    });

    await userEvent.click(edit);
    await userEvent.type(input, 'New');
    await userEvent.keyboard('{Enter}');

    await vi.waitFor(() => expect(input).toBeDisabled());
    expect(root).toHaveAttribute('data-submitting');
    expect(input).toBeVisible();

    pending.resolve();

    await vi.waitFor(() => expect(preview).toBeVisible());
    expect(preview).toHaveTextContent('New');
    expect(root).not.toHaveAttribute('data-submitting');
    expect(onSubmit).toHaveBeenCalledWith('New');
  });

  it('calls beforeSubmit once when a second submit arrives while pending', async () => {
    const pending = deferred();
    const beforeSubmit = vi.fn(() => pending.promise);
    const { input, edit, preview } = setup({
      editableProps: { submitMode: 'both', beforeSubmit },
    });

    await userEvent.click(edit);
    await userEvent.type(input, 'New');
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(input).toBeDisabled());

    await userEvent.click(document.body);
    expect(beforeSubmit).toHaveBeenCalledTimes(1);

    pending.resolve();
    await vi.waitFor(() => expect(preview).toBeVisible());
    expect(beforeSubmit).toHaveBeenCalledTimes(1);
  });

  it('ignores Escape while a submit is pending', async () => {
    const pending = deferred();
    const { input, edit, root } = setup({
      editableProps: {
        submitMode: 'enter',
        beforeSubmit: () => pending.promise,
      },
    });

    await userEvent.click(edit);
    await userEvent.type(input, 'New');
    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(root).toHaveAttribute('data-submitting'));

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTick();
    expect(input).toBeVisible();
    expect(input.value).toBe('New');

    pending.resolve();
    await vi.waitFor(() => expect(root).not.toHaveAttribute('data-submitting'));
  });
});

describe('multiline', () => {
  it('enter does not submit; Ctrl+Enter does', async () => {
    const onSubmit = vi.fn();
    const { input, preview, edit } = setup({
      editableProps: { submitMode: 'enter', multiline: true },
      onSubmit,
    });

    await userEvent.click(edit);
    await userEvent.type(input, 'Line');
    await userEvent.keyboard('{Enter}');
    expect(input).toBeVisible();
    expect(onSubmit).not.toHaveBeenCalled();

    await userEvent.keyboard('{Control>}{Enter}{/Control}');
    expect(preview).toBeVisible();
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
