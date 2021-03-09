const detect = require('./detectport');
const chalk = require('chalk');

function choosePort(defaultPort) {
    return detect(defaultPort)
        .then((_port) => {
            return new Promise((resolve) => {
                if (defaultPort === _port) {
                    return resolve(defaultPort);
                }

                console.warn(chalk.cyan(`address already in use, try use port at ${_port}`));
                return resolve(_port);
            });
        })
        .catch((err) => {
            throw err;
        });
}

module.exports = choosePort;