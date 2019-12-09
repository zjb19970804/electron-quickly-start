const path = require('path')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')

const baseConfig = require('./webpack.config.base')

module.exports = merge.smart(baseConfig, {
  mode: 'production',
  target: 'electron-main',
  entry: path.join(__dirname, '../src/main.ts'),
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        cache: true
      })
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  }
})
