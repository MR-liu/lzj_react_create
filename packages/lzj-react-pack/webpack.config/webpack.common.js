// webpack.common.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const paths = require('../config/paths');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties'
    ]
  }
}

module.exports = function(){
  return {
    entry: {
      app: paths.appSrc,
    },
    output: {
      path: paths.build,
      filename: 'js/[name].bundle.js',
      publicPath: paths.publicUrlOrPath,
      clean: true,
      crossOriginLoading: 'anonymous',
      module: true,
      // globalObject: 'this',
      environment: {
        arrowFunction: true,
        bigIntLiteral: false,
        const: true,
        destructuring: true,
        dynamicImport: false,
        forOf: true
      }
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
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
    },
    experiments: {
      topLevelAwait: true,
      outputModule: true
    },
    module: {
      strictExportPresence: true, // 将缺失的导出提示成错误而不是警告
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: babelLoader,
        },
        {
          test: /\.(tsx|ts)?$/,
          exclude: /node_modules/,
          use: [babelLoader, 'ts-loader'],
        },
        {
          test: /\.(c|sa|sc)ss$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.md$/i,
          use: ['html-loader', 'markdown-loader']
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
      new webpack.ProgressPlugin(),
      !!paths.appAsset && new CopyWebpackPlugin({
        patterns: [
          {
            from: paths.appAsset,
          }
        ]
      }),
      new HtmlWebpackPlugin({
        title: '',
        template: paths.appHtml,
        filename: 'index.html',
      }),
      new friendlyErrorsWebpackPlugin(),
      new webpack.ProvidePlugin({
        React: 'react'
      }),
      new Dotenv({
        path: '../config/.env'
      })
    ],
  };  
}