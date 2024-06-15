/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primarybg: {
          100: "#1F2032",
          200: "#101828",
          300: "#06071B",
        },
        primary: {
          100: "#52A1FA",
          200: "#1982F8",
          300: "#156DD0",
          accent: "#EDF5FE",
        },
        primaryblue: {
          200: "#3871FE",
        },
        secondary: {
          100: "#BFE0FF",
          200: "#A9D5FF",
          300: "#8EB3D6",
          accent: "#F8FCFF",
        },
        success: {
          100: "#67DEB3",
          200: "#34D399",
          300: "#2CB181",
          accent: "#99E9CC",
        },
        error: {
          100: "#F37C80",
          200: "#EF5055",
          300: "#C94347",
          accent: "#F7A7AA",
        },
      },
      fontSize: {
        xxs: "0.625rem",
        xxxs: "0.5rem",
      },
      screens: {
        xs: "480px",
        xxl: "1440px",
      },
      minHeight: {
        inherit: "inherit",
      },
    },
  },
  plugins: [],
};
