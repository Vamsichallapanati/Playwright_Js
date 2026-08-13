import { test, expect } from '@playwright/test';

test('End To End Practice', async ({ page }) => {

    // Launch Website
    await page.goto('https://www.saucedemo.com/');
    

    // Login
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    
    // Verify Home Page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');

    // Sort Products (High to Low)
    await page.locator('.product_sort_container').selectOption('hilo');

    // Verify Selected Option
    await expect(page.locator('.product_sort_container')).toHaveValue('hilo');

    // Print Product Names
    const products = page.locator('.inventory_item_name');

    const count = await products.count();

    console.log("Available Products");

    for(let i=0;i<count;i++)
    {
        console.log(await products.nth(i).textContent());
    }

    // Add Backpack
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    // Add Bike Light
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();

    // Verify Cart Count
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Remove Bike Light
    await page.locator('#remove-sauce-labs-bike-light').click();

    // Verify Cart Count Again
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Open Cart
    await page.locator('.shopping_cart_link').click();

    // Verify Cart Page
    await expect(page).toHaveURL(/cart/);

    // Verify Product Present
    await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');

    // Continue Shopping
    await page.locator('#continue-shopping').click();

    // Add Fleece Jacket
    await page.locator('#add-to-cart-sauce-labs-fleece-jacket').click();

    // Open Cart Again
    await page.locator('.shopping_cart_link').click();

    // Checkout
    await page.locator('#checkout').click();

    // Fill Checkout Information
    await page.locator('#first-name').fill('John');
    await page.locator('#last-name').fill('David');
    await page.locator('#postal-code').fill('500001');

    // Continue
    await page.locator('#continue').click();

    // Verify Overview Page
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');

    // Print Total Amount
    const total = await page.locator('.summary_total_label').textContent();
    console.log(total);

    // Finish Order
    await page.locator('#finish').click();

    // Verify Success Message
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

    // Back to Products
    await page.locator('#back-to-products').click();

    // Verify Inventory Page
    await expect(page.locator('.title')).toHaveText('Products');

    // Open Menu
    await page.locator('#react-burger-menu-btn').click();

    // Wait for Logout Button
    await page.waitForSelector('#logout_sidebar_link');

    // Logout
    await page.locator('#logout_sidebar_link').click();

    // Verify Login Page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();

});