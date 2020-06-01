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

function prepatePackageDist(packageDir /* ex. packages/components/dropdown */) {
  /* ex. /Users/Vasya/Documents/vega-ui/packages/components/dropdown/src */
  const absoluteSrcPath = path.join(PROJECT_DIR, packageDir, 'src');
  /* ex. /Users/Vasya/Documents/vega-ui/packages/components/dropdown/dist */
  const absolutePackagePath = path.join(PROJECT_DIR, packageDir, 'dist');
  /* ex. components/dropdown */
  const packageRelativePath = packageDir.replace('packages/', '');
  /* ex. /Users/Vasya/Documents/vega-ui/dist/components/dropdown */
  const absoluteCompiledCodePath = path.join(PROJECT_DIR, 'dist', packageRelativePath);

  exec(`mv "${absoluteCompiledCodePath}" "${absolutePackagePath}"`);

  /*
    ex. /Users/Vasya/Documents/vega-ui/packages/components/dropdown/src ->
        /Users/Vasya/Documents/vega-ui/packages/components/dropdown/dist/src
  */
  exec(
    `cpx -pv "${path.join(absoluteSrcPath, '**/*.{svg,png,jpg,jpeg}')}" "${path.join(
      absolutePackagePath,
      'src',
    )}"`,
  );
}

const cwd = process.cwd();

buildPackages();
PGK.workspaces.forEach(prepatePackageDist);
exec(`rm -rf dist`);

process.chdir(cwd);
