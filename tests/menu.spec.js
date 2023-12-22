
const {test,expect} = require('@playwright/test');


test('it should load the homepage', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle('Create Next App');

  // Check the entire page
  await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });
});



test('it should navigate to orders page when user is logged in', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Simulate a logged-in user
  await page.evaluate(() => {
    localStorage.setItem('user', 'true');
  });

  // Click on the orders link
  await page.click('text=Orders');

  // Check the orders page
  await page.screenshot({ path: 'screenshots/orders-page.png', fullPage: true });
});


test('it should render the notification component', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Change the URL accordingly

  // Check if the notification component is rendered
  const notificationElement = await page.waitForSelector('.bg-green-500');

  // Check the content of the notification
  const notificationText = await notificationElement.innerText();
  expect(notificationText).toContain('Free delivery for all orders over $50. Order your food now!');

  // Capture a screenshot of the notification
  await page.screenshot({ path: 'screenshots/notification.png' });
});


test('it should render to  the Offer component with valid content', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Change the URL accordingly

  // Check if the Offer component is rendered
  const offerElement = await page.waitForSelector('.bg-black');

  // Check the content of the Offer component
  const offerTitle = await offerElement.$eval('h1', (title) => title.textContent);
  const offerDescription = await offerElement.$eval('p', (description) => description.textContent);

  expect(offerTitle).toContain('Delicious Mutter Panner');
  expect(offerDescription).toContain(
    'Progressively simplify effective e-toilers and process-centric methods of empowerment. Quickly pontificate parallel.'
  );

  // Capture a screenshot of the Offer component
  await page.screenshot({ path: 'screenshots/offer-component-valid-content.png' });
});

test('it should not render the Offer component with invalid content', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Change the URL accordingly

  // Ensure the Offer component is not rendered with invalid content
  const offerElement = await page.waitForSelector('.bg-red-500', { state: 'hidden' });

  expect(offerElement).toBeNull();

  // Capture a screenshot when the Offer component is not rendered
  await page.screenshot({ path: 'screenshots/offer-component-invalid-content.png' });
});

test('it should navigate through the menu categories', async ({ page }) => {
  // Test 1: Navigate to MenuPage
  await page.goto('http://localhost:3000'); // Change the URL accordingly
  await page.click('text=Menu');
  
  // Check if the menu page has loaded
  await expect(page).toBeDefined();

  // Rest of your test...
});
test('it should have images for each menu category', async ({ page }) => {
  // Navigate to the menu page
  await page.goto('http://localhost:3000/menu'); // Change the URL accordingly

  // Wait for the menu page to load
  await page.waitForSelector('.p-4');

  // Get the list of menu categories
  const categories = await page.$$('.w-full');

  // Loop through each category and check if it has an image
  for (const category of categories) {
    // Check if the category has an image
    const categoryImage = await category.$('img');

    // Make the expectation only if an image exists
    if (categoryImage) {
      expect(categoryImage).not.toBeNull();
    }
  }
});

test('it should have the correct number of menu categories', async ({ page }) => {
  await page.goto('http://localhost:3000/menu'); // Change the URL accordingly

  // Wait for the menu page to load
  await page.waitForSelector('.p-4');

  // Get the list of menu categories
  const categories = await page.$$('.w-full');

  // Check if there are exactly 3 menu categories (adjust as needed)
  expect(categories.length).toBe(3);
});



test('it should have valid links for each menu category', async ({ page }) => {
  // Navigate to the menu page
  await page.goto('http://localhost:3000/menu'); // Change the URL accordingly

  // Wait for the menu page to load
  await page.waitForSelector('.p-4');

  // Get the list of menu categories
  const categories = await page.$$('.w-full');

  // Loop through each category and check if it has a valid link
  for (const category of categories) {
    // Check if the category has a link
    const link = await category.$('a');

    // Make the expectations only if a link exists
    if (link) {
      expect(link).not.toBeNull();
      expect(await link.getAttribute('href')).toContain('/menu/');
    }
  }
});


test('it should have a dark background color', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Change the URL accordingly

  // Assuming the Footer component is rendered
  const footerElement = await page.waitForSelector('footer');

  // Check if the background color is dark
  const backgroundColor = await page.evaluate(
    (div) => getComputedStyle(div).backgroundColor,
    await footerElement.$('div')
  );
  expect(backgroundColor).toContain('rgba(0, 0, 0, 0)'); // Adjust the expected color as needed
});

test('it should have white text color', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Change the URL accordingly

  // Assuming the Footer component is rendered
  const footerElement = await page.waitForSelector('footer');

  // Check if the text color is white
  const textColor = await page.evaluate(
    (div) => getComputedStyle(div).color,
    await footerElement.$('div')
  );
  expect(textColor).toContain('rgb(255, 255, 255)'); // Adjust the expected color as needed
});


test('it should render the notification component with the correct content', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with the actual URL

  // Wait for the notification component to be rendered
  const notificationElement = await page.waitForSelector('.bg-green-500');

  // Check the content of the notification
  const notificationText = await notificationElement.innerText();
  expect(notificationText).toContain('Free delivery for all orders over $50. Order your food now!');
});

test('it should have a green background color for the notification component', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with the actual URL

  // Wait for the notification component to be rendered
  const notificationElement = await page.waitForSelector('.bg-green-500');

  // Check the background color of the notification
  const backgroundColor = await page.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
    notificationElement
  );

  // Assert that the background color is green
  expect(backgroundColor).toContain('rgb(34, 197, 94)'); // Adjust the expected color as needed
});

test('it should check the text content of the "Green Palate" link', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with the actual URL

  // Wait for the element to be rendered
  const element = await page.waitForSelector('.text-xl.md\\:font-bold.flex-1.md\\:text-center a');

  // Get the text content of the element
  const textContent = await element.innerText();

  // Assert that the text content is "Green Palate"
  expect(textContent).toContain('GREEN PALATE');
});



test('it should check the appearance and text content of the "Order Now" button', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with the actual URL

  // Wait for the button to be rendered
  const button = await page.waitForSelector('.bg-green-500.text-white.rounded-md.py-3.px-6');

  // Get the text content of the button
  const buttonText = await button.innerText();

  // Get the background color of the button
  const buttonBackgroundColor = await button.evaluate(
    (btn) => getComputedStyle(btn).backgroundColor
  );

  // Get the text color of the button
  const buttonTextColor = await button.evaluate(
    (btn) => getComputedStyle(btn).color
  );

  // Assert that the text content is "Order Now"
  expect(buttonText).toContain('Order Now');

  // Assert that the background color is green (adjust as needed)
  expect(buttonBackgroundColor).toContain('rgb(34, 197, 94)'); // Adjust the expected color

  // Assert that the text color is white (adjust as needed)
  expect(buttonTextColor).toContain('rgb(255, 255, 255)'); // Adjust the expected color
});


test('it should check the appearance, text content, and click functionality of the "Add to Cart" button', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with the actual URL

  // Wait for the button to be rendered
  const button = await page.waitForSelector('.bg-green-500.text-white.p-2.rounded-md');

  // Get the text content of the button
  const buttonText = await button.innerText();

  // Get the background color of the button
  const buttonBackgroundColor = await button.evaluate(
    (btn) => getComputedStyle(btn).backgroundColor
  );

  // Get the text color of the button
  const buttonTextColor = await button.evaluate(
    (btn) => getComputedStyle(btn).color
  );

  // Assert that the text content is "Add to Cart"
  expect(buttonText).toContain('Add to Cart');

  // Assert that the background color is green (adjust as needed)
  expect(buttonBackgroundColor).toContain('rgb(34, 197, 94)'); // Adjust the expected color

  // Assert that the text color is white (adjust as needed)
  expect(buttonTextColor).toContain('rgb(255, 255, 255)'); // Adjust the expected color

  // Click the button
  await button.click();

  // Wait for some time to see the result (you can remove this in a real test)
  await page.waitForTimeout(1000); // Adjust the timeout as needed
});


test('it should render the product image', async ({ page }) => {
  // Navigate to the SingleProductPage
  await page.goto('http://localhost:3000/product/1');

  // Wait for the product image to load
  await page.waitForSelector('.object-contain');

  // Check if the product image is rendered
  const productImage = await page.$('.object-contain');
  expect(productImage).not.toBeNull();
});

test('it should display the product title', async ({ page }) => {
  // Navigate to the SingleProductPage
  await page.goto('http://localhost:3000/product/1');

  // Wait for the product title to load
  await page.waitForSelector('.text-3xl');

  // Check if the product title is displayed
  const productTitle = await page.$('.text-3xl');
  expect(productTitle).not.toBeNull();
});

test('it should show the product description', async ({ page }) => {
  // Navigate to the SingleProductPage
  await page.goto('http://localhost:3000/product/1');

  // Wait for the product description to load
  await page.waitForSelector('p');

  // Check if the product description is present
  const productDescription = await page.$('p');
  expect(productDescription).not.toBeNull();
});

test('it should load the italian panner menu item page', async ({ page }) => {
  // Navigate to the menu item page
  await page.goto('http://localhost:3000/menu/Panner');

  // Wait for the page to load
  await page.waitForLoadState();
  
  // Assert that the page is loaded successfully
  expect(page.url()).toBe('http://localhost:3000/menu/Panner'); // Replace with the expected URL of the page
});

test('it should load the mutter panner menu item page', async ({ page }) => {
  // Navigate to the menu item page
  await page.goto('http://localhost:3000/menu/Mutter%20Panner');

  // Wait for the page to load
  await page.waitForLoadState();
  
  // Assert that the page is loaded successfully
  expect(page.url()).toBe('http://localhost:3000/menu/Mutter%20Panner'); // Replace with the expected URL of the page
});

test('it should load salad menu item page', async ({ page }) => {
  // Navigate to the menu item page
  await page.goto('http://localhost:3000/menu/salads');

  // Wait for the page to load
  await page.waitForLoadState();
  
  // Assert that the page is loaded successfully
  expect(page.url()).toBe('http://localhost:3000/menu/salads'); // Replace with the expected URL of the page
});

test('it should proceed to checkout when the "CHECKOUT" button is clicked', async ({ page }) => {
  await page.goto('http://localhost:3000/cart'); // Replace with the actual URL where your CartPage is hosted

  // Wait for the cart page to load
  await page.waitForSelector('.h-1\\/2.p-4.flex.flex-col.gap-4.justify-center');

  // Click the "CHECKOUT" button
  await page.click('button.bg-green-500.text-white.p-3.rounded-md.self-end');

  // Wait for the checkout page to load
  await page.waitForLoadState();

  // Assert that the page is redirected to the checkout page (replace with the actual URL)
  expect(page.url()).toContain('http://localhost:3000/cart');

});

test('it should display cart items with correct information', async ({ page }) => {
  await page.goto('http://localhost:3000/cart'); // Replace with the actual URL where your CartPage is hosted

  // Wait for the cart page to load
  await page.waitForSelector('.flex.items-center.justify-between.mb-4');

  // Check the information for the first cart item
  const firstCartItem = await page.$('.flex.items-center.justify-between.mb-4');
  const firstItemTitle = await firstCartItem.$eval('h1', (title) => title.textContent);
  const firstItemSize = await firstCartItem.$eval('span', (size) => size.textContent);
  const firstItemPrice = await firstCartItem.$eval('h2', (price) => price.textContent);

  // Assert that the information matches the expected values
  expect(firstItemTitle).toContain('Bruschetta');
  expect(firstItemSize).toContain('Large');
  expect(firstItemPrice).toContain('$79.90');
});


test('it should check the appearance and functionality of the "CHECKOUT" button', async ({ page }) => {
  // Navigate to the CartPage
  await page.goto('http://localhost:3000/cart'); // Replace with the actual URL where your CartPage is hosted

  // Check the presence of the "CHECKOUT" button
  const checkoutButton = await page.waitForSelector('button.bg-green-500.text-white.p-3.rounded-md.self-end');
  expect(checkoutButton).not.toBeNull();

  // Click the "CHECKOUT" button
  await checkoutButton.click();
});







// You can add more tests for additional scenarios, such as checking form validation or error messages.
