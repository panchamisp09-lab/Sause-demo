import { test, expect } from '@playwright/test';
test.setTimeout(60000);

import { ProductsPage } from '../pages/ProductsPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test(
  'SauceDemo E-Commerce End-to-End - select products and checkout',
  async ({ page }) => {

    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // -----------------------------------
    // Open Catalog
    // -----------------------------------

    await page.goto(
      'https://sauce-demo.myshopify.com/collections/all',
      {
        waitUntil: 'domcontentloaded'
      }
    );

    // -----------------------------------
    // Add Black heels
    // -----------------------------------

    await productsPage.selectProductByName('Black heels');

    await productsPage.addToCart();

    // -----------------------------------
    // Go back to Catalog
    // -----------------------------------

    await productsPage.goToCatalog();

    // -----------------------------------
    // Add Bronze sandals
    // -----------------------------------

    await productsPage.selectProductByName('Bronze sandals');

    await productsPage.addToCart();

    // -----------------------------------
    // Go back to Catalog
    // -----------------------------------

    await productsPage.goToCatalog();

    // -----------------------------------
    // Click Check Out directly
    // -----------------------------------

    await productsPage.clickCheckout();
const checkoutButton = page.getByRole('button', {
  name: 'Check Out'
});

await expect(checkoutButton).toBeVisible({
  timeout: 15000
});

await checkoutButton.click();

await page.waitForTimeout(5000);
    // -----------------------------------
    // Click Check Out on checkout/cart
    // -----------------------------------

    /*const checkoutButton = page.getByRole('button', {
      name: 'Check Out'
    });

    await expect(checkoutButton).toBeVisible();

    await checkoutButton.click();*/

    // -----------------------------------
    // Customer details
    // -----------------------------------

    await checkoutPage.fillCustomerDetails({
      email: 'pan@gmail.com',
      firstName: 'Pan',
      lastName: 'SP',
      address: '21 abc',
      city: 'bangalore',
      postalCode: '560077'
    });

    // -----------------------------------
    // Payment
    // -----------------------------------

    await checkoutPage.fillPaymentDetails({
      cardNumber: '1',
      expiryDate: '09 / 27',
      cvv: '123'
    });

    await checkoutPage.submitPayment();

    // -----------------------------------
    // Verify successful payment
    // -----------------------------------

    await expect(
      page.getByRole('heading', {
        name: 'Thank you, Pan!'
      })
    ).toBeVisible();
  }
);