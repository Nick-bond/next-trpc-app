module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globalSetup: '<rootDir>/jest.globalSetup.ts',
  globalTeardown: '<rootDir>/jest.globalTeardown.ts',
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
};
