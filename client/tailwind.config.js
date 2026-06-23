/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { fontFamily: {
        heading: ["Playfair Display", "serif"],
        subheading: ["Cormorant Garamond", "serif"],
        body: ["Inter", "sans-serif"],
        ui: ["Manrope", "sans-serif"],},
  },
},
  plugins: [],
};
