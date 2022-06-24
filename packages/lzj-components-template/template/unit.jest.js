module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    testMatch: ['**/unit/**/*.(spec|test).(js|ts|jsx|tsx)'],
    collectCoverage: true,
    collectCoverageFrom: [
      'components/**/*.(js|ts|jsx|tsx)',
      '!components/**/*.stories.(js|ts|jsx|tsx)',
      '!components/**/*.(spec|test).(js|ts|jsx|tsx)',
    ],
  };
