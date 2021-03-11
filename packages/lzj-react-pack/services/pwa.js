const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');

const config = require('../webpack.config/webpack.pwa');

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

  console.info('SIMPLE-PACK[build]: START  ', now());

  if (process.env.PROGRESS) {
    compiler.apply(new ProgressBarPlugin({
      format: 'SIMPLE-PACK[build]: [:bar] :percent (:elapsed seconds) [:msg]',
      // clear: false,
      summary: false,
      customSummary(buildTime) {
        console.info('SIMPLE-PACK[build]: ELAPSED', buildTime);
      },
    }));
  }

  compiler.run((err, state) => {
    console.info('SIMPLE-PACK[build]: FINISH ', now());

    if (err) {
      return console.error(err);
    }

    if (state.hasErrors()) {
      console.info('SIMPLE-PACK[build]: ERROR\n');
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

    console.info('SIMPLE-PACK[build]: SUCCES\n');

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

    console.log(chalk.cyan('Already completed Build with PWA\n'));
  });
};
