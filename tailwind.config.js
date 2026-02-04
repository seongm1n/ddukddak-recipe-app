/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B35",
          light: "#FF8C61",
          dark: "#E55A2B",
        },
        secondary: {
          DEFAULT: "#FF8C61",
          light: "#FFAA8A",
          dark: "#E57545",
        },
        background: {
          DEFAULT: "#FFFFFF",
          secondary: "#F8F8F8",
          tertiary: "#F0F0F0",
        },
        text: {
          DEFAULT: "#1A1A1A",
          secondary: "#6B7280",
          tertiary: "#9CA3AF",
        },
      },
    },
  },
  plugins: [],
}
