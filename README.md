# Sause Demo – Playwright Automation Framework

## 1. Project Overview

This project is a **Playwright automation framework using JavaScript** for testing the Sause Demo e-commerce application.

The framework is designed using the **Page Object Model (POM)** approach with reusable page classes, custom Playwright fixtures, test data management, and organized test scenarios.

The project covers:

* Login negative scenarios
* Product selection
* Add to Cart
* Cart validation
* Checkout flow
* Customer information
* Payment information
* End-to-end purchase validation

---

## 2. Application Under Test

**Application:** Sause Demo / Shopify Demo Store

**Application URL:**

https://sauce-demo.myshopify.com/

---

## 3. Technology Stack

| Technology        | Purpose                   |
| ----------------- | ------------------------- |
| Playwright        | Web UI automation         |
| JavaScript        | Programming language      |
| Node.js           | Runtime environment       |
| npm               | Package management        |
| Page Object Model | Framework design          |
| Playwright Test   | Test execution            |
| Git               | Version control           |
| GitHub            | Source code repository    |
| dotenv            | Environment configuration |

---

## 4. Framework Architecture

The framework follows the **Page Object Model (POM)** design pattern.

Each application page has a dedicated page class containing:

* Locators
* Page actions
* Reusable methods
* Page-specific validations

The test files contain the actual test scenarios while the page classes handle application interactions.

### Framework Flow

```text
Test Specification
       |
       v
Custom Playwright Fixture
       |
       v
Page Object
       |
       v
Application Under Test
       |
       v
Assertions / Test Results
```

---

## 5. Project Structure

```text
Sause-demo/
│
├── fixtures/
│   └── testFixtures.js
│
├── pages/
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── tests/
│   ├── login/
│   │   └── login-negative.spec.js
│   │
│   └── checkout/
│       └── checkout.spec.js
│
├── test-data/
│   └── testData.js
│
├── utils/
│   └── ...
│
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## 6. Page Objects

### LoginPage

Responsible for:

* Opening the login page
* Entering email
* Entering password
* Clicking Login
* Validating login error messages

### ProductsPage

Responsible for:

* Navigating to Catalog
* Selecting products
* Adding products to cart
* Validating cart count
* Navigating to checkout

### CartPage

Responsible for:

* Cart-related operations
* Product/cart validation

### CheckoutPage

Responsible for:

* Customer information
* Address information
* Payment information
* Submitting payment
* Checkout validation

---

## 7. Custom Playwright Fixtures

The project uses custom fixtures to create and provide page objects to test cases.

Example:

```javascript
exports.test = base.test.extend({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    }

});
```

This avoids creating page object instances repeatedly inside every test.

---

## 8. Test Data

Test data is maintained separately from test scripts.

Example:

```javascript
const testData = {

    invalidUser: {
        email: 'invalid@example.com',
        password: 'invalidPassword'
    }

};

module.exports = testData;
```

Keeping test data separate makes the test cases easier to maintain and update.

---

## 9. Automated Test Scenarios

### Login Negative Scenario

The login negative test verifies that the application displays an appropriate error message when invalid credentials are provided.

Example:

```text
Open Login
     ↓
Enter Invalid Email
     ↓
Enter Invalid Password
     ↓
Click Login
     ↓
Validate Error Message
```

---

### E-Commerce Checkout Scenario

The end-to-end checkout test validates the following flow:

```text
Open Application
      ↓
Go to Catalog
      ↓
Select Black Heels
      ↓
Add to Cart
      ↓
Return to Catalog
      ↓
Select Bronze Sandals
      ↓
Add to Cart
      ↓
Return to Catalog
      ↓
Click Check Out
      ↓
Click Check Out Again
      ↓
Enter Customer Information
      ↓
Enter Address
      ↓
Enter Payment Information
      ↓
Click Pay Now
      ↓
Validate "Thank you" Confirmation
```

---

## 10. Handling Application Behavior

During automation, the cart count is updated asynchronously after adding products.

Therefore, the framework waits for the cart state to update before continuing.

Example:

```javascript
await expect(this.cartLink).toBeVisible({
    timeout: 10000
});
```

The checkout flow also contains two checkout actions. The framework handles both steps explicitly before interacting with the customer information form.

This makes the automation more stable and reflects the actual application behavior.

---

## 11. Installation

### Prerequisites

Install the following:

* Node.js
* npm
* Git
* VS Code (recommended)

Verify Node.js:

```powershell
node --version
```

Verify npm:

```powershell
npm --version
```

---

## 12. Clone the Repository

```powershell
git clone https://github.com/panchamisp09-lab/Sause-demo.git
```

Navigate to the project:

```powershell
cd Sause-demo
```

---

## 13. Install Dependencies

```powershell
npm install
```

Install Playwright browsers:

```powershell
npx playwright install
```

---

## 14. Environment Configuration

If environment variables are required, create a `.env` file in the project root.

Example:

```text
BASE_URL=https://sauce-demo.myshopify.com
```

Do not commit `.env` to GitHub if it contains credentials, tokens, passwords, or other sensitive information.

---

## 15. Running Tests

### Run all tests

```powershell
npx playwright test
```

### Run a specific test

```powershell
npx playwright test tests/login/login-negative.spec.js
```

### Run only Chromium

```powershell
npx playwright test tests/login/login-negative.spec.js --project=chromium
```

### Run tests in headed mode

```powershell
npx playwright test --headed
```

### Run a specific test in Chromium headed mode

```powershell
npx playwright test tests/login/login-negative.spec.js --project=chromium --headed
```

---

## 16. Running Tests Using Tags

Tests can be tagged using annotations such as:

```text
@negative
```

Example:

```powershell
npx playwright test --grep "@negative"
```

This executes only tests matching the specified tag.

---

## 17. HTML Test Report

After execution, generate/view the Playwright HTML report using:

```powershell
npx playwright show-report
```

The report provides:

* Passed tests
* Failed tests
* Test duration
* Screenshots
* Videos
* Trace information
* Error details

---

## 18. Debugging Failed Tests

For a failed test, Playwright can capture:

* Screenshot
* Video
* Trace

A trace can be opened using:

```powershell
npx playwright show-trace <path-to-trace.zip>
```

Example:

```powershell
npx playwright show-trace test-results/<test-folder>/trace.zip
```

Trace Viewer helps analyze:

* Actions performed
* Locator resolution
* Network activity
* Screenshots
* Timing
* Errors

---

## 19. Sample Test Output

Example successful execution:

```text
Running tests...

✓ Login negative scenario
✓ Product selection
✓ Add Black heels to cart
✓ Add Bronze sandals to cart
✓ Checkout flow
✓ Customer information validation
✓ Payment flow
✓ Order confirmation

All tests passed.
```

The Playwright HTML report can be used as the detailed execution evidence.

---

## 20. Sample Evidence

The following artifacts can be provided as supporting evidence:

```text
sample-output/
│
├── playwright-report/
└── test-execution-screenshot.png
```

Recommended screenshots:

1. Successful Playwright execution in terminal
2. Playwright HTML report
3. Project folder structure
4. Successful checkout confirmation

---

## 21. GitHub Repository

Source code is available here:

https://github.com/panchamisp09-lab/Sause-demo

---

## 22. Key Framework Features

The framework provides:

* Page Object Model
* Reusable page methods
* Custom Playwright fixtures
* Centralized test data
* Multiple browser support
* Positive and negative test scenarios
* Explicit assertions
* Automatic screenshots on failure
* Video recording
* Trace support
* HTML reporting
* Git/GitHub integration
* Maintainable test structure

---

## 23. Best Practices Followed

The project follows Playwright automation best practices including:

* Using role-based locators where possible
* Keeping locators inside page objects
* Separating test logic from page interaction logic
* Reusing page objects through fixtures
* Keeping test data separate
* Using explicit assertions
* Avoiding unnecessary hard-coded waits where possible
* Supporting parallel browser execution
* Capturing debugging artifacts for failed tests
* Maintaining source code in GitHub

---

## 24. Future Enhancements

The framework can be extended with:

* API automation
* Additional positive and negative scenarios
* Data-driven testing
* CI/CD integration
* GitHub Actions
* Cross-browser execution
* Environment-specific configuration
* Test execution dashboards
* Enhanced reporting

---

## 25. Author

**Panchami SP**

Playwright Automation | JavaScript | Software Testing

GitHub:

https://github.com/panchamisp09-lab
