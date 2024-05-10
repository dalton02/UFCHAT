/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: { 
    extend: {
      fontSize: {
        '.5rem': '.5rem',
        '.8rem': '.8rem',
        '1rem': '1rem',
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
        '5rem': '5rem',
        '6rem': '6rem',
        '7rem': '7rem',
        '8rem': '8rem',
        '9rem': '9rem',
        '.5xs': '10px',
        '2sm': '.9rem',
        
      },
    },
  screens: {
    'n': {'max':'1280px'},
    'np': {'max':'1024px'},
    'p': {'max':'800px'},
    'pp': {'max':'600px'},
    'mobile': {'max':'400px'},
  },
},
  plugins: [],
};