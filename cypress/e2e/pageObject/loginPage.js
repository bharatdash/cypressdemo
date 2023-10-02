/// <reference types="cypress" />
class LoginPage {
    //Add Locators here
    elements = {
        username: () => cy.get("#Email"),
        password: () => cy.get("#Password"),
        loginBtn: () => cy.get("button[type='submit']"),
        emailError: () => cy.get("#Email-error"),
        loginUnsuccessfulMsg: () => cy.get(".message-error"),

        //Orange HRM locators here
        usernameOH: () => cy.get("input[placeholder='Username']"),
        passwordOH: () => cy.get("input[placeholder='Password']"),
        errorMsgOnLogin: () => cy.get("p.oxd-alert-content-text"),
        spinner: () => cy.get(".oxd-loading-spinner"),
        loggedInUser: () => cy.get('p.oxd-userdropdown-name')
    }

    //Functions
    loginToApp(email, password) {
        cy.visit('/')
        this.elements.username().clear().type(email);
        this.elements.password().clear().type(password);
        this.elements.loginBtn().click();
    }

    loginToOrangeHRM(email, password) {
        this.elements.usernameOH().clear().type(email);
        this.elements.passwordOH().clear().type(password);
        this.elements.loginBtn().click();
        this.elements.spinner().should('not.exist');
    }

    verifyValidationError() {
        this.elements.username().clear();
        this.elements.loginBtn().click();
        this.elements.emailError().should("have.text", "Please enter your email");
        this.elements.username().type('invalidEmailFormat');
        this.elements.emailError().should("have.text", "Wrong email");
    }

    verifyUnsuccessfulLogin() {
        this.elements.loginUnsuccessfulMsg().should('contain', 'Login was unsuccessful. Please correct the errors and try again.');
    }

    verifyLoginUnsuccessfulError() {
        this.elements.loginUnsuccessfulMsg().should('contain', 'Login was unsuccessful. Please correct the errors and try again.');
    }

    verifyValidationErrorOnHRMLogin(msg) {
        this.elements.errorMsgOnLogin().should("have.text", msg);
    }

    getUserName() {
        return this.elements.loggedInUser().invoke('text').then((text) => {
            return text.trim();
        });
    }

    printUserName() {
        this.getUserName().then((name) => {
            cy.log(name);
            expect(name).to.equal('Paul Collings');
        });
    }

}
export default new LoginPage();