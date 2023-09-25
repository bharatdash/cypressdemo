/// <reference types="cypress"/>
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
        CustomerPage.selectACustomerOptions("Online customers");
        cy.get("h1.float-left")
        .should(($element) => {
            expect($element.text().trim()).to.equal("Online customers");
        });
        
        cy.get("h1.float-left").invoke("text").then(function (text) {
            expect(text.trim()).to.equal("Online customers");
        });

        cy.get("h1.float-left").invoke("text").then(function (text) {
            cy.wrap(text.trim()).should("eq", "Online customers");
        });
    });

});
