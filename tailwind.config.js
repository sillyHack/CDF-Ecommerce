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
        fluid: "repeat(auto-fit, minmax(15rem, 1fr))", 
      }
    },
  },
  plugins: [],
}

