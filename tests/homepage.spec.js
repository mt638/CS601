
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


test('Check for Nav Menu', async ({ page }) => {
  await page.goto(websitepath);
  await page.waitForSelector('nav');
});

test('Check SignUp Page', async ({ page }) => {
  await page.goto(websitepath);
  await page.waitForSelector('nav');
  await page.click('a:has-text("SIGNUP")');
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
});

test('Check Logo Present or Not', async ({ page }) => {
  await page.goto(websitepath);
  try {
    await page.waitForSelector('img[alt="logo"]', { timeout: 5000 });
    console.log('Logo is present on the page.');
  } catch (error) {
    console.error('Logo is not present on the page.');
  }
});