const path = require('path');
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /\/node_modules\//,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'bin'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'bin'),
    compress: true,
    port: 9000
  }
};
