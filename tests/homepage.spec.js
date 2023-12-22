
const {test,expect} = require('@playwright/test');


test('has title', async ({ page }) => {
  await page.goto('https://cs-601.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Create Next App/);
});
