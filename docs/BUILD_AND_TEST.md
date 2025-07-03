# Build and Testing Guide

This document outlines the build and testing processes for the Good Vibes project.

## Overview

The Good Vibes project uses a simple, maintainable build and test setup that aligns with our minimal tooling approach. The setup supports:

- **Development**: Local development server and file watching
- **Testing**: Unit and integration tests with Node.js built-in test runner
- **Linting**: Code quality checks for JavaScript and CSS
- **Building**: Production-ready minified files

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Development Workflow

### Local Development Server

Start the development server to work on the project locally:

```bash
npm run dev
# or
npm start
```

This starts a Python HTTP server on port 8080 serving files from the `src/` directory.
Visit `http://localhost:8080` to view the application.

### File Structure

```
good-vibes/
├── src/                 # Source files
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Main stylesheet
│   ├── utils.css       # Utility CSS classes
│   ├── script.js       # Main JavaScript
│   └── utils.js        # Utility functions
├── tests/              # Test files
│   ├── unit/           # Unit tests
│   └── integration/    # Integration tests
├── scripts/            # Build scripts
└── dist/               # Production build output
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Types

#### Unit Tests (`tests/unit/`)
- Test individual utility functions
- Verify data formatting and validation
- Check DOM manipulation helpers
- Example: `tests/unit/utils.test.js`

#### Integration Tests (`tests/integration/`)
- Test complete workflows (navigation, section switching)
- Verify HTML structure and accessibility
- Check component interactions
- Example: `tests/integration/navigation.test.js`

### Writing Tests

Tests use Node.js built-in test runner with assertions:

```javascript
import { test, describe } from 'node:test';
import assert from 'node:assert';

describe('Feature Name', () => {
    test('should do something specific', () => {
        // Test implementation
        assert.strictEqual(actual, expected);
    });
});
```

## Code Quality

### Linting

The project uses ESLint for JavaScript and Stylelint for CSS:

```bash
# Lint all files
npm run lint

# Lint JavaScript only
npm run lint:js

# Lint CSS only
npm run lint:css

# Auto-fix linting issues
npm run lint:fix
```

### Linting Rules

#### JavaScript (ESLint)
- 4-space indentation
- Single quotes for strings
- Semicolons required
- No unused variables
- Modern ES2022 features
- Consistent code style

#### CSS (Stylelint)
- 2-space indentation
- Single quotes for strings
- Kebab-case for class names
- No vendor prefixes
- Consistent property ordering

## Building for Production

### Build Process

```bash
# Full build process
npm run build
```

This process:
1. Cleans the `dist/` directory
2. Copies source files to `dist/`
3. Minifies HTML, CSS, and JavaScript
4. Reports file size improvements

### Build Steps

```bash
# Individual build steps
npm run build:clean    # Remove dist/ directory
npm run build:copy     # Copy source files
npm run build:minify   # Minify files
```

### Minification

The build process optimizes files for production:

- **HTML**: Removes comments, collapses whitespace
- **CSS**: Removes comments, minifies selectors, optimizes colors
- **JavaScript**: Removes console.log, minifies code, mangles variable names

### Serving Production Build

```bash
npm run serve:dist
```

Serves the production build from `dist/` directory on port 8080.

## Validation

Run the complete validation suite before commits:

```bash
npm run validate
```

This runs both linting and testing to ensure code quality.

## Continuous Integration

The project is set up for easy CI/CD integration. Example workflow:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install
      - run: npm run validate
      - run: npm run build
```

## Browser Support

The project targets modern browsers as defined in `package.json`:

```json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not dead"
]
```

## Troubleshooting

### Common Issues

1. **Tests failing**: Check that all dependencies are installed with `npm install`
2. **Linting errors**: Run `npm run lint:fix` to auto-fix common issues
3. **Build errors**: Ensure Node.js version 18+ is installed
4. **Port conflicts**: Change port in development server if 8080 is in use

### Dependencies

The project uses minimal dependencies:

- **Development**: ESLint, Stylelint, testing utilities
- **Build**: Terser, cssnano, html-minifier-terser
- **Runtime**: No external dependencies (vanilla HTML/CSS/JS)

## Future Enhancements

The build and test setup is designed to scale:

- Add more test types (E2E, visual regression)
- Implement CSS/JS bundling if needed
- Add deployment automation
- Integrate with CI/CD pipelines
- Add performance monitoring

## Contributing

When contributing to the project:

1. Run `npm run validate` before committing
2. Write tests for new features
3. Follow the established code style
4. Update documentation as needed

For more details on the project structure and development guidelines, see:
- [Development Tracking](DEVELOPMENT_TRACKING.md)
- [Project Roadmap](ROADMAP.md)