export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    display: 'clamp(3rem, 8vw, 7.5rem)',
    h1: 'clamp(2.5rem, 5vw, 5rem)',
    h2: 'clamp(2rem, 3.5vw, 3.5rem)',
    h3: 'clamp(1.5rem, 2vw, 2rem)',
    body: 'clamp(1rem, 1.1vw, 1.125rem)',
    small: 'clamp(0.75rem, 0.8vw, 0.875rem)',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;
