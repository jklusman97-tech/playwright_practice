
const { test, expect } = require('@playwright/test');
//test 1
test('login works', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('.title')).toHaveText('Products');
});
//test 2
test('wrong password shows error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'wrong_password');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toContainText('do not match');
});

// test 3
test('empty login shows error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
});

//test 4 log out user test
test('Logout user successfully', async ({ page }) => {
  // 1. Go to the site and log in
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 2. Open the side menu and click Logout
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

  // 3. Check that you are back on the login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('#login-button')).toBeVisible();
});