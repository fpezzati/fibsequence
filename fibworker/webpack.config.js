const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  name: 'fibworker',
  target: 'node',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: path.resolve(__dirname, 'bin/index.js')
};
