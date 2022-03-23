import {CheckoutElements} from '../../elements/checkout/checkout-elements';
import { IframePage } from '../iframe-page';

export const CheckoutCustomPage = {
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
                    cy.get(CheckoutElements.paymentMethods.creditCard.installmentsSelect).click({force: true});
                    cy.get(CheckoutElements.paymentMethods.creditCard.documentInput).type(userDocument.cpf, {force: true});
                });
            });
        });
    },
}