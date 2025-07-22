#!/bin/bash

# Ensure Playwright is installed
npm install @playwright/test --save-dev

# Install Playwright browsers
npx playwright install

echo "Playwright setup complete! You can now run tests with:"
echo "npm run test       # Run all tests"
echo "npm run test:ui    # Run tests with UI mode"
echo "npm run test:debug # Run tests in debug mode"