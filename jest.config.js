const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Path to Next.js app to load next.config.js and .env files in the test environment
  dir: './',
});

// Custom config
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/data/**', // coveragePathIgnorePatterns works weirdly, so to make
    '!**/fonts/**', // jest ignore folders/files use collectCoverageFrom
    '!**/styles/**',
    '!**/types/**',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/', '/__tests__/'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
