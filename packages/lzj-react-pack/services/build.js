const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');

const paths = require('../config/paths');
const createDevServerConfig = require('../');