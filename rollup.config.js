import fs from 'fs';
import path from 'path';

import resolve from '@rollup/plugin-node-resolve';

// const { getInputFilePath } = require('./scripts/get-input-file-path');
// import postcss from 'rollup-plugin-postcss';
// import typescript from 'rollup-plugin-typescript2';

const PACKAGE_ROOT = process.cwd();

const getInputFilePath = (packageRoot) => {
  const srcPath = path.join(packageRoot, 'src', 'index.ts');
  const noSrcPath = path.join(packageRoot, 'index.ts');

  try {
    fs.accessSync(srcPath, fs.constants.F_OK);
    return srcPath;
  } catch (e) {} // eslint-disable-line no-empty

  fs.accessSync(noSrcPath, fs.constants.F_OK);
  return noSrcPath;
};

const changeSlash = (pathStr) => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(pathStr);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(pathStr); // eslint-disable-line no-control-regex

  if (isExtendedLengthPath || hasNonAscii) {
    return pathStr;
  }

  return pathStr.replace(/\\/g, '/');
};

const INPUT_FILE = getInputFilePath(PACKAGE_ROOT);
const OUTPUT_DIR = path.join(PACKAGE_ROOT, 'dist');
const PKG_JSON = require(path.join(PACKAGE_ROOT, 'package.json')); // eslint-disable-line import/no-dynamic-require

const formats = [{ type: 'esm', target: 'es6' }];

function isExternalModule(id) {
  return !id.startsWith('.') && !id.includes(changeSlash(path.join(PACKAGE_ROOT, 'src')));
}

export default formats.map((format) => {
  return {
    input: INPUT_FILE,
    output: {
      file: path.join(OUTPUT_DIR, `index.${format.type}.js`),
      format: format.type,
      name: PKG_JSON.name,
      exports: 'named',
      globals: {
        react: 'React',
      },
    },
    external: isExternalModule,
    plugins: [
      resolve(),
      // postcss({ extract: true }),
      // typescript({
      //   tsconfig: 'tsconfig.json',
      //   tsconfigOverride: {
      //     compilerOptions: {
      //       target: format.target,
      //     },
      //     exclude: ['**/*.stories.tsx'],
      //   },
      // }),
    ],
  };
});
