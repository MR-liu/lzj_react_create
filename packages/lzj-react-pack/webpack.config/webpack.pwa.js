const { merge } = require('webpack-merge')
const paths = require('../config/paths')

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')

const prod = require('./webpack.prod')

module.exports = merge(prod, {
  plugins: [
    new AddAssetHtmlPlugin({ filepath: paths.pwaJs }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
})
