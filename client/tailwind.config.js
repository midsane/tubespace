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
      scrollbar: {
        width: "thin",
        track: "bg-gray-100 dark:bg-gray-800",
        thumb: "bg-gray-400 dark:bg-gray-600 rounded-full hover:bg-gray-500",
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),
  ],
};


