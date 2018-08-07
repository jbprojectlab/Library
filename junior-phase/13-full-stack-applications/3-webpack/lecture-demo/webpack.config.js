// webpack.config.js

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './client/start.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  }
};
