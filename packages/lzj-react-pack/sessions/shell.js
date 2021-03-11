
const yargs = require('yargs');
const { version } = require('../package.json');

const limits = ['server', 'build'];


const argv = require('yargs')
  .version(version)
  .command('server [config]', '开发模式', (yargs) => {
    yargs
      .positional('port', {
        describe: 'port to bind on',
        type: 'string',
        default: 8081
      })
  }, (argv) => {
    require('../services/server')(argv);
  })
  .command('build [config]', '生产模式', (yargs) => {
    yargs
      .positional('port', {
        describe: 'port to bind on',
        type: 'string',
        default: 8080
      })
  }, (argv) => {
    require('../services/build')(argv);
  })
  .command('pwa [config]', 'PWA生产模式', (yargs) => {
    yargs
      .positional('', {
        describe: 'loading pwa config',
        type: 'string',
        default: 'loading'
      })
  }, (argv) => {
    require('../services/pwa')(argv);
  })
  .command('analyze [config]', 'analyze模式', (yargs) => {
    yargs
      .positional('port', {
        describe: 'port to bind on',
        type: 'string',
        default: 8080
      })
  }, (argv) => {
    require('../services/analyze')(argv);
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .argv

function checkCommands(yargs, argv, numRequired) {
  if (argv._.length < numRequired || !limits.includes(argv._[0])) {
    yargs.showHelp();
  }
}

checkCommands(yargs, argv, 1);