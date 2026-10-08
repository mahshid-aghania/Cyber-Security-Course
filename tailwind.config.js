/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens are driven by CSS variables (see index.css) so the
        // same class names work in both dark and light mode.
        canvas: 'rgb(var(--c-canvas) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        hairline: 'rgb(var(--c-hairline) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        // Fixed accent palette (consistent across themes)
        cyan: '#57D8ED',
        teal: '#5FE0BE',
        violet: '#A78BFA',
        warn: '#F4BE62',
        danger: '#FB7185',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(87 216 237 / 0.18), 0 8px 40px -8px rgb(87 216 237 / 0.25)',
        'glow-violet': '0 0 0 1px rgb(167 139 250 / 0.2), 0 8px 40px -8px rgb(167 139 250 / 0.28)',
        card: '0 1px 0 0 rgb(255 255 255 / 0.03) inset, 0 12px 30px -16px rgb(0 0 0 / 0.6)',
      },
      backgroundImage: {
        'grid-dark':
          'linear-gradient(rgb(255 255 255 / 0.025) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.025) 1px, transparent 1px)',
        'radial-fade': 'radial-gradient(ellipse at top, rgb(87 216 237 / 0.10), transparent 60%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        dash: {
          to: { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pulse-glow': 'pulseGlow 2.4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
