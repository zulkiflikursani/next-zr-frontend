import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import next from "next";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      background: {},
      fontFamily: {
        poppin: ["Poppins", "sans-serif"],
      },
      colors: {
        "app-bg": "#ffffff",
        primary: "#FF407D",
        secondary: "#FFCAD4",
        tertiary: "#40679E",
        four: "#1B3C73",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
