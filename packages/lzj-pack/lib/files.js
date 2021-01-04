const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },
  getAbsolutepath: () => {
    return process.cwd();
  },
  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  }
};
