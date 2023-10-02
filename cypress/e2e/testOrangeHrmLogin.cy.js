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
    cy.visit("https://opensource-demo.orangehrmlive.com/")
  })

  it("Verify admin Login with Invalid credential", () => {
    cy.VerifyURL(data.orangeHrmURL)
    LoginPage.loginToOrangeHRM("invalidUser", "InvalidPassword");
    LoginPage.verifyValidationErrorOnHRMLogin("Invalid credentials")
  });

  it('Verify the user can login with correct password', () => {
    cy.VerifyURL(data.orangeHrmURL)
    LoginPage.loginToOrangeHRM(data.OHusername, data.OHpassword);
    LoginPage.printUserName();
    cy.CRMLogout();
  });

})