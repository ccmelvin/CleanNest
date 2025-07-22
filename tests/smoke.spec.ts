import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/dashboard.page';

test.describe('CleanNest - Smoke Tests', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Check if the page loads
    await expect(page).toHaveURL('/');
    
    // Check for basic page elements
    await expect(page).toHaveTitle(/CleanNest/);
    
    // Take a screenshot for visual verification
    await page.screenshot({ path: 'test-results/homepage-loaded.png' });
  });

  test('should display main navigation elements', async ({ page }) => {
    // Check if main UI elements are present
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Look for common UI patterns
    const possibleHeaders = page.locator('h1, h2, [role="heading"]');
    const headerCount = await possibleHeaders.count();
    expect(headerCount).toBeGreaterThan(0);
    
    // Check for interactive elements
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Reload page with mobile viewport
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check if page is still functional
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Take mobile screenshot
    await page.screenshot({ path: 'test-results/mobile-view.png' });
  });

  test('should handle navigation between sections', async ({ page }) => {
    // Try to find and click navigation elements
    const navElements = page.locator('nav a, button[role="tab"], [data-testid*="tab"]');
    const navCount = await navElements.count();
    
    if (navCount > 0) {
      // Click first navigation element
      await navElements.first().click();
      await page.waitForTimeout(1000);
      
      // Verify page didn't crash
      const body = page.locator('body');
      await expect(body).toBeVisible();
    }
  });

  test('should not have console errors', async ({ page }) => {
    const errors: string[] = [];
    
    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Navigate and interact with the page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Click around to trigger any potential errors
    const clickableElements = page.locator('button, a, [role="button"]');
    const clickCount = Math.min(await clickableElements.count(), 3);
    
    for (let i = 0; i < clickCount; i++) {
      try {
        await clickableElements.nth(i).click({ timeout: 2000 });
        await page.waitForTimeout(500);
      } catch {
        // Ignore click failures for this test
      }
    }
    
    // Check for critical errors (ignore minor warnings)
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.toLowerCase().includes('warning')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});
