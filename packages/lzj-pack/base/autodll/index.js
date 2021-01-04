var AutoDllPlugin = require('autodll-webpack-plugin');
const path = require('path');

module.exports = (config) => {
  const { personalizedCustomization, absolutepath } = config;
  const { plugins } = personalizedCustomization;

  console.log(plugins)

  // if (!entry || !Object.keys(entry).length) {
  //   return {
  //     entry: ['webpack-hot-middleware/client?noInfo=true&reload=true', '@babel/polyfill', `${absolutepath}/src/index.js`],
  //   }
  // }

  // for (const key in entry) {
  //   entry[key] = ['webpack-hot-middleware/client?noInfo=true&reload=true', '@babel/polyfill', path.resolve(absolutepath, entry[key].entry)]
  // }
  
  return { entry };
}