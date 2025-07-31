// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"], // adjust path as needed
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
};
