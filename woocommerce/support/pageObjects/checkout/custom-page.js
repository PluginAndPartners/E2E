import {CheckoutElements} from '../../elements/checkout/checkout-elements';
import { IframePage } from './iframe-page';

export const CheckoutCustomPage = {
    selectPaymentMethod() {
        cy.get(CheckoutElements.paymentMethods.creditCard.radio).click({force: true});
    },

    fillPaymentInformation(cardFullName, site) {
        cy.wait(4000);
        const envs = Cypress.env(site);
        cy.fixture('payment-status').then(() => {
            IframePage.getIframeElementName('iframe[name=cardNumber]', '#cardNumber').type(envs.cards.master.number, {force: true});
            IframePage.getIframeElementName('iframe[name=securityCode]', '#securityCode').type(envs.cards.master.cvv, {force: true});
            IframePage.getIframeElementName('iframe[name=expirationDate]', '#expirationDate').type(envs.cards.master.expirationDate, {force: true});
            cy.get(CheckoutElements.paymentMethods.creditCard.nameInput).type(cardFullName, {force: true});
            cy.get(CheckoutElements.paymentMethods.creditCard.installmentsSelect).click({force: true});
            cy.get(CheckoutElements.paymentMethods.creditCard.documentInput).type(envs.document.cpf, {force: true});
        });
    },
}