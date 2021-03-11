const webpack = require('webpack');
const path = require('path');
const paths = require('../config/paths');
const { merge } = require('webpack-merge');
const getProxyMiddlewares = require('../config/getProxyMiddlewares')
const devServer = require('./devServer.config')()
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common')();

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
  },
  // before: (app, server) => {
  //   console.log('proxySetting', proxySetting);
  //   // if (proxySetting) {
  //   //   getProxyMiddlewares(proxySetting)
  //   // }
  // },
  devServer,
  optimization: {
    minimize: false,
  },
  target: 'web',
  cache: { // 持久化
    type: 'filesystem', // memory filesystem
    cacheDirectory: paths.appCache,
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css' // 开发环境：style.css即可
    }),
  ]
});
