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