import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem"
    },
    extend: {
      // backgroundImage: {
      //   hero: "radial-gradient(circle at 10% 20%, rgb(7, 121, 222) 0%, rgb(20, 60, 160) 90%)"
      // }
    }
  },
  darkMode: "class",
  plugins: [nextui()]
};
export default config;
