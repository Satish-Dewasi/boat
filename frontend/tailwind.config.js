/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      robotoThin : ['roboto-thin', 'sans-serif'],
      robotoThinItalic : ['roboto-thin-italic', 'sans-serif'],
      robotoRegular : ['roboto-regular', 'sans-serif'],
      robotoMedium : ['roboto-medium', 'sans-serif'],
      robotoBold : ['roboto-bold', 'sans-serif'],
  },
  },
  plugins: [],
}


/*
.roboto-thin {
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-style: normal;
}

.roboto-regular {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.roboto-medium {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.roboto-bold {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
}

*/
