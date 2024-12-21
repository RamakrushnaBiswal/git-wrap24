/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import tailwindDotGridBackgrounds from '@nauverse/tailwind-dot-grid-backgrounds'
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      daisyui: {
        themes: ['night'],
      },
      fontFamily: {
        ache: ['Achemost', 'sans-serif']
      }
    },
  },
  plugins: [
    daisyui,
    tailwindDotGridBackgrounds
  ],
}

