const { resolve } = require(`path`);
const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  displayName: `root-tests`,
  testMatch: [`<rootDir>/test/*.test.ts`],
  testEnvironment: `node`,
  setupFiles: [`dotenv/config`],
  setupFilesAfterEnv: [`<rootDir>/test/jest.setup.ts`, `dotenv/config`],
  coverageDirectory: `<rootDir>/test/coverage`,
  coverageReporters: [`html`, `text`],
  collectCoverageFrom: [
    `**/*.ts`,
    `!**/node_modules/**`,
    `!**/vendor/**`,
    `!**/test/**`,
    `!jest.config.ts`,
  ],
  moduleNameMapper: {
    '^@/(.*)$': `<rootDir>/src/$1`,
  },
  clearMocks: true,
  preset: `ts-jest`,
};
