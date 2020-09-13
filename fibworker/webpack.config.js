const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
module.exports = {
  name: 'fibworker',
  target: 'node',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'bin')
  },
  plugins: [
    new webpack.IgnorePlugin(/^hiredis$/),
    new webpack.SourceMapDevToolPlugin({
      filename: 'index.js.map'
    }),
    new NodemonPlugin({
      nodeArgs: ['--inspect']
    })
  ]
};
