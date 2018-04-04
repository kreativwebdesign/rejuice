const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rejuice.js',
    library: 'rejuice',
    libraryTarget: 'umd',
  },
  externals: {

  },
};
