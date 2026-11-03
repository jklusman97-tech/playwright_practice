
const { test, expect } = require('@playwright/test');

test('login works', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('.title')).toHaveText('Products');
});

test('wrong password shows error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'wrong_password');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toContainText('do not match');
});


test('empty login shows error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
});