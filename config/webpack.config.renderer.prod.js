const path = require('path')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = merge.smart(baseConfig, {
  devtool: 'source-map',
  mode: 'production',
  target: 'electron-renderer',
  entry: path.join(__dirname, '..', 'src/renderer/index.tsx'),
  output: {
    filename: '[hash:6].js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        cache: true
      })
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '..', 'src/index.html')
    })
  ]
})
