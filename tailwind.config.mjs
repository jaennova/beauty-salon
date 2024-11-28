/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF69B4',
        secondary: '#FFC0CB',
        accent: '#FFB6C1',
      },
    },
  },
  plugins: [],
}