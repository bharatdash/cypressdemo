/// <reference types="cypress" />
class LoginPage{
    //Add Locators here
    elements = {
        username : () => cy.get("#Email"),
        password : () => cy.get("#Password"),
        loginBtn : () => cy.get("button[type='submit']"),
        emailError : () => cy.get("#Email-error"),
        usernameOH : () => cy.get("input[placeholder='Username']"),
        passwordOH : () => cy.get("input[placeholder='Password']"),
    }

    //Functions
    loginToApp(email, password){
        this.elements.username().clear().type(email);
        this.elements.password().clear().type(password);
        this.elements.loginBtn().click();
    }

    loginToOrangeHRM(email, password){
        this.elements.usernameOH().clear().type(email);
        this.elements.passwordOH().clear().type(password);
        this.elements.loginBtn().click();
    }

    verifyValidationError() {
        this.elements.username().clear();
        this.elements.loginBtn().click();
        this.elements.emailError().should("have.text", "Please enter your email");
        this.elements.username().type('invalidEmailFormat');
        this.elements.emailError().should("have.text", "Wrong email");
    }

}
export default new LoginPage();