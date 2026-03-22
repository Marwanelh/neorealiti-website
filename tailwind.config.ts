import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#07080F',
          secondary: '#0B0F1A',
          card: '#0F1420',
        },
        border: '#1A2035',
        // Neorealiti brand teal
        neo: {
          DEFAULT: '#008197',
          light: '#00A8BD',
          lighter: '#00C8DC',
          dark: '#006577',
          glow: '#00D4E4',
        },
        // FillFlow brand purple/cyan
        fill: {
          purple: '#7C3AED',
          cyan: '#06B6D4',
          pink: '#EC4899',
        },
        slate: {
          text: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // Neorealiti teal gradient
        'neo-gradient': 'linear-gradient(135deg, #008197, #00C8DC)',
        // FillFlow purple→cyan gradient
        'fill-gradient': 'linear-gradient(135deg, #7C3AED, #06B6D4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
