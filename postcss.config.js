module.exports = {
  plugins: [
    require('postcss-nested'), // add this line
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}