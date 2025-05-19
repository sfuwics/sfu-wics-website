import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        main: {
          100: "#FCFCFC"
        },
        wics: {
          blue: {
            900: "#0A052B",
            800: "#110A40",
            700: "#180D5B",
            600: "#1E1076",
            500: "#24138E",
            400: "#2D18AF",
            300: "#351ADB",
            200: "#2B09FF",
            100: "#6880FF",
          },
          yellow: {
            900: "#753F00",
            800: "#B2650A",
            700: "#D07C1A",
            600: "#E9922C",
            500: "#FFAA46",
            400: "#FFBC6D",
            300: "#FFCF96",
            200: "#FFE2BF",
            100: "#FFF1E0",
          },
        },
        neutral: {
          1200: "#141515",
          1100: "#191a1a",
          1000: "#323434",
          900: "#4b4e4d",
          800: "#646867",
          700: "#7d8281",
          600: "#979b9a",
          500: "#b0b5b4",
          400: "#cacecd",
          300: "#e5e6e6",
          200: "#eff0f0",
          100: "#f7f8f7",
          0: "#fff",
        },
      },
      fontFamily: {
        "roboto-slab": ["var(--font-roboto-slab)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        100: "2px 2px 0px 0px rgb(0, 0, 0)",
        200: "2px 2px 0px 2px rgb(0, 0, 0)",
        300: "2px 2px 0px 2px rgb(238, 43, 105)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

export default config;
