// webpack.prod.js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const common = require('./webpack.common')();
const paths = require('../config/paths');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    minimize: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
});
