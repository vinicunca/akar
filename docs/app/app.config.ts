import { defineAppConfig } from '#imports';

export default defineAppConfig({
  toaster: {
    position: 'bottom-right',
    expand: true,
    duration: 5000,
  },
  theme: {
    radius: 0.25,
    blackAsPrimary: false,
  },
});
