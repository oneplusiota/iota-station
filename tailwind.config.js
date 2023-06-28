/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      ...colors,
      notion: {
        default: "#e5dada",
        gray: "#9B9A97",
        brown: "#64473A",
        orange: "#D9730D",
        yellow: "#DFAB01",
        green: "#0F7B6C",
        blue: "#0B6E99",
        purple: "#6940A5",
        pink: "#AD1A72",
        red: "#E03E3E",
        dark: {
          default: "#37352F",
          gray: "#9B9A97",
          brown: "#64473A",
          orange: "#D9730D",
          yellow: "#DFAB01",
          green: "#0F7B6C",
          blue: "#0B6E99",
          purple: "#6940A5",
          pink: "#AD1A72",
          red: "#E03E3E",
        },
      },
    },
  },
  plugins: [],
};
