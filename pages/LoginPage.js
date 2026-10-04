const { expect } = require('@playwright/test');

class LoginPage {

  constructor(page) {

    this.page = page;

    this.loginNavLink = page.getByRole('link', { name: 'Log In' });

    this.emailInput = page.getByRole('textbox', { name: 'Email Address' });

    this.passwordInput = page.getByRole('textbox', { name: 'Password' });

    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async navigateToStore() {

    await this.page.goto(
      'https://sauce-demo.myshopify.com/',
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expect(this.page).toHaveURL(
      /sauce-demo\.myshopify\.com/
    );
  }

  async openLoginPage() {

    await expect(this.loginNavLink).toBeVisible();

    await this.loginNavLink.click();

    await expect(this.page).toHaveURL(
      /account\/login/
    );
  }

  async login(email, password) {

  console.log('EMAIL:', email);
  console.log('PASSWORD:', password);

  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);

  await this.signInButton.click();

  await this.page.waitForTimeout(2000);

  console.log('AFTER LOGIN URL:', this.page.url());

  console.log('PAGE TITLE:', await this.page.title());

  console.log(
    'BODY TEXT:',
    await this.page.locator('body').innerText()
  );
}

  async verifyLoginPageDisplayed() {
  await expect(this.page).toHaveURL(/account\/login/);
  await expect(this.emailInput).toBeVisible();
  await expect(this.passwordInput).toBeVisible();
  await expect(this.signInButton).toBeVisible();
}
}

module.exports = { LoginPage };