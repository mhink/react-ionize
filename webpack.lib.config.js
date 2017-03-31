const path = require('path');
const webpack = require('webpack');

const base = path.resolve(__dirname);
const paths = {
  base,
  src     : path.resolve(base, 'src'),
  lib     : path.resolve(base, 'lib'),
};

// Ionize Library webpack config
module.exports = {
  target: 'electron',
  context: paths.src,
  entry:  'index.js',
  output: {
    filename      : '[name].js',
    path          : paths.lib,
    library       : 'ionize',
    libraryTarget : 'commonjs'
  },
  externals: [
    require('webpack-node-externals')()
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      paths.src,
      'node_modules'
    ],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].html'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react'],
          }
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
