'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const path = require('path');

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const paths = require('../config/paths');
const config = require('../webpack.config/webpack.dev');
const choosePort = require('../lib/chooseport');

module.exports = async () => {
  // const compiler = createCompiler({
  //   appName,
  //   config,
  //   devSocket,
  //   urls,
  //   useYarn,
  //   useTypeScript,
  //   tscCompileOnError,
  //   webpack,
  // });

  // console.log(config);

  const compiler = webpack(config, (err) => {
    err && console.log(chalk.cyan(err));
  });

  const devServerConfig = {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../public'),
    open: false,
    hot: true,
    quiet: true,
  };


  const devServer = new WebpackDevServer(compiler, devServerConfig);

  const port = require(paths.appPackageJson).port || 8001;
  const _port = await choosePort(port);
  const HOST = process.env.HOST || '0.0.0.0';

  devServer.listen(_port, HOST, err => {
    if (err) {
      return console.log(err);
    }

    console.warn(
      chalk.yellow(
        `Fast Refresh requires React 16.10 or higher. You are using React.`
      )
    );

    console.log(chalk.cyan('Starting the development server...\n'));
  });
}