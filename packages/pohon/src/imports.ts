// Keep in sync with the actual named exports from each composable file.
// Used by both the Nuxt module (`addImports`) and Vite plugin (`unplugin-auto-import`).
export const publicComposables: Record<string, Array<string>> = {
  'define-locale': ['defineLocale', 'extendLocale'],
  'define-shortcuts': ['defineShortcuts', 'extractShortcuts'],
  'use-content-search': ['useContentSearch'],
  'use-file-upload': ['useFileUpload'],
  'use-form-field': ['useFormField'],
  'use-kbd': ['useKbd'],
  'use-overlay': ['useOverlay'],
  'use-resizable': ['useResizable'],
  'use-scroll-shadow': ['useScrollShadow'],
  'use-scrollspy': ['useScrollspy'],
  'use-toast': ['useToast'],
};
