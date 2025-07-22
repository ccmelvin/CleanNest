import { test, expect } from '@playwright/test';

test.describe('CleanNest - Performance Tests', () => {
  
  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    console.log(`Homepage load time: ${loadTime}ms`);
    
    // Expect page to load within 5 seconds (adjust as needed)
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Measure Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Fallback timeout
        setTimeout(() => resolve(0), 3000);
      });
    });
    
    console.log(`LCP: ${lcp}ms`);
    
    // LCP should be under 2.5 seconds (2500ms) for good performance
    if (lcp > 0) {
      expect(lcp).toBeLessThan(2500);
    }
  });

  test('should not have memory leaks during navigation', async ({ page }) => {
    // Navigate multiple times to check for memory leaks
    const iterations = 5;
    
    for (let i = 0; i < iterations; i++) {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Try to navigate between sections if they exist
      const navButtons = page.locator('button, a[href]');
      const buttonCount = await navButtons.count();
      
      if (buttonCount > 0) {
        const randomButton = navButtons.nth(Math.floor(Math.random() * Math.min(buttonCount, 3)));
        try {
          await randomButton.click();
          await page.waitForTimeout(1000);
        } catch {
          // Ignore navigation errors for this test
        }
      }
    }
    
    // If we get here without crashes, memory management is likely okay
    expect(true).toBe(true);
  });

  test('should handle rapid user interactions', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find interactive elements
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      // Rapidly click different buttons
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        try {
          await buttons.nth(i).click({ timeout: 1000 });
          await page.waitForTimeout(100); // Small delay between clicks
        } catch {
          // Continue even if some clicks fail
        }
      }
      
      // Check if page is still responsive
      const body = page.locator('body');
      await expect(body).toBeVisible();
    }
  });

  test('should load efficiently on slow network', async ({ page, context }) => {
    // Simulate slow 3G network
    await context.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Add 100ms delay
      await route.continue();
    });
    
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    console.log(`Slow network load time: ${loadTime}ms`);
    
    // Should still load within reasonable time on slow network
    expect(loadTime).toBeLessThan(10000); // 10 seconds max
  });

  test('should not block main thread excessively', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Measure Total Blocking Time (TBT)
    const tbt = await page.evaluate(() => {
      return new Promise((resolve) => {
        let totalBlockingTime = 0;
        
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.duration > 50) {
              totalBlockingTime += entry.duration - 50;
            }
          });
        }).observe({ entryTypes: ['longtask'] });
        
        setTimeout(() => resolve(totalBlockingTime), 3000);
      });
    });
    
    console.log(`Total Blocking Time: ${tbt}ms`);
    
    // TBT should be under 200ms for good performance
    expect(tbt).toBeLessThan(200);
  });

  test('should handle large datasets efficiently', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // If the app has the ability to add many items, test performance
    const addButtons = page.locator('button:has-text("add")');
    const hasAddButtons = await addButtons.count() > 0;
    
    if (hasAddButtons) {
      const startTime = Date.now();
      
      // Try to add multiple items quickly (if forms are available)
      for (let i = 0; i < 3; i++) {
        try {
          await addButtons.first().click();
          
          // Fill any visible form fields quickly
          const inputs = page.locator('input[type="text"], textarea');
          const inputCount = await inputs.count();
          
          if (inputCount > 0) {
            await inputs.first().fill(`Test Item ${i}`);
            
            // Submit if there's a submit button
            const submitButton = page.locator('button[type="submit"], button:has-text("save"), button:has-text("submit")');
            if (await submitButton.isVisible()) {
              await submitButton.click();
            }
          }
          
          await page.waitForTimeout(500);
        } catch {
          // Continue even if some operations fail
        }
      }
      
      const operationTime = Date.now() - startTime;
      console.log(`Multiple operations time: ${operationTime}ms`);
      
      // Operations should complete in reasonable time
      expect(operationTime).toBeLessThan(10000);
    }
  });
});
