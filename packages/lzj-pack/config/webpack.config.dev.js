const {smart} = require('webpack-merge');
const base = require('./webpack.config.base');

const webpack = require('webpack')

module.exports = (config) => {
  const baseconfig = base(config);
  const { port, before, devtool } = config;

  return smart(baseconfig, {
    mode: 'development',  // 模式 development production
    devtool: devtool || 'source-map',
    devServer: { //devserver的配置
      port, //端口
      progress: true, //进度条
      contentBase: "./build", // 文件夹
      compress: true, // g-zip压缩
      open: true, // 是否自动打开浏览器
      before(app) {
        before && before(app);
      },
    },
    watch: false, // run build 的时候监控
    watchOptions: {
      poll: 1000, // 打包间隔
      aggregateTimeout: 500, // 防抖 500ms触发一次打包
      ignored: /node_module/, // 不监控
    },
    plugins: [
      new webpack.DefinePlugin({ // 定义不同的环境
        DEV: JSON.stringify('dev'),
      }),
    ]
  })
}