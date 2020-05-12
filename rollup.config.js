import path from 'path';

import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

const PACKAGE_ROOT = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT, 'src', 'index.ts');
const OUTPUT_DIR = path.join(PACKAGE_ROOT, 'dist');
const PKG_JSON = require(path.join(PACKAGE_ROOT, 'package.json')); // eslint-disable-line import/no-dynamic-require

const formats = [{ type: 'es', target: 'es6' }];

function isExternalModule(id) {
  return !id.startsWith('.') && !id.includes(path.join(PACKAGE_ROOT, 'src'));
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
      postcss(),
      typescript({
        tsconfig: 'tsconfig.json',
        tsconfigOverride: {
          compilerOptions: {
            target: format.target,
          },
          exclude: ['**/*.stories.tsx'],
        },
      }),
    ],
  };
});
