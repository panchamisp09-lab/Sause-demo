const { expect } = require('@playwright/test');

class CheckoutPage {

  constructor(page) {
    this.page = page;

    // Customer details
    this.emailInput = page.getByRole('textbox', {
      name: 'Email'
    });

    this.firstNameInput = page.getByRole('textbox', {
      name: 'First name (optional)'
    });

    this.lastNameInput = page.getByRole('textbox', {
      name: 'Last name'
    });

    this.addressInput = page.getByRole('combobox', {
      name: 'Address'
    });

    this.cityInput = page.getByRole('textbox', {
      name: 'City'
    });

    this.pinCodeInput = page.getByRole('textbox', {
      name: 'PIN code'
    });

    // Payment iframes
    this.cardNumberFrame = page
      .locator('iframe[name^="card-fields-number-"]')
      .contentFrame()
      .getByRole('textbox', {
        name: 'Card number'
      });

    this.expiryFrame = page
      .locator('iframe[name^="card-fields-expiry-"]')
      .contentFrame()
      .getByRole('textbox', {
        name: 'Expiration date (MM / YY)'
      });

    this.securityCodeFrame = page
      .locator('iframe[name^="card-fields-verification_value-"]')
      .contentFrame()
      .getByRole('textbox', {
        name: 'Security code'
      });

    this.payNowButton = page.getByRole('button', {
      name: 'Pay now'
    });
  }

  async fillCustomerDetails(details) {

    await expect(this.emailInput).toBeVisible({
      timeout: 15000
    });

    await this.emailInput.fill(details.email);

    await this.firstNameInput.fill(details.firstName);

    await this.lastNameInput.fill(details.lastName);

    await this.addressInput.fill(details.address);

    await this.cityInput.fill(details.city);

    await this.pinCodeInput.fill(details.postalCode);
  }

  async fillPaymentDetails(details) {

  // Card number
  await expect(this.cardNumberFrame).toBeVisible({
    timeout: 15000
  });

  await this.cardNumberFrame.fill(details.cardNumber);

  // Expiration date
  await expect(this.expiryFrame).toBeVisible({
    timeout: 15000
  });

  await this.expiryFrame.fill(details.expiryDate);

  // Give payment iframe time to activate CVV field
  await this.page.waitForTimeout(2000);

  // Security code / CVV
  await expect(this.securityCodeFrame).toBeVisible({
    timeout: 15000
  });

  await expect(this.securityCodeFrame).toBeEditable({
    timeout: 15000
  });

  await this.securityCodeFrame.fill(details.cvv);
}
  async submitPayment() {

    await expect(this.payNowButton).toBeVisible({
      timeout: 15000
    });

    await this.payNowButton.click();
  }
}

module.exports = { CheckoutPage };