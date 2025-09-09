/*****************
 Monochrome Theme Config
*****************/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          400: "#0EA5E9",
          500: "#0284C7",
          600: "#0369A1",
          700: "#075985"
        },
        mono: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0A0A0A"
        }
      },
      boxShadow: {
        mono: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "mono-lg": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "mono-inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "mono-gradient": "linear-gradient(135deg, #0A0A0A 0%, #262626 100%)",
        "accent-gradient": "linear-gradient(90deg, #0284C7 0%, #0EA5E9 100%)",
      }
    },
  },
  plugins: [],
};

