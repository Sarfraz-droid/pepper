import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        pepper: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#9333EA",
          "primary-content": "#ffffff",
          secondary: "#c084fc",
          "base-100": "#16131c",
          "base-200": "#110f16",
          "base-300": "#0b0a0f",
          "base-content": "#e7e5ee",
        },
      },
    ],
    darkTheme: "pepper",
    logs: false,
  },
  plugins: [require("daisyui")],
};
export default config;
