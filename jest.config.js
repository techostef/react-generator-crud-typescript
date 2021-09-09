const { defaults } = require('jest-config');

module.exports = {
  // testEnvironment: 'jest-environment-jsdom',
  ...defaults,
  preset: 'ts-jest',
  verbose: true,
  // collectCoverage: true,
  // globals: {},
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  // moduleFileExtensions: [
  //     'js',
  //     'jsx',
  //     'json',
  // ],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    // '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.svg$': '<rootDir>/__mocks__/svgTransform.js',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  // transformIgnorePatterns: [
  //     '<rootDir>/node_modules/',
  // ],

  // testMatch: [
  //     '<rootDir>/**/*.(test|spec).js',
  // ],
  setupFiles: ['<rootDir>/tests/test-env.js'],
};
