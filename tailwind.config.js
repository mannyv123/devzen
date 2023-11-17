/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         gridTemplateRows: {
            layout: "5rem minmax(auto, 1fr) auto minmax(auto, 1fr) 5rem",
         },
         transitionProperty: {
            width: "width",
            height: "height",
            taskContainer: "height, opacity",
         },
         width: {
            modal: "60vw",
         },
         height: {
            modal: "85vh",
         },
         keyframes: {
            fadeIn: {
               "0%": { opacity: "0%" },
               "100%": { opacity: "100%" },
            },
         },
         animation: {
            fadeIn: "fadeIn 2s ease-in-out",
         },
      },
   },
   plugins: [],
};
