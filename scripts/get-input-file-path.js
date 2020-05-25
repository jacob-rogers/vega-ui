const fs = require('fs');
const path = require('path');

function getInputFilePath(packageRoot) {
  const srcPath = path.join(packageRoot, 'src', 'index.ts');
  const noSrcPath = path.join(packageRoot, 'index.ts');

  try {
    fs.accessSync(srcPath, fs.constants.F_OK);
    return srcPath;
  } catch (e) {} // eslint-disable-line no-empty

  fs.accessSync(noSrcPath, fs.constants.F_OK);
  return noSrcPath;
}

module.exports = {
  getInputFilePath,
};
