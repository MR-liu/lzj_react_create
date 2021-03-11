'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const Module = require('module');

process.on('unhandledRejection', err => {
    throw err;
});

const chalk = require('chalk');

const paths = require('../config/paths');
const runCLI = require('webpack-cli/lib/bootstrap');
const originalModuleCompile = Module.prototype._compile;

module.exports = async() => {
    runCLI([
        process.argv[0],
        process.argv[1],
        '--analyze',
        '-c',
        paths.analyzeConfig
    ], originalModuleCompile);

    console.log(chalk.cyan('Starting the analyze server...\n'));
}