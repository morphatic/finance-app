const path = require('path')
const mix = require('laravel-mix');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

mix
  .webpackConfig({
    plugins: [
      new VuetifyLoaderPlugin,
    ],
  })
  .js('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css');
