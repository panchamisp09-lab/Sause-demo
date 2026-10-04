const { expect } = require('@playwright/test');

class CartPage {

  constructor(page) {

    this.page = page;

    this.checkoutButton = page.getByRole('button', {
      name: 'Check Out'
    });
  }

  async verifyCartItems() {

    await expect(
      this.page.getByText('Black heels', { exact: true })
    ).toBeVisible();

    await expect(
      this.page.getByText('Bronze sandals', { exact: true })
    ).toBeVisible();
  }

  async proceedToCheckout() {

    await expect(this.checkoutButton).toBeVisible();

    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };