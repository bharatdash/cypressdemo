import CustomerPage from "./pageObject/customerPage.js";

describe("Verify Customer page", function () {

    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.data = data;
            cy.LoginSession(this.data.username, this.data.password)
        });
    })

    it("Select customer tab", function () {
        cy.visit('/')
        cy.SelectATab("Customer")
        CustomerPage.verifyCustomerOptions()
        CustomerPage.selectACustomerOptions("Customers");
        CustomerPage.verifyTheHeaderOfSelectedOptions("Customers");
    });

    it("Add a new customer", function () {

    });

});
