const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './src/**/*.svelte',
    './__sapper__/**/*.js',
  ],

  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  extractors: [
    {
      extractor: class SvelteExtractor {
        static extract(content) {
          return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
        }
      },
      extensions: ['svelte', 'html'],
    },
  ],
});

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production'
      ? [purgecss, require('cssnano')]
      : []),
  ],
};
