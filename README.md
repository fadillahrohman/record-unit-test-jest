## Unit Testing Setup with Jest

This documentation explains the setup steps and how to run unit tests using Jest in this project.

### 1. Prerequisites

- Node.js LTS (16.x or 18.x recommended)
- npm

### 2. Install Dependencies

Run from the project root:

```bash
npm install
```

### 3. Configuration Used

This project already has a Jest configuration in the `jest.config.js` file with the following key points:

- `testEnvironment: 'jsdom'` for simulating a browser environment
- `setupFiles: ['<rootDir>/tests/setup.js']` for initializing global mocks before running tests
- `testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)']` for test file patterns
- Transformer:
- `@vue/vue2-jest` for `.vue` files
- `babel-jest` for `.js/.jsx` files
- `jest-transform-stub` for asset/style files

### 4. Test Structure

Example of current test structure:

```text
tests/
setup.js
unit/
api/
users.api.spec.js
...
```

Recommended test file name format:

- `*.spec.js` (e.g., `users.api.spec.js`)

### 5. Running Unit Tests

Run all unit tests:

```bash
npm test
```

Or directly via Jest:

```bash
npx jest
```

Run a specific test file:

```bash
npx jest tests/unit/api/programs.api.spec.js
```

Run in watch mode:

```bash
npx jest --watch
```

### 6. Running Coverage

To view coverage results:

```bash
npx jest --coverage
```

Coverage configuration follows the `collectCoverageFrom` in `jest.config.js`.

### 7. Global Mock Setup Notes

The `tests/setup.js` file is used to prepare global test requirements, such as:

- mock `require.context`
- mock `window`, `document`, and `navigator`
- override `console.info` and `console.warn`

If new tests require additional browser APIs, add the relevant mocks to this file.
