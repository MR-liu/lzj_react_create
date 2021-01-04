// webpack 是node的写法 所以使用commom.js的规范导出文件
// node环境下自带的path
const {smart} = require('webpack-merge');
const path = require('path');

module.exports = (config) => {
  let configBase = {};
  const entry = require('../base/entry')(config);
  const output = require('../base/output')(config);
  const modules = require('../base/module')(config);
  const plugins = require('../base/plugins')(config);
  const resolve = require('../base/resolve')(config);
  const performance = require('../base/performance')(config);
  
  configBase = smart(configBase, entry)
  configBase = smart(configBase, output)
  configBase = smart(configBase, modules)
  configBase = smart(configBase, plugins)
  configBase = smart(configBase, resolve)
  configBase = smart(configBase, performance)
  
  return configBase;
}