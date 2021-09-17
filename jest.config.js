module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  verbose: true,
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.svg$': '<rootDir>/__mocks__/svgTransform.js',
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  setupFiles: ['<rootDir>/tests/test-env.js'],
};
