const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
module.exports = {
  name: 'server',
  target: 'node',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'bin')
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'index.js.map'
    }),
    new NodemonPlugin({
      nodeArgs: ['--inspect=0.0.0.0:9229']
    })
  ],
  externals: [nodeExternals()]
};
