import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './config/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Dark theme. Warm charcoals rather than pure black so gold reads as
           gold. Names are semantic: `page` is the background AND the colour of
           text that sits on a gold fill; `ink` is the primary text colour. */
        page: '#2A2620',      // page background
        panel: '#353028',     // alternating sections
        card: '#423C32',      // cards
        sand: '#201D19',      // inputs, footer, table headers
        line: '#5E5648',      // borders and hairlines
        shade: '#12100D',     // scrims and overlays laid over photos

        ink: '#FAF7F0',       // primary text
        muted: '#CCC4B4',     // secondary text
        cream: '#FAF7F0',     // light text sitting over a photo

        gold: {
          DEFAULT: '#D4AF37',
          dark: '#D4AF37',    // gold text — bright, since it sits on dark
          light: '#F5D77A',
        },
      },

      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        body: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #A8862A 0%, #D4AF37 45%, #F5D77A 100%)',
        'gold-line': 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
      },
      boxShadow: {
        gold: '0 0 24px -4px rgba(212, 175, 55, 0.45)',
        'gold-lg': '0 0 48px -8px rgba(212, 175, 55, 0.55)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
