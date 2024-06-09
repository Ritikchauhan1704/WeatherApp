/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
        'custom-dark-gradient': 'linear-gradient(0deg, #000F37 0%, #00498B 100%)',
        'custom-dark-gradient-2': 'linear-gradient(0deg, #00498B 0%, #000F37 100%)',
      },
    },
  },
  plugins: [],
  darkMode: "class"
}

