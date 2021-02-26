

const chalk = require('chalk');
const { name } = require('../package.json')

require('../Scaffolder/gui-mount');

console.log(chalk.green(''));
console.log(chalk.green(`Already to Run ${name}`));
console.log(chalk.cyan(`Load configuration`));
console.log(chalk.green(''));

require('./shell.js')
