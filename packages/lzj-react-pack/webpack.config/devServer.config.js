const paths = require('../config/paths');
const proxySetting = require(paths.appPackageJson).proxy;
const choosePort = require('../lib/chooseport');

module.exports = async() => {
    const port = require(paths.appPackageJson).port || 8001;
    const _port = await choosePort(port);

    return {
        proxy: proxySetting,
        historyApiFallback: true,
        contentBase: paths.appPublic,
        hot: true,
        open: false,
        quiet: true,
        port: _port,
        // before: function(app, server, compiler) {
        //     console.log(proxySetting, require(paths.appPackageJson));
        //     if (proxySetting) {
        //         getProxyMiddlewares(proxySetting)
        //     }
        //     app.get('/some/path', function(req, res) {
        //         res.json({ custom: 'response' });
        //     });
        // }
    }
};