module.exports = {
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '^store/modules$': '<rootDir>/store/__mocks__/modules.js',
    '^store/modules/index$': '<rootDir>/store/__mocks__/modules.js',
  },
  setupFiles: ['<rootDir>/tests/setup.js'],
  moduleFileExtensions: ['vue', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jsdom',
  forceExit: true,
  globals: {
    '@vue/vue2-jest': {
      compiler: 'vue-template-babel-compiler'
    }
  },
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)',
  ],
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverageFrom: [
    'components/**/*.{js,vue}',
    'pages/**/*.vue',
    'api/**/*.js',
    '!**/*.spec.js',
  ],
};