class LoginPage{

    elements = {
        username : () => cy.get("#Email"),
        password : () => cy.get("#Password"),
        loginBtn : () => cy.get("button[type='submit']"),
    }

    loginToApp(email, password){
        this.elements.username().clear().type(email);
        this.elements.password().clear().type(password);
        this.elements.loginBtn().click();
    }

}
export default new LoginPage();