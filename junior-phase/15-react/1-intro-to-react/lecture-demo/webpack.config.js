const path = require('path');

module.exports = {
  entry: './client/index.js',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  context: __dirname,
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
};
