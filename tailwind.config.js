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
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'bounce': 'bounce 1s infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.indigo.600'),
              '&:hover': {
                color: theme('colors.indigo.800'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.100'),
            a: {
              color: theme('colors.indigo.400'),
              '&:hover': {
                color: theme('colors.indigo.300'),
              },
            },
          },
        },
      }),
      colors: {
        // Add explicit mappings for renamed Tailwind colors
        sky: colors.sky,     // replaces lightBlue
        stone: colors.stone, // replaces warmGray
        neutral: colors.neutral, // replaces trueGray
        gray: colors.gray,   // replaces coolGray
        slate: colors.slate, // replaces blueGray
        // Custom colors
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
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
