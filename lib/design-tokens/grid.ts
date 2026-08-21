export const grid = {
  columns: 12,
  maxWidth: '1280px',
  gutter: '1.5rem',
  margin: '2rem',
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  container: {
    padding: {
      DEFAULT: '1rem',
      sm: '1.5rem',
      md: '2rem',
      lg: '2.5rem',
    },
  },
} as const;
