const paths = require('../config/paths');
const proxySetting = require(paths.appPackageJson).proxy;
const choosePort = require('../lib/chooseport');

module.exports = async() => {
    const port = require(paths.appPackageJson).port || 8001;
    const _port = await choosePort(port);

    return {
        compress: true,
        contentBase: paths.build,
        proxy: proxySetting,
        historyApiFallback: true,
        contentBase: paths.appPublic,
        hot: true,
        open: true,
        quiet: true,
        port: _port,
        clientLogLevel: 'silent'
    }
};