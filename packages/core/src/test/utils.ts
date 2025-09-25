import { vi } from 'vitest';

export const handleSubmit = vi.fn((event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  return Object.fromEntries(formData as any);
});
