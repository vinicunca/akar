/**
 * This is a workaround since app.config is not capable to get the options from a module,
 * so we need to hardcode it.
 */
export const BRANDS = ['primary', 'secondary', 'success', 'info', 'warning', 'error'] as const;

export const UNO_THEME_COLORS = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'] as const;
export const NEUTRALS_COLORS = ['slate', 'gray', 'zinc', 'neutral', 'stone'] as const;

export const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
