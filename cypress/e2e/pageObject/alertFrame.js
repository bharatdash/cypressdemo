class AlertFramePage {
    elements = {
        optionName: (optionName) => cy.xpath(`//span[normalize-space()="${optionName}"]`),
        simpleAlert: () => cy.get('#alertButton'),
        timerAlert: () => cy.get('#timerAlertButton'),
        confirmAlert: () => cy.get('#confirmButton'),
        promptAlert: () => cy.get('#promtButton'),
        confirmMessage: () => cy.get("#confirmResult"),
        promptResult: () => cy.get('#promptResult'),
    }
    selectOption(option) {
        this.elements.optionName(option).click({force: true});
    }

    verifyAlertMessage(type, message) {
        if (type === 'simpleAlert') {
            cy.on('window:alert', (alert) => {
                expect(alert).to.eq(message);
            })
        }
        else if (type === 'confirmAlertOk') {
            cy.on('window:confirm', (alert) => {
                expect(alert).to.eq(message)
                //expect(this.elements.confirmMessage()).to.have.text("You selected Ok")
                this.elements.confirmMessage().should("contain.text", "You selected").and("contain.text", "Ok");
            })
        }
        else if (type === 'confirmAlertCancel') {
            cy.on('window:confirm', () => false)
            this.elements.confirmMessage().should("contain.text", "You selected").and("contain.text", "Cancel");
        }
        else if (type === 'promptOk') {
            cy.window().then((win) =>{
                cy.stub(win, 'prompt').returns(message)
            })
            this.elements.promptAlert().click({force:true});
            this.elements.promptResult().should("contain.text", "You entered").and("contain.text", "Bharat");
        }
    }
}
export default new AlertFramePage();