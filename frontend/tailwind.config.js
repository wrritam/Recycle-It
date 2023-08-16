/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "odesans-light": ["Odesans-Light", "sans-serif"],
        "odesans-medium": ["Odesans-Medium", "sans-serif"],
        "odesans-semibold": ["Odesans-Semibold", "sans-serif"],
        "odesans-bold": ["Odesans-Bold", "sans-serif"],
        "garamond-regular": ["Garamond-Regular", "serif"],
        "space-grostek": ["Space-Grostek", "sans-serif"],
        "technology": ["Technology", "serif"],
      },
    },
    screens: {
      phone: "360px",
      xs: "480px",
      sm: "768px",
      tablet: "914px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}
