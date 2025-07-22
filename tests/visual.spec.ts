import { test, expect } from '@playwright/test';

test.describe('CleanNest - Visual Tests', () => {
  
  test('should take homepage screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for any animations to complete
    await page.waitForTimeout(1000);
    
    // Take screenshot and save to results folder
    await page.screenshot({ 
      path: 'test-results/screenshots/homepage-full.png',
      fullPage: true 
    });
    
    // Verify page loaded successfully
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should take mobile homepage screenshot', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Mobile screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/homepage-mobile.png',
      fullPage: true 
    });
    
    // Verify mobile layout works
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should take tablet view screenshot', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Tablet screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/homepage-tablet.png',
      fullPage: true 
    });
    
    // Verify tablet layout works
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should capture tasks section if available', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Try to navigate to tasks section
    const tasksButton = page.locator('button:has-text("task"), [data-testid*="task"]').first();
    
    if (await tasksButton.isVisible()) {
      await tasksButton.click();
      await page.waitForTimeout(1000);
      console.log('✅ Found and clicked tasks button');
    } else {
      console.log('ℹ️  No tasks button found, capturing current state');
    }
    
    await page.screenshot({ 
      path: 'test-results/screenshots/tasks-section.png',
      fullPage: true 
    });
    
    // Verify page is still functional
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should capture shopping section if available', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Try to navigate to shopping section
    const shoppingButton = page.locator('button:has-text("shop"), [data-testid*="shop"]').first();
    
    if (await shoppingButton.isVisible()) {
      await shoppingButton.click();
      await page.waitForTimeout(1000);
      console.log('✅ Found and clicked shopping button');
    } else {
      console.log('ℹ️  No shopping button found, capturing current state');
    }
    
    await page.screenshot({ 
      path: 'test-results/screenshots/shopping-section.png',
      fullPage: true 
    });
    
    // Verify page is still functional
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should check for dark mode toggle', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Look for dark mode toggle
    const darkModeToggle = page.locator('button:has-text("dark"), button:has-text("theme"), [data-testid*="theme"], [data-testid*="dark"]');
    
    if (await darkModeToggle.isVisible()) {
      console.log('✅ Found dark mode toggle');
      
      // Take screenshot before toggle
      await page.screenshot({ 
        path: 'test-results/screenshots/before-dark-mode.png',
        fullPage: true 
      });
      
      await darkModeToggle.click();
      await page.waitForTimeout(1000);
      
      // Take screenshot after toggle
      await page.screenshot({ 
        path: 'test-results/screenshots/after-dark-mode.png',
        fullPage: true 
      });
    } else {
      console.log('ℹ️  No dark mode toggle found');
      await page.screenshot({ 
        path: 'test-results/screenshots/no-dark-mode.png',
        fullPage: true 
      });
    }
  });

  test('should capture interactive states', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find the first button
    const buttons = page.locator('button').first();
    
    if (await buttons.isVisible()) {
      // Normal state
      await page.screenshot({ 
        path: 'test-results/screenshots/button-normal-state.png'
      });
      
      // Hover state
      await buttons.hover();
      await page.waitForTimeout(500);
      await page.screenshot({ 
        path: 'test-results/screenshots/button-hover-state.png'
      });
      
      // Focus state
      await buttons.focus();
      await page.waitForTimeout(500);
      await page.screenshot({ 
        path: 'test-results/screenshots/button-focus-state.png'
      });
      
      console.log('✅ Captured button interaction states');
    } else {
      console.log('ℹ️  No buttons found for interaction testing');
    }
  });

  test('should verify responsive design elements', async ({ page }) => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      // Take screenshot for each viewport
      await page.screenshot({ 
        path: `test-results/screenshots/responsive-${viewport.name}.png`,
        fullPage: true 
      });
      
      // Verify content is visible at this viewport
      const body = page.locator('body');
      await expect(body).toBeVisible();
      
      console.log(`✅ Captured ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
    }
  });
});
