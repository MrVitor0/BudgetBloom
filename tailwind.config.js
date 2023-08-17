module.exports = {
  content: ['./public/**/*.html', './src/**/*.vue', "./node_modules/vue-tailwind-datepicker/**/*.js"],
  theme: {
    extend: {
      colors: {
        'warning': '#ffbc7b',
        'info': '#76c1f3',
        'danger': '#fb7474',
        'success': '#8ddf77',
        'BBDark': "#303030",
        "BBPurple": "#7e22ce",

        "vtd-primary": "#303030", // Light mode Datepicker color
        "vtd-secondary": "#303030", // Dark mode Datepicker color
      },
    },
  },
  variants: {},
  plugins: [],
};
