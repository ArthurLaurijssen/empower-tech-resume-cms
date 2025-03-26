/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx,css,scss}", // Added for your styles directory
  ],
  theme: {
    extend: {
      outline: {
        1: "1px solid",
        2: "2px solid",
      },
    },
  },
};
