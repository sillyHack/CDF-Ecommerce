/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // we customize a new property here that will put all of our products inside a grid
        // and auto fit them in that grid.
        // When the product image gets smaller than 15rem, it gonna jump in another row and stretch it out to 1fr(all the available space)
        fluid: "repeat(auto-fit, minmax(20rem, 1fr))", 
      },
      fontFamily: {
        lobster: ['var(--font-lobster)'],
        roboto: ['var(--font-roboto)']
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["[data-theme=cupcake]"],
          "primary": "#be185d",
          "primary-focus": "#db2777",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "primary": "#be185d",
          "primary-focus": "#db2777",
        },
      }
    ]
  }
}

