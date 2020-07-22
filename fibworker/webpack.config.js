const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  name: 'backend',
  target: 'node',
  entry: path.resolve(__dirname, 'src/fib.js'),
  output: path.resolve(__dirname, 'bin/fib.js')
};
