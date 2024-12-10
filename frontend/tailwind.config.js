module.exports = {
  content: [
    './frontend/index.html', // Path to index.html if Tailwind classes are used there.
    './frontend/src/**/*.{js,ts,jsx,tsx}', // Include all components and relevant files within the src directory.
  ],
  theme: {
    extend: {},
  },
  plugins: [ 
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
