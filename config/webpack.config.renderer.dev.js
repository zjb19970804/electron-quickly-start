const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { spawn } = require('child_process')
const baseConfig = require('./webpack.config.base')

const port = process.env.PORT || 1212
const publicPath = `http://localhost:${port}/dist`

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'electron-renderer',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    require.resolve('../src/renderer/index.tsx')
  ],
  output: {
    publicPath: `http://localhost:${port}/dist/`
  },
  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    before() {
      spawn('npm', ['run', 'start-main-dev'], {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError))
    }
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '..', 'src/index.html')
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  }
})
