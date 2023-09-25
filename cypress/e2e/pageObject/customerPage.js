import fixtureData from '../../fixtures/example.json';

class CustomerPage {
    elements = {
        selectedOptionsHeader: () => cy.get("h1.float-left"),
        allMenus: () => cy.get(".sidebar ul[role=menu]").children("li[class^='nav-item']"),
        allMenusExceptDashboard: () => cy.get(".sidebar ul[role=menu]").children("li[class^='nav-item has']"),
        customMenu: (menuName) => cy.get(".sidebar ul[role=menu]").children("li[class^='nav-item has']").contains(`${menuName}`).next('ul').find('li')
    }
    verifyCustomerOptions() {
        //expand customer
        const list = []
        this.elements.customMenu('Customer').should('have.length', 7)
        .each(($ele) => {
            list.push($ele.text().trim())
        })
        .then(() => {
            expect(list).to.deep.equal(fixtureData.customerOptions)
        });
    }

    verifyTheHeaderOfSelectedOptions (selectedOption) {
        this.elements.selectedOptionsHeader()
        .should(($element) => {
            expect($element.text().trim()).to.equal(`${selectedOption}`);
        });
        
        this.elements.selectedOptionsHeader().invoke("text").then(function (text) {
            expect(text.trim()).to.equal(`${selectedOption}`);
        });

        this.elements.selectedOptionsHeader().invoke("text").then(function (text) {
            cy.wrap(text.trim()).should("eq", `${selectedOption}`);
        });
    }

    selectACustomerOptions (option) {
        cy.get(".sidebar ul[role=menu]")
        .children("li[class^='nav-item has']")
        .contains('Customer').next('ul').find('li').contains(`${option}`)
        .click({force: true});
    }
    
}
export default new CustomerPage(); //What is default
