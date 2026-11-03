/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0b0e14',
          surface: '#131822',
          card: '#181e2b',
          cardHover: '#1c2433',
          inset: '#0f131a',
          border: '#273142',
          borderSubtle: '#1d2532',
        },
        brand: {
          sky: '#38bdf8',
          blue: '#2563eb',
          amber: '#f59e0b',
          rose: '#f43f5e',
          emerald: '#10b981',
          purple: '#a855f7',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'panel': '0 30px 60px -12px rgba(0, 0, 0, 0.85), 0 18px 36px -18px rgba(0, 0, 0, 0.9)',
        'glow-sky': '0 0 25px rgba(56, 189, 248, 0.25)',
        'glow-rose': '0 0 25px rgba(244, 63, 94, 0.3)',
      }
    },
  },
  plugins: [],
}
