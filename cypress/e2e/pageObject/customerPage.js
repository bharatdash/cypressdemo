import FixtureData from '../../fixtures/example.json';
import { generateRandomUserData } from '../../support/fakeTestData'
const userData = generateRandomUserData();

class CustomerPage {
    elements = {
        selectedOptionsHeader: () => cy.get("h1.float-left"),
        allMenus: () => cy.get(".sidebar ul[role=menu]").children("li[class^='nav-item']"),
        allMenusExceptDashboard: () => cy.get(".sidebar ul[role=menu]").children("li[class^='nav-item has']"),
        customMenu: (menuName) => cy.get(".sidebar ul[role=menu]").children("li[class^='nav-item has']").contains(`${menuName}`).next('ul').find('li'),
        addNewCustomer: () => cy.get("a[class='btn btn-primary']"),
        saveBtn: () => cy.get("button[name='save']"),
        saveAndContinue: () => cy.get("button[name='save-continue']"),
        enterEmail: () => cy.get("#Email"),
        enterPassword: () => cy.get("#Password"),
        enterFirstName: () => cy.get("#FirstName"),
        enterLastName: () => cy.get("#LastName"),
        genderMale: () => cy.get("#Gender_Male"),
        genderFemale: () => cy.get("#Gender_Female"),
        enterDob: () => cy.get("#DateOfBirth"),
        enterCompanyName: () => cy.get("#Company"),
        chooseIfTaxExemptOrNot: () => cy.get("#IsTaxExempt"),
        enterNewsLetter: () => cy.get("input[aria-labelledby*='Newsletter']"),
        chooseRole: () => cy.get("input[aria-labelledby*='Role']"),
        selectVendor: () => cy.get("#VendorId"),
        chooseActiveOrNot: () => cy.get('#Active'),
        addAdminComment: () => cy.get("#AdminComment"),
        backToCustomerList: () => cy.get("h1[class='float-left'] small a"),
        successAlert: () => cy.get('.alert'),
        dismissAlert: () => cy.get("button[data-dismiss='alert']"),
        dangerAlert: () => cy.get(".alert.alert-danger.alert-dismissable"),
        validationError: () => cy.get(" div[class='validation-summary-errors'] li"),
        removeRole: () => cy.get("ul[id='SelectedCustomerRoleIds_taglist'] span[title='delete']"),
        //: () => ,
    }
    verifyCustomerOptions() {
        //expand customer
        const list = []
        this.elements.customMenu('Customer').should('have.length', 7)
            .each(($ele) => {
                list.push($ele.text().trim())
            })
            .then(() => {
                expect(list).to.deep.equal(FixtureData.customerOptions)
            });
    }

    verifyTheHeaderOfSelectedOptions(selectedOption) {
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

    selectACustomerOptions(option) {
        cy.get(".sidebar ul[role=menu]")
            .children("li[class^='nav-item has']")
            .contains('Customer').next('ul').find('li').contains(`${option}`)
            .click({ force: true });
    }

    addACustomer(role) {

        this.elements.addNewCustomer().click();
        this.elements.enterEmail().type(userData.email)
        this.elements.enterPassword().type(userData.password)
        this.elements.enterFirstName().type(userData.firstName)
        this.elements.enterLastName().type(userData.lastName)
        this.elements.genderMale().click()
        this.elements.enterDob().type(userData.dob)
        this.elements.enterCompanyName().type(userData.company)
        this.elements.chooseIfTaxExemptOrNot().then(($checkbox) => {
            if (!$checkbox.is(':checked')) {
                cy.wrap($checkbox).check();
            } else {
                cy.wrap($checkbox).uncheck();
            }
        });
        this.elements.chooseActiveOrNot().then(($checkbox) => {
            if (!$checkbox.is(':checked')) {
                cy.wrap($checkbox).check();
            } else {
                cy.wrap($checkbox).uncheck();
            }
        });
        this.elements.addAdminComment().type(userData.randomString)

        this.elements.enterNewsLetter().type("Test store {enter}", { delay: 100 })
        this.elements.removeRole().should('be.visible').then(($button) => { //$ sign is used to indicate that the variable button is a jQuery or jQuery-like object.
            cy.wrap($button).click();
            this.elements.chooseRole().type(`${role}{enter}`, { delay: 100 })
        })
        this.elements.selectVendor().select('Vendor 1', { force: true }).should('have.value', '1'); //cy.click() cannot be called on a <select> element. Use cy.select() command instead

        this.elements.saveBtn().click();
        this.elements.successAlert().should("be.visible")
        this.elements.successAlert().invoke("text").then(function (text) {
            expect(text.trim()).to.contain("The new customer has been added successfully.");
            cy.wrap(text.trim()).should("contain", "The new customer has been added successfully.")
        })
        this.elements.dismissAlert().should("be.visible").click();


    }

}
export default new CustomerPage(); //What is default
