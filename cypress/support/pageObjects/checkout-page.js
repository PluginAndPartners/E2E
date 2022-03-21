import {CheckoutElements} from '../elements/checkout-elements';

export const CheckoutPage = {
    fillPersonalData() {
        cy.fixture('users').then(users => {
            const user = users.mlb;
        
            cy.get(CheckoutElements.billingForm.firstNameInput).type(user.firstName);
            cy.get(CheckoutElements.billingForm.lastNameInput).type(user.lastName);
            cy.get(CheckoutElements.billingForm.addressInput).type(user.address);
            cy.get(CheckoutElements.billingForm.cityInput).type(user.city);
            cy.get(CheckoutElements.billingForm.stateSelect).select(user.stateAcronym, {force: true});
            cy.get(CheckoutElements.billingForm.zipcodeInput).type(user.zipcode, {force: true});
            cy.get(CheckoutElements.billingForm.phoneInput).type(user.phone);
            cy.get(CheckoutElements.billingForm.emailInput).type(user.email);
        });
    },

    selectPaymentMethod() {
        cy.get(CheckoutElements.paymentMethods.creditCard.radio).click({force: true});
    },

    fillPaymentInformation(cardFullName) {
        cy.wait(12000);
        cy.fixture('user-documents').then(userDocuments => {
            const userDocument = userDocuments.mlb;
            cy.fixture('credit-cards').then(creditCards => {
                const masterCard = creditCards.mlb.master;
                cy.fixture('payment-status').then(() => {
                    cy.get(CheckoutElements.paymentMethods.creditCard.numberInput).type(masterCard.number, {force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.nameInput).type(cardFullName, {force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.installmentsSelect).select('1', {force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.expirationDateInput).type(masterCard.expirationDate, {force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.cvvInput).type(masterCard.cvv, {force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.documentInput).type(userDocument.cpf, {force: true});
                });
            });
        });
    },

    finishCheckout() {
        cy.get(CheckoutElements.finishButton).click();
        cy.on('uncaught:exception', () => false);
        cy.wait(4000);
    },
}
