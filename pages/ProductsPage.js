const { expect } = require('@playwright/test');

class ProductsPage {

  constructor(page) {
    this.page = page;

    this.catalogLink = page.getByRole('link', {
      name: 'Catalog'
    });

    this.addToCartButton = page.getByRole('button', {
      name: 'Add to Cart'
    });

    this.checkoutLink = page.getByRole('link', {
      name: 'Check Out'
    });

    this.cartLink = page.getByRole('link', {
      name: /My Cart \(\d+\)/
    });
  }

  async goToCatalog() {
    await this.catalogLink.click();

    await this.page.waitForLoadState('domcontentloaded');

    // Give application time to restore/update cart information
    await this.page.waitForTimeout(2000);
  }

  async selectProductByName(productName) {

    const product = this.page.getByRole('link', {
      name: new RegExp(`${productName} ${productName}`, 'i')
    });

    await expect(product).toBeVisible();

    await product.click();

    await this.page.waitForLoadState('domcontentloaded');
  }

  async addToCart() {

    await expect(this.addToCartButton).toBeVisible();

    await this.addToCartButton.click();

    // Application needs time to update cart
    await this.page.waitForTimeout(3000);

    // Wait until cart count appears
    await expect(this.cartLink).toBeVisible({
      timeout: 10000
    });

    console.log(
      'Cart after adding product:',
      await this.cartLink.innerText()
    );
  }

  async clickCheckout() {

    // Wait for Checkout to become available
    await expect(this.checkoutLink).toBeVisible({
      timeout: 15000
    });

    console.log(
      'Checkout link:',
      await this.checkoutLink.innerText()
    );

    await this.checkoutLink.click();

    await this.page.waitForTimeout(3000);
  }
}

module.exports = { ProductsPage };