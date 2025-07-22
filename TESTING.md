# CleanNest Testing Guide

This guide covers how to run and write tests for the CleanNest application using Playwright.

## Test Structure

```
tests/
├── utils/
│   └── test-helpers.ts      # Common testing utilities and data generators
├── pages/
│   └── dashboard.page.ts    # Page Object Model for dashboard
├── smoke.spec.ts            # Basic functionality and smoke tests
├── tasks.spec.ts            # Task management feature tests
├── shopping.spec.ts         # Shopping list feature tests
├── visual.spec.ts           # Visual regression tests
└── performance.spec.ts      # Performance and load tests
```

## Running Tests

### Prerequisites

Make sure Playwright is installed:
```bash
./setup-playwright.sh
```

Or manually:
```bash
npm install @playwright/test --save-dev
npx playwright install
```

### Basic Test Commands

```bash
# Run all tests
npm run test

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run specific test file
npx playwright test smoke.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests with specific tag
npx playwright test --grep "smoke"
```

### Advanced Test Commands

```bash
# Run tests in parallel
npx playwright test --workers=4

# Run tests with video recording
npx playwright test --video=on

# Run tests with trace
npx playwright test --trace=on

# Generate test report
npx playwright show-report

# Update visual snapshots
npx playwright test --update-snapshots
```

## Test Categories

### 1. Smoke Tests (`smoke.spec.ts`)
Basic functionality tests that ensure the application loads and core features work:
- Homepage loading
- Navigation elements
- Mobile responsiveness
- Console error checking
- Basic interactions

### 2. Feature Tests

#### Task Management (`tasks.spec.ts`)
- Task creation and editing
- Task categorization (daily, weekly, monthly)
- Task completion
- Task filtering and sorting

#### Shopping List (`shopping.spec.ts`)
- Adding shopping items
- Product brands and quantities
- Marking items as purchased
- Editing and deleting items

### 3. Visual Regression Tests (`visual.spec.ts`)
- Homepage screenshots across devices
- Component state screenshots
- Dark mode testing (if available)
- Cross-browser visual consistency

### 4. Performance Tests (`performance.spec.ts`)
- Page load times
- Core Web Vitals (LCP, TBT)
- Memory leak detection
- Network performance
- Large dataset handling

## Writing New Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/dashboard.page';

test.describe('Feature Name', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test('should do something', async ({ page }) => {
    // Test implementation
    await expect(page).toHaveTitle(/CleanNest/);
  });
});
```

### Using Page Object Models

```typescript
// Use the dashboard page object
await dashboardPage.addTask('Clean kitchen', 'daily');
await dashboardPage.switchToShopping();
await dashboardPage.addShoppingItem('Dish soap', 'Dawn', 2);
```

### Using Test Helpers

```typescript
import { TestData, TestHelpers } from './utils/test-helpers';

// Generate test data
const testTask = TestData.generateTask();
const testItem = TestData.generateShoppingItem();

// Use helper functions
const helpers = new TestHelpers(page);
await helpers.fillField('#task-title', 'Clean bathroom');
await helpers.clickAndWait('button[type="submit"]');
```

## Test Data

The test suite includes data generators for:
- **Tasks**: Random cleaning tasks with categories and due dates
- **Shopping Items**: Random cleaning products with brands and quantities
- **Users**: Test user accounts for authentication testing

## Best Practices

### 1. Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Keep tests independent and isolated

### 2. Selectors
- Prefer `data-testid` attributes for reliable element selection
- Use semantic selectors when possible
- Avoid brittle CSS selectors

### 3. Assertions
- Use Playwright's built-in assertions (`expect`)
- Test user-visible behavior, not implementation details
- Include meaningful error messages

### 4. Test Data
- Use generated test data to avoid conflicts
- Clean up test data when necessary
- Use realistic test scenarios

### 5. Screenshots and Debugging
- Take screenshots on failures automatically
- Use `page.pause()` for debugging
- Enable trace recording for complex issues

## Continuous Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm run test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## Troubleshooting

### Common Issues

1. **Tests timing out**
   - Increase timeout in `playwright.config.ts`
   - Use `page.waitForLoadState('networkidle')`
   - Check for slow network requests

2. **Element not found**
   - Verify selectors match your actual HTML
   - Use `page.locator().first()` for multiple matches
   - Add wait conditions before interactions

3. **Visual tests failing**
   - Update snapshots with `--update-snapshots`
   - Check for animations or dynamic content
   - Use `animations: 'disabled'` in screenshot options

4. **Flaky tests**
   - Add proper wait conditions
   - Use retry mechanisms
   - Check for race conditions

### Debugging Tips

```typescript
// Pause test execution
await page.pause();

// Take screenshot for debugging
await page.screenshot({ path: 'debug.png' });

// Log page content
console.log(await page.content());

// Wait for specific conditions
await page.waitForSelector('[data-testid="task-list"]');
await page.waitForLoadState('networkidle');
```

## Updating Tests

When adding new features to CleanNest:

1. **Add new selectors** to page objects
2. **Create feature-specific tests** in new spec files
3. **Update visual snapshots** if UI changes
4. **Add performance tests** for new heavy operations
5. **Update this documentation** with new test patterns

## Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

The report includes:
- Test results and timing
- Screenshots and videos of failures
- Trace files for debugging
- Performance metrics

## Contributing

When contributing tests:
- Follow the existing patterns and structure
- Add appropriate documentation
- Ensure tests are reliable and not flaky
- Include both positive and negative test cases
- Test edge cases and error conditions
