// Electron Main Process configuration
const path = require('path');
const webpack = require('webpack');

const base = path.resolve(__dirname, '..');
const paths = {
  base,
  src     : path.resolve(base, 'test'),
  lib     : path.resolve(base, 'lib'),
  libtest : path.resolve(base, 'test', 'lib'),
  dist    : path.resolve(base, 'dist'),
  config  : path.resolve(base, 'config'),
};

const indexUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return "http://0.0.0.0:8080/";
  }
}

module.exports = {
  performance: {
    hints: false,
  },
  target: 'node',
  devtool: 'cheap-module-source-map',
  context: paths.src,
  resolve: {
    extensions: ['.js'],
    modules: [
      paths.src,
      paths.lib,
      'node_modules'
    ],
    alias: {
      'electron': path.resolve(paths.libtest, 'electron.js'),
      'ionize': path.resolve(paths.lib, 'IonizeFiber.js'),
    }
  },
  module: {
    rules: [
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
  node: {
    __dirname: false,
    __filename: false,
  },
};
