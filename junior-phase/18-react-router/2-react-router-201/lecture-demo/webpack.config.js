module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
  mode: 'development',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  context: __dirname,
  devtool: 'source-maps',
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  }
};
