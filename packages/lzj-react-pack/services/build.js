const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');

const config = require('../webpack.config/webpack.prod');

process.on('unhandledRejection', err => {
  throw err;
});

module.exports = () => {
  const compiler = webpack(config);

  const now = () => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const leftPad = (n) => { return n < 10 ? `0${n}` : n; };

    return `${leftPad(hours)}:${leftPad(minutes)}:${leftPad(seconds)}`;
  };

  console.info('Glove[build]: START  ', now());

  if (process.env.PROGRESS) {
    compiler.apply(new ProgressBarPlugin({
      format: 'Glove[build]: [:bar] :percent (:elapsed seconds) [:msg]',
      // clear: false,
      summary: false,
      customSummary(buildTime) {
        console.info('Glove[build]: ELAPSED', buildTime);
      },
    }));
  }

  compiler.run((err, state) => {
    console.info('Glove[build]: FINISH ', now());

    if (err) {
      return console.error(err);
    }

    if (state.hasErrors()) {
      console.info('Glove[build]: ERROR\n');
      console.info(state.toString({
        hash: false,
        version: true,
        children: true,
        assets: false,
        chunks: false,
        chunkModules: false,
        colors: true,
      }));
      return;
    }

    console.info('Glove[build]: SUCCES\n');
    /* eslint-disable no-console */
    // glove 常规显示方式
    // console.info(state.toString({
    //   hash: false,
    //   version: false,
    //   assets: false,
    //   chunkModules: false,
    //   colors: true,
    // }));

    // webpack 常规显示方式
    console.info(state.toString({
      hash: false,
      version: true,
      children: false,
      assets: true,
      assetsSort: 'name',
      chunks: false,
      chunkModules: false,
      colors: true,
      modules: false,
    }));
    /* eslint-enable no-console */
  });
};
