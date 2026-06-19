import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "kiln-ash": "#F5F0E8",
        "charred-oak": "#2C2016",
        "fired-terra": "#C4673A",
        "salt-glaze": "#7A9E8E",
        "bone": "#E8D5B7",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        dm: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        place: "cubic-bezier(0.16, 1, 0.3, 1)",
        settle: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;