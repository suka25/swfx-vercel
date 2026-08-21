export const colors = {
  background: {
    primary: '#080A0D',
    surface: '#0D1117',
    elevated: '#121820',
    glass: 'rgba(8,10,13,0.85)',
  },
  text: {
    primary: '#F5F7FA',
    secondary: '#8B949E',
    muted: '#4B5563',
    inverse: '#080A0D',
  },
  accent: {
    bullish: '#39FF88',
    bearish: '#FF4D5F',
    warning: '#F5A623',
  },
  ui: {
    grid: '#1A222C',
    border: 'rgba(255,255,255,0.08)',
    borderHover: 'rgba(255,255,255,0.15)',
    glow: 'rgba(57,255,136,0.08)',
  },
  gradients: {
    hero: 'linear-gradient(180deg, #080A0D 0%, #0D1117 100%)',
    signalCard: 'linear-gradient(135deg, #0D1117, #121820)',
  },
} as const;
