import {CheckoutElements} from '../elements/checkout-elements';

export const CheckoutPage = {
    fillPersonalData() {
        cy.fixture('users').then(users => {
            const user = users[0];
        
            cy.get(CheckoutElements.billingForm.firstNameInput).type(user.firstName);
            cy.get(CheckoutElements.billingForm.lastNameInput).type(user.lastName);
            cy.get(CheckoutElements.billingForm.addressInput).type(user.address);
            cy.get(CheckoutElements.billingForm.cityInput).type(user.city);
            cy.get(CheckoutElements.billingForm.stateSelect).select(user.stateAcronym, {force: true});
            cy.get(CheckoutElements.billingForm.phoneInput).type(user.phone);
            cy.get(CheckoutElements.billingForm.emailInput).type(user.email);
        });
    },

    selectPaymentMethod() {
        cy.get(CheckoutElements.paymentMethods.creditCard.radio).click({force: true});
    },

    fillPaymentInformation() {
        cy.fixture('users').then(users => {
            const user = users[0];
            cy.fixture('credit-cards').then(creditCards => {
                const masterCard = creditCards.br.master;
                cy.fixture('payment-status').then(paymentStatus => {
                    cy.get(CheckoutElements.paymentMethods.creditCard.numberInput).type(masterCard.number);
                    cy.get(CheckoutElements.paymentMethods.creditCard.nameInput).type(paymentStatus.refused.othe, {force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.installmentsSelect).select('1');
                    cy.get(CheckoutElements.paymentMethods.creditCard.expirationDateInput).type(masterCard.expirationDate);
                    cy.get(CheckoutElements.paymentMethods.creditCard.cvvInput).type(masterCard.cvv);
                    cy.get(CheckoutElements.paymentMethods.creditCard.documentInput).type(user.document);
                });
            });
        });

        
    },

    finishCheckout() {
        cy.get(CheckoutElements.finishButton).click();
    },
}
