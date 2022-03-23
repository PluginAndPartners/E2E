import {CheckoutElements} from '../../elements/checkout/checkout-elements';

export const CheckoutPage = {
    fillPersonalData(site) {
        cy.fixture('users').then(users => {
            let user = users[site];
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

    finishCheckout() {
        cy.get(CheckoutElements.finishButton, { setTimeout: 4000 }).click();
        cy.on('uncaught:exception', () => false);
    },
}
