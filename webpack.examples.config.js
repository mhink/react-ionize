const path = require('path');
const webpack = require('webpack');

if (process.env.EXAMPLE_ENTRY === undefined) {
  throw new Error('You must provide an example entry file!');
}

const base = path.resolve(__dirname);
const paths = {
  base,
  src     : path.resolve(base, 'examples'),
  lib     : path.resolve(base, 'src'),
  dist    : path.resolve(base, 'dist'),
};

// Configuration for Ionize examples
module.exports = {
  performance: {
    hints: false,
  },
  target: 'electron',
  devtool: 'source-map',
  entry: process.env.EXAMPLE_ENTRY,
  context: paths.src,
  output: {
    filename: 'main.js',
    path: paths.dist,
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      paths.src,
      paths.lib,
      'node_modules'
    ],
    alias: {
      'ionize': path.resolve(paths.lib, 'index.js')
    }
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: {
    '7zip': 'commonjs 7zip'
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
