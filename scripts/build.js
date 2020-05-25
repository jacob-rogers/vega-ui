const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { PROJECT_DIR } = require('../config');
const PGK = require('../package.json');

// const { getInputFilePath } = require('./get-input-file-path');

function exec(cmd) {
  execSync(cmd, { stdio: 'inherit', env: process.env });
}

const cwd = process.cwd();

// const ROLLUP_CONFIG_PATH = path.join(PROJECT_DIR, 'rollup.config.js');
// const TS_CONFIG_PATH = path.join(PROJECT_DIR, 'tsconfig.json');

const prependCSSImportToJSFile = (packageDir) => {
  // Записываем в js-файлы импорт css-файла,
  // чтобы не приходилось импортировать стили руками
  try {
    const cssFileName = 'index.esm.css';
    const jsFileName = 'index.esm.js';
    const cssFilePath = path.join(PROJECT_DIR, packageDir, `/dist/${cssFileName}`);
    const jsFilePath = path.join(PROJECT_DIR, packageDir, `/dist/${jsFileName}`);

    if (fs.existsSync(cssFilePath)) {
      const fsOptions = { encoding: 'utf8' };
      const codeToPrepend = `import "./${cssFileName}";\n`;
      const currentFileData = fs.readFileSync(jsFilePath, fsOptions);

      fs.writeFileSync(jsFilePath, codeToPrepend + currentFileData, fsOptions);
    }
  } catch (e) {} // eslint-disable-line no-empty
};

PGK.workspaces.forEach((packageDir) => {
  const absolutePackageDir = path.join(PROJECT_DIR, packageDir);
  // const absolutePackageIndexPath = getInputFilePath(absolutePackageDir);

  process.chdir(absolutePackageDir);

  // console.log(absolutePackageIndexPath);
  // exec(
  //   `tsc ${absolutePackageIndexPath} --outDir dist --project ${TS_CONFIG_PATH} --declarationDir dist`,
  // );
  // exec(`rollup -c=${ROLLUP_CONFIG_PATH}`);
  // exec(`postcss '**/*.css' --dir dist --base . --no-map`);
  prependCSSImportToJSFile(packageDir);
});

process.chdir(cwd);
