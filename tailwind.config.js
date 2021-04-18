/* eslint-disable */
const plugin = require("tailwindcss/plugin");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      backgroundImage: (theme) => ({
        mainBackgroundImage:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(25, 25, 25, 0.3)), url(https://images.unsplash.com/photo-1585581279446-63f96788f724?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80)",
      }),
      keyframes: {
        shift: {
          "0%, 100%": { backgroundPositionX: "100%" },
          "50%": { backgroundPositionX: "0%" },
        },
        shiftTablet: {
          "0%, 100%": { backgroundPositionX: "60%" },
          "50%": { backgroundPositionX: "40%" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        backgroundShift: "shift 30s ease-in-out infinite",
        backgroundShiftTablet: "shiftTablet 30s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities, theme, config }) {
      const themeColors = theme("colors");
      const individualBorderColors = Object.keys(themeColors).map(
        (colorName) => ({
          [`.border-b-${colorName}`]: {
            borderBottomColor: themeColors[colorName],
          },
          [`.border-t-${colorName}`]: {
            borderTopColor: themeColors[colorName],
          },
          [`.border-l-${colorName}`]: {
            borderLeftColor: themeColors[colorName],
          },
          [`.border-r-${colorName}`]: {
            borderRightColor: themeColors[colorName],
          },
        })
      );

      addUtilities(individualBorderColors);
    }),
  ],
};
