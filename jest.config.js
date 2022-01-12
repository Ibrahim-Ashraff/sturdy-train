module.exports = {
  verbose: true,
  clearMocks: true,
  collectCoverage: false,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  collectCoverageFrom: ['src/pages/**/*.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/pages/',
    '<rootDir>/src/index.js',
    '<rootDir>/src/reportWebVitals.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/src/pages/*.js',
    '<rootDir>/src/utils/*',
    '<rootDir>/src/index.js',
    '<rootDir>/src/reportWebVitals.js',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg|cass|scss|less|css)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testEnvironment: 'jsdom',
}