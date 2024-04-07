/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        darkPurple:
          "linear-gradient(179.4deg, rgb(12, 20, 69) -16.9%, rgb(71, 30, 84) 119.9%);",
        blueGrad:
          "linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%);",
        greyGrad:
          "linear-gradient(99.6deg, rgb(112, 128, 152) 10.6%, rgb(242, 227, 234) 32.9%, rgb(234, 202, 213) 52.7%, rgb(220, 227, 239) 72.8%, rgb(185, 205, 227) 81.1%, rgb(154, 180, 212) 102.4%);",
        blackGrad: "linear-gradient(to right, #434343 0%, black 100%);",
      },
      animation: {
        blurIn: "blurIn 1s ease-out forwards",
      },

      keyframes: {
        blurIn: {
          "0%": { opacity: 0, width: "0%", filter: "blur(20px)" },
          "100%": { opacity: 1, width: "100%", filter: "blur(0px)" },
        },
      },
    },
  },
  plugins: [],
};
