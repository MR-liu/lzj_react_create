const paths = require('../config/paths');
const proxySetting = require(paths.appPackageJson).proxy;

module.exports = {
  devServer: {
    proxy: proxySetting,
    before: function(app, server, compiler) {
      console.log(proxySetting, require(paths.appPackageJson));
      if (proxySetting) {
        getProxyMiddlewares(proxySetting)
      }
      app.get('/some/path', function(req, res) {
        res.json({ custom: 'response' });
      });
    }
  }
};
