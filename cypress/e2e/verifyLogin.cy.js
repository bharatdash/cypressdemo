import LoginPage from "./pageObject/loginPage";

describe('Verify Login Page', function() {
  let data;
  before(() => {
    cy.fixture('example').then(function (fdata) {
      data = fdata;
    });
  });

  beforeEach(() => {
    cy.visit('/')
    cy.VerifyURL(data.url)
  })

  it('Verify a user can not login using wrong credentials', () => {
    LoginPage.loginToApp("invalid@mail.com", "invalidpassword");
    LoginPage.verifyLoginUnsuccessfulError();
    LoginPage.verifyValidationError();
  });

  it('Verify the user can login with correct password', () => {
    LoginPage.loginToApp(data.username, data.password);
    cy.Logout();
  });

})