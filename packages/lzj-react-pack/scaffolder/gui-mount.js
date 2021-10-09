const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');

const { name } = require('../package.json')

clear();
console.log(
  chalk.yellow(
    'running' + name
    // figlet.textSync(name, { horizontalLayout: 'full' })
  )
);