import alertFramePage from './pageObject/alertFrame.js';

describe('Test Alert, Frame', function () {
    beforeEach(function () {
        cy.visit("https://demoqa.com/alertsWindows");
        cy.once('uncaught:exception', () => false);
    });
    it('Testing SIMPLE alert', function () {
        alertFramePage.selectOption('Alerts')
        alertFramePage.elements.simpleAlert().click()
        alertFramePage.verifyAlertMessage("simpleAlert", "You clicked a button")
    });

    it('verify the DELAYED alert', () => {
        alertFramePage.selectOption('Alerts')
        alertFramePage.elements.timerAlert().click()
        alertFramePage.verifyAlertMessage("simpleAlert", "This alert appeared after 5 seconds")
    });

    it('verify the CONFIRM alert OK', () => {
        alertFramePage.selectOption('Alerts')
        alertFramePage.elements.confirmAlert().click()
        alertFramePage.verifyAlertMessage("confirmAlertOk", "Do you confirm action?")
    });

    it('verify the CONFIRM alert CANCEL', () => {
        alertFramePage.selectOption('Alerts')
        alertFramePage.elements.confirmAlert().click()
        alertFramePage.verifyAlertMessage("confirmAlertCancel", "Do you confirm action?")
    });

    it('verify the PROMPT alert', () => {
        alertFramePage.selectOption('Alerts')
        alertFramePage.verifyAlertMessage("promptOk", "Bharat")
    });

    it('Verify IFrame', () => {
        alertFramePage.selectOption('Frames');
        // Select the iframe and assert its content directly
        cy.get("#frame1")
            .its('0.contentDocument.body')
            .should('be.visible')
            .should('have.text', 'This is a sample page');
    });

    it('Verify IFrame using cypress iframe plugin', () => {
        alertFramePage.selectOption('Frames');
        cy.frameLoaded('#frame1')
        cy.iframe('#frame1').should('have.text', 'This is a sample page');
    });
});