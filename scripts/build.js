const path = require('path');
const { execSync } = require('child_process');
const { PROJECT_DIR } = require('../config');
const PGK = require('../package.json');

function exec(cmd) {
  execSync(cmd, { stdio: 'inherit', env: process.env });
}

function buildPackages() {
  exec('yarn packages:clean');
  exec('yarn build:ts');
  exec('yarn build:css');
}

function moveCompiledCodeInsidePackage(packageDir) {
  const packagePath = path.join(PROJECT_DIR, packageDir, 'dist');
  const packageRelativePath = packageDir.replace('packages/', '');
  const compiledPath = path.join(PROJECT_DIR, 'dist', packageRelativePath);

  exec(`mv '${compiledPath}' '${packagePath}'`);
  exec(`rm -f ${path.join(packagePath, '**/*.stories.*')}`);
  exec(`rm -f ${path.join(packagePath, '**/*.test.*')}`);
}

const cwd = process.cwd();

buildPackages();
PGK.workspaces.forEach(moveCompiledCodeInsidePackage);
exec(`rm -rf dist`);

process.chdir(cwd);
