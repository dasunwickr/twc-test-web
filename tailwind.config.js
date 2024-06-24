/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#083F46", 
        opacity: "rgba(8, 63, 70, 0.25)", 
      },
      white: "#fff",
      black: "#000",
    },
    extend: {},
  },
  plugins: [],
};
