import LoginPage from "./pageObject/loginPage";

describe('Verify Login Page', function() {
  let data;
  before(() => {
    cy.fixture('example').then(function (fdata) {
      data = fdata;
      cy.log('Loaded fixture data:', this.data); // Log the loaded data for debugging
    });
  });

  beforeEach(() => {
    cy.visit('/')
  })

  it('Verify a user can not login using wrong credentials', () => {
    cy.VerifyURL(data.url)
    LoginPage.loginToApp("invalid@mail.com", "data.password");
    cy.get(".message-error").should('contain','Login was unsuccessful. Please correct the errors and try again.');
    LoginPage.verifyValidationError();
  });

  it('Verify the user can login with correct password', () => {
    cy.VerifyURL(data.url)
    LoginPage.loginToApp(data.username, data.password);
    cy.Logout();
  });

})