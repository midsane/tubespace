/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#18181b',
        secondaryLight: "#27272a",
        accent: "#60A5FA",
        label: "#f3f4f6"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};


