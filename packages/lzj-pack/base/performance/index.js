/**
 * @description entry
 * @param config
 * @returns build entry
 */
const path = require('path');

module.exports = (config) => {
  const { personalizedCustomization, absolutepath } = config;
  const { resolve } = personalizedCustomization;
  return {
    performance: {
      hints:'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  }
}