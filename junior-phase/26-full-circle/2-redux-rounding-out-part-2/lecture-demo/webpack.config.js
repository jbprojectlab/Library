const path = require('path');

module.exports = {
  entry: ["babel-polyfill", "./browser/start.js"],
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}

