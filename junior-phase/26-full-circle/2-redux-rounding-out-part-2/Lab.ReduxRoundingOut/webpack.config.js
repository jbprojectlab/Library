const {join} = require('path')

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  mode: "development",
  devtool: "sourcemap",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}