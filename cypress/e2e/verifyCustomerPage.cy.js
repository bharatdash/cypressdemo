/// <reference types="cypress"/>
import CustomerPage from "./pageObject/customerPage.js";

describe("Verify Customer page", function () {

    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.data = data;
            cy.LoginSession(this.data.username, this.data.password)
        });
    })

    it("Select a tab", function () {
        cy.visit('/')
        cy.SelectATab("Customer")
    });

    it("Verify All Customer tabs", function () {
        cy.visit('/')
        cy.SelectATab("Customer")
        CustomerPage.verifyCustomerOptions()
    })

});
