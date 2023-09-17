// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/* Cypress.Commands.add('LoginAsAdmin',(email,password)=>{
    cy.get('#Email').clear().type(email);
    cy.get('#Password').clear().type(password);
    cy.get("button[type='submit']").click();
}); */

Cypress.Commands.add('VerifyURL', (url) => {
    cy.url().should('eq',url)
});

Cypress.Commands.add('Logout', () => {
    cy.get("a.nav-link").contains("Logout").click();
    cy.get("button[type='submit']").should('be.visible');
});