/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./{src,mdx}/**/*.{js,mjs,jsx,ts,tsx,mdx}"
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: {
          50: "rgb(236 254 255)",
          100: "rgb(207 250 254)",
          200: "rgb(165 243 252)",
          300: "rgb(103 232 249)",
          400: "rgb(34 211 238)",
          500: "rgb(6 182 212)",
          600: "rgb(8 145 178)",
          700: "rgb(14 116 144)",
          800: "rgb(21 94 117)",
          900: "rgb(22 78 99)",
          950: "rgb(8 51 68)"
        },
        accent: {
          50: "rgb(255 247 237)",
          100: "rgb(255 237 213)",
          200: "rgb(254 215 170)",
          300: "rgb(253 186 116)",
          400: "rgb(251 146 60)",
          500: "rgb(249 115 22)",
          600: "rgb(234 88 12)",
          700: "rgb(194 65 12)",
          800: "rgb(154 52 18)",
          900: "rgb(124 45 18)",
          950: "rgb(67 20 7)"
        }
      },
      // For Template Coming Soon Page
      fontSize: {
        '2xs': '.6875rem',
      },
      fontFamily: {
        sans: 'var(--font-inter)',
        display: 'var(--font-mona-sans)',
      },
      opacity: {
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
