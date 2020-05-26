const { pathsToModuleNameMapper } = require('ts-jest/utils');
const tsConfig = require('./tsconfig.json');

module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setup-tests.tsx'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsConfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testMatch: ['**/*.test.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/types/'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.stories.tsx'],
};
