// Electron Main Process configuration
const path = require('path');
const webpack = require('webpack');

const base = path.resolve(__dirname, '..');
const paths = {
  base,
  src     : path.resolve(base, 'testApp'),
  lib     : path.resolve(base, 'lib'),
  dist    : path.resolve(base, 'dist'),
  config  : path.resolve(base, 'config'),
};

const indexUrl = () => {
  if(process.env.NODE_ENV === 'development') {
    return "http://0.0.0.0:8080/";
  }
}

module.exports = {
  performance: {
    hints: false,
  },

  target: 'electron',
  devtool: 'source-map',
  entry: {
    main: 'main.js'
  },
  context: paths.src,
  output: {
    filename: '[name].[hash].js',
    path: paths.dist,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      paths.src,
      paths.lib,
      'node_modules'
    ],
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
  externals: {
    '7zip': 'commonjs 7zip'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        INDEX_URL: JSON.stringify(indexUrl())
      },
    }),
  ],
};
