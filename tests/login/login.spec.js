import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test('user should successfully log in to Sauce Demo Shopify store', async ({ page }) => {

  const loginPage = new LoginPage(page);

  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

    await loginPage.navigateToStore();
    await loginPage.openLoginPage();
    await loginPage.verifyLoginPageDisplayed();

});