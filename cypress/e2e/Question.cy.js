//I am seeing errors when running multiple it blocks.

import LoginPage from "./pageObject/loginPage";

describe('Verify Login Page', function () {

  beforeEach(function () {
    cy.fixture('example').then(function (data) {
      this.data = data
      cy.visit('/');
      cy.VerifyURL(this.data.url);
    })
  });

  it('Verify a user can not login using wrong credentials', function () {
    LoginPage.loginToApp("invalid@mail.com", "sspassword");
    LoginPage.verifyUnsuccessfulLogin();
    LoginPage.verifyValidationError();
  });

  it.only('Verify the user can login with correct password', function () {
    cy.LoginSession(this.data.username, this.data.password);
    cy.visit('/')
    cy.Logout();
  });

})


/* import LoginPage from "./pageObject/loginPage";

describe('Verify Login Page', function () {
  let testData; // Declare a variable to store the loaded data

  before(function () {
    cy.fixture('example').then(function (data) {
      testData = data; // Assign the loaded data to the variable
    });
  });

  beforeEach(function () {
    // Ensure that testData is defined before proceeding
    if (!testData) {
      throw new Error('Test data is undefined. Check the before hook.');
    }
    
    cy.visit('/');
    cy.VerifyURL(testData.url);
  });

  it('Verify a user cannot login using wrong credentials', function () {
    LoginPage.loginToApp("invalid@mail.com", "sspassword");
    LoginPage.verifyUnsuccessfulLogin();
    LoginPage.verifyValidationError();
  });

  it('Verify the user can login with the correct password', function () {
    cy.LoginSession(testData.username, testData.password);
    cy.visit('/');
    cy.Logout();
  });
});
 */