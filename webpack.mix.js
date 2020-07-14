const path = require('path')
const mix = require('laravel-mix');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

Mix.listen('configReady', config => {
  const scssRule = config.module.rules.find(r => r.test.toString() === /\.scss$/.toString())
  const scssOptions = scssRule.loaders.find(l => l.loader === 'sass-loader').options
  scssOptions.data = '@import "./resources/sass/variables.scss"'
  const sassRule = config.module.rules.find(r => r.test.toString() === /\.sass$/.toString())
  const sassOptions = sassRule.loaders.find(l => l.loader === 'sass-loader').options
  sassOptions.prependData = '@import "./resources/sass/variables.scss"'
})

mix
  .webpackConfig({
    resolve: {
      alias: {
        '@': path.resolve('resources'),
      },
    },
    plugins: [new VuetifyLoaderPlugin],
  })
  .js('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css',)
