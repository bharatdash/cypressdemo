import fixtureData from '../../fixtures/example.json';

class CustomerPage {
    elements = {

    }
    verifyCustomerOptions() {
        //expand customer
        const list = []
        cy.get(".sidebar ul[role=menu]")
        .children("li[class^='nav-item has']")
        .contains('Customer').next('ul').find('li')
        .should('have.length', 7)
        .each(($ele) => {
            list.push($ele.text().trim())
        })
        .then(() => {
            expect(list).to.deep.equal(fixtureData.customerOptions)
        });
    }
    
}
export default new CustomerPage(); //What is default
