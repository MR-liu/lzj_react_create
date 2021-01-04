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
    resolve: {
      // modules: [path.resolve(absolutepath, 'node_modules')], // 强制在node_modules下面找 不一层层的查找
      // extensions: ['.js', '.css', '.json', 'jsx'], // 自动查找后缀
      // mainFields: ['style', 'main'], // 主文件寻找 主要的是node_modules 下boostrap packjson的配置 这样就先取style的配置 在取main的配置
      // mainFiles: [], // 入口文件的配置
      // alias: { // 别名
      //   'boostrap': 'bootstrap/dist/css/bootstrap.css', // 在JS中import boostrap; 其实指向的是node_modules的这个文件 
      // }
      ...resolve
    }
  }
  
}