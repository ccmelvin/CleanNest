import { Page, expect } from '@playwright/test';

/**
 * Common test utilities for CleanNest application
 */

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for the page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot with a descriptive name
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Check if an element is visible and enabled
   */
  async isElementReady(selector: string): Promise<boolean> {
    try {
      const element = this.page.locator(selector);
      await expect(element).toBeVisible();
      await expect(element).toBeEnabled();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Fill form field with validation
   */
  async fillField(selector: string, value: string, label?: string) {
    const field = this.page.locator(selector);
    await expect(field).toBeVisible();
    await field.fill(value);
    
    if (label) {
      console.log(`Filled ${label} with: ${value}`);
    }
  }

  /**
   * Click button and wait for response
   */
  async clickAndWait(selector: string, waitForSelector?: string) {
    await this.page.locator(selector).click();
    
    if (waitForSelector) {
      await this.page.waitForSelector(waitForSelector);
    } else {
      await this.page.waitForTimeout(500); // Small delay for UI updates
    }
  }

  /**
   * Check if text exists on page
   */
  async hasText(text: string): Promise<boolean> {
    try {
      await expect(this.page.locator(`text=${text}`)).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Navigate to a specific route and wait for load
   */
  async navigateTo(path: string) {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }
}

/**
 * Test data generators
 */
export class TestData {
  static generateTask() {
    const tasks = [
      'Clean the kitchen counters',
      'Vacuum living room',
      'Mop bathroom floor',
      'Dust bedroom furniture',
      'Clean windows'
    ];
    
    return {
      title: tasks[Math.floor(Math.random() * tasks.length)],
      category: ['daily', 'weekly', 'monthly'][Math.floor(Math.random() * 3)],
      dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
  }

  static generateShoppingItem() {
    const products = [
      { name: 'All-Purpose Cleaner', brand: 'Method' },
      { name: 'Dish Soap', brand: 'Dawn' },
      { name: 'Paper Towels', brand: 'Bounty' },
      { name: 'Toilet Paper', brand: 'Charmin' },
      { name: 'Glass Cleaner', brand: 'Windex' }
    ];
    
    const product = products[Math.floor(Math.random() * products.length)];
    
    return {
      name: product.name,
      brand: product.brand,
      quantity: Math.floor(Math.random() * 5) + 1
    };
  }

  static generateUser() {
    const timestamp = Date.now();
    return {
      email: `test.user.${timestamp}@example.com`,
      password: 'TestPassword123!',
      name: `Test User ${timestamp}`
    };
  }
}
