
const {test,expect} = require('@playwright/test');

const websitepath = 'https://cs-601.vercel.app/';
const websitepathSignup = 'https://cs-601.vercel.app/signup';

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

test('Check for Menu Section', async ({ page }) => {
  await page.goto(websitepath);
  const ourMenuElement = await page.$('h2:text("Our Menu")');
  expect(ourMenuElement).not.toBeNull();
});

test('Check for About us Section', async ({ page }) => {
  await page.goto(websitepath);
  const aboutusElement = await page.$('h2:text("About Us")');
  expect(aboutusElement).not.toBeNull();
});


test('Check for Featured Food Section', async ({ page }) => {
  await page.goto(websitepath);
  const featuredFoodElement = await page.$('h2:text("Featured Food")');
  expect(featuredFoodElement).not.toBeNull();
});

test('Check for Services Section', async ({ page }) => {
  await page.goto(websitepath);
  const servicesElement = await page.$('h2:text("Choose Best Service")');
  expect(servicesElement).not.toBeNull();
});


test('Check for Menu Items', async ({ page }) => {
  await page.goto(websitepath);
  const menuitemsElement = await page.$$('.grid .flex.gap-2');
  expect(menuitemsElement.length).toBeGreaterThan(1);
});


test('Check for Copyright', async ({ page }) => {
  await page.goto(websitepath);
const copyrightTextElement = await page.$(':text("Copyright")');
  expect(copyrightTextElement).not.toBeNull();
  const copyrightTextContent = await copyrightTextElement.innerText();
  expect(copyrightTextContent).toContain('Copyright');
});

test('Check for Google Analytics code', async ({ page }) => {
await page.goto(websitepath);
const gaScriptElement = await page.$eval('#google-analytics', (script) => script !== null);
expect(gaScriptElement).toBe(true, 'Google Analytics is present');
});


test('Check for Cookies', async ({ page }) => {
  await page.goto(websitepath);
const consentBanner = await page.$(':text("cookies")');
  expect(consentBanner).not.toBeNull();
});

test('Check if Cookies page is Opening are not', async ({ page }) => {
  await page.goto(websitepath);
  const linkWithCookies = await page.$('a[href="/cookies"]');
  expect(linkWithCookies).not.toBeNull();
  await linkWithCookies.click();
});

test('Check for Subscribe Section in SignUp Page', async ({ page }) => {
  await page.goto(websitepathSignup);
  const SubscribetextElement = await page.$('h2:text("Subscribe")');
  expect(SubscribetextElement).not.toBeNull();
});

test('Check for Email Input in SignUp Page', async ({ page }) => {
  await page.goto(websitepathSignup);
  const emailInput = await page.$('input[type="email"]');
  expect(emailInput).not.toBeNull();
});

test('Check for First name Input in SignUp Page', async ({ page }) => {
  await page.goto(websitepathSignup);
  const fnInput = await page.$('input[type="text"].text#mce-FNAME[name="FNAME"]');
  expect(fnInput).not.toBeNull();
});

test('Check for Last name Input in SignUp Page', async ({ page }) => {
  await page.goto(websitepathSignup);
  const lnInput = await page.$('input[type="text"].text#mce-LNAME[name="LNAME"]');
  expect(lnInput).not.toBeNull();
});


test('Check for submit button in SignUp Page', async ({ page }) => {
  await page.goto(websitepathSignup);
  const subInput = await page.$('input[type="submit"]');
  expect(subInput).not.toBeNull();
});



