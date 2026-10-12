import type { Config } from 'tailwindcss';

/**
 * Colours are CSS variables (see src/index.css) so the light/dark theme
 * swaps by toggling the `dark` class on <html>, without duplicating classes.
 */
const withAlpha = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        bg: withAlpha('bg'),
        surface: withAlpha('surface'),
        elevated: withAlpha('elevated'),
        border: withAlpha('border'),
        fg: withAlpha('fg'),
        muted: withAlpha('muted'),
        accent: withAlpha('accent'),
        'accent-strong': withAlpha('accent-strong'),
        'accent-2': withAlpha('accent-2'),
        'on-accent': withAlpha('on-accent'),
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk Variable"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: { '50%': { opacity: '0' } },
      },
      animation: {
        'gradient-pan': 'gradient-pan 8s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
