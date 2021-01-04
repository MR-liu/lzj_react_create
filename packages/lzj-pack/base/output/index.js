/**
 * @description output
 * @param config
 * @returns build output
 */
const path = require('path');

module.exports = (config) => {
  const { personalizedCustomization, absolutepath } = config;
  const { output, entry } = personalizedCustomization;
  
  if (output && Object.keys(output).length) {
    if (Object.keys(entry).length > 1) {
      return {
        output: {
          ...output,
          filename: '[name].[hash].js', // 打包后的文件名
          path: `${absolutepath}/dist`,
        } // 输出地址 地址必须是绝对路径
      }
    }
    return {
      output: {
        ...output,
        filename: 'bundle.[hash].js', // 打包后的文件名
        path: `${absolutepath}/dist`,
      } // 输出地址 地址必须是绝对路径
    }
  }

  return {
    output: {
      ...output,
      filename: output && output.filename || 'bundle.[hash].js', // 打包后的文件名
      path:  output && path.resolve(absolutepath, output.path) ||`${absolutepath}/dist`,
    } // 输出地址 地址必须是绝对路径
  }
}