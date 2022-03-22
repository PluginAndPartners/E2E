import {CheckoutElements} from '../elements/checkout-elements';
import { IframePage } from './iframe-page';

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
        cy.wait(4000);
        cy.fixture('user-documents').then(userDocuments => {
            const userDocument = userDocuments.mlb;
            cy.fixture('credit-cards').then(creditCards => {
                const masterCard = creditCards.mlb.master;
                cy.fixture('payment-status').then(() => {
                    IframePage.getIframeElementName('iframe[name=cardNumber]', '#cardNumber').type(masterCard.number, {force: true});
                    IframePage.getIframeElementName('iframe[name=securityCode]', '#securityCode').type(masterCard.cvv, {force: true});
                    IframePage.getIframeElementName('iframe[name=expirationDate]', '#expirationDate').type(masterCard.expirationDate, {force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.nameInput).type(cardFullName, {force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.installmentsSelect).select('1', {force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.expirationDateInput).type(masterCard.expirationDate, {force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.cvvInput).type(masterCard.cvv, {force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.documentInput).type(userDocument.cpf, {force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.installmentsSelect).click({force: true});
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
