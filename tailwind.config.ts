import type { Config } from "tailwindcss";

const config: Config = {
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
    gridAutoColumns: {
      "2fr": "minmax(0, 2fr)",
    },
    colors: {
      "quiz-purple": "#614b79",
      "quiz-purple-15": "#E7E4EB",
      "quiz-plum": "#774b69",
      "quiz-plum-15": "#EBE4E9",
      "quiz-apricot": "#b47257",
      "quiz-apricot-15": "#F4EAE6",
      "quiz-forest": "#546f56",
      "quiz-forest-15": "#E5E9E6",
      "quiz-navy": "#2a497e",
      "quiz-navy-15": "#DFE4EC",
      "quiz-mint": "#b0cfc4",
      "quiz-mint-15": "#F3F8F6",
      "quiz-pink": "#ad7393",
      "quiz-pink-15": "#F3EAEF",
      "quiz-ocean": "#4889c1",
      "quiz-ocean-15": "#E4EDF6",
      "quiz-golden": "#9b7818",
      "quiz-golden-15": "#F0EBDC",
      "quiz-grey": "#8e8e8e",
      "quiz-grey-15": "#EEEEEE",
      "quiz-background": "#f2f5f9",
      "quiz-background-15": "#FDFEFE",
      "quiz-dark-grey": "#606060",
      "quiz-dark-grey-15": "#E7E7E7",
      "quiz-black": "#000000",
      "quiz-black-15": "#D9D9D9",
      "quiz-white": "#fefeff",
      "quiz-white-15": "#FFFFFF",
      "quiz-magenta": "#CA3F7E",
      "quiz-violet": "#814897",
      "quiz-slate": "#6F6F6F",
      "quiz-ocean-75": "#0578BF",
      "quiz-green": "#008000",
      "quiz-zomp": "#3BA38A",
      "quiz-valentine-red": "#3BA38A",
      "quiz-medium-sea-green": "#33A86F",
      "quiz-black-coffe": "#3F3434",
      "quiz-flax": "#DFDF8B",
      "quiz-blond": "#F2F2BF",
      "quiz-azureish-white": "#EFDFDA",
    },
    fontFamily: {
      sans: ["sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  plugins: [],
};
export default config;
