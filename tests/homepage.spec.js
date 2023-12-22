
const {test,expect} = require('@playwright/test');

const websitepath = 'https://cs-601.vercel.app/';

test('Check SEO Title', async ({ page }) => {
  await page.goto(websitepath);
  await expect(page).toHaveTitle(/Final Project - Fettuccine Frenzy Fiesta/);
});

test('Check SEO Meta Description', async ({ page }) => {
  await page.goto(websitepath);
  const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
  await expect(metaDescription).not.toBe('');
});

test('Check SEO Meta Keywords', async ({ page }) => {
  await page.goto(websitepath);
  const metaKeywords = await page.getAttribute('meta[name="keywords"]', 'content');
  await expect(metaKeywords).not.toBe('');
});


test('Check SignUp Page', async ({ page }) => {
  await page.goto(websitepath);
  await page.waitForSelector('nav');
  await page.click('a:has-text("SIGNUP")');
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
});