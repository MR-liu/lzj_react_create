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
const runCLI = require('webpack-cli/lib/bootstrap');
const devServer = require('../webpack.config/devServer.config')();

module.exports = async() => {
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
    config.devServer = devServer;

    const compiler = webpack(config, (err) => {
        err && console.log(chalk.cyan(err));
    });

    // const devServerConfig = {
    //     historyApiFallback: true,
    //     contentBase: path.join(__dirname, '../public'),
    //     open: false,
    //     hot: true,
    //     quiet: true,
    // };


    // const devServer = new WebpackDevServer(compiler, devServerConfig);


    // const HOST = process.env.HOST || '0.0.0.0';

    runCLI([
        process.argv[0],
        process.argv[1],
        'serve'
    ], compiler);

    // devServer.listen(_port, HOST, err => {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.warn(
    //         chalk.yellow(
    //             `Fast Refresh requires React 16.10 or higher. You are using React.`
    //         )
    //     );

    //     console.log(chalk.cyan('Starting the development server...\n'));
    // });
}