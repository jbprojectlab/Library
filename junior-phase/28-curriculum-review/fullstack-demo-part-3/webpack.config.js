const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: ['babel-polyfill', './browser/start.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  context: __dirname,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  devtool: 'source-map',
  plugins: [
    new LiveReloadPlugin({
      appendScriptTag: true
    })
  ]
};
