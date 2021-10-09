'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const resolveConfigApp = relativePath => path.resolve(__dirname, relativePath);


const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
  'json',
];

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appPkg: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appUtils: resolveApp('src/utils'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  appCache: resolveApp('node_modules/.cache/webpack'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  appDevConfig: resolveConfigApp('../webpack.config/webpack.dev'),
  analyzeConfig: resolveConfigApp('../webpack.config/webpack.analyze'),
  pwaConfig: resolveConfigApp('../webpack.config/webpack.pwa'),
  pwaJs: resolveModule(resolveApp, 'public/sw-reg'),
  appAsset: resolveApp('public/asset'),
  publicUrlOrPath: resolveApp('package.json').publicPath || '',
};
