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

    isThumbnailCard() {
        cy.get(CheckoutElements.paymentMethods.creditCard.cardNumberDiv).should('have.attr', 'style');
    },

    cvvDigitsInformation(site) {
        const envs = Cypress.env(site);
        cy.get(CheckoutElements.paymentMethods.creditCard.cvvDigitsInformation).contains(envs.cards.master.digits);
        cy.get(CheckoutElements.paymentMethods.creditCard.cvvDigitsInformation).contains(envs.cards.master.side);
    },

    isDocumentInput() {
        cy.get(CheckoutElements.paymentMethods.creditCard.documentInput, {force: true}).should('be.visible');
    },

    isInstallments() {
        cy.get(CheckoutElements.paymentMethods.creditCard.installmentsSelect, {force: true}).should('be.visible');
    },

    fillCardNumber(site) {
        const envs = Cypress.env(site);
        IframePage.getIframeElementName('iframe[name=cardNumber]', '#cardNumber').type(envs.cards.master.number, {force: true});
    },

    fillCvv(site) {
        const envs = Cypress.env(site);
        IframePage.getIframeElementName('iframe[name=securityCode]', '#securityCode').type(envs.cards.master.cvv, {force: true});
    },

    fillExpirationDate(site) {
        const envs = Cypress.env(site);
        IframePage.getIframeElementName('iframe[name=expirationDate]', '#expirationDate').type(envs.cards.master.expirationDate, {force: true});
    },

    fillCardHolderName(cardFullName) {
        cy.wait(1000);
        cy.get(CheckoutElements.paymentMethods.creditCard.nameInput).type(cardFullName, {force: true});
    },

    fillInstallments(site) {
        const envs = Cypress.env(site);
        cy.get(CheckoutElements.paymentMethods.creditCard.firstInstallment).click({force: true});
    },

    fillDocument(site) {
        const envs = Cypress.env(site);
        cy.get(CheckoutElements.paymentMethods.creditCard.documentInput).type(envs.document.cpf, {force: true});
    },



}