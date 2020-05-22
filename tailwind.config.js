const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
      flex: {
        '2': '2 2 0%'
      }
    },
    fontFamily: {
      sans: "'Cairo', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      serif:
        "Amiri, 'Dubai', 'Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'serif'",
      mono:
        "'Cascadia Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
  },
  variants: {},
  plugins: [],
};
