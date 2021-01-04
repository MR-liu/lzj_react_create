const proxy = require('lzj-httproxymiddleware');

module.exports = (proxyConfig) => {
  if (!proxyConfig) {
    return null;
  }

  return proxy(proxyConfig);
};
