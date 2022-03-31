import {OrderElements} from './../../elements/store/order-elements';

export const StoreOrderConfirmationPage = {
    validateUrl(url) {
        cy.url().should('include', url);
    },

    errorPaymentMessage(message) {
        cy.get(OrderElements.errorPaymentMessage, {force: true}).should('be.visible');
        cy.get(OrderElements.errorPaymentMessage, {force: true}).contains(message);
    },

    espera(){
        cy.pause();
    }
}

