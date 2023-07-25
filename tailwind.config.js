/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
const colors = require("tailwindcss/colors");

module.exports = withMT({
  theme: {
    extend: {
      colors: {
        //just add this below and your all other tailwind colors willwork
        ...colors,
      },
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionDuration: "300",
    },
  },
  safelist: [`text-rose-600`],
  plugins: [],
});
