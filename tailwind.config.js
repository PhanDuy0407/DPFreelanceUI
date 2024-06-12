/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#141414",
        "blue":"#3575e2"
      },
      animation: {
        blink: 'blink 1s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      width: {
        'fit': 'fit-content',
      },
    },
  },
  plugins: [],
}

