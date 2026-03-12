// Mock require.context for Jest
const mockRequireContext = () => ({
  keys: () => [],
  resolve: () => '',
  id: '',
  default: {},
});

// Polyfill for require.context
if (typeof require !== 'undefined') {
  require.context = mockRequireContext;
}

// Suppress Vue console messages (info/warn)
global.console = {
  ...console,
  info: jest.fn(),
  warn: jest.fn(),
};

// Mock window object with navigator
global.window = {
  scrollTo: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  navigator: {
    userAgent: 'jest'
  },
  location: {
    href: '',
    host: 'api.test.com'
  },
  document: {
    documentElement: {
      getAttribute: jest.fn(),
      setAttribute: jest.fn(),
    }
  }
};

// Mock navigator
global.navigator = {
  userAgent: 'jest'
};

// Mock document with location property
global.document = {
  location: {
    href: '',
    host: 'api.test.com'
  },
  cookie: '',
  documentElement: {
    getAttribute: jest.fn(),
    setAttribute: jest.fn(),
  },
  createElement: jest.fn(() => ({
    style: {}
  })),
  body: {
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
    }
  }
};  