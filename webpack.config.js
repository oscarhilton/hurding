const path = require('path');

module.exports = {
  watch: true,
  entry: './tsbuild/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};