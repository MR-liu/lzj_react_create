const paths = require("../config/paths");
const proxySetting = require(paths.appPackageJson).proxy;
const choosePort = require("../lib/chooseport");

// module.exports = async() => {
//     const port = require(paths.appPackageJson).port || 8001;
//     const _port = await choosePort(port);

//     return {
//         compress: true,
//         contentBase: paths.build,
//         proxy: proxySetting,
//         historyApiFallback: true,
//         contentBase: paths.appPublic,
//         hot: true,
//         open: true,
//         quiet: true,
//         port: _port,
//         clientLogLevel: 'silent'
//     }
// };

module.exports = () => {
  const port = require(paths.appPackageJson).port || 8001;
  const open = require(paths.appPackageJson).open || false;
  // const _port = await choosePort(port);

  return {
    compress: true,
    proxy: proxySetting,
    historyApiFallback: true,
    contentBase: paths.appPublic,
    hot: true,
    open,
    quiet: true,
    port: port,
    clientLogLevel: "silent",
  };
};
