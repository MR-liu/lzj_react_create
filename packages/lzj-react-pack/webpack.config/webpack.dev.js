const webpack = require('webpack');
const path = require('path');
const paths = require('../config/paths');
const { merge } = require('webpack-merge');
const getProxyMiddlewares = require('../config/getProxyMiddlewares')
const devServer = require('./devServer.config')

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
  cache: { // 持久化
    type: 'filesystem', // memory filesystem
    cacheDirectory: paths.appCache,
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
});
