import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/unit/singleton.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/lib/services/**/*.ts',
    'src/app/api/v1/search/route.ts',
    'src/app/api/v1/watchlist/**/*.ts',
    '!src/lib/services/**/*.d.ts',
  ],
};

export default createJestConfig(config);
