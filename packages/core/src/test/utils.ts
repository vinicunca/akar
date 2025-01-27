import { vi } from 'vitest';

export const handleSubmit = vi.fn((e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  return Object.fromEntries(formData as any);
});
