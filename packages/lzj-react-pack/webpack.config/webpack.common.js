// webpack.common.js
// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

const paths = require('../config/paths');

module.exports = function(){
  return {
    entry: {
      app: paths.appSrc,
    },
    output: {
      publicPath: paths.publicUrlOrPath,
      globalObject: 'this',
    },
    optimization: {
      usedExports: true, // 标使用到的导出
      moduleIds: 'named', // 模块名称生成器
      chunkIds: 'named',  // 代码块名称生成器
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
          },
          cssProcessorPluginOptions: {
            preset: ['default', { minifyFontValues: { removeQuotes: false } }],
          },
        }),
      ],
    },
    resolve: {
      modules: ['node_modules', paths.appNodeModules], // 指定的所有目录检索模块
      alias: {
        '@/utils': paths.appUtils,
        '@': paths.appSrc,
      },
    },
    module: {
      strictExportPresence: true, // 将缺失的导出提示成错误而不是警告
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', // es6 -> es5
                '@babel/preset-react' // react
              ]
            },
          },
        },
        {
          test: /\.(tsx|ts)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource' // 对标file-loader 之后不用file-loader
        },
        {
          test: /\.ico$/,
          type: 'asset/inline' // 模块大小<limit base64字符串>
        },
        {
          test: /\.txt$/,
          type: 'asset/source' // 对标raw-loader
        },
        {
          test: /\.jpg$/,
          type: 'asset', // 对标raw-loader
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024
            }
          }
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: '',
        template: paths.appHtml,
        filename: 'index.html',
      }),
      new friendlyErrorsWebpackPlugin(),
    ],
    // node: {
    //   module: 'empty',
    //   dgram: 'empty',
    //   dns: 'mock',
    //   fs: 'empty',
    //   http2: 'empty',
    //   net: 'empty',
    //   tls: 'empty',
    //   child_process: 'empty',
    // },
    // performance: false,
  };  
}