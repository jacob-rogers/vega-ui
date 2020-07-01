/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const commonConfig = require('./jest.config');

module.exports = {
  ...commonConfig,
  setupFilesAfterEnv: ['<rootDir>/setup-after-env.tsx'],
  testMatch: ['**/*.spec.{ts,tsx}'],
  preset: 'jest-puppeteer',
};
