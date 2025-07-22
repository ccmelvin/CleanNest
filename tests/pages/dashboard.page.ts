import { Page, Locator, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';

export class DashboardPage {
  private helpers: TestHelpers;

  // Locators
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly tasksTab: Locator;
  readonly shoppingTab: Locator;
  readonly addTaskButton: Locator;
  readonly addShoppingItemButton: Locator;
  readonly tasksList: Locator;
  readonly shoppingList: Locator;
  readonly progressStats: Locator;

  constructor(page: Page) {
    this.page = page;
    this.helpers = new TestHelpers(page);
    
    // Define locators
    this.pageTitle = page.locator('h1');
    this.tasksTab = page.locator('[data-testid="tasks-tab"], button:has-text("Tasks")');
    this.shoppingTab = page.locator('[data-testid="shopping-tab"], button:has-text("Shopping")');
    this.addTaskButton = page.locator('[data-testid="add-task-button"], button:has-text("Add Task")');
    this.addShoppingItemButton = page.locator('[data-testid="add-shopping-button"], button:has-text("Add Item")');
    this.tasksList = page.locator('[data-testid="tasks-list"]');
    this.shoppingList = page.locator('[data-testid="shopping-list"]');
    this.progressStats = page.locator('[data-testid="progress-stats"]');
  }

  /**
   * Navigate to dashboard
   */
  async goto() {
    await this.helpers.navigateTo('/');
  }

  /**
   * Check if dashboard is loaded
   */
  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.pageTitle).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Switch to tasks view
   */
  async switchToTasks() {
    if (await this.tasksTab.isVisible()) {
      await this.tasksTab.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Switch to shopping view
   */
  async switchToShopping() {
    if (await this.shoppingTab.isVisible()) {
      await this.shoppingTab.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Add a new task
   */
  async addTask(title: string, category?: string, dueDate?: string) {
    await this.switchToTasks();
    
    if (await this.addTaskButton.isVisible()) {
      await this.addTaskButton.click();
    }

    // Fill task form (adjust selectors based on your actual form)
    await this.helpers.fillField('[data-testid="task-title"], input[name="title"]', title, 'Task Title');
    
    if (category) {
      const categorySelect = this.page.locator('[data-testid="task-category"], select[name="category"]');
      if (await categorySelect.isVisible()) {
        await categorySelect.selectOption(category);
      }
    }
    
    if (dueDate) {
      await this.helpers.fillField('[data-testid="task-due-date"], input[name="dueDate"]', dueDate, 'Due Date');
    }

    // Submit form
    const submitButton = this.page.locator('[data-testid="submit-task"], button[type="submit"], button:has-text("Save")');
    if (await submitButton.isVisible()) {
      await submitButton.click();
      await this.page.waitForTimeout(1000);
    }
  }

  /**
   * Add a shopping item
   */
  async addShoppingItem(name: string, brand?: string, quantity?: number) {
    await this.switchToShopping();
    
    if (await this.addShoppingItemButton.isVisible()) {
      await this.addShoppingItemButton.click();
    }

    // Fill shopping item form
    await this.helpers.fillField('[data-testid="item-name"], input[name="name"]', name, 'Item Name');
    
    if (brand) {
      await this.helpers.fillField('[data-testid="item-brand"], input[name="brand"]', brand, 'Brand');
    }
    
    if (quantity) {
      await this.helpers.fillField('[data-testid="item-quantity"], input[name="quantity"]', quantity.toString(), 'Quantity');
    }

    // Submit form
    const submitButton = this.page.locator('[data-testid="submit-item"], button[type="submit"], button:has-text("Save")');
    if (await submitButton.isVisible()) {
      await submitButton.click();
      await this.page.waitForTimeout(1000);
    }
  }

  /**
   * Mark task as complete
   */
  async completeTask(taskTitle: string) {
    await this.switchToTasks();
    const taskRow = this.page.locator(`[data-testid="task-item"]:has-text("${taskTitle}")`);
    const completeButton = taskRow.locator('[data-testid="complete-task"], input[type="checkbox"], button:has-text("Complete")');
    
    if (await completeButton.isVisible()) {
      await completeButton.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Mark shopping item as purchased
   */
  async markItemPurchased(itemName: string) {
    await this.switchToShopping();
    const itemRow = this.page.locator(`[data-testid="shopping-item"]:has-text("${itemName}")`);
    const purchaseButton = itemRow.locator('[data-testid="mark-purchased"], input[type="checkbox"], button:has-text("Purchased")');
    
    if (await purchaseButton.isVisible()) {
      await purchaseButton.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Get task count
   */
  async getTaskCount(): Promise<number> {
    await this.switchToTasks();
    const tasks = this.page.locator('[data-testid="task-item"]');
    return await tasks.count();
  }

  /**
   * Get shopping item count
   */
  async getShoppingItemCount(): Promise<number> {
    await this.switchToShopping();
    const items = this.page.locator('[data-testid="shopping-item"]');
    return await items.count();
  }

  /**
   * Check if task exists
   */
  async hasTask(title: string): Promise<boolean> {
    await this.switchToTasks();
    return await this.helpers.hasText(title);
  }

  /**
   * Check if shopping item exists
   */
  async hasShoppingItem(name: string): Promise<boolean> {
    await this.switchToShopping();
    return await this.helpers.hasText(name);
  }
}
