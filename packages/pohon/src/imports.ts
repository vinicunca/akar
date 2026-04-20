/**
 * Public composable names for Nuxt `addImports` (mirrors Nuxt UI `imports.ts`).
 * Vite plugin auto-import also scans `runtime/composables`.
 */
export const publicComposables: Record<string, string[]> = {
  'define-locale': ['defineLocale', 'extendLocale'],
  'define-shortcuts': ['defineShortcuts', 'extractShortcuts'],
  'use-content-search': ['useContentSearch'],
  'use-editor-menu': ['useEditorMenu'],
  'use-file-upload': ['useFileUpload'],
  'use-form-field': ['useFormField'],
  'use-ime-guard': ['useIMEGuard'],
  'use-kbd': ['useKbd'],
  'use-overlay': ['useOverlay'],
  'use-resizable': ['useResizable'],
  'use-resolved-variants': ['useResolvedVariants'],
  'use-scroll-shadow': ['useScrollShadow'],
  'use-scrollspy': ['useScrollspy'],
  'use-toast': ['useToast'],
};
