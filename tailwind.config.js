/** @type {import('tailwindcss').Config} */
import themes from './src/assets/themes'
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
  },
  daisyui: {
    themes:themes,
  },
  plugins: [require("daisyui")],
}

