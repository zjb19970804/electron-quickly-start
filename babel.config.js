module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          electron: require('electron/package.json').version
        }
        // useBuiltIns: 'usage'
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        style: 'css'
      }
    ]
  ]
}
