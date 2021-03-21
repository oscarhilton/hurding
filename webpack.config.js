const path = require('path');

module.exports = {
  entry: './tsbuild/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/js'),
  },
};