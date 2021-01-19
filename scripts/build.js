const path = require('path');
const { execSync } = require('child_process');
const { PROJECT_DIR } = require('../config');
const fs = require('fs');

function exec(cmd) {
  execSync(cmd, { stdio: 'inherit', env: process.env });
}

function buildPackages() {
  exec('yarn build:ts');
  exec('yarn build:css');
}

function prepatePackageDist(packageDir) {
  const absoluteSrcPath = path.join(PROJECT_DIR, 'src', 'components', packageDir);
  const absoluteDistPackagePath = path.join(PROJECT_DIR, 'dist', 'components', packageDir);
  exec(
    `cpx -pv "${path.join(absoluteSrcPath, '**/!(docs)/*.{svg,png,jpg,jpeg}')}" "${path.join(
      absoluteDistPackagePath,
    )}"`,
  );
}

exec('yarn rimraf dist');
const packageList = fs.readdirSync('./src/components');
buildPackages();
packageList.forEach(prepatePackageDist);
