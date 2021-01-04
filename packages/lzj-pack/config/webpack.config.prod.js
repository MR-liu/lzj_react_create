const { smart }               = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩
const TerserJSPlugin          = require('terser-webpack-plugin'); // 这个替换掉uglifyjs-webpack-plugin
const webpack                 = require('webpack');

const base                    = require('./webpack.config.base');

module.exports = (config) => {
  const baseconfig = base(config);
  const { sourcemap } = config;

  return smart(baseconfig, {
    mode: 'production',  // 模式 development production
    devtool: sourcemap || 'source-map',
    optimization: { // 优化项 development下不走
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new TerserJSPlugin({})
      ],
      splitChunks: { // 分割代码块
        cacheGroups: { // 缓存组
          common: {
            chunks: 'initial',
            minSize: 0,
            minChunks: 2, // 引用2次以上就需要抽离
          },
          vendor: { // 抽离第三方
            priority: 1,
            test: /node_modules/, // 抽离出来
            chunks: 'initial',
            minSize: 0,
            minChunks: 2, // 引用2次以上就需要抽离
          }
        }
      }
    }, 
    plugins: [
      new webpack.DefinePlugin({ // 定义不同的环境
        DEV: JSON.stringify('production'),
      }),
    ]
  })
}
