import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('data-test-id=code_test')).toContainText('Mark says hi');
})