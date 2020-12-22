/* eslint-disable */

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {},
    boxShadow: {
      innerRadius: 'inset 0 0 0 .5em #e4e4e4',
    },
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
     }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms')
  ],
};
